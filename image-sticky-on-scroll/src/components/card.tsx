"use client";

import { useInView, useScroll } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const Card = ({ imgUrl }: { imgUrl: string }) => {
  const vertMargin = 10

  const container = useRef<HTMLDivElement>(null)
  const [maxScrollY, setMaxScrollY] = useState(Infinity)
  const [dynamicStyle, setDynamicStyle] = useState({
    scale: 1,
    filter: 0
  })

  
  const {scrollY} = useScroll({
    target: container,
  
  })

  const isInView = useInView(container,{
    margin: `0px 0px -${100 - vertMargin}% 0px`
  })

scrollY.on("change", (scrollY) => {
  let animationValue = 1;
  if(scrollY > maxScrollY){
    animationValue = Math.max(0, 1 - (scrollY - maxScrollY) / 10000)
  }
  setDynamicStyle({
    scale: animationValue,
    filter: (1 - animationValue) * 100
  })
})

  useEffect(() => {
if(isInView){
  setMaxScrollY(scrollY.get())
}
  },[isInView])
  return (
    <div
    ref={container}
    style={{
      top: `${vertMargin}vh`,
      height: `${100 - 2 * vertMargin}vh`,
      scale: dynamicStyle.scale,
      filter: `blur(${dynamicStyle.filter}px)`
    }}
    className="sticky top-[10vh] h-[80vh] w-[90vw] bg-neutral-200 rounded-xl overflow-hidden">
      <Image
        src={imgUrl}
        alt={imgUrl}
        fill
        className="object-cover"
        sizes="90vw"
      />
    </div>
  );
};

export default Card;