"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import MegaMenu, { megaMenuData } from "./MegaMenu";

export default function CategoryNav({
  onSelectCategoryItem,
  onSelectBrand,
  onGoToJobs,
  onGoToVehicleSearch,
}) {
  const { lang } = useLanguage ? useLanguage() : { lang: "th" };
  const isTh = lang !== "en";

  const [activeMegaCategory, setActiveMegaCategory] = useState(null);
  const navContainerRef = useRef(null);

  const categories = [
    { key: "fluids", label: isTh ? "น้ำมันเครื่อง & ของเหลว" : "Engine Oil & Fluids" },
    { key: "suspension", label: isTh ? "ช่วงล่าง & ระบบเบรก" : "Suspension & Brakes" },
    { key: "engine", label: isTh ? "เครื่องยนต์ & ส่งกำลัง" : "Engine & Drivetrain" },
    { key: "cooling", label: isTh ? "ระบบระบายความร้อน" : "Cooling System" },
    { key: "body", label: isTh ? "ชิ้นส่วนตัวถัง & โคมไฟ" : "Body Parts & Lights" },
    { key: "care", label: isTh ? "เคมีภัณฑ์ & การบำรุงรักษา" : "Care & Maintenance" },
    { key: "paint", label: isTh ? "สี & ตัวถังยานยนต์" : "Automotive Paint & Body" },
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
      style={{ zIndex: activeMegaCategory ? 1060 : 10 }}
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
