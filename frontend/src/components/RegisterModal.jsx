"use client";

import { useState } from "react";

export default function RegisterModal({ isOpen, onClose, customers, onRefresh, apiUrl }) {
  const [tab, setTab] = useState("vehicle"); // "vehicle" หรือ "customer"
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // ฟอร์มลูกค้า (ตัด customer_id ออก ให้ระบบสร้างให้อัตโนมัติ)
  const [custForm, setCustForm] = useState({
    name: "",
    phone: "",
  });

  // ฟอร์มรถยนต์
  const [vehForm, setVehForm] = useState({
    license_plate: "",
    brand: "",
    model: "",
    customer_id: "",
  });

  if (!isOpen) return null;

  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMsg("");
      const res = await fetch(`${apiUrl}/api/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: custForm.name.trim(),
          phone: custForm.phone.trim(),
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "ลงทะเบียนลูกค้าไม่สำเร็จ");
      }
      const data = await res.json();
      const newCustId = data.customer?.customer_id;
      
      setMsg(`ลงทะเบียนสำเร็จ! รหัสลูกค้าของคุณคือ ${newCustId}`);
      setCustForm({ name: "", phone: "" });
      
      // เลือกเจ้าของนี้ในแท็บรถยนต์ให้อัตโนมัติทันที
      if (newCustId) {
        setVehForm((prev) => ({ ...prev, customer_id: newCustId }));
      }

      onRefresh();
      setTimeout(() => {
        setMsg("");
        setTab("vehicle"); // สลับไปแท็บลงทะเบียนรถทันที
      }, 1200);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVehicle = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMsg("");
      const res = await fetch(`${apiUrl}/api/vehicles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          license_plate: vehForm.license_plate.trim().toUpperCase(),
          brand: vehForm.brand.trim(),
          model: vehForm.model.trim(),
          customer_id: vehForm.customer_id,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "ลงทะเบียนรถยนต์ไม่สำเร็จ");
      }
      setMsg("ลงทะเบียนรถยนต์และบันทึกข้อมูลเจ้าของรถสำเร็จเรียบร้อย!");
      setVehForm({ license_plate: "", brand: "", model: "", customer_id: "" });
      onRefresh();
      setTimeout(() => {
        setMsg("");
        onClose();
      }, 1200);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1055 }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">
              <i className="bi bi-person-plus text-primary me-2"></i>
              ลงทะเบียนลูกค้าและยานพาหนะ
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <ul className="nav nav-pills nav-fill mb-3">
              <li className="nav-item">
                <button
                  className={`nav-link ${tab === "vehicle" ? "active" : ""}`}
                  onClick={() => { setTab("vehicle"); setErrorMsg(""); }}
                >
                  <i className="bi bi-car-front me-1"></i> ลงทะเบียนรถยนต์
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${tab === "customer" ? "active" : ""}`}
                  onClick={() => { setTab("customer"); setErrorMsg(""); }}
                >
                  <i className="bi bi-person me-1"></i> ลงทะเบียนลูกค้าใหม่
                </button>
              </li>
            </ul>

            {msg && <div className="alert alert-success py-2 small">{msg}</div>}
            {errorMsg && <div className="alert alert-danger py-2 small">{errorMsg}</div>}

            {tab === "customer" ? (
              <form onSubmit={handleCreateCustomer}>
                <div className="alert alert-info py-2 small d-flex align-items-center gap-2 mb-3">
                  <i className="bi bi-info-circle-fill"></i>
                  <span>ระบบจะสร้าง<strong>รหัสลูกค้า (Customer ID)</strong> ให้อัตโนมัติเมื่อกดบันทึก</span>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">ชื่อ-นามสกุล ลูกค้า</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="เช่น สมชาย ใจดี"
                    required
                    value={custForm.name}
                    onChange={(e) => setCustForm({ ...custForm, name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">เบอร์โทรศัพท์ติดต่อ</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="เช่น 081-234-5678"
                    required
                    value={custForm.phone}
                    onChange={(e) => setCustForm({ ...custForm, phone: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold" disabled={loading}>
                  {loading ? "กำลังบันทึก..." : "บันทึกข้อมูลลูกค้า"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleCreateVehicle}>
                <div className="mb-2">
                  <label className="form-label small fw-semibold">เจ้าของรถยนต์ (เลือกลูกค้า)</label>
                  <select
                    className="form-select form-select-sm"
                    required
                    value={vehForm.customer_id}
                    onChange={(e) => setVehForm({ ...vehForm, customer_id: e.target.value })}
                  >
                    <option value="">-- เลือกลูกค้าที่เป็นเจ้าของรถ --</option>
                    {customers?.map((c) => (
                      <option key={c.customer_id} value={c.customer_id}>
                        {c.name} ({c.customer_id})
                      </option>
                    ))}
                  </select>
                  <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                    หากยังไม่มีลูกค้า ให้กดแท็บ "ลงทะเบียนลูกค้าใหม่" ด้านบน
                  </small>
                </div>
                <div className="mb-2">
                  <label className="form-label small fw-semibold">หมายเลขทะเบียนรถ</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="เช่น กข-1234 กทม."
                    required
                    value={vehForm.license_plate}
                    onChange={(e) => setVehForm({ ...vehForm, license_plate: e.target.value })}
                  />
                </div>
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label small fw-semibold">ยี่ห้อ (Brand)</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="เช่น Toyota"
                      required
                      value={vehForm.brand}
                      onChange={(e) => setVehForm({ ...vehForm, brand: e.target.value })}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-semibold">รุ่น (Model)</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="เช่น Corolla Cross 2023"
                      required
                      value={vehForm.model}
                      onChange={(e) => setVehForm({ ...vehForm, model: e.target.value })}
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-sm w-100" disabled={loading}>
                  {loading ? "กำลังบันทึก..." : "บันทึกรถและผูกกับเจ้าของ"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
