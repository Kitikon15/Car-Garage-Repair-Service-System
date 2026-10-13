"use client";

import { useRef } from "react";

export default function CategoryCarousel({ onSelectCategory }) {
  const scrollContainerRef = useRef(null);

  const categories = [
    {
      id: "fluids",
      title: "น้ำมันเครื่องและของเหลว",
      image: "/images/categories/cat_fluids.png",
    },
    {
      id: "suspension",
      title: "ช่วงล่างและระบบเบรก",
      image: "/images/categories/cat_suspension.png",
    },
    {
      id: "cooling",
      title: "ระบบระบายความร้อน",
      image: "/images/categories/cat_cooling.png",
    },
    {
      id: "engine",
      title: "ระบบเครื่องยนต์และส่งกำลัง",
      image: "/images/categories/cat_engine.png",
    },
    {
      id: "filters",
      title: "ไส้กรองและงานเช็กระยะ",
      image: "/images/categories/cat_care.png",
    },
    {
      id: "electrical",
      title: "ระบบไฟและแบตเตอรี่",
      image: "/images/categories/cat_tools.png",
    },
    {
      id: "body",
      title: "ชิ้นส่วนตัวถังและโคมไฟ",
      image: "/images/categories/cat_body.png",
    },
    {
      id: "tools",
      title: "เครื่องมือช่างและเคมีภัณฑ์",
      image: "/images/categories/cat_tools.png",
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
      {/* ส่วนหัวหมวดหมู่สินค้า พร้อมปุ่มเลื่อนซ้ายขวา */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h5 className="fw-bold mb-0 text-sp-blue d-flex align-items-center gap-2">
            <i className="bi bi-grid-fill"></i>
            <span>หมวดหมู่สินค้า</span>
          </h5>
          <small className="text-muted">เลือกหมวดหมู่ชิ้นส่วนยานยนต์ที่ต้องการค้นหา</small>
        </div>

        {/* ปุ่มเลื่อนซ้าย / ขวา */}
        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center shadow-sm"
            style={{ width: "36px", height: "36px" }}
            onClick={scrollLeft}
            title="เลื่อนซ้าย"
            aria-label="Scroll categories left"
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center shadow-sm"
            style={{ width: "36px", height: "36px" }}
            onClick={scrollRight}
            title="เลื่อนขวา"
            aria-label="Scroll categories right"
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* แถบการ์ดแนวนอนเลื่อนซ้าย-ขวาได้ (Horizontal Scrollable Strip) */}
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
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex-shrink-0 card card-hover p-2 text-center bg-white border cursor-pointer"
            style={{
              width: "145px",
              minHeight: "165px",
              scrollSnapAlign: "start",
              cursor: "pointer",
              borderRadius: "0.85rem",
              transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
            }}
            onClick={() => onSelectCategory && onSelectCategory(cat.id)}
          >
            {/* ภาพหมวดหมู่สินค้าจริง */}
            <div
              className="rounded-3 p-1 mx-auto mb-2 d-flex align-items-center justify-content-center"
              style={{
                width: "125px",
                height: "105px",
                backgroundColor: "#ffffff",
              }}
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="img-fluid"
                style={{
                  maxHeight: "100px",
                  maxWidth: "100%",
                  objectFit: "contain",
                  transition: "transform 0.25s ease",
                }}
              />
            </div>

            {/* ชื่อหมวดหมู่ (ตัวหนาสีน้ำเงินเข้ม สไตล์ ServiceGarage) */}
            <h6
              className="fw-bold mb-1 text-center"
              style={{
                fontSize: "0.86rem",
                lineHeight: "1.35",
                color: "#034ea2",
                minHeight: "2.4rem",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {cat.title}
            </h6>
          </div>
        ))}
      </div>
    </div>
  );
}
