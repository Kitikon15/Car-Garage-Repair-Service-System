"use client";

import { useRef } from "react";

export default function BrandCarousel({ onSelectBrand }) {
  const scrollContainerRef = useRef(null);

  const brands = [
    {
      id: "Toyota",
      name: "TOYOTA",
      logo: "/images/brands/brand_toyota.png",
    },
    {
      id: "Honda",
      name: "HONDA",
      logo: "/images/brands/brand_honda.png",
    },
    {
      id: "Isuzu",
      name: "ISUZU",
      logo: "/images/brands/brand_isuzu.png",
    },
    {
      id: "Mazda",
      name: "MAZDA",
      logo: "/images/brands/brand_mazda.png",
    },
    {
      id: "Nissan",
      name: "NISSAN",
      logo: "/images/brands/brand_nissan.png",
    },
    {
      id: "Mitsubishi",
      name: "MITSUBISHI",
      logo: "/images/brands/brand_mitsubishi.png",
    },
    {
      id: "Suzuki",
      name: "SUZUKI",
      logo: "/images/brands/brand_suzuki.png",
    },
    {
      id: "Chevrolet",
      name: "CHEVROLET",
      logo: "/images/brands/brand_chevrolet.png",
    },
    {
      id: "Ford",
      name: "FORD",
      logo: "/images/brands/brand_ford.png",
    },
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -260, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 260, behavior: "smooth" });
    }
  };

  return (
    <div className="card border-0 shadow-sm bg-white p-3 p-md-4 mb-4 position-relative">
      {/* ส่วนหัวช้อปตามยี่ห้อรถ พร้อมปุ่มเลื่อนซ้ายขวา */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h5 className="fw-bold mb-0 text-sp-blue d-flex align-items-center gap-2">
            <i className="bi bi-car-front-fill"></i>
            <span>ช้อปตามยี่ห้อรถ</span>
          </h5>
          <small className="text-muted">เลือกแบรนด์รถยนต์เพื่อค้นหาอะไหล่ที่ตรงรุ่นโดยเฉพาะ</small>
        </div>

        {/* ปุ่มเลื่อนซ้าย / ขวา */}
        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center shadow-sm"
            style={{ width: "36px", height: "36px" }}
            onClick={scrollLeft}
            title="เลื่อนซ้าย"
            aria-label="Scroll brands left"
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center shadow-sm"
            style={{ width: "36px", height: "36px" }}
            onClick={scrollRight}
            title="เลื่อนขวา"
            aria-label="Scroll brands right"
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* แถบการ์ดยี่ห้อรถ เลื่อนซ้าย-ขวาได้ (Horizontal Scrollable Strip) */}
      <div
        ref={scrollContainerRef}
        className="d-flex gap-3 overflow-x-auto pb-2 scrollbar-none"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {brands.map((b) => (
          <div
            key={b.id}
            className="flex-shrink-0 card card-hover p-3 text-center bg-white border cursor-pointer d-flex align-items-center justify-content-center"
            style={{
              width: "145px",
              height: "115px",
              scrollSnapAlign: "start",
              cursor: "pointer",
              borderRadius: "0.85rem",
              transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
            }}
            onClick={() => onSelectBrand && onSelectBrand(b.id)}
            title={`ดูอะไหล่สำหรับ ${b.name}`}
          >
            {/* โลโก้แบรนด์รถยนต์ทางการ */}
            <div
              className="d-flex align-items-center justify-content-center w-100 h-100"
              style={{
                maxHeight: "85px",
              }}
            >
              <img
                src={b.logo}
                alt={b.name}
                className="img-fluid"
                style={{
                  maxHeight: "75px",
                  maxWidth: "120px",
                  objectFit: "contain",
                  transition: "transform 0.25s ease",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
