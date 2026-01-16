const utility = {
  symbols: ["$", ">", "#", "%", "&", "*", "!", "?", "@", "~"],
  blockSize: 70,
  detectionRadius: 50,
  clusterSize: 7,
  blockLifeTime: 300,
  emptyRatio: 0.3,
  scrambleRatio: 0.25,
  scrambleInterval: 150,
  audioInitialized: false,
};

let audioCtx;

// Melancholic A Minor Scale (Lower Octaves)
const scale = [
    110.00, 130.81, 146.83, 164.81, 196.00, // A2, C3, D3, E3, G3 (Deep Cello range)
    220.00, 261.63, 293.66, 329.63, 392.00  // A3, C4, D4, E4, G4 (Viola range)
];

function setupAudio() {
    if (utility.audioInitialized) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
    utility.audioInitialized = true;
}

function playTone() {
    if (!utility.audioInitialized || !audioCtx) return;

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    // Pick a random note from the scale
    const note = scale[Math.floor(Math.random() * scale.length)];
    
    oscillator.type = 'sine'; 
    oscillator.frequency.setValueAtTime(note, audioCtx.currentTime);

    // Deep Melancholy Envelope
    const now = audioCtx.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.08, now + 0.8); // Very slow swell (0.8s)
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 4.0); // Long, haunting decay (4s)

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(now + 4.0); 
}

function getRandomSymbol() {
  return utility.symbols[Math.floor(Math.random() * utility.symbols.length)];
}

function initGridOverlay(element) {
  const gridOverlay = document.createElement("div");
  gridOverlay.className = "grid-overlay";

  const width = element.offsetWidth;
  const height = element.offsetHeight;

  const cols = Math.ceil(width / utility.blockSize);
  const rows = Math.ceil(height / utility.blockSize);

  const blocks = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const block = document.createElement("div");
      block.className = "grid-block";


      const isEmpty = Math.random() < utility.emptyRatio;
      block.textContent = isEmpty ? "" : getRandomSymbol();
      block.style.width = `${utility.blockSize}px`;
      block.style.height = `${utility.blockSize}px`;
      block.style.left = `${col * utility.blockSize}px`;
      block.style.top = `${row * utility.blockSize}px`;

      gridOverlay.appendChild(block);
      blocks.push({
        element: block,
        x: col * utility.blockSize + utility.blockSize / 2,
        y: row * utility.blockSize + utility.blockSize / 2,
        isEmpty: isEmpty,
        gridX: col,
        gridY: row,
        highlightEndTime: 0,
        shouldScramble: isEmpty && Math.random() < utility.scrambleRatio,
        scrambleInterval: null,
      })
    }
  }

  element.appendChild(gridOverlay);

  element.addEventListener("mousemove", (e) => {
    const rect = element.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    let closestBlock = null
    let closestDistance = Infinity

    for(const block of blocks){
        const dx = mouseX - block.x
        const dy = mouseY - block.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if(distance < closestDistance){
            closestDistance = distance
            closestBlock = block
        }
    }
    if(!closestBlock || closestDistance > utility.detectionRadius){
        return
    }
    const currentTime = Date.now()
    closestBlock.element.classList.add("active")
    closestBlock.highlightEndTime = currentTime + utility.blockLifeTime
    
    // Play sound occasionally (e.g., 30% chance) to avoid audio spam
    if (Math.random() < 0.3) playTone();

    if(closestBlock.shouldScramble && !closestBlock.scrambleInterval){
        closestBlock.scrambleInterval = setInterval(()=>{
            closestBlock.element.textContent = getRandomSymbol()
        }, utility.scrambleInterval)
    }

    const clusterCount = Math.floor(Math.random() * utility.clusterSize) + 1
    let currentBlock = closestBlock
    let activeBlocks = [closestBlock]

    for(let i = 1; i < clusterCount; i++){
        const neighbors = blocks.filter((neighbor)=>{
            if(activeBlocks.includes(neighbor)) return false
            const dx = Math.abs(neighbor.gridX - currentBlock.gridX)
            const dy = Math.abs(neighbor.gridY - currentBlock.gridY)
            return (dx <= 1 && dy <= 1)
        })
        if(neighbors.length === 0) break

        const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)]
        randomNeighbor.element.classList.add("active")
        randomNeighbor.highlightEndTime = currentTime + utility.blockLifeTime + 1 * 10
        if(randomNeighbor.shouldScramble && !randomNeighbor.scrambleInterval){
            randomNeighbor.scrambleInterval = setInterval(()=>{
                randomNeighbor.element.textContent = getRandomSymbol()
            }, utility.scrambleInterval)
        }
        activeBlocks.push(randomNeighbor)
        currentBlock = randomNeighbor
    }
  })

  function updateHighlights(){
     const currentTime = Date.now()

     blocks.forEach((block)=>{
        if(block.highlightEndTime > 0 && currentTime > block.highlightEndTime){
            block.element.classList.remove("active")
            block.highlightEndTime = 0

            if(block.scrambleInterval){
                clearInterval(block.scrambleInterval)
                block.scrambleInterval = null
                if(!block.isEmpty){
                    block.element.textContent = getRandomSymbol()
                }
            }
        }
     })

     requestAnimationFrame(updateHighlights)
  }
  updateHighlights()
}

document.addEventListener("DOMContentLoaded",()=>{
    const startBtn = document.getElementById('start-btn');
    const startScreen = document.getElementById('start-screen');
    const container = document.querySelector('.image-container');

    startBtn.addEventListener('click', () => {
        setupAudio();
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        
        // Play a startup sound
        playTone(); 

        startScreen.style.opacity = '0';
        setTimeout(() => {
            startScreen.style.display = 'none';
            container.classList.add('visible');
        }, 500);
    });

    document.querySelectorAll(".image-container").forEach((element)=>{
        initGridOverlay(element)
    })
})
