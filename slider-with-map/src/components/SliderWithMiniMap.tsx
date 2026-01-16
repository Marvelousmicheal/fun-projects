"use client";
import React, { useState, useRef, useEffect } from "react";

const slides = [1, 2, 3, 4, 5, 6];

const SliderWithMiniMap = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSliderDragging, setIsSliderDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const miniMapRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const slideWidthPercent = 100 / 1.5; // Percentage for CSS

  const getSlideWidthPixels = () => {
    if (!sliderRef.current) return 0;
    return sliderRef.current.offsetWidth / 1.5;
  };

  const translateX =
    -currentIndex * slideWidthPercent -
    (getSlideWidthPixels() ? (dragOffset / getSlideWidthPixels()) * 100 : 0);
  const viewportWidth = 30;
  const viewportPosition =
    (currentIndex / (slides.length - 1)) * (100 - viewportWidth);

  const handleMiniMapClick = (e: React.MouseEvent) => {
    if (!miniMapRef.current) return;

    const rect = miniMapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;

    const slideIndex = Math.round(percentage * (slides.length - 1));
    setCurrentIndex(Math.max(0, Math.min(slides.length - 1, slideIndex)));
  };

  const handleMiniMapDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleMiniMapDrag = (e: React.MouseEvent | MouseEvent) => {
    if (!isDragging || !miniMapRef.current) return;
    const rect = miniMapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const slideIndex = Math.round(percentage * (slides.length - 1));
    setCurrentIndex(Math.max(0, Math.min(slides.length - 1, slideIndex)));
  };

  const handleMiniMapDragEnd = () => {
    setIsDragging(false);
  };

  const handleSliderDrag = (clientX: number) => {
    if (!isSliderDragging || !sliderRef.current) return;

    const diff = dragStart - clientX;
    const slideWidth = sliderRef.current.offsetWidth / 1.5;
    const newOffset = dragOffset + diff;

    setDragOffset(newOffset);
    setDragStart(clientX);
  };

  const handlesliderDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsSliderDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragStart(clientX);
  };

  const handleSliderDragEnd = () => {
    setIsSliderDragging(false);
    const slideWidth = sliderRef.current!.offsetWidth / 1.5;
    const newIndex = Math.round(
      (currentIndex * slideWidth + dragOffset) / slideWidth
    );
    const clampedIndex = Math.max(0, Math.min(slides.length - 1, newIndex));
    setCurrentIndex(clampedIndex);
    setDragOffset(0);
  };
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMiniMapDrag(e);
      }
      if (isSliderDragging) {
        handleSliderDrag(e.clientX);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isSliderDragging) {
        handleSliderDrag(e.touches[0].clientX);
      }
    };
    const handleTouchEnd = () => {
      if (isSliderDragging) {
        handleSliderDragEnd();
      }
    };
    const handleMouseUp = () => {
      if (isDragging) {
        handleMiniMapDragEnd();
      }
      if (isSliderDragging) {
        handleSliderDragEnd();
      }
    };
    if (isDragging || isSliderDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, isSliderDragging, dragOffset, dragStart]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-8 p-8 bg-background">
      <div className="w-full max-w-5xl ">
        {/* ================= MAIN SLIDER ================= */}

        <div
          onTouchStart={handlesliderDragStart}
          ref={sliderRef}
          onMouseDown={handlesliderDragStart}
          style={{ touchAction: "none" }}
          className="relative h-[400px] overflow-hidden mb-8 cursor-grab active:cursor-grabbing select-none"
        >
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(${translateX}%)` }}
          >
            {slides.map((slide) => (
              <div
                key={slide}
                style={{ minWidth: `${slideWidthPercent}%` }}
                className="h-full flex items-center justify-center px-2 "
              >
                <div className="w-full h-full rounded-[2px] bg-gray-200 flex items-center justify-center">
                  {slide}
                </div>
              </div>
            ))}
          </div>
          {/* Left Arrow */}
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm text-foreground p-3 rounded-full border border-border z-10"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          {/* Right Arrow */}
          <button
            onClick={() =>
              setCurrentIndex((prev) => Math.min(slides.length - 1, prev + 1))
            }
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm text-foreground p-3 rounded-full border border-border z-10"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* ================= MINI MAP ================= */}

        <div className="space-y-4">
          <div className="flex items-center justify-end">
            <span className="text-sm text-foreground">
              {currentIndex + 1} / {slides.length}
            </span>
          </div>
          <div
            ref={miniMapRef}
            onClick={handleMiniMapClick}
            className="relative h-16 bg-gray-200 rounded-lg overflow-hidden "
          >
            <div className="flex h-full">
              {slides.map((slide, index) => (
                <div
                  key={slide}
                  className={`flex-1 bg-gray-500/20 opacity-40 transition-opacity duration-500 ${
                    index === currentIndex ? "opacity-100" : "opacity-40"
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center border-r border-border last:border-r-0">
                    <span className="text-muted-foreground text-xs">
                      {slide}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {/* Viewport Indicator */}
            <div
              onMouseDown={handleMiniMapDragStart}
              onTouchStart={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              className="absolute top-0 h-full bg-foreground/10 border-2 border-foreground/40 cursor-grab active:cursor-grabbing transition-all duration-500 rounded"
              style={{
                left: `${viewportPosition}%`,
                width: `${viewportWidth}%`,
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-6 h-1 bg-foreground/50 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderWithMiniMap;
