"use client";

import { useState } from "react";
import MegaMenu, { megaMenuData } from "./MegaMenu";

export default function CategoryNav({
  onSelectCategoryItem,
  onSelectBrand,
}) {
  const [activeMegaCategory, setActiveMegaCategory] = useState(null);

  const categories = [
    { key: "fluids", label: "น้ำมันเครื่องและของเหลว" },
    { key: "body", label: "ชิ้นส่วนตัวถัง" },
    { key: "suspension", label: "ช่วงล่างและระบบเบรก" },
    { key: "cooling", label: "ระบบระบายความร้อน" },
    { key: "engine", label: "ระบบเครื่องยนต์และส่งกำลัง" },
    { key: "paint", label: "ซ่อมสีและตัวถัง" },
    { key: "care", label: "สินค้าดูแลรถยนต์" },
  ];

  const handleMouseEnter = (key) => {
    setActiveMegaCategory(key);
  };

  const handleMouseLeave = () => {
    // Delay slightly to avoid jitter if needed, or close
    setActiveMegaCategory(null);
  };

  const handleClick = (key) => {
    setActiveMegaCategory((prev) => (prev === key ? null : key));
  };

  return (
    <div className="position-relative sp-category-bar border-top border-bottom">
      <div className="container-fluid px-3 px-lg-4">
        <div className="d-flex align-items-center justify-content-start justify-content-lg-center gap-1 gap-md-2 overflow-x-auto scrollbar-none py-1">
          {categories.map((cat) => {
            const isOpen = activeMegaCategory === cat.key;
            return (
              <div
                key={cat.key}
                className="position-relative flex-shrink-0"
                onMouseEnter={() => handleMouseEnter(cat.key)}
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
                  onClick={() => handleClick(cat.key)}
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
      />
    </div>
  );
}
