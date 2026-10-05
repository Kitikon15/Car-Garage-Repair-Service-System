"use client";

import { useState, useEffect } from "react";
import ProductImage from "./ProductImage";

export default function OrderCatalog({
  parts,
  onAddToCart,
  onGoToCart,
  initialSearch = "",
  initialCategory = "all",
}) {
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedMaker, setSelectedMaker] = useState("all");
  const [selectedModel, setSelectedModel] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [layoutMode, setLayoutMode] = useState("grid-4"); // 'list' | 'grid-3' | 'grid-4'
  const [sortBy, setSortBy] = useState("popular");
  const [quantities, setQuantities] = useState({});
  const [addedNotice, setAddedNotice] = useState("");

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  const bannerLinks = [
    { id: "all", label: "อะไหล่ทั้งหมดในคลัง", icon: "bi-grid-fill" },
    { id: "fluids", label: "น้ำมันเครื่อง & ของเหลว", icon: "bi-droplet-half" },
    { id: "suspension", label: "ช่วงล่าง & ระบบเบรก", icon: "bi-bezier2" },
    { id: "engine", label: "เครื่องยนต์ & ระบบส่งกำลัง", icon: "bi-gear-wide-connected" },
    { id: "cooling", label: "ระบบระบายความร้อน & หม้อน้ำ", icon: "bi-fan" },
    { id: "electrical", label: "ระบบไฟ & แบตเตอรี่", icon: "bi-lightning-charge-fill" },
    { id: "filters", label: "ไส้กรอง & งานเช็กระยะ", icon: "bi-funnel-fill" },
    { id: "body", label: "ชิ้นส่วนตัวถัง & โคมไฟ", icon: "bi-car-front" },
    { id: "genuine", label: "อะไหล่แท้ศูนย์ (OEM)", icon: "bi-patch-check-fill" },
    { id: "tools", label: "เครื่องมือช่าง & อุปกรณ์อู่", icon: "bi-tools" },
  ];

  const sidebarCategories = [
    { id: "all", label: "อะไหล่ทั้งหมดในคลัง (All Parts)" },
    { id: "fluids", label: "น้ำมันเครื่อง & ของเหลว (Fluids)" },
    { id: "suspension", label: "ช่วงล่าง & ระบบเบรก (Brakes & Shocks)" },
    { id: "engine", label: "เครื่องยนต์ & ส่งกำลัง (Engine & Belts)" },
    { id: "cooling", label: "ระบบระบายความร้อน (Cooling)" },
    { id: "electrical", label: "ระบบไฟ & แบตเตอรี่ (Electrical)" },
    { id: "filters", label: "ไส้กรอง & เช็กระยะ (Maintenance Filters)" },
    { id: "body", label: "ชิ้นส่วนตัวถัง & โคมไฟ (Body & Lights)" },
    { id: "genuine", label: "อะไหล่แท้ศูนย์ OEM (Genuine Parts)" },
    { id: "tools", label: "เครื่องมือช่าง & อุปกรณ์งานซ่อม (Garage Tools)" },
  ];

  const brandOptions = [
    { id: "all", label: "แบรนด์ทั้งหมด" },
    { id: "TOYOTA", label: "Toyota Genuine" },
    { id: "HONDA", label: "Honda Genuine" },
    { id: "DENSO", label: "Denso" },
    { id: "BREMBO", label: "Brembo (เบรมโบ้)" },
    { id: "SHELL", label: "Shell (เชลล์)" },
    { id: "BOSCH", label: "Bosch (บ๊อช)" },
    { id: "AISIN", label: "Aisin (ไอชิน)" },
    { id: "KOYORAD", label: "Koyorad (โคโยแรด)" },
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
    { id: "all", label: "ยี่ห้อรถ (ทั้งหมด)" },
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
    { id: "all", label: "รุ่นรถ (ทั้งหมด)" },
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
    { id: "all", label: "รุ่นปี (ทั้งหมด)" },
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
    const matchesSearch =
      !term ||
      p.part_name.toLowerCase().includes(term) ||
      p.part_id.toLowerCase().includes(term);

    if (!matchesSearch) return false;

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

    // กรองหมวดหมู่ระบบอะไหล่
    if (selectedCategory === "all") return true;
    if (selectedCategory === "fluids" || selectedCategory === "engine-fluids") {
      return (
        p.part_name.includes("น้ำมัน") ||
        p.part_name.includes("หล่อเย็น") ||
        p.part_name.includes("เกียร์") ||
        p.part_name.includes("จารบี") ||
        p.part_name.includes("Cleaner")
      );
    }
    if (selectedCategory === "suspension") {
      return (
        p.part_name.includes("โช้ค") ||
        p.part_name.includes("เบรก") ||
        p.part_name.includes("จานเบรก") ||
        p.part_name.includes("ลูกหมาก") ||
        p.part_name.includes("ลูกปืน") ||
        p.part_name.includes("เพลา")
      );
    }
    if (selectedCategory === "cooling") {
      return (
        p.part_name.includes("หล่อเย็น") ||
        p.part_name.includes("หม้อน้ำ") ||
        p.part_name.includes("พัดลม") ||
        p.part_name.includes("ปั๊มน้ำ") ||
        p.part_name.includes("วาล์วน้ำ")
      );
    }
    if (selectedCategory === "engine") {
      return (
        p.part_name.includes("หัวเทียน") ||
        p.part_name.includes("สายพาน") ||
        p.part_name.includes("เครื่อง") ||
        p.part_name.includes("แท่นเครื่อง") ||
        p.part_name.includes("ไทม์มิ่ง")
      );
    }
    if (selectedCategory === "electrical") {
      return (
        p.part_name.includes("แบตเตอรี่") ||
        p.part_name.includes("หัวเทียน") ||
        p.part_name.includes("คอยล์") ||
        p.part_name.includes("ไดชาร์จ") ||
        p.part_name.includes("ไฟ") ||
        p.part_name.includes("LED")
      );
    }
    if (selectedCategory === "filters") {
      return p.part_name.includes("กรอง");
    }
    if (selectedCategory === "body") {
      return (
        p.part_name.includes("ไฟ") ||
        p.part_name.includes("กระจก") ||
        p.part_name.includes("ตัวถัง") ||
        p.part_name.includes("ใบปัดน้ำฝน")
      );
    }
    if (selectedCategory === "genuine") {
      return (
        p.part_name.toUpperCase().includes("TOYOTA") ||
        p.part_name.toUpperCase().includes("HONDA") ||
        p.part_name.toUpperCase().includes("DENSO") ||
        p.part_name.toUpperCase().includes("AISIN") ||
        p.part_name.toUpperCase().includes("BREMBO") ||
        p.part_name.toUpperCase().includes("BOSCH")
      );
    }
    if (selectedCategory === "tools") {
      return (
        p.part_name.includes("จารบี") ||
        p.part_name.includes("เครื่องมือ") ||
        p.part_name.includes("อุปกรณ์") ||
        p.part_name.includes("น้ำยา") ||
        p.part_name.includes("Cleaner")
      );
    }
    return true;
  });

  // จัดเรียง
  const sortedParts = [...filteredParts].sort((a, b) => {
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
      alert("จำนวนที่ต้องการสั่งเกินจำนวนคงเหลือในคลัง!");
      return;
    }
    onAddToCart(part, qty);
    setAddedNotice(`เพิ่ม "${part.part_name}" (${qty} ชิ้น) ลงในตะกร้าเรียบร้อยแล้ว!`);
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
                <span>คลังเบิก-จ่ายอะไหล่ยานยนต์</span>
              </h1>
              <p className="text-white opacity-90 small mb-0 fw-medium">
                ระบบจัดการชิ้นส่วนอะไหล่แท้ห้าง OEM และเทียบเท่า สำหรับงานซ่อมบำรุงในอู่ (Workshop Parts Inventory)
              </p>
            </div>

            {/* ปุ่มทางลัดไปตะกร้า / รายการเบิก */}
            <button
              className="btn btn-garage-fire btn-sm px-3 py-2 shadow"
              onClick={onGoToCart}
            >
              <i className="bi bi-cart3 fs-6"></i>
              <span>รายการเบิกอะไหล่ &amp; ตะกร้า</span>
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
                  onClick={() => setSelectedCategory(link.id)}
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
              ดูตะกร้าสินค้า <i className="bi bi-arrow-right ms-1"></i>
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
                  หน้าแรก
                </a>
              </li>
              <li className="breadcrumb-item active text-dark" aria-current="page">
                คลังเบิก-จ่ายอะไหล่ {selectedCategory !== "all" ? `(${selectedCategory})` : ""}
              </li>
            </ol>
          </nav>

          {/* Controls: แสดงสินค้า, สลับ Grid/List, ตัวเลือกจัดเรียง */}
          <div className="d-flex align-items-center gap-3 flex-wrap">
            {/* จำนวนสินค้า */}
            <div className="d-flex align-items-center gap-2 small text-muted">
              <span>แสดงสินค้า :</span>
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
                title="มุมมองแบบรายการ (List)"
              >
                <i className="bi bi-list fs-6"></i>
              </button>
              <button
                type="button"
                className={`btn btn-sm ${layoutMode === "grid-3" ? "btn-light fw-bold text-sp-blue" : "btn-link text-muted"} p-1 px-2 border-0`}
                onClick={() => setLayoutMode("grid-3")}
                title="มุมมอง 3 คอลัมน์"
              >
                <i className="bi bi-grid fs-6"></i>
              </button>
              <button
                type="button"
                className={`btn btn-sm ${layoutMode === "grid-4" ? "btn-light fw-bold text-sp-blue" : "btn-link text-muted"} p-1 px-2 border-0`}
                onClick={() => setLayoutMode("grid-4")}
                title="มุมมอง 4 คอลัมน์"
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
              <option value="popular">สินค้ายอดนิยม ▾</option>
              <option value="price-low">ราคา: ต่ำ - สูง</option>
              <option value="price-high">ราคา: สูง - ต่ำ</option>
              <option value="stock">สต็อกคงเหลือมากสุด</option>
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
            <div className="shop-sidebar-card mb-4 sticky-top" style={{ top: "140px" }}>
              <div className="shop-sidebar-title d-flex align-items-center justify-content-between">
                <span>หมวดหมู่สินค้า</span>
                <span className="badge bg-sp-blue-light text-sp-blue rounded-pill small">
                  {filteredParts.length} รายการ
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
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      <div className="d-flex align-items-center gap-2">
                        {cat.isFlash && <i className="bi bi-lightning-charge-fill text-danger"></i>}
                        <span>{cat.label}</span>
                      </div>
                      <i className={`bi bi-chevron-right small text-muted ${isActive ? "text-sp-blue fw-bold" : ""}`}></i>
                    </button>
                  );
                })}
              </div>

              {/* ช่องค้นหาเพิ่มเติมใน Sidebar */}
              <div className="mt-4 pt-3 border-top">
                <label className="form-label small fw-bold text-muted mb-2">ค้นหาชื่ออะไหล่ / รหัส</label>
                <div className="input-group input-group-sm">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="พิมพ์ชื่อสินค้า..."
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
            {displayParts.length === 0 ? (
              <div className="card bg-white border-0 shadow-sm p-5 text-center">
                <i className="bi bi-search text-muted fs-1 mb-3"></i>
                <h5 className="fw-bold text-dark">ไม่พบรายการอะไหล่ตามเงื่อนไขที่เลือก</h5>
                <p className="text-muted small">ลองเปลี่ยนหมวดหมู่หรือคำค้นหาเพื่อค้นหาชิ้นส่วนอื่นในคลัง</p>
                <div>
                  <button
                    className="btn btn-garage-unique btn-sm px-4 py-2 mt-2"
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedBrand("all");
                      setSearch("");
                    }}
                  >
                    ล้างตัวกรองทั้งหมด
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
                            <i className="bi bi-patch-check-fill text-warning"></i> {isOEM ? "แท้ห้าง OEM" : "เกรดพรีเมียม"}
                          </span>
                          <span className="badge-stock-status shadow-sm">
                            <i className="bi bi-box-seam-fill"></i> สต็อกอู่
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
                              <i className="bi bi-check-circle-fill"></i> พร้อมเบิกใช้งาน
                            </span>
                          ) : (
                            <span className="text-danger small fw-bold d-flex align-items-center gap-1" style={{ fontSize: "0.72rem" }}>
                              <i className="bi bi-exclamation-circle-fill"></i> เหลือในคลัง {part.stock_qty} ชิ้น
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
                            <div className="text-muted small" style={{ fontSize: "0.72rem" }}>ราคาเบิก / หน่วย</div>
                            <span className="fw-black text-danger fs-5" style={{ letterSpacing: "-0.5px" }}>
                              ฿{part.price.toLocaleString("th-TH", { minimumFractionDigits: 0 })}
                            </span>
                          </div>
                          <span className="badge bg-light text-secondary border small">
                            รวมภาษีมูลค่าเพิ่ม
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
                            <span>เบิก / ใส่ตะกร้า</span>
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
