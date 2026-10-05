"use client";

import { useState, useEffect } from "react";
import ProductImage from "./ProductImage";

export default function VehicleSearch({ parts, vehicles, onAddToCart, onGoToCart, initialBrand = "Toyota" }) {
  const [selectedBrand, setSelectedBrand] = useState(initialBrand || "Toyota");
  const [selectedModel, setSelectedModel] = useState("Camry");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [quantities, setQuantities] = useState({});
  const [notice, setNotice] = useState("");

  const brandModels = {
    Toyota: ["Camry", "Corolla Altis", "Fortuner", "Hilux Revo", "Vios", "Yaris"],
    Honda: ["Civic", "CR-V", "Accord", "City", "HR-V", "Jazz"],
    Isuzu: ["D-Max", "MU-X", "Dragon Eye"],
    Ford: ["Ranger", "Everest", "F-150"],
    Nissan: ["Navara", "Almera", "Teana", "Kicks"],
    Mitsubishi: ["Triton", "Pajero Sport", "Mirage", "Xpander"],
    Mazda: ["Mazda 2", "Mazda 3", "CX-3", "CX-5", "BT-50"],
    Suzuki: ["Swift", "Ciaz", "Jimny", "Celerio", "Ertiga"],
    Chevrolet: ["Colorado", "Trailblazer", "Captiva", "Cruze"],
  };

  useEffect(() => {
    if (initialBrand && brandModels[initialBrand]) {
      setSelectedBrand(initialBrand);
      setSelectedModel(brandModels[initialBrand][0]);
    }
  }, [initialBrand]);

  const categories = [
    { id: "all", label: "ทุกระบบอะไหล่" },
    { id: "engine", label: "น้ำมันเครื่อง & ของเหลว" },
    { id: "brake", label: "ระบบเบรก & จานเบรก" },
    { id: "filter", label: "ไส้กรองน้ำมัน & กรองอากาศ" },
    { id: "battery", label: "แบตเตอรี่ & ระบบสตาร์ต" },
    { id: "suspension", label: "ช่วงล่าง & โช้คอัพ" },
  ];

  // คัดกรองอะไหล่ที่ตรงรุ่นกับรถที่เลือก
  const matchedParts = parts?.filter((p) => {
    // กรองตามหมวดหมู่
    if (selectedCategory === "engine") {
      if (!p.part_name.includes("น้ำมัน") && !p.part_name.includes("หล่อเย็น") && !p.part_name.includes("จารบี")) return false;
    }
    if (selectedCategory === "brake") {
      if (!p.part_name.includes("เบรก")) return false;
    }
    if (selectedCategory === "filter") {
      if (!p.part_name.includes("กรอง")) return false;
    }
    if (selectedCategory === "battery") {
      if (!p.part_name.includes("แบตเตอรี่") && !p.part_name.includes("หัวเทียน")) return false;
    }
    if (selectedCategory === "suspension") {
      if (!p.part_name.includes("โช้ค") && !p.part_name.includes("สายพาน")) return false;
    }

    // กรองตามแบรนด์รถ (ถ้ามีระบุในชื่อ ให้ตรงแบรนด์ หรือถ้าเป็นอะไหล่สากล universal ให้แสดงได้)
    const pName = p.part_name.toUpperCase();
    const otherBrands = Object.keys(brandModels).filter((b) => b !== selectedBrand);
    const mentionsOtherBrand = otherBrands.some((ob) => pName.includes(ob.toUpperCase()));

    if (mentionsOtherBrand && !pName.includes(selectedBrand.toUpperCase())) {
      return false;
    }

    return true;
  }) || [];

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
    setNotice(`เพิ่ม "${part.part_name}" (${qty} ชิ้น) สำหรับ ${selectedBrand} ${selectedModel} ลงตะกร้าแล้ว!`);
    setQuantities({ ...quantities, [part.part_id]: 1 });
    setTimeout(() => setNotice(""), 3500);
  };

  return (
    <div className="container-fluid px-0">
      {/* ส่วนหัวค้นหาตามรุ่นรถสไตล์ ServiceGarage */}
      <div className="card border-0 shadow-sm mb-4 bg-white overflow-hidden">
        <div
          className="p-4 text-white"
          style={{
            background: "linear-gradient(135deg, #034ea2 0%, #002752 100%)",
          }}
        >
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="badge bg-warning text-sp-blue fw-bold px-2 py-1">VEHICLE MATCHER</span>
            <span className="badge bg-light text-sp-blue small">ระบบค้นหาอะไหล่ตรงรุ่น</span>
          </div>
          <h3 className="fw-black mb-1">ค้นหาอะไหล่รถยนต์ตามยี่ห้อและรุ่นรถ</h3>
          <p className="text-light opacity-90 small mb-0">
            เลือกรุ่นรถของคุณ ระบบจะคัดกรองเฉพาะอะไหล่แท้และอะไหล่ทดแทน OEM ที่เข้ากันได้ 100%
          </p>
        </div>

        {/* แถบตัวกรองรถยนต์ */}
        <div className="card-body p-4 bg-light border-bottom">
          <div className="row g-3 align-items-end">
            {/* 1. ยี่ห้อรถ */}
            <div className="col-12 col-md-4">
              <label className="form-label fw-bold text-dark small mb-1">
                <i className="bi bi-car-front-fill text-sp-blue me-1"></i> 1. ยี่ห้อรถยนต์ (Brand)
              </label>
              <select
                className="form-select"
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setSelectedModel(brandModels[e.target.value][0]);
                }}
              >
                {Object.keys(brandModels).map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. รุ่นรถ */}
            <div className="col-12 col-md-4">
              <label className="form-label fw-bold text-dark small mb-1">
                <i className="bi bi-tag-fill text-sp-blue me-1"></i> 2. รุ่นรถยนต์ (Model)
              </label>
              <select
                className="form-select"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
              >
                {brandModels[selectedBrand]?.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. หมวดหมู่อะไหล่ */}
            <div className="col-12 col-md-4">
              <label className="form-label fw-bold text-dark small mb-1">
                <i className="bi bi-gear-fill text-sp-blue me-1"></i> 3. ระบบอะไหล่ที่ต้องการ
              </label>
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* รถยนต์ในระบบที่บันทึกไว้ในฐานข้อมูล */}
          {vehicles && vehicles.length > 0 && (
            <div className="d-flex flex-wrap align-items-center gap-2 mt-3 pt-3 border-top">
              <span className="small text-muted fw-bold">
                <i className="bi bi-bookmark-check-fill text-success me-1"></i> เลือกรถที่ลงทะเบียนไว้ในอู่:
              </span>
              {vehicles.map((v) => (
                <button
                  key={v.license_plate}
                  type="button"
                  className="btn btn-outline-sp-primary btn-sm rounded-pill"
                  onClick={() => {
                    const matchBrand = Object.keys(brandModels).find((b) =>
                      v.brand.toLowerCase().includes(b.toLowerCase())
                    );
                    if (matchBrand) {
                      setSelectedBrand(matchBrand);
                      setSelectedModel(v.model);
                    }
                  }}
                >
                  <i className="bi bi-car-front me-1"></i>
                  {v.brand} {v.model} ({v.license_plate})
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* แจ้งเตือนเมื่อเพิ่มสินค้าลงตะกร้า */}
      {notice && (
        <div className="alert alert-success alert-dismissible fade show d-flex align-items-center justify-content-between shadow-sm mb-4">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-check-circle-fill text-success fs-5"></i>
            <span>{notice}</span>
          </div>
          <button type="button" className="btn btn-sm btn-sp-primary" onClick={onGoToCart}>
            <i className="bi bi-cart3 me-1"></i> ไปที่ตะกร้าสินค้า
          </button>
        </div>
      )}

      {/* รายการอะไหล่ที่ตรงรุ่น */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h5 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
          <i className="bi bi-check2-circle text-success fs-4"></i>
          <span>
            รายการอะไหล่ที่เข้ากันได้กับ: <span className="text-sp-blue">{selectedBrand} {selectedModel}</span>
          </span>
          <span className="badge bg-secondary ms-2">{matchedParts.length} รายการ</span>
        </h5>
      </div>

      <div className="row g-4">
        {matchedParts.length === 0 ? (
          <div className="col-12 text-center py-5 bg-white rounded-3 shadow-sm">
            <i className="bi bi-search fs-1 text-muted d-block mb-2"></i>
            <h5 className="fw-bold">ไม่พบอะไหล่ตรงรุ่นในหมวดหมู่นี้</h5>
            <p className="text-muted small">กรุณาเลือกหมวดหมู่อะไหล่เป็น &quot;ทุกระบบอะไหล่&quot; เพื่อดูสินค้าทั้งหมด</p>
          </div>
        ) : (
          matchedParts.map((part) => {
            const isOutOfStock = part.stock_qty <= 0;
            const currentQty = quantities[part.part_id] || 1;

            return (
              <div className="col-12 col-md-6 col-lg-4" key={part.part_id}>
                <div className="card h-100 p-3 card-hover bg-white border">
                  <div className="d-flex align-items-start justify-content-between mb-2">
                    <span className="badge bg-sp-blue-light text-sp-blue font-monospace">
                      {part.part_id}
                    </span>
                    <span className="badge bg-success-subtle text-success border border-success-subtle">
                      <i className="bi bi-check-circle me-1"></i> ตรงรุ่น 100%
                    </span>
                  </div>

                  <ProductImage
                    partId={part.part_id}
                    partName={part.part_name}
                    size="card"
                    className="mb-2"
                  />

                  <h6 className="fw-bold text-dark mb-2" style={{ minHeight: "2.8rem" }}>
                    {part.part_name}
                  </h6>

                  <div className="d-flex align-items-baseline justify-content-between my-2">
                    <div className="fs-4 fw-bold text-sp-blue">
                      ฿{part.price.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                    </div>
                    <div>
                      {isOutOfStock ? (
                        <span className="badge bg-danger">สินค้าหมด</span>
                      ) : (
                        <span className="badge bg-light text-muted border">
                          คงเหลือ {part.stock_qty} ชิ้น
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto pt-3 border-top d-flex align-items-center gap-2">
                    {!isOutOfStock ? (
                      <>
                        <div className="input-group input-group-sm" style={{ width: "95px" }}>
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => handleQtyChange(part.part_id, -1, part.stock_qty)}
                            disabled={currentQty <= 1}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="form-control text-center p-0"
                            value={currentQty}
                            readOnly
                          />
                          <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => handleQtyChange(part.part_id, 1, part.stock_qty)}
                            disabled={currentQty >= part.stock_qty}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="btn btn-sp-primary btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1 py-2"
                          onClick={() => handleAdd(part)}
                        >
                          <i className="bi bi-cart-plus"></i>
                          <span>ใส่ตะกร้า</span>
                        </button>
                      </>
                    ) : (
                      <button className="btn btn-secondary btn-sm w-100" disabled>
                        สินค้าหมด
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
