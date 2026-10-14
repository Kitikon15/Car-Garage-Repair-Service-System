"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function CreateServiceJob({ vehicles, parts, onJobCreated, apiUrl }) {
  const { lang } = useLanguage ? useLanguage() : { lang: "th" };
  const isTh = lang !== "en";

  const [jobType, setJobType] = useState("REPAIR"); // "REPAIR" หรือ "MAINTENANCE"
  const [selectedPlate, setSelectedPlate] = useState("");
  const [description, setDescription] = useState("");
  const [laborCost, setLaborCost] = useState(650.0);
  
  // เฉพาะงานซ่อม (RepairJob)
  const [severity, setSeverity] = useState("MODERATE");
  
  // เฉพาะงานบำรุงรักษา (MaintenanceJob)
  const [packageName, setPackageName] = useState("PERIODIC_10K");
  
  // รายการอะไหล่ที่ใช้ (Composition)
  const [selectedParts, setSelectedParts] = useState([]); // [{ part_id, quantity }]
  const [partToAdd, setPartToAdd] = useState("");
  const [partQtyToAdd, setPartQtyToAdd] = useState(1);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ฟังก์ชันเพิ่มอะไหล่ลงในร่างใบงาน
  const handleAddPartToDraft = () => {
    if (!partToAdd) return;
    const partObj = parts.find((p) => p.part_id === partToAdd);
    if (!partObj) return;

    if (partQtyToAdd > partObj.stock_qty) {
      alert(isTh
        ? `จำนวนที่ขอเบิก (${partQtyToAdd} ชิ้น) เกินกว่าสต็อกที่มีอยู่ (${partObj.stock_qty} ชิ้น)!`
        : `Requested quantity (${partQtyToAdd} pcs) exceeds current stock (${partObj.stock_qty} pcs)!`);
      return;
    }

    const existingIdx = selectedParts.findIndex((item) => item.part_id === partToAdd);
    if (existingIdx >= 0) {
      const updated = [...selectedParts];
      updated[existingIdx].quantity += parseInt(partQtyToAdd, 10);
      setSelectedParts(updated);
    } else {
      setSelectedParts([
        ...selectedParts,
        { part_id: partToAdd, name: partObj.part_name, price: partObj.price, quantity: parseInt(partQtyToAdd, 10) },
      ]);
    }
    setPartToAdd("");
    setPartQtyToAdd(1);
  };

  const handleRemovePartFromDraft = (partId) => {
    setSelectedParts(selectedParts.filter((item) => item.part_id !== partId));
  };

  // จำลองคำนวณราคาแบบ Polymorphic บนฝั่ง Client
  const calculatePreviewCost = () => {
    const partsTotal = selectedParts.reduce((acc, p) => acc + p.price * p.quantity, 0);
    const labor = parseFloat(laborCost) || 0;

    if (jobType === "REPAIR") {
      const surchargeMap = { MINOR: 300.0, MODERATE: 800.0, MAJOR: 1800.0, CRITICAL: 3500.0 };
      const fee = surchargeMap[severity] || 0;
      const severityNames = isTh ? {
        MINOR: "เล็กน้อย",
        MODERATE: "ปานกลาง",
        MAJOR: "ระบบหลัก/เครื่องยนต์",
        CRITICAL: "วิกฤต/เสียหายหนัก",
      } : {
        MINOR: "Minor",
        MODERATE: "Moderate",
        MAJOR: "Major Overhaul",
        CRITICAL: "Critical",
      };
      return {
        partsTotal,
        labor,
        modifierLabel: isTh ? `ค่าความเสี่ยง/ความรุนแรง (${severityNames[severity] || severity})` : `Severity Fee (${severityNames[severity] || severity})`,
        modifierValue: fee,
        total: labor + partsTotal + fee,
      };
    } else {
      const discountMap = { BASIC_INSPECTION: 0.05, PERIODIC_10K: 0.10, COMPREHENSIVE_SERVICE: 0.15 };
      const rate = discountMap[packageName] || 0;
      const subtotal = labor + partsTotal;
      const discountAmount = subtotal * rate;
      return {
        partsTotal,
        labor,
        modifierLabel: isTh ? `ส่วนลดแพ็กเกจ (${(rate * 100).toFixed(0)}%)` : `Package Discount (${(rate * 100).toFixed(0)}%)`,
        modifierValue: -discountAmount,
        total: subtotal - discountAmount,
      };
    }
  };

  const preview = calculatePreviewCost();

  // ส่งข้อมูลไปยัง Backend FastAPI
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlate) {
      setErrorMsg(isTh ? "กรุณาเลือกรถที่ต้องการรับบริการ" : "Please select a vehicle for service");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");

      const payload = {
        license_plate: selectedPlate,
        labor_cost: parseFloat(laborCost) || 0,
        description: description || (jobType === "REPAIR" 
          ? (isTh ? "งานซ่อมทั่วไปและแก้ไขปัญหาเครื่องยนต์" : "General repair and engine troubleshooting") 
          : (isTh ? "งานตรวจเช็กสภาพและบำรุงรักษาตามระยะ" : "Periodic vehicle maintenance and inspection")),
        parts: selectedParts.map((p) => ({ part_id: p.part_id, quantity: p.quantity })),
        auto_generate_invoice: true,
      };

      let endpoint = `${apiUrl}/api/jobs/repair`;
      if (jobType === "REPAIR") {
        payload.severity = severity;
      } else {
        endpoint = `${apiUrl}/api/jobs/maintenance`;
        payload.package_name = packageName;
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || (isTh ? "ไม่สามารถสร้างใบสั่งซ่อมได้" : "Failed to create service job"));
      }

      const data = await res.json();
      
      // ล้างฟอร์ม
      setSelectedParts([]);
      setDescription("");
      if (onJobCreated) {
        onJobCreated(data);
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card h-100">
      <div className="card-header bg-white py-3 border-bottom">
        <h5 className="card-title mb-0 fw-bold d-flex align-items-center gap-2">
          <i className="bi bi-tools text-primary"></i>
          <span>{isTh ? "สร้างใบสั่งซ่อม / ใบงานบริการใหม่" : "Create Service & Repair Job"}</span>
        </h5>
        <small className="text-muted">
          {isTh
            ? "ระบบคำนวณราคาประเมิน ค่าบริการ และค่าแรงอัตโนมัติตามประเภทงาน"
            : "Automated job estimate, labor pricing, and parts requisition system"}
        </small>
      </div>

      <div className="card-body p-4">
        {errorMsg && (
          <div className="alert alert-danger py-2 small d-flex align-items-center gap-2">
            <i className="bi bi-exclamation-triangle-fill"></i>
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* ตัวเลือกประเภทงาน */}
          <div className="mb-3">
            <label className="form-label small fw-semibold text-uppercase text-muted">
              {isTh ? "เลือกประเภทงานบริการ" : "Select Service Type"}
            </label>
            <div className="row g-2">
              <div className="col-6">
                <input
                  type="radio"
                  className="btn-check"
                  name="jobTypeRadio"
                  id="radioRepair"
                  autoComplete="off"
                  checked={jobType === "REPAIR"}
                  onChange={() => setJobType("REPAIR")}
                />
                <label className="btn btn-outline-primary w-100 py-2 d-flex flex-column align-items-center" htmlFor="radioRepair">
                  <span className="fw-bold"><i className="bi bi-wrench me-1"></i> {isTh ? "งานซ่อมบำรุงทั่วไป (Repair Job)" : "General Repair Job"}</span>
                  <small className="text-muted" style={{ fontSize: "0.75rem" }}>{isTh ? "คิดตามระดับความเสียหาย" : "Calculated by severity fee"}</small>
                </label>
              </div>

              <div className="col-6">
                <input
                  type="radio"
                  className="btn-check"
                  name="jobTypeRadio"
                  id="radioMaintenance"
                  autoComplete="off"
                  checked={jobType === "MAINTENANCE"}
                  onChange={() => setJobType("MAINTENANCE")}
                />
                <label className="btn btn-outline-success w-100 py-2 d-flex flex-column align-items-center" htmlFor="radioMaintenance">
                  <span className="fw-bold"><i className="bi bi-shield-check me-1"></i> {isTh ? "เช็กระยะตามรอบ (Maintenance Job)" : "Scheduled Maintenance"}</span>
                  <small className="text-muted" style={{ fontSize: "0.75rem" }}>{isTh ? "แพ็กเกจส่วนลดตามระยะทาง" : "Mileage package discount"}</small>
                </label>
              </div>
            </div>
          </div>

          {/* เลือกรถยนต์ */}
          <div className="mb-3">
            <label className="form-label small fw-semibold">{isTh ? "เลือกรถยนต์เข้ารับบริการ (ข้อมูลเจ้าของรถ)" : "Select Vehicle (Owner Details)"}</label>
            <select
              className="form-select"
              required
              value={selectedPlate}
              onChange={(e) => setSelectedPlate(e.target.value)}
            >
              <option value="">{isTh ? "-- เลือกรถยนต์ที่ลงทะเบียนแล้ว --" : "-- Select Registered Vehicle --"}</option>
              {vehicles?.map((v) => (
                <option key={v.license_plate} value={v.license_plate}>
                  {isTh
                    ? `ทะเบียน: ${v.license_plate} — ${v.brand} ${v.model} (เจ้าของ: ${v.owner?.name})`
                    : `Plate: ${v.license_plate} — ${v.brand} ${v.model} (Owner: ${v.owner?.name})`}
                </option>
              ))}
            </select>
          </div>

          {/* ฟิลด์เฉพาะตามประเภทงานบริการ */}
          {jobType === "REPAIR" ? (
            <div className="mb-3 p-3 bg-primary-subtle rounded border border-primary-subtle">
              <label className="form-label small fw-semibold text-sp-blue">
                <i className="bi bi-shield-exclamation me-1"></i> {isTh ? "ระดับความรุนแรงของงานซ่อม (Severity Fee)" : "Repair Severity Level (Severity Fee)"}
              </label>
              <select
                className="form-select"
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
              >
                <option value="MINOR">{isTh ? "ซ่อมเล็กน้อย (Minor) +฿300.00" : "Minor Repair +฿300.00"}</option>
                <option value="MODERATE">{isTh ? "ซ่อมระดับปานกลาง (Moderate) +฿800.00" : "Moderate Repair +฿800.00"}</option>
                <option value="MAJOR">{isTh ? "ยกเครื่อง / ระบบหลัก (Major Overhaul) +฿1,800.00" : "Major Overhaul +฿1,800.00"}</option>
                <option value="CRITICAL">{isTh ? "เสียหายหนัก / ปัญหาวิกฤต (Critical) +฿3,500.00" : "Critical Damage +฿3,500.00"}</option>
              </select>
            </div>
          ) : (
            <div className="mb-3 p-3 bg-success-subtle rounded border border-success-subtle">
              <label className="form-label small fw-semibold text-success">
                <i className="bi bi-patch-check me-1"></i> {isTh ? "แพ็กเกจการบำรุงรักษา (Package Discount)" : "Maintenance Service Package (Package Discount)"}
              </label>
              <select
                className="form-select"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
              >
                <option value="BASIC_INSPECTION">{isTh ? "ตรวจเช็กความปลอดภัยเบื้องต้น (ลด 5% รวม)" : "Basic Safety Inspection (5% discount)"}</option>
                <option value="PERIODIC_10K">{isTh ? "บำรุงรักษาตามระยะ 10,000 กม. (ลด 10% รวม)" : "Periodic 10,000 km Service (10% discount)"}</option>
                <option value="COMPREHENSIVE_SERVICE">{isTh ? "เช็กระยะใหญ่แบบครอบคลุม (ลด 15% รวม)" : "Comprehensive Major Service (15% discount)"}</option>
              </select>
            </div>
          )}

          {/* คำอธิบายและค่าแรง */}
          <div className="row g-2 mb-3">
            <div className="col-8">
              <label className="form-label small fw-semibold">{isTh ? "รายละเอียดงานซ่อม / บริการ" : "Job Description / Fault Details"}</label>
              <input
                type="text"
                className="form-control"
                placeholder={isTh ? "เช่น เปลี่ยนผ้าเบรกหน้าและตรวจเช็กจานเบรก" : "e.g. Brake pad replacement and disc rotor check"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="col-4">
              <label className="form-label small fw-semibold">{isTh ? "ค่าแรงช่าง (฿)" : "Technician Labor (฿)"}</label>
              <input
                type="number"
                step="5.00"
                min="0"
                className="form-control"
                required
                value={laborCost}
                onChange={(e) => setLaborCost(e.target.value)}
              />
            </div>
          </div>

          {/* การเลือกอะไหล่ใช้งาน */}
          <div className="mb-3">
            <label className="form-label small fw-semibold d-flex justify-content-between">
              <span>{isTh ? "รายการอะไหล่ที่ต้องใช้ในงานนี้" : "Required Replacement Parts"}</span>
              <span className="text-muted small">{isTh ? "ระบบจะตัดสต็อกอัตโนมัติ" : "Auto-deducted from warehouse stock"}</span>
            </label>
            <div className="input-group mb-2">
              <select
                className="form-select"
                value={partToAdd}
                onChange={(e) => setPartToAdd(e.target.value)}
              >
                <option value="">{isTh ? "-- เลือกเบิกอะไหล่จากคลัง --" : "-- Select Part from Inventory --"}</option>
                {parts?.map((p) => (
                  <option key={p.part_id} value={p.part_id} disabled={p.stock_qty <= 0}>
                    {isTh
                      ? `${p.part_name} (฿${p.price.toFixed(2)}) — สต็อกคงเหลือ: ${p.stock_qty}`
                      : `${p.part_name} (฿${p.price.toFixed(2)}) — In stock: ${p.stock_qty}`}
                  </option>
                ))}
              </select>
              <input
                type="number"
                className="form-control"
                style={{ maxWidth: "80px" }}
                min="1"
                value={partQtyToAdd}
                onChange={(e) => setPartQtyToAdd(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-garage-unique btn-sm px-3"
                onClick={handleAddPartToDraft}
                disabled={!partToAdd}
              >
                <i className="bi bi-cart-plus me-1"></i> {isTh ? "เพิ่ม" : "Add"}
              </button>
            </div>

            {/* รายการอะไหล่ที่เลือกไว้ */}
            {selectedParts.length > 0 && (
              <ul className="list-group list-group-flush border rounded mb-2">
                {selectedParts.map((item) => (
                  <li
                    key={item.part_id}
                    className="list-group-item d-flex align-items-center justify-content-between py-2 small"
                  >
                    <div>
                      <span className="fw-semibold">{item.name}</span>{" "}
                      <span className="text-muted">({item.quantity} × ฿{item.price.toFixed(2)})</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <span className="fw-bold">฿{(item.quantity * item.price).toFixed(2)}</span>
                      <button
                        type="button"
                        className="btn btn-sm btn-link text-danger p-0"
                        onClick={() => handleRemovePartFromDraft(item.part_id)}
                        title={isTh ? "ลบรายการนี้" : "Remove item"}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* สรุปราคาประเมินเบื้องต้น (OOP Calculation Preview) */}
          <div className="card bg-light border-0 p-3 mb-3">
            <div className="d-flex justify-content-between small text-muted mb-1">
              <span>{isTh ? "ค่าแรงพื้นฐาน:" : "Base Labor Cost:"}</span>
              <span>฿{preview.labor.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between small text-muted mb-1">
              <span>{isTh ? `ค่าอะไหล่รวม (${selectedParts.length} รายการ):` : `Total Parts (${selectedParts.length} items):`}</span>
              <span>฿{preview.partsTotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between small fw-medium mb-2">
              <span className={jobType === "REPAIR" ? "text-danger" : "text-success"}>
                {preview.modifierLabel}:
              </span>
              <span className={jobType === "REPAIR" ? "text-danger" : "text-success"}>
                {preview.modifierValue >= 0 ? `+฿${preview.modifierValue.toFixed(2)}` : `-฿${Math.abs(preview.modifierValue).toFixed(2)}`}
              </span>
            </div>
            <hr className="my-1" />
            <div className="d-flex justify-content-between align-items-center">
              <span className="fw-bold text-dark">{isTh ? "ยอดรวมประเมินสุทธิ:" : "Estimated Total:"}</span>
              <span className="fs-5 fw-bold text-primary">฿{preview.total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-garage-unique w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2 shadow"
            disabled={loading}
          >
            {loading ? (
              <span>{isTh ? "กำลังประมวลผลและออกใบแจ้งหนี้..." : "Processing & Generating Invoice..."}</span>
            ) : (
              <>
                <i className="bi bi-receipt"></i>
                <span>{isTh ? "สร้างใบสั่งซ่อมและออกใบแจ้งหนี้" : "Create Service Job & Issue Invoice"}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
