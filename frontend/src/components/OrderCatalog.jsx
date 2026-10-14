"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import ProductImage from "./ProductImage";

export default function OrderCatalog({
  parts,
  onAddToCart,
  onGoToCart,
  initialSearch = "",
  searchQuery,
  initialCategory = "all",
  activeCategory,
}) {
  const { lang } = useLanguage ? useLanguage() : { lang: "th" };
  const isTh = lang !== "en";

  const currentInitialSearch = searchQuery !== undefined ? searchQuery : initialSearch;
  const currentInitialCat = activeCategory || initialCategory || "all";

  const [search, setSearch] = useState(currentInitialSearch);
  const [selectedCategory, setSelectedCategory] = useState(currentInitialCat);
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedMaker, setSelectedMaker] = useState("all");
  const [selectedModel, setSelectedModel] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [layoutMode, setLayoutMode] = useState("grid-4"); // 'list' | 'grid-3' | 'grid-4'
  const [sortBy, setSortBy] = useState("popular");
  const [quantities, setQuantities] = useState({});
  const [addedNotice, setAddedNotice] = useState("");

  useEffect(() => {
    const targetCat = activeCategory || initialCategory || "all";
    setSelectedCategory(targetCat);
    // รีเซ็ตตัวกรองย่อย เพื่อให้เห็นรายการสินค้าในหมวดหมู่อย่างครบถ้วน
    setSelectedBrand("all");
    setSelectedMaker("all");
    setSelectedModel("all");
    setSelectedYear("all");
  }, [initialCategory, activeCategory]);

  useEffect(() => {
    const targetSearch = searchQuery !== undefined ? searchQuery : (initialSearch || "");
    setSearch(targetSearch);
  }, [initialSearch, searchQuery]);

  const bannerLinks = [
    { id: "all", label: isTh ? "อะไหล่ทั้งหมดในคลัง" : "All Parts", icon: "bi-grid-fill" },
    { id: "fluids", label: isTh ? "น้ำมันเครื่อง & ของเหลว" : "Fluids & Oils", icon: "bi-droplet-half" },
    { id: "suspension", label: isTh ? "ช่วงล่าง & ระบบเบรก" : "Suspension & Brakes", icon: "bi-bezier2" },
    { id: "engine", label: isTh ? "เครื่องยนต์ & ระบบส่งกำลัง" : "Engine & Drivetrain", icon: "bi-gear-wide-connected" },
    { id: "cooling", label: isTh ? "ระบบระบายความร้อน & หม้อน้ำ" : "Cooling & Radiator", icon: "bi-fan" },
    { id: "electrical", label: isTh ? "ระบบไฟ & แบตเตอรี่" : "Electrical & Batteries", icon: "bi-lightning-charge-fill" },
    { id: "filters", label: isTh ? "ไส้กรอง & งานเช็กระยะ" : "Filters & Maintenance", icon: "bi-funnel-fill" },
    { id: "body", label: isTh ? "ชิ้นส่วนตัวถัง & โคมไฟ" : "Body Parts & Lights", icon: "bi-car-front" },
    { id: "genuine", label: isTh ? "อะไหล่แท้ศูนย์ (OEM)" : "Genuine OEM Parts", icon: "bi-patch-check-fill" },
    { id: "tools", label: isTh ? "เครื่องมือช่าง & อุปกรณ์อู่" : "Garage Tools & Equipment", icon: "bi-tools" },
  ];

  const sidebarCategories = [
    { id: "all", label: isTh ? "อะไหล่ทั้งหมดในคลัง (All Parts)" : "All Parts in Warehouse" },
    { id: "fluids", label: isTh ? "น้ำมันเครื่อง & ของเหลว (Fluids)" : "Engine Oil & Fluids" },
    { id: "suspension", label: isTh ? "ช่วงล่าง & ระบบเบรก (Brakes & Shocks)" : "Brakes, Shocks & Suspension" },
    { id: "engine", label: isTh ? "เครื่องยนต์ & ส่งกำลัง (Engine & Belts)" : "Engine, Belts & Drivetrain" },
    { id: "cooling", label: isTh ? "ระบบระบายความร้อน (Cooling)" : "Cooling System & Radiators" },
    { id: "electrical", label: isTh ? "ระบบไฟ & แบตเตอรี่ (Electrical)" : "Electrical & Batteries" },
    { id: "filters", label: isTh ? "ไส้กรอง & เช็กระยะ (Maintenance Filters)" : "Maintenance Service Filters" },
    { id: "body", label: isTh ? "ชิ้นส่วนตัวถัง & โคมไฟ (Body & Lights)" : "Body Panels & Lighting" },
    { id: "genuine", label: isTh ? "อะไหล่แท้ศูนย์ OEM (Genuine Parts)" : "Genuine OEM Parts" },
    { id: "tools", label: isTh ? "เครื่องมือช่าง & อุปกรณ์งานซ่อม (Garage Tools)" : "Garage Repair Tools" },
  ];

  const brandOptions = [
    { id: "all", label: isTh ? "แบรนด์ทั้งหมด" : "All Brands" },
    { id: "TOYOTA", label: "Toyota Genuine" },
    { id: "HONDA", label: "Honda Genuine" },
    { id: "DENSO", label: "Denso" },
    { id: "BREMBO", label: "Brembo" },
    { id: "SHELL", label: "Shell" },
    { id: "BOSCH", label: "Bosch" },
    { id: "AISIN", label: "Aisin" },
    { id: "KOYORAD", label: "Koyorad" },
    { id: "555", label: "555 Three Five" },
    { id: "GATES", label: "Gates PowerGrip" },
    { id: "NSK", label: "NSK Bearings" },
    { id: "SEIKEN", label: "Seiken Japan" },
    { id: "OSRAM", label: "Osram Lighting" },
    { id: "LIQUI MOLY", label: "Liqui Moly" },
    { id: "TAMA", label: "Tama Thermostats" },
    { id: "NGK", label: "NGK Spark Plugs" },
    { id: "GS BATTERY", label: "GS Battery" },
    { id: "BANDO", label: "Bando Belts" },
    { id: "MONROE", label: "Monroe Shocks" },
    { id: "TRW", label: "TRW Braking" },
    { id: "VALVOLINE", label: "Valvoline" },
    { id: "TRANE", label: "Trane Grease" },
  ];

  const makerOptions = [
    { id: "all", label: isTh ? "ยี่ห้อรถ (ทั้งหมด)" : "All Vehicle Makes" },
    { id: "Toyota", label: "Toyota" },
    { id: "Honda", label: "Honda" },
    { id: "Isuzu", label: "Isuzu" },
    { id: "Mazda", label: "Mazda" },
    { id: "Nissan", label: "Nissan" },
    { id: "Mitsubishi", label: "Mitsubishi" },
    { id: "Suzuki", label: "Suzuki" },
    { id: "Ford", label: "Ford" },
  ];

  const modelOptions = [
    { id: "all", label: isTh ? "รุ่นรถ (ทั้งหมด)" : "All Models" },
    { id: "Civic", label: "Civic" },
    { id: "City", label: "City" },
    { id: "Accord", label: "Accord" },
    { id: "Camry", label: "Camry" },
    { id: "Corolla Altis", label: "Corolla Altis" },
    { id: "Vios", label: "Vios" },
    { id: "Yaris", label: "Yaris" },
    { id: "D-Max", label: "D-Max" },
    { id: "Ranger", label: "Ranger" },
    { id: "Triton", label: "Triton" },
  ];

  const yearOptions = [
    { id: "all", label: isTh ? "รุ่นปี (ทั้งหมด)" : "All Model Years" },
    { id: "2024", label: "2024" },
    { id: "2023", label: "2023" },
    { id: "2022", label: "2022" },
    { id: "2021", label: "2021" },
    { id: "2020", label: "2020" },
    { id: "2019", label: "2019" },
    { id: "2018", label: "2018" },
    { id: "2015", label: "2015 - 2017" },
  ];

  // ค้นหาแบรนด์ในชื่อสินค้า
  const detectBrand = (name) => {
    const brands = [
      "BREMBO", "SHELL", "TOYOTA", "NGK", "DENSO", "GS BATTERY", "BANDO",
      "VALVOLINE", "TRW", "MONROE", "HONDA", "TRANE", "KOYORAD", "555",
      "GATES", "AISIN", "NSK", "SEIKEN", "OSRAM", "BOSCH", "LIQUI MOLY", "TAMA"
    ];
    for (const b of brands) {
      if (name.toUpperCase().includes(b)) return b;
    }
    return "OEM";
  };

  const filteredParts = (parts || []).filter((p) => {
    const term = search.toLowerCase().trim();
    if (term) {
      const pName = p.part_name.toLowerCase();
      const pId = p.part_id.toLowerCase();
      // 1. Direct match on full term or ID
      let matchesSearch = pName.includes(term) || pId.includes(term);
      if (!matchesSearch) {
        // 2. Tokenized match (e.g. "น้ำมันเกียร์ อัตโนมัติ" matches "น้ำมันเกียร์อัตโนมัติ", "Brembo DOT" matches "Brembo Premium Brake Fluid DOT 4")
        const tokens = term.split(/\s+/).filter(Boolean);
        if (tokens.length > 1) {
          matchesSearch = tokens.every((t) => pName.includes(t)) || tokens.some((t) => pName.includes(t));
        }
      }
      if (!matchesSearch) return false;
    }

    // กรองแบรนด์สินค้า
    if (selectedBrand !== "all") {
      const partBrand = detectBrand(p.part_name);
      if (partBrand !== selectedBrand) return false;
    }

    // กรองยี่ห้อรถยนต์ (Maker)
    if (selectedMaker !== "all") {
      const makerLower = selectedMaker.toLowerCase();
      const mentionsOtherMaker = ["toyota", "honda", "isuzu", "mazda", "nissan", "mitsubishi", "suzuki", "ford"].some(
        (m) => m !== makerLower && p.part_name.toLowerCase().includes(m)
      );
      if (mentionsOtherMaker && !p.part_name.toLowerCase().includes(makerLower)) {
        return false;
      }
    }

    // กรองรุ่นรถยนต์ (Model)
    if (selectedModel !== "all") {
      const modelLower = selectedModel.toLowerCase();
      const mentionsOtherModel = ["civic", "city", "accord", "camry", "altis", "vios", "yaris", "d-max", "ranger", "triton"].some(
        (mo) => mo !== modelLower && p.part_name.toLowerCase().includes(mo)
      );
      if (mentionsOtherModel && !p.part_name.toLowerCase().includes(modelLower)) {
        return false;
      }
    }

    // กรองหมวดหมู่ระบบอะไหล่ (รองรับทุก alias และทุกคีย์จาก Navbar, Carousel, และ MegaMenu)
    if (!selectedCategory || selectedCategory === "all") return true;

    const cat = selectedCategory.toLowerCase();

    if (["fluids", "engine-fluids", "oil", "fluid"].includes(cat)) {
      return (
        p.part_name.includes("น้ำมัน") ||
        p.part_name.includes("หล่อเย็น") ||
        p.part_name.includes("เกียร์") ||
        p.part_name.includes("จารบี") ||
        p.part_name.includes("Cleaner") ||
        p.part_name.includes("หล่อลื่น")
      );
    }

    if (["suspension", "brake", "brakes", "shock", "shocks"].includes(cat)) {
      return (
        p.part_name.includes("โช้ค") ||
        p.part_name.includes("เบรก") ||
        p.part_name.includes("จานเบรก") ||
        p.part_name.includes("ลูกหมาก") ||
        p.part_name.includes("ลูกปืน") ||
        p.part_name.includes("เพลา") ||
        p.part_name.includes("ปีกนก")
      );
    }

    if (["cooling", "radiator"].includes(cat)) {
      return (
        p.part_name.includes("หล่อเย็น") ||
        p.part_name.includes("หม้อน้ำ") ||
        p.part_name.includes("พัดลม") ||
        p.part_name.includes("ปั๊มน้ำ") ||
        p.part_name.includes("วาล์วน้ำ")
      );
    }

    if (["engine", "engine-drivetrain", "motor"].includes(cat)) {
      return (
        p.part_name.includes("หัวเทียน") ||
        p.part_name.includes("สายพาน") ||
        p.part_name.includes("เครื่อง") ||
        p.part_name.includes("แท่นเครื่อง") ||
        p.part_name.includes("ไทม์มิ่ง") ||
        p.part_name.includes("วาล์ว") ||
        p.part_name.includes("ปั๊มน้ำ")
      );
    }

    if (["electrical", "battery", "electric"].includes(cat)) {
      return (
        p.part_name.includes("แบตเตอรี่") ||
        p.part_name.includes("หัวเทียน") ||
        p.part_name.includes("คอยล์") ||
        p.part_name.includes("ไดชาร์จ") ||
        p.part_name.includes("ไฟ") ||
        p.part_name.includes("LED") ||
        p.part_name.includes("หลอด")
      );
    }

    if (["filters", "filter"].includes(cat)) {
      return p.part_name.includes("กรอง");
    }

    if (["body", "accessories"].includes(cat)) {
      return (
        p.part_name.includes("ไฟ") ||
        p.part_name.includes("กระจก") ||
        p.part_name.includes("ตัวถัง") ||
        p.part_name.includes("ใบปัดน้ำฝน") ||
        p.part_name.includes("โคม")
      );
    }

    if (["genuine", "oem"].includes(cat)) {
      return ["TOYOTA", "HONDA", "DENSO", "AISIN", "BREMBO", "BOSCH", "NGK", "GS", "MONROE", "KOYORAD", "GATES", "555"].some((b) =>
        p.part_name.toUpperCase().includes(b)
      );
    }

    if (["tools", "care", "paint"].includes(cat)) {
      return (
        p.part_name.includes("จารบี") ||
        p.part_name.includes("เครื่องมือ") ||
        p.part_name.includes("อุปกรณ์") ||
        p.part_name.includes("น้ำยา") ||
        p.part_name.includes("Cleaner") ||
        p.part_name.includes("หล่อลื่น")
      );
    }

    return true;
  });

  // รายการสินค้าที่จะแสดง (หากตัวกรองย่อยไม่พบสินค้า ให้ดึงสินค้าในหมวดหมู่นั้นมาแสดงแทน ป้องกันหน้าจอว่าง)
  let activeList = filteredParts;
  let isFallback = false;

  if (activeList.length === 0 && (parts || []).length > 0) {
    const categoryOnly = (parts || []).filter((p) => {
      if (!selectedCategory || selectedCategory === "all") return true;
      const cat = selectedCategory.toLowerCase();
      if (["fluids", "engine-fluids", "oil", "fluid"].includes(cat)) {
        return p.part_name.includes("น้ำมัน") || p.part_name.includes("หล่อเย็น") || p.part_name.includes("เกียร์") || p.part_name.includes("จารบี") || p.part_name.includes("Cleaner") || p.part_name.includes("หล่อลื่น");
      }
      if (["suspension", "brake", "brakes", "shock", "shocks"].includes(cat)) {
        return p.part_name.includes("โช้ค") || p.part_name.includes("เบรก") || p.part_name.includes("จานเบรก") || p.part_name.includes("ลูกหมาก") || p.part_name.includes("ลูกปืน") || p.part_name.includes("เพลา") || p.part_name.includes("ปีกนก");
      }
      if (["cooling", "radiator"].includes(cat)) {
        return p.part_name.includes("หล่อเย็น") || p.part_name.includes("หม้อน้ำ") || p.part_name.includes("พัดลม") || p.part_name.includes("ปั๊มน้ำ") || p.part_name.includes("วาล์วน้ำ");
      }
      if (["engine", "engine-drivetrain", "motor"].includes(cat)) {
        return p.part_name.includes("หัวเทียน") || p.part_name.includes("สายพาน") || p.part_name.includes("เครื่อง") || p.part_name.includes("แท่นเครื่อง") || p.part_name.includes("ไทม์มิ่ง") || p.part_name.includes("วาล์ว") || p.part_name.includes("ปั๊มน้ำ");
      }
      if (["electrical", "battery", "electric"].includes(cat)) {
        return p.part_name.includes("แบตเตอรี่") || p.part_name.includes("หัวเทียน") || p.part_name.includes("คอยล์") || p.part_name.includes("ไดชาร์จ") || p.part_name.includes("ไฟ") || p.part_name.includes("LED") || p.part_name.includes("หลอด");
      }
      if (["filters", "filter"].includes(cat)) {
        return p.part_name.includes("กรอง");
      }
      if (["body", "accessories"].includes(cat)) {
        return p.part_name.includes("ไฟ") || p.part_name.includes("กระจก") || p.part_name.includes("ตัวถัง") || p.part_name.includes("ใบปัดน้ำฝน") || p.part_name.includes("โคม");
      }
      if (["genuine", "oem"].includes(cat)) {
        return ["TOYOTA", "HONDA", "DENSO", "AISIN", "BREMBO", "BOSCH", "NGK", "GS", "MONROE", "KOYORAD", "GATES", "555"].some((b) => p.part_name.toUpperCase().includes(b));
      }
      if (["tools", "care", "paint"].includes(cat)) {
        return p.part_name.includes("จารบี") || p.part_name.includes("เครื่องมือ") || p.part_name.includes("อุปกรณ์") || p.part_name.includes("น้ำยา") || p.part_name.includes("Cleaner") || p.part_name.includes("หล่อลื่น");
      }
      return true;
    });

    if (categoryOnly.length > 0) {
      activeList = categoryOnly;
      isFallback = true;
    } else {
      activeList = parts || [];
      isFallback = true;
    }
  }

  // จัดเรียง
  const sortedParts = [...activeList].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "stock") return b.stock_qty - a.stock_qty;
    return 0; // popular / default
  });

  const displayParts = sortedParts.slice(0, itemsPerPage);

  const handleQtyChange = (partId, delta, maxStock) => {
    const current = quantities[partId] || 1;
    const nextVal = Math.max(1, Math.min(maxStock, current + delta));
    setQuantities({ ...quantities, [partId]: nextVal });
  };

  const handleAdd = (part) => {
    const qty = quantities[part.part_id] || 1;
    if (qty > part.stock_qty) {
      alert(isTh ? "จำนวนที่ต้องการสั่งเกินจำนวนคงเหลือในคลัง!" : "Requested quantity exceeds available stock!");
      return;
    }
    const success = onAddToCart(part, qty);
    if (success === false) return;
    setAddedNotice(
      isTh
        ? `เพิ่ม "${part.part_name}" (${qty} ชิ้น) ลงในตะกร้าเรียบร้อยแล้ว!`
        : `Added "${part.part_name}" (${qty} pcs) to cart successfully!`
    );
    setTimeout(() => setAddedNotice(""), 3500);
  };

  return (
    <div className="order-catalog-page pb-5">
      {/* 1. แถบหัวข้อคลังเบิก-จ่ายอะไหล่ยานยนต์ (Workshop Spare Parts Inventory & Requisition Hub) */}
      <div className="shop-charcoal-banner shadow-sm mb-4">
        <div className="container-fluid px-3 px-lg-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <h1 className="shop-charcoal-title mb-1 d-flex align-items-center gap-2">
                <i className="bi bi-boxes text-warning"></i>
                <span>{isTh ? "คลังเบิก-จ่ายอะไหล่ยานยนต์" : "Automotive Parts Requisition Hub"}</span>
              </h1>
              <p className="text-white opacity-90 small mb-0 fw-medium">
                {isTh
                  ? "ระบบจัดการชิ้นส่วนอะไหล่แท้ห้าง OEM และเทียบเท่า สำหรับงานซ่อมบำรุงในอู่ (Workshop Parts Inventory)"
                  : "OEM genuine and high-grade aftermarket spare parts inventory for garage repair services"}
              </p>
            </div>

            {/* ปุ่มทางลัดไปตะกร้า / รายการเบิก */}
            <button
              className="btn btn-garage-fire btn-sm px-3 py-2 shadow"
              onClick={onGoToCart}
            >
              <i className="bi bi-cart3 fs-6"></i>
              <span>{isTh ? "รายการเบิกอะไหล่ & ตะกร้า" : "Parts Requisition Cart"}</span>
            </button>
          </div>

          {/* รายการปุ่มหมวดหมู่ระบบงานช่าง */}
          <div className="d-flex gap-2 flex-wrap overflow-x-auto scrollbar-none pt-2 pb-1">
            {bannerLinks.map((link) => {
              const isActive = selectedCategory === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  className={`shop-banner-link ${isActive ? "active" : ""}`}
                  onClick={() => {
                    setSelectedCategory(link.id);
                    setSearch("");
                    setSelectedBrand("all");
                    setSelectedMaker("all");
                    setSelectedModel("all");
                    setSelectedYear("all");
                  }}
                >
                  <i className={`bi ${link.icon}`}></i>
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container-fluid px-3 px-lg-4">
        {/* Notice แจ้งเตือนเมื่อกดใส่ตะกร้า */}
        {addedNotice && (
          <div
            className="alert alert-success border-0 shadow-sm d-flex align-items-center justify-content-between mb-4 py-3 px-4 rounded-3"
            style={{ backgroundColor: "#ecfdf5", color: "#065f46" }}
          >
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-check-circle-fill text-success fs-5"></i>
              <span className="fw-semibold">{addedNotice}</span>
            </div>
            <button
              className="btn btn-garage-unique btn-sm px-3 py-1"
              onClick={onGoToCart}
            >
              {isTh ? "ดูตะกร้าสินค้า" : "View Cart"} <i className="bi bi-arrow-right ms-1"></i>
            </button>
          </div>
        )}

        {/* 2. แถบ Breadcrumb และปุ่มสลับมุมมอง / จำนวนสินค้า */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 fw-semibold" style={{ fontSize: "0.95rem" }}>
              <li className="breadcrumb-item">
                <a href="#" className="text-decoration-none text-muted" onClick={(e) => { e.preventDefault(); setSelectedCategory("all"); setSearch(""); }}>
                  {isTh ? "หน้าแรก" : "Home"}
                </a>
              </li>
              <li className="breadcrumb-item active text-dark" aria-current="page">
                {isTh ? "คลังเบิก-จ่ายอะไหล่" : "Parts Inventory"} {selectedCategory !== "all" ? `(${selectedCategory})` : ""}
              </li>
            </ol>
          </nav>

          {/* Controls: แสดงสินค้า, สลับ Grid/List, ตัวเลือกจัดเรียง */}
          <div className="d-flex align-items-center gap-3 flex-wrap">
            {/* จำนวนสินค้า */}
            <div className="d-flex align-items-center gap-2 small text-muted">
              <span>{isTh ? "แสดงสินค้า :" : "Show :"}</span>
              {[9, 12, 18, 24].map((num) => (
                <button
                  key={num}
                  type="button"
                  className={`btn btn-link p-0 text-decoration-none fw-bold ${
                    itemsPerPage === num ? "text-sp-blue border-bottom border-sp-blue border-2" : "text-muted"
                  }`}
                  onClick={() => setItemsPerPage(num)}
                  style={{ fontSize: "0.88rem" }}
                >
                  {num}
                </button>
              ))}
            </div>

            {/* สลับมุมมอง List / Grid-3 / Grid-4 */}
            <div className="btn-group btn-group-sm bg-white rounded-3 shadow-sm border p-1">
              <button
                type="button"
                className={`btn btn-sm ${layoutMode === "list" ? "btn-light fw-bold text-sp-blue" : "btn-link text-muted"} p-1 px-2 border-0`}
                onClick={() => setLayoutMode("list")}
                title={isTh ? "มุมมองแบบรายการ (List)" : "List View"}
              >
                <i className="bi bi-list fs-6"></i>
              </button>
              <button
                type="button"
                className={`btn btn-sm ${layoutMode === "grid-3" ? "btn-light fw-bold text-sp-blue" : "btn-link text-muted"} p-1 px-2 border-0`}
                onClick={() => setLayoutMode("grid-3")}
                title={isTh ? "มุมมอง 3 คอลัมน์" : "3-Column Grid"}
              >
                <i className="bi bi-grid fs-6"></i>
              </button>
              <button
                type="button"
                className={`btn btn-sm ${layoutMode === "grid-4" ? "btn-light fw-bold text-sp-blue" : "btn-link text-muted"} p-1 px-2 border-0`}
                onClick={() => setLayoutMode("grid-4")}
                title={isTh ? "มุมมอง 4 คอลัมน์" : "4-Column Grid"}
              >
                <i className="bi bi-grid-3x3-gap-fill fs-6"></i>
              </button>
            </div>

            {/* ตัวเลือกจัดเรียง */}
            <select
              className="form-select form-select-sm bg-white shadow-sm fw-semibold text-dark border"
              style={{ width: "160px", borderRadius: "10px" }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">{isTh ? "สินค้ายอดนิยม ▾" : "Most Popular ▾"}</option>
              <option value="price-low">{isTh ? "ราคา: ต่ำ - สูง" : "Price: Low - High"}</option>
              <option value="price-high">{isTh ? "ราคา: สูง - ต่ำ" : "Price: High - Low"}</option>
              <option value="stock">{isTh ? "สต็อกคงเหลือมากสุด" : "Highest Stock"}</option>
            </select>
          </div>
        </div>

        {/* 3. แถบตัวกรอง 4 ช่องสไตล์โมเดิร์น (แบรนด์, ยี่ห้อรถ, รุ่นรถ, รุ่นปี) ตรงตามภาพตัวอย่าง */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-sm-6 col-lg-3">
            <select
              className="shop-filter-select-box"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              {brandOptions.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <select
              className="shop-filter-select-box"
              value={selectedMaker}
              onChange={(e) => setSelectedMaker(e.target.value)}
            >
              {makerOptions.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <select
              className="shop-filter-select-box"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              {modelOptions.map((mo) => (
                <option key={mo.id} value={mo.id}>
                  {mo.label}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <select
              className="shop-filter-select-box"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {yearOptions.map((y) => (
                <option key={y.id} value={y.id}>
                  {y.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 4. ส่วนเนื้อหาหลัก: แถบข้างหมวดหมู่สินค้าซ้ายมือ + ตารางแสดงสินค้าขวามือ */}
        <div className="row g-4">
          {/* แถบข้างซ้าย: หมวดหมู่สินค้า (Sidebar Accordion ตรงตามภาพตัวอย่าง) */}
          <div className="col-12 col-lg-3">
            <div className="shop-sidebar-card mb-4" style={{ position: "relative", zIndex: 1 }}>
              <div className="shop-sidebar-title d-flex align-items-center justify-content-between">
                <span>{isTh ? "หมวดหมู่สินค้า" : "Categories"}</span>
                <span className="badge bg-sp-blue-light text-sp-blue rounded-pill small">
                  {filteredParts.length} {isTh ? "รายการ" : "items"}
                </span>
              </div>

              <div className="d-flex flex-column gap-1">
                {sidebarCategories.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={`shop-sidebar-item ${cat.isFlash ? "flash-sale-side" : ""} ${
                        isActive ? "active" : ""
                      }`}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setSearch("");
                        setSelectedBrand("all");
                        setSelectedMaker("all");
                        setSelectedModel("all");
                        setSelectedYear("all");
                      }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        {cat.isFlash && <i className="bi bi-lightning-charge-fill text-warning"></i>}
                        <span>{cat.label}</span>
                      </div>
                      <i className={`bi bi-chevron-right small text-muted ${isActive ? "text-sp-blue fw-bold" : ""}`}></i>
                    </button>
                  );
                })}
              </div>

              {/* ช่องค้นหาเพิ่มเติมใน Sidebar */}
              <div className="mt-4 pt-3 border-top">
                <label className="form-label small fw-bold text-muted mb-2">
                  {isTh ? "ค้นหาชื่ออะไหล่ / รหัส" : "Search Part Name / SKU"}
                </label>
                <div className="input-group input-group-sm">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={isTh ? "พิมพ์ชื่อสินค้า..." : "Type part name..."}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  {search && (
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setSearch("")}
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* รายการสินค้าขวามือ (Product Grid) */}
          <div className="col-12 col-lg-9">
            {isFallback && (
              <div
                className="alert alert-warning border-0 shadow-sm d-flex flex-wrap align-items-center justify-content-between mb-3 py-2 px-3 rounded-3"
                style={{ fontSize: "0.88rem" }}
              >
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-info-circle-fill text-warning fs-5"></i>
                  <span>
                    {isTh
                      ? `แสดงสินค้าแนะนำที่พร้อมใช้งานในหมวดนี้ (${displayParts.length} รายการ)`
                      : `Showing recommended available parts in this category (${displayParts.length} items)`}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm py-1 px-3 mt-1 mt-sm-0"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedBrand("all");
                    setSearch("");
                  }}
                >
                  <i className="bi bi-arrow-counterclockwise me-1"></i>{" "}
                  {isTh
                    ? `ดูสินค้าทั้งหมด (${parts?.length || 0})`
                    : `View All Items (${parts?.length || 0})`}
                </button>
              </div>
            )}

            {displayParts.length === 0 ? (
              <div className="card bg-white border-0 shadow-sm p-5 text-center">
                <i className="bi bi-search text-muted fs-1 mb-3"></i>
                <h5 className="fw-bold text-dark">
                  {isTh ? "ไม่พบรายการอะไหล่ตามเงื่อนไขที่เลือก" : "No auto parts found matching your criteria"}
                </h5>
                <p className="text-muted small">
                  {isTh
                    ? "ลองเปลี่ยนหมวดหมู่หรือคำค้นหาเพื่อค้นหาชิ้นส่วนอื่นในคลัง"
                    : "Try changing categories or search keywords to find parts in warehouse"}
                </p>
                <div>
                  <button
                    className="btn btn-garage-unique btn-sm px-4 py-2 mt-2"
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedBrand("all");
                      setSearch("");
                    }}
                  >
                    {isTh ? "ล้างตัวกรองทั้งหมด" : "Clear All Filters"}
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={`row g-3 ${
                  layoutMode === "list" ? "row-cols-1" : layoutMode === "grid-3" ? "row-cols-1 row-cols-sm-2 row-cols-md-3" : "row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4"
                }`}
              >
                {displayParts.map((part) => {
                  const isOEM = ["TOYOTA", "HONDA", "DENSO", "BREMBO", "SHELL", "NGK", "GS", "TRW"].some((b) =>
                    part.part_name.toUpperCase().includes(b)
                  );
                  const currentQty = quantities[part.part_id] || 1;

                  return (
                    <div className="col" key={part.part_id}>
                      <div className="shop-grid-card">
                        {/* ป้ายมาตรฐานชิ้นส่วนงานช่าง และสถานะพร้อมเบิกใช้งาน */}
                        <div className="d-flex align-items-center justify-content-between mb-2 position-relative" style={{ zIndex: 2 }}>
                          <span className="badge-oem-spec shadow-sm">
                            <i className="bi bi-patch-check-fill text-warning"></i>{" "}
                            {isOEM ? (isTh ? "แท้ห้าง OEM" : "Genuine OEM") : (isTh ? "เกรดพรีเมียม" : "Premium Grade")}
                          </span>
                          <span className="badge-stock-status shadow-sm">
                            <i className="bi bi-box-seam-fill"></i> {isTh ? "สต็อกอู่" : "In Stock"}
                          </span>
                        </div>

                        {/* ภาพสินค้าจริง สไตล์สตูดิโอคมชัด */}
                        <div
                          className="d-flex align-items-center justify-content-center my-2 p-2 rounded-3 bg-white"
                          style={{ minHeight: "160px" }}
                        >
                          <ProductImage
                            partId={part.part_id}
                            partName={part.part_name}
                            height="145px"
                          />
                        </div>

                        {/* รหัสชิ้นส่วนและสถานะคลัง */}
                        <div className="d-flex align-items-center justify-content-between mt-auto mb-1">
                          <span className="badge bg-light text-secondary border font-monospace" style={{ fontSize: "0.72rem" }}>
                            {part.part_id}
                          </span>
                          {part.stock_qty > 5 ? (
                            <span className="text-success small fw-semibold d-flex align-items-center gap-1" style={{ fontSize: "0.72rem" }}>
                              <i className="bi bi-check-circle-fill"></i> {isTh ? "พร้อมเบิกใช้งาน" : "Ready for Requisition"}
                            </span>
                          ) : (
                            <span className="text-danger small fw-bold d-flex align-items-center gap-1" style={{ fontSize: "0.72rem" }}>
                              <i className="bi bi-exclamation-circle-fill"></i>{" "}
                              {isTh ? `เหลือในคลัง ${part.stock_qty} ชิ้น` : `Only ${part.stock_qty} pcs left`}
                            </span>
                          )}
                        </div>

                        {/* ชื่อสินค้า */}
                        <h6
                          className="fw-bold text-dark mb-2"
                          style={{
                            fontSize: "0.92rem",
                            lineHeight: "1.35",
                            minHeight: "2.6rem",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                          title={part.part_name}
                        >
                          {part.part_name}
                        </h6>

                        {/* ราคาเบิกอะไหล่มาตรฐานประจำศูนย์ */}
                        <div className="d-flex align-items-baseline justify-content-between mb-3">
                          <div>
                            <div className="text-muted small" style={{ fontSize: "0.72rem" }}>
                              {isTh ? "ราคาเบิก / หน่วย" : "Unit Price"}
                            </div>
                            <span className="fw-black text-sp-blue fs-5" style={{ letterSpacing: "-0.5px" }}>
                              ฿{part.price.toLocaleString(isTh ? "th-TH" : "en-US", { minimumFractionDigits: 0 })}
                            </span>
                          </div>
                          <span className="badge bg-light text-secondary border small">
                            {isTh ? "รวมภาษีมูลค่าเพิ่ม" : "VAT Included"}
                          </span>
                        </div>

                        {/* แถบปรับจำนวนและปุ่มกดสั่งซื้อแบบ Custom Unique */}
                        <div className="d-flex align-items-center gap-2 mt-auto">
                          {/* ปุ่มปรับจำนวน (+ / -) */}
                          <div className="input-group input-group-sm" style={{ width: "95px" }}>
                            <button
                              type="button"
                              className="btn btn-outline-secondary px-2"
                              onClick={() => handleQtyChange(part.part_id, -1, part.stock_qty)}
                              disabled={currentQty <= 1}
                            >
                              -
                            </button>
                            <input
                              type="text"
                              className="form-control text-center px-1 fw-bold"
                              value={currentQty}
                              readOnly
                            />
                            <button
                              type="button"
                              className="btn btn-outline-secondary px-2"
                              onClick={() => handleQtyChange(part.part_id, 1, part.stock_qty)}
                              disabled={currentQty >= part.stock_qty}
                            >
                              +
                            </button>
                          </div>

                          {/* ปุ่มเบิกจ่ายอะไหล่สไตล์ Custom Unique */}
                          <button
                            type="button"
                            className="btn btn-garage-unique btn-sm flex-grow-1 py-2"
                            onClick={() => handleAdd(part)}
                            disabled={part.stock_qty === 0}
                          >
                            <i className="bi bi-cart-plus-fill"></i>
                            <span>{isTh ? "เบิก / ใส่ตะกร้า" : "Add to Cart"}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
