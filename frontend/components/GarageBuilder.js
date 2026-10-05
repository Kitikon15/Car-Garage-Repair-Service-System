"use client";

import { useState, useEffect } from "react";
import ProductImage from "./ProductImage";

export default function GarageBuilder({ vehicles, parts, onJobCreated, onAddToCart, apiUrl }) {
  // สล็อตการจัดสเปกบำรุงรักษาและซ่อมรถ (คล้ายจัดสเปกคอม iHaveCPU)
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles?.[0] || null);
  const [selectedOil, setSelectedOil] = useState(parts?.find((p) => p.part_id === "PART-002") || null);
  const [selectedFilter, setSelectedFilter] = useState(parts?.find((p) => p.part_id === "PART-003") || null);
  const [selectedBrake, setSelectedBrake] = useState(parts?.find((p) => p.part_id === "PART-001") || null);
  const [selectedBattery, setSelectedBattery] = useState(null);
  const [selectedSuspension, setSelectedSuspension] = useState(null);

  // Sync state when data loads from API
  useEffect(() => {
    if (!selectedVehicle && vehicles?.length > 0) {
      setSelectedVehicle(vehicles[0]);
    }
  }, [vehicles, selectedVehicle]);

  useEffect(() => {
    if (!selectedOil && parts?.length > 0) {
      setSelectedOil(parts.find((p) => p.part_id === "PART-002") || null);
    }
    if (!selectedFilter && parts?.length > 0) {
      setSelectedFilter(parts.find((p) => p.part_id === "PART-003") || null);
    }
    if (!selectedBrake && parts?.length > 0) {
      setSelectedBrake(parts.find((p) => p.part_id === "PART-001") || null);
    }
  }, [parts, selectedOil, selectedFilter, selectedBrake]);

  // ประเภทงานบริการ
  const [jobType, setJobType] = useState("MAINTENANCE"); // "MAINTENANCE" หรือ "REPAIR"
  const [packageName, setPackageName] = useState("PERIODIC_10K");
  const [severity, setSeverity] = useState("MODERATE");
  const [laborCost, setLaborCost] = useState(650.0);

  // สถานะเปิด Modal เลือกของในแต่ละสล็อต
  const [pickingSlot, setPickingSlot] = useState(null); // 'oil' | 'filter' | 'brake' | 'battery' | 'suspension' | 'vehicle'
  const [submitting, setSubmitting] = useState(false);
  const [buildNotice, setBuildNotice] = useState("");

  // รายการอะไหล่ทั้งหมดที่เลือกไว้ในสเปก
  const activeSelectedParts = [
    selectedOil,
    selectedFilter,
    selectedBrake,
    selectedBattery,
    selectedSuspension,
  ].filter(Boolean);

  const partsTotal = activeSelectedParts.reduce((sum, p) => sum + p.price, 0);

  // คำนวณราคาแบบ Polymorphic
  const calculateTotal = () => {
    const labor = parseFloat(laborCost) || 0;
    if (jobType === "REPAIR") {
      const surchargeMap = { MINOR: 300.0, MODERATE: 800.0, MAJOR: 1800.0, CRITICAL: 3500.0 };
      const fee = surchargeMap[severity] || 0;
      return {
        labor,
        partsTotal,
        modifierLabel: `ค่าความเสี่ยง/ความรุนแรง (${severity})`,
        modifierValue: fee,
        total: labor + partsTotal + fee,
      };
    } else {
      const discountMap = { BASIC_INSPECTION: 0.05, PERIODIC_10K: 0.10, COMPREHENSIVE_SERVICE: 0.15 };
      const rate = discountMap[packageName] || 0;
      const subtotal = labor + partsTotal;
      const discountAmount = subtotal * rate;
      return {
        labor,
        partsTotal,
        modifierLabel: `ส่วนลดแพ็กเกจบำรุงรักษา (${(rate * 100).toFixed(0)}%)`,
        modifierValue: -discountAmount,
        total: subtotal - discountAmount,
      };
    }
  };

  const costBreakdown = calculateTotal();

  // เพิ่มทุกชิ้นในสเปกลงตะกร้า
  const handleAddAllToCart = () => {
    if (activeSelectedParts.length === 0) {
      alert("กรุณาเลือกอะไหล่ในสเปกอย่างน้อย 1 รายการ");
      return;
    }
    activeSelectedParts.forEach((part) => onAddToCart(part, 1));
    setBuildNotice(`เพิ่มอะไหล่ทั้ง ${activeSelectedParts.length} รายการลงในตะกร้าเรียบร้อยแล้ว!`);
    setTimeout(() => setBuildNotice(""), 3500);
  };

  // ยืนยันเปิดใบสั่งซ่อมจริงจากสเปกนี้
  const handleCreateJobFromSpec = async () => {
    if (!selectedVehicle) {
      alert("กรุณาเลือกรถยนต์เป้าหมายในสล็อตที่ 1");
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        license_plate: selectedVehicle.license_plate,
        labor_cost: parseFloat(laborCost) || 0,
        description: `ชุดจัดสเปกซ่อมบำรุง (${jobType === "REPAIR" ? "งานซ่อมทั่วไป" : "แพ็กเกจเช็กระยะ"}) อะไหล่ ${activeSelectedParts.length} รายการ`,
        parts: activeSelectedParts.map((p) => ({ part_id: p.part_id, quantity: 1 })),
        auto_generate_invoice: true,
      };

      let endpoint = `${apiUrl}/api/jobs/maintenance`;
      if (jobType === "REPAIR") {
        endpoint = `${apiUrl}/api/jobs/repair`;
        payload.severity = severity;
      } else {
        payload.package_name = packageName;
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "ไม่สามารถสร้างใบสั่งซ่อมได้");
      }

      const result = await res.json();
      if (onJobCreated) onJobCreated(result);
    } catch (err) {
      alert(`การเปิดใบสั่งซ่อมผิดพลาด: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  // ดึงรายการตัวเลือกสำหรับแต่ละสล็อต
  const getSlotCandidates = () => {
    if (pickingSlot === "oil") {
      return parts.filter((p) => p.part_name.includes("น้ำมันเครื่อง") || p.part_name.includes("หล่อเย็น"));
    }
    if (pickingSlot === "filter") {
      return parts.filter((p) => p.part_name.includes("กรอง") || p.part_name.includes("Filter"));
    }
    if (pickingSlot === "brake") {
      return parts.filter((p) => p.part_name.includes("เบรก"));
    }
    if (pickingSlot === "battery") {
      return parts.filter((p) => p.part_name.includes("แบตเตอรี่") || p.part_name.includes("หัวเทียน"));
    }
    if (pickingSlot === "suspension") {
      return parts.filter((p) => p.part_name.includes("โช้ค") || p.part_name.includes("สายพาน"));
    }
    return parts;
  };

  const handleSelectPartForSlot = (part) => {
    if (pickingSlot === "oil") setSelectedOil(part);
    if (pickingSlot === "filter") setSelectedFilter(part);
    if (pickingSlot === "brake") setSelectedBrake(part);
    if (pickingSlot === "battery") setSelectedBattery(part);
    if (pickingSlot === "suspension") setSelectedSuspension(part);
    setPickingSlot(null);
  };

  return (
    <div className="container-fluid px-0">
      {/* ส่วนหัวหน้าจัดสเปกสไตล์ ServiceGarage */}
      <div className="card border-0 shadow-sm mb-4 bg-white">
        <div className="card-body p-4">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <span className="badge bg-warning text-sp-blue fw-bold px-2 py-1 small">
                  <i className="bi bi-calculator-fill me-1"></i> ฟังชั่นประเมินราคา
                </span>
                <span className="badge bg-sp-blue px-2 py-1 small">ระบบคำนวณราคาอัตโนมัติ</span>
              </div>
              <h3 className="fw-bold mb-1 text-dark">
                ระบบประเมินราคาค่าซ่อมและอะไหล่ (Repair Cost Estimator)
              </h3>
              <p className="text-muted small mb-0">
                เลือกจัดชุดอะไหล่แท้และแพ็กเกจบริการตามรุ่นรถ พร้อมคำนวณราคาสุทธิ ส่วนลด และค่าแรงมาตรฐานแบบเรียลไทม์
              </p>
            </div>

            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => {
                  setSelectedOil(null);
                  setSelectedFilter(null);
                  setSelectedBrake(null);
                  setSelectedBattery(null);
                  setSelectedSuspension(null);
                }}
              >
                <i className="bi bi-arrow-counterclockwise me-1"></i> ล้างสเปกทั้งหมด
              </button>
            </div>
          </div>
        </div>
      </div>

      {buildNotice && (
        <div className="alert alert-success alert-dismissible fade show d-flex align-items-center gap-2 shadow-sm mb-4">
          <i className="bi bi-check-circle-fill fs-5 text-success"></i>
          <div>{buildNotice}</div>
          <button type="button" className="btn-close" onClick={() => setBuildNotice("")}></button>
        </div>
      )}

      {/* Main Grid: สล็อตเลือกอุปกรณ์ (ซ้าย) & สรุปสเปก (ขวา) */}
      <div className="row g-4">
        {/* คอลัมน์ซ้าย: สล็อตเลือกอุปกรณ์ชิ้นส่วน */}
        <div className="col-12 col-lg-8">
          <div className="d-flex flex-column gap-3">

            {/* SLOT 1: รถยนต์เป้าหมาย */}
            <div className="card p-3 builder-slot active-selected">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <div className="stat-icon bg-primary-subtle text-primary">
                    <i className="bi bi-car-front-fill"></i>
                  </div>
                  <div>
                    <div className="text-muted small fw-bold text-uppercase">1. ยานพาหนะเข้ารับบริการ</div>
                    {selectedVehicle ? (
                      <div>
                        <span className="fw-bold fs-6 text-dark me-2">
                          ทะเบียน {selectedVehicle.license_plate}
                        </span>
                        <span className="text-muted small">
                          ({selectedVehicle.brand} {selectedVehicle.model}) • เจ้าของ: {selectedVehicle.owner?.name}
                        </span>
                      </div>
                    ) : (
                      <span className="text-danger small">ยังไม่ได้เลือกรถยนต์</span>
                    )}
                  </div>
                </div>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setPickingSlot("vehicle")}
                >
                  <i className="bi bi-arrow-repeat me-1"></i> เลือกรถคันอื่น
                </button>
              </div>
            </div>

            {/* SLOT 2: น้ำมันเครื่อง & สารหล่อลื่น */}
            <div className={`card p-3 builder-slot ${selectedOil ? "active-selected" : ""}`}>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  {selectedOil ? (
                    <ProductImage partId={selectedOil.part_id} partName={selectedOil.part_name} size="sm" />
                  ) : (
                    <div className="stat-icon bg-warning-subtle text-warning">
                      <i className="bi bi-droplet-half"></i>
                    </div>
                  )}
                  <div>
                    <div className="text-muted small fw-bold text-uppercase">2. น้ำมันเครื่อง &amp; ของเหลว (Fluids)</div>
                    {selectedOil ? (
                      <div>
                        <div className="fw-bold text-dark">{selectedOil.part_name}</div>
                        <div className="text-sp-blue fw-bold">฿{selectedOil.price.toLocaleString("th-TH", { minimumFractionDigits: 2 })}</div>
                      </div>
                    ) : (
                      <span className="text-muted small">ยังไม่ได้เลือกน้ำมันเครื่อง</span>
                    )}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-1">
                  {selectedOil && (
                    <button
                      className="btn btn-sm btn-link text-danger p-0 me-2"
                      onClick={() => setSelectedOil(null)}
                      title="ลบรายการนี้"
                    >
                      <i className="bi bi-x-circle fs-5"></i>
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-outline-sp-primary"
                    onClick={() => setPickingSlot("oil")}
                  >
                    {selectedOil ? "เปลี่ยน" : "+ เลือกชิ้นนี้"}
                  </button>
                </div>
              </div>
            </div>

            {/* SLOT 3: ไส้กรองน้ำมันเครื่อง & กรองแอร์ */}
            <div className={`card p-3 builder-slot ${selectedFilter ? "active-selected" : ""}`}>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  {selectedFilter ? (
                    <ProductImage partId={selectedFilter.part_id} partName={selectedFilter.part_name} size="sm" />
                  ) : (
                    <div className="stat-icon bg-info-subtle text-info">
                      <i className="bi bi-funnel-fill"></i>
                    </div>
                  )}
                  <div>
                    <div className="text-muted small fw-bold text-uppercase">3. ไส้กรองเครื่อง &amp; กรองแอร์ (Filters)</div>
                    {selectedFilter ? (
                      <div>
                        <div className="fw-bold text-dark">{selectedFilter.part_name}</div>
                        <div className="text-sp-blue fw-bold">฿{selectedFilter.price.toLocaleString("th-TH", { minimumFractionDigits: 2 })}</div>
                      </div>
                    ) : (
                      <span className="text-muted small">ยังไม่ได้เลือกไส้กรอง</span>
                    )}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-1">
                  {selectedFilter && (
                    <button
                      className="btn btn-sm btn-link text-danger p-0 me-2"
                      onClick={() => setSelectedFilter(null)}
                    >
                      <i className="bi bi-x-circle fs-5"></i>
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-outline-sp-primary"
                    onClick={() => setPickingSlot("filter")}
                  >
                    {selectedFilter ? "เปลี่ยน" : "+ เลือกชิ้นนี้"}
                  </button>
                </div>
              </div>
            </div>

            {/* SLOT 4: ระบบเบรกและจานเบรก */}
            <div className={`card p-3 builder-slot ${selectedBrake ? "active-selected" : ""}`}>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  {selectedBrake ? (
                    <ProductImage partId={selectedBrake.part_id} partName={selectedBrake.part_name} size="sm" />
                  ) : (
                    <div className="stat-icon bg-danger-subtle text-danger">
                      <i className="bi bi-disc-fill"></i>
                    </div>
                  )}
                  <div>
                    <div className="text-muted small fw-bold text-uppercase">4. ระบบเบรก &amp; จานเบรก (Braking System)</div>
                    {selectedBrake ? (
                      <div>
                        <div className="fw-bold text-dark">{selectedBrake.part_name}</div>
                        <div className="text-sp-blue fw-bold">฿{selectedBrake.price.toLocaleString("th-TH", { minimumFractionDigits: 2 })}</div>
                      </div>
                    ) : (
                      <span className="text-muted small">ยังไม่ได้เลือกระบบเบรก</span>
                    )}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-1">
                  {selectedBrake && (
                    <button
                      className="btn btn-sm btn-link text-danger p-0 me-2"
                      onClick={() => setSelectedBrake(null)}
                    >
                      <i className="bi bi-x-circle fs-5"></i>
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-outline-sp-primary"
                    onClick={() => setPickingSlot("brake")}
                  >
                    {selectedBrake ? "เปลี่ยน" : "+ เลือกชิ้นนี้"}
                  </button>
                </div>
              </div>
            </div>

            {/* SLOT 5: แบตเตอรี่และระบบไฟ */}
            <div className={`card p-3 builder-slot ${selectedBattery ? "active-selected" : ""}`}>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  {selectedBattery ? (
                    <ProductImage partId={selectedBattery.part_id} partName={selectedBattery.part_name} size="sm" />
                  ) : (
                    <div className="stat-icon bg-primary-subtle text-primary">
                      <i className="bi bi-lightning-charge-fill"></i>
                    </div>
                  )}
                  <div>
                    <div className="text-muted small fw-bold text-uppercase">5. แบตเตอรี่ &amp; หัวเทียน (Battery &amp; Electrical)</div>
                    {selectedBattery ? (
                      <div>
                        <div className="fw-bold text-dark">{selectedBattery.part_name}</div>
                        <div className="text-sp-blue fw-bold">฿{selectedBattery.price.toLocaleString("th-TH", { minimumFractionDigits: 2 })}</div>
                      </div>
                    ) : (
                      <span className="text-muted small">ยังไม่ได้เลือกระบบไฟ/แบตเตอรี่</span>
                    )}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-1">
                  {selectedBattery && (
                    <button
                      className="btn btn-sm btn-link text-danger p-0 me-2"
                      onClick={() => setSelectedBattery(null)}
                    >
                      <i className="bi bi-x-circle fs-5"></i>
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-outline-sp-primary"
                    onClick={() => setPickingSlot("battery")}
                  >
                    {selectedBattery ? "เปลี่ยน" : "+ เลือกชิ้นนี้"}
                  </button>
                </div>
              </div>
            </div>

            {/* SLOT 6: ระบบช่วงล่าง & สายพาน */}
            <div className={`card p-3 builder-slot ${selectedSuspension ? "active-selected" : ""}`}>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  {selectedSuspension ? (
                    <ProductImage partId={selectedSuspension.part_id} partName={selectedSuspension.part_name} size="sm" />
                  ) : (
                    <div className="stat-icon bg-secondary-subtle text-secondary">
                      <i className="bi bi-tools"></i>
                    </div>
                  )}
                  <div>
                    <div className="text-muted small fw-bold text-uppercase">6. ช่วงล่าง &amp; สายพานหน้าเครื่อง (Suspension &amp; Belts)</div>
                    {selectedSuspension ? (
                      <div>
                        <div className="fw-bold text-dark">{selectedSuspension.part_name}</div>
                        <div className="text-sp-blue fw-bold">฿{selectedSuspension.price.toLocaleString("th-TH", { minimumFractionDigits: 2 })}</div>
                      </div>
                    ) : (
                      <span className="text-muted small">ยังไม่ได้เลือกช่วงล่าง/สายพาน</span>
                    )}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-1">
                  {selectedSuspension && (
                    <button
                      className="btn btn-sm btn-link text-danger p-0 me-2"
                      onClick={() => setSelectedSuspension(null)}
                    >
                      <i className="bi bi-x-circle fs-5"></i>
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-outline-sp-primary"
                    onClick={() => setPickingSlot("suspension")}
                  >
                    {selectedSuspension ? "เปลี่ยน" : "+ เลือกชิ้นนี้"}
                  </button>
                </div>
              </div>
            </div>

            {/* SLOT 7: รูปแบบบริการและค่าแรงช่าง */}
            <div className="card p-4 builder-slot active-selected bg-light">
              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="bi bi-wrench-adjustable-circle text-sp-blue fs-4"></i>
                <h6 className="fw-bold mb-0 text-dark">7. รูปแบบบริการและค่าแรงช่างมาตรฐาน</h6>
              </div>

              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label small fw-semibold">เลือกรูปแบบงาน</label>
                  <select
                    className="form-select form-select-sm"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                  >
                    <option value="MAINTENANCE">งานบำรุงรักษาตามระยะ (รับส่วนลดแพ็กเกจ)</option>
                    <option value="REPAIR">งานซ่อมแก้ปัญหาเฉพาะจุด (มีค่าความเสี่ยง)</option>
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  {jobType === "MAINTENANCE" ? (
                    <div>
                      <label className="form-label small fw-semibold text-success">แพ็กเกจเช็กระยะ</label>
                      <select
                        className="form-select form-select-sm"
                        value={packageName}
                        onChange={(e) => setPackageName(e.target.value)}
                      >
                        <option value="BASIC_INSPECTION">ตรวจเช็กทั่วไป (ลด 5% ทั้งบิล)</option>
                        <option value="PERIODIC_10K">เช็กระยะ 10,000 กม. (ลด 10% ทั้งบิล)</option>
                        <option value="COMPREHENSIVE_SERVICE">เช็กระยะใหญ่รอบด้าน (ลด 15% ทั้งบิล)</option>
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="form-label small fw-semibold text-danger">ระดับความรุนแรงของปัญหา</label>
                      <select
                        className="form-select form-select-sm"
                        value={severity}
                        onChange={(e) => setSeverity(e.target.value)}
                      >
                        <option value="MINOR">ซ่อมเล็กน้อย (+฿300.00)</option>
                        <option value="MODERATE">ซ่อมระดับกลาง (+฿800.00)</option>
                        <option value="MAJOR">ยกเครื่อง / ระบบหลัก (+฿1,800.00)</option>
                        <option value="CRITICAL">เสียหายวิกฤต (+฿3,500.00)</option>
                      </select>
                    </div>
                  )}
                </div>

                <div className="col-12">
                  <div className="d-flex align-items-center justify-content-between pt-2 border-top">
                    <span className="small text-muted">ค่าแรงช่างเทคนิคมาตรฐาน:</span>
                    <div className="d-flex align-items-center gap-1">
                      <span className="fw-semibold">฿</span>
                      <input
                        type="number"
                        className="form-control form-control-sm text-end"
                        style={{ width: "100px" }}
                        step="50"
                        min="0"
                        value={laborCost}
                        onChange={(e) => setLaborCost(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* คอลัมน์ขวา: กล่องสรุปสเปกชุดซ่อมสไตล์ ServiceGarage (Sticky Spec Summary) */}
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm p-4 builder-summary-card">
            <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
              <div>
                <h5 className="fw-bold mb-0 text-dark">สรุปสเปกชุดซ่อม</h5>
                <small className="text-muted">ใบสรุปรายการประเมินราคา</small>
              </div>
              <span className="badge bg-sp-blue px-2 py-1">
                {activeSelectedParts.length} อะไหล่
              </span>
            </div>

            {/* รายการอะไหล่ในสเปก */}
            <div className="mb-3">
              <h6 className="text-muted small fw-bold text-uppercase mb-2">รายการอะไหล่ที่เลือกไว้:</h6>
              {activeSelectedParts.length === 0 ? (
                <div className="text-center py-3 text-muted small bg-light rounded">
                  ยังไม่ได้เลือกอะไหล่ในสล็อต
                </div>
              ) : (
                <ul className="list-group list-group-flush small">
                  {activeSelectedParts.map((item) => (
                    <li key={item.part_id} className="list-group-item d-flex justify-content-between px-0 py-2">
                      <span className="text-truncate me-2" style={{ maxWidth: "180px" }}>
                        {item.part_name}
                      </span>
                      <span className="fw-bold text-dark">
                        ฿{item.price.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* รายละเอียดการเงิน */}
            <div className="bg-light p-3 rounded mb-3">
              <div className="d-flex justify-content-between small text-muted mb-1">
                <span>ค่าอะไหล่รวม:</span>
                <span>฿{costBreakdown.partsTotal.toLocaleString("th-TH", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="d-flex justify-content-between small text-muted mb-1">
                <span>ค่าแรงช่าง:</span>
                <span>฿{costBreakdown.labor.toLocaleString("th-TH", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="d-flex justify-content-between small fw-medium mb-1">
                <span className={jobType === "REPAIR" ? "text-danger" : "text-success"}>
                  {costBreakdown.modifierLabel}:
                </span>
                <span className={jobType === "REPAIR" ? "text-danger" : "text-success"}>
                  {costBreakdown.modifierValue >= 0 ? `+฿${costBreakdown.modifierValue.toFixed(2)}` : `-฿${Math.abs(costBreakdown.modifierValue).toFixed(2)}`}
                </span>
              </div>
              <hr className="my-2" />
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold text-dark">ราคารวมสุทธิ:</span>
                <span className="fs-3 fw-bold text-sp-blue">
                  ฿{costBreakdown.total.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* ปุ่มคำสั่งการหลัก 3 ปุ่ม สไตล์ ServiceGarage */}
            <div className="d-flex flex-column gap-2">
              <button
                className="btn btn-sp-primary py-2 d-flex align-items-center justify-content-center gap-2"
                onClick={handleCreateJobFromSpec}
                disabled={submitting}
              >
                <i className="bi bi-file-earmark-check-fill fs-5"></i>
                <span>เปิดใบสั่งซ่อมจากสเปกนี้</span>
              </button>

              <button
                className="btn btn-outline-warning py-2 d-flex align-items-center justify-content-center gap-2 text-dark fw-bold"
                onClick={handleAddAllToCart}
              >
                <i className="bi bi-cart-plus-fill fs-5 text-warning"></i>
                <span>ใส่ตะกร้าทั้งหมด ({activeSelectedParts.length} ชิ้น)</span>
              </button>

              <button
                className="btn btn-outline-secondary btn-sm py-2 d-flex align-items-center justify-content-center gap-2"
                onClick={() => window.print()}
              >
                <i className="bi bi-printer"></i>
                <span>พิมพ์ใบเสนอราคาสเปกนี้</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal สำหรับคลิกเลือกชิ้นส่วนในแต่ละสล็อต */}
      {pickingSlot && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1060 }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title fw-bold">
                  {pickingSlot === "vehicle" ? "เลือกรถยนต์เป้าหมาย" : "เลือกอะไหล่ใส่ในสล็อต"}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setPickingSlot(null)}></button>
              </div>

              <div className="modal-body p-3">
                {pickingSlot === "vehicle" ? (
                  <div className="list-group">
                    {vehicles.map((v) => (
                      <button
                        key={v.license_plate}
                        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-3"
                        onClick={() => {
                          setSelectedVehicle(v);
                          setPickingSlot(null);
                        }}
                      >
                        <div>
                          <h6 className="fw-bold mb-1">ทะเบียน {v.license_plate}</h6>
                          <small className="text-muted">{v.brand} {v.model} • เจ้าของ: {v.owner?.name}</small>
                        </div>
                        <span className="btn btn-sm btn-primary">เลือกรถคันนี้</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>รหัส SKU</th>
                          <th>รายการอะไหล่</th>
                          <th className="text-end">ราคา</th>
                          <th className="text-center">คงเหลือ</th>
                          <th className="text-end pe-3">เลือก</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getSlotCandidates().map((part) => (
                          <tr key={part.part_id}>
                            <td className="font-monospace small text-primary fw-bold">
                              <div className="d-flex align-items-center gap-2">
                                <ProductImage partId={part.part_id} partName={part.part_name} size="sm" style={{ width: "36px", height: "36px" }} />
                                <span>{part.part_id}</span>
                              </div>
                            </td>
                            <td className="fw-medium">{part.part_name}</td>
                            <td className="text-end fw-bold text-sp-blue">
                              ฿{part.price.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                            </td>
                            <td className="text-center">
                              <span className={`badge ${part.stock_qty <= 5 ? "bg-warning text-dark" : "bg-success"}`}>
                                {part.stock_qty} ชิ้น
                              </span>
                            </td>
                            <td className="text-end pe-3">
                              <button
                                className="btn btn-sm btn-sp-primary"
                                onClick={() => handleSelectPartForSlot(part)}
                                disabled={part.stock_qty <= 0}
                              >
                                เลือกชิ้นนี้
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
