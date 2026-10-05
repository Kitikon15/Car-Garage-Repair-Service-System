"use client";

import { useState, useEffect } from "react";

export default function PromoBannerCarousel({ onShopNow, onEstimate }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: "revitalize-refine",
      image: "/images/banners/banner_revitalize.png",
      alt: "Revitalize & Refine คืนสภาพรถของคุณให้เหมือนใหม่ - โปรโมชันคูปองส่วนลดสูงสุด 25%",
      action: onShopNow,
    },
    {
      id: "genuine-oem",
      image: "/images/banners/banner_oem.png",
      alt: "Genuine & OEM Auto Parts - ศูนย์รวมอะไหล่แท้มาตรฐานสากล รับประกัน 100% ส่งด่วน 3 ชม.",
      action: onShopNow,
    },
    {
      id: "cost-estimator",
      image: "/images/banners/banner_estimator.png",
      alt: "ฟังชั่นประเมินราคาซ่อม & ค่าแรง - คำนวณตามหลัก Object-Oriented Programming (OOP)",
      action: onEstimate,
    },
  ];

  // Auto slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const active = slides[currentSlide];

  return (
    <div
      className="position-relative overflow-hidden rounded-4 shadow-sm mb-4 cursor-pointer select-none"
      style={{
        cursor: "pointer",
        backgroundColor: "#001a38",
        aspectRatio: "1024 / 371",
        maxHeight: "420px",
      }}
      onClick={active.action}
      title="คลิกเพื่อสั่งซื้อหรือประเมินราคา"
    >
      {/* Banner Image Container */}
      <div className="w-100 h-100 position-relative">
        {slides.map((s, idx) => (
          <img
            key={s.id}
            src={s.image}
            alt={s.alt}
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              objectFit: "cover",
              objectPosition: "center",
              opacity: currentSlide === idx ? 1 : 0,
              visibility: currentSlide === idx ? "visible" : "hidden",
              transition: "opacity 0.6s ease-in-out, visibility 0.6s ease-in-out",
            }}
          />
        ))}
      </div>

      {/* Left Navigation Arrow */}
      <button
        type="button"
        className="btn position-absolute top-50 start-0 translate-middle-y ms-2 ms-md-3 rounded-circle d-flex align-items-center justify-content-center shadow"
        style={{
          width: "42px",
          height: "42px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "#ffffff",
          zIndex: 10,
          border: "1px solid rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(4px)",
          transition: "background-color 0.2s, transform 0.2s",
        }}
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <i className="bi bi-chevron-left fs-5"></i>
      </button>

      {/* Right Navigation Arrow */}
      <button
        type="button"
        className="btn position-absolute top-50 end-0 translate-middle-y me-2 me-md-3 rounded-circle d-flex align-items-center justify-content-center shadow"
        style={{
          width: "42px",
          height: "42px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "#ffffff",
          zIndex: 10,
          border: "1px solid rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(4px)",
          transition: "background-color 0.2s, transform 0.2s",
        }}
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <i className="bi bi-chevron-right fs-5"></i>
      </button>

      {/* Dots Indicator at Bottom */}
      <div
        className="position-absolute bottom-0 start-50 translate-middle-x mb-2 mb-md-3 d-flex gap-2"
        style={{ zIndex: 10 }}
        onClick={(e) => e.stopPropagation()}
      >
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className="border-0 rounded-pill p-0"
            style={{
              width: currentSlide === idx ? "28px" : "10px",
              height: "10px",
              backgroundColor: currentSlide === idx ? "#fdb813" : "rgba(255, 255, 255, 0.6)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.5)",
              transition: "all 0.3s ease",
            }}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
