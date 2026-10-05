"use client";

import { useState, useRef, useEffect } from "react";
import MegaMenu, { megaMenuData } from "./MegaMenu";

export default function CategoryNav({
  onSelectCategoryItem,
  onSelectBrand,
  onGoToJobs,
  onGoToVehicleSearch,
}) {
  const [activeMegaCategory, setActiveMegaCategory] = useState(null);
  const navContainerRef = useRef(null);

  const categories = [
    { key: "fluids", label: "น้ำมันเครื่อง & ของเหลว" },
    { key: "suspension", label: "ช่วงล่าง & ระบบเบรก" },
    { key: "engine", label: "เครื่องยนต์ & ส่งกำลัง" },
    { key: "cooling", label: "ระบบระบายความร้อน" },
    { key: "body", label: "ชิ้นส่วนตัวถัง & โคมไฟ" },
    { key: "care", label: "เคมีภัณฑ์ & การบำรุงรักษา" },
    { key: "paint", label: "สี & ตัวถังยานยนต์" },
  ];

  // สลับเปิด/ปิด เมนูเมื่อคลิกเท่านั้น (Click to open/toggle)
  const handleCategoryClick = (key) => {
    setActiveMegaCategory((prev) => (prev === key ? null : key));
  };

  // ปิดเมนูเมื่อคลิกนอกพื้นที่ (Click outside to close)
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target)) {
        setActiveMegaCategory(null);
      }
    };
    if (activeMegaCategory) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [activeMegaCategory]);

  return (
    <div
      ref={navContainerRef}
      className="position-relative sp-category-bar border-top border-bottom"
    >
      <div className="container-fluid px-3 px-lg-4">
        <div className="d-flex align-items-center justify-content-start justify-content-lg-center gap-1 gap-md-2 overflow-x-auto scrollbar-none py-1">
          {categories.map((cat) => {
            const isOpen = activeMegaCategory === cat.key;
            return (
              <div
                key={cat.key}
                className="position-relative flex-shrink-0"
              >
                <button
                  type="button"
                  className={`btn btn-link text-decoration-none d-flex align-items-center gap-1 px-2 px-md-3 py-2 fw-bold transition-all ${
                    isOpen ? "sp-cat-link-active" : "sp-cat-link"
                  }`}
                  style={{
                    fontSize: "0.88rem",
                    letterSpacing: "-0.2px",
                  }}
                  onClick={() => handleCategoryClick(cat.key)}
                  aria-expanded={isOpen}
                >
                  <span>{cat.label}</span>
                  <i
                    className={`bi bi-chevron-down small transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    style={{
                      fontSize: "0.72rem",
                      transition: "transform 0.2s ease",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  ></i>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dropdown Mega Menu */}
      <MegaMenu
        activeCategoryKey={activeMegaCategory}
        onClose={() => setActiveMegaCategory(null)}
        onSelectItem={(searchTerm, catId) => {
          if (onSelectCategoryItem) {
            onSelectCategoryItem(searchTerm, catId);
          }
          setActiveMegaCategory(null);
        }}
        onSelectBrand={(brandName) => {
          if (onSelectBrand) {
            onSelectBrand(brandName);
          }
          setActiveMegaCategory(null);
        }}
        onGoToJobs={onGoToJobs}
        onGoToVehicleSearch={onGoToVehicleSearch}
      />
    </div>
  );
}
