import Card from "@/components/card";


const images = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <section className="min-h-screen flex justify-center items-center font-bold text-6xl">
        Hero section
      </section>
      <section className="relative flex flex-col gap-[10vh] py-[10vh]">
        {images.map((img, idx) => (
          <Card key={idx} imgUrl={`/images/${img}`} />
        ))}
      </section>
    </main>
  );
}