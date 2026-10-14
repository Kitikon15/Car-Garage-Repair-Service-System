"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

// รายการยี่ห้อรถยนต์ตามที่กำหนด
const BRAND_OPTIONS = [
  "Toyota",
  "Honda",
  "Isuzu",
  "Mazda",
  "Nissan",
  "Mitsubishi",
  "Suzuki",
  "Ford",
];

// รายการ 10 รุ่นรถยนต์ยอดนิยมตั้งต้น
const DEFAULT_POPULAR_MODELS = [
  "Civic",
  "City",
  "Accord",
  "Camry",
  "Corolla Altis",
  "Vios",
  "Yaris",
  "D-Max",
  "Ranger",
  "Triton",
];

// จับคู่รุ่นรถยนต์แยกตามยี่ห้อเพื่อความสะดวกในการเลือก
const BRAND_MODEL_MAP = {
  Toyota: ["Camry", "Corolla Altis", "Corolla Cross", "Vios", "Yaris", "Fortuner", "Hilux Revo"],
  Honda: ["Civic", "City", "Accord", "CR-V", "HR-V", "Jazz"],
  Isuzu: ["D-Max", "MU-X"],
  Mazda: ["Mazda 2", "Mazda 3", "CX-3", "CX-5", "BT-50"],
  Nissan: ["Almera", "Navara", "Kicks", "Teana"],
  Mitsubishi: ["Triton", "Pajero Sport", "Mirage", "Xpander"],
  Suzuki: ["Swift", "Ciaz", "Jimny", "Celerio"],
  Ford: ["Ranger", "Everest"],
};

// ตารางจับคู่รุ่นกลับไปยังยี่ห้อ (Auto-detect Brand เมื่อเลือกรุ่น)
const MODEL_TO_BRAND = {
  "Civic": "Honda",
  "City": "Honda",
  "Accord": "Honda",
  "CR-V": "Honda",
  "HR-V": "Honda",
  "Jazz": "Honda",
  "Camry": "Toyota",
  "Corolla Altis": "Toyota",
  "Vios": "Toyota",
  "Yaris": "Toyota",
  "Corolla Cross": "Toyota",
  "Fortuner": "Toyota",
  "Hilux Revo": "Toyota",
  "D-Max": "Isuzu",
  "MU-X": "Isuzu",
  "Ranger": "Ford",
  "Everest": "Ford",
  "Triton": "Mitsubishi",
  "Pajero Sport": "Mitsubishi",
  "Mirage": "Mitsubishi",
  "Xpander": "Mitsubishi",
  "Mazda 2": "Mazda",
  "Mazda 3": "Mazda",
  "CX-3": "Mazda",
  "CX-5": "Mazda",
  "BT-50": "Mazda",
  "Almera": "Nissan",
  "Navara": "Nissan",
  "Kicks": "Nissan",
  "Teana": "Nissan",
  "Swift": "Suzuki",
  "Ciaz": "Suzuki",
  "Jimny": "Suzuki",
  "Celerio": "Suzuki",
};

export default function RegisterModal({
  isOpen,
  onClose,
  customers,
  onRefresh,
  apiUrl,
  onRegisterSuccess,
  pendingItemName,
}) {
  const { lang } = useLanguage ? useLanguage() : { lang: "th" };
  const isTh = lang !== "en";

  const [tab, setTab] = useState(() => (pendingItemName ? "customer" : "vehicle")); // "vehicle" | "customer" | "login"
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // สถานะเลือกลูกค้าเดิมที่มีอยู่แล้ว
  const [selectedExistingCustId, setSelectedExistingCustId] = useState("");

  // สถานะเปิดกล่องพิมพ์เองสำหรับยี่ห้อและรุ่น
  const [isCustomBrand, setIsCustomBrand] = useState(false);
  const [isCustomModel, setIsCustomModel] = useState(false);

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

  // คัดกรองตัวเลือกรุ่นรถตามยี่ห้อที่เลือก
  const availableModels =
    vehForm.brand && BRAND_MODEL_MAP[vehForm.brand]
      ? BRAND_MODEL_MAP[vehForm.brand]
      : DEFAULT_POPULAR_MODELS;

  // ฟังก์ชันเปลี่ยนยี่ห้อรถยนต์
  const handleBrandChange = (val) => {
    if (val === "__custom__") {
      setIsCustomBrand(true);
      setVehForm((prev) => ({ ...prev, brand: "" }));
    } else if (val === "") {
      setIsCustomBrand(false);
      setVehForm((prev) => ({ ...prev, brand: "", model: "" }));
    } else {
      setIsCustomBrand(false);
      setVehForm((prev) => {
        const brandModels = BRAND_MODEL_MAP[val] || [];
        const isCurrentModelValid = brandModels.includes(prev.model);
        return {
          ...prev,
          brand: val,
          model: isCurrentModelValid ? prev.model : "",
        };
      });
      if (isCustomModel) {
        setIsCustomModel(false);
      }
    }
  };

  // ฟังก์ชันเปลี่ยนรุ่นรถยนต์
  const handleModelChange = (val) => {
    if (val === "__custom__") {
      setIsCustomModel(true);
      setVehForm((prev) => ({ ...prev, model: "" }));
    } else if (val === "") {
      setIsCustomModel(false);
      setVehForm((prev) => ({ ...prev, model: "" }));
    } else {
      setIsCustomModel(false);
      const autoBrand = MODEL_TO_BRAND[val];
      setVehForm((prev) => ({
        ...prev,
        model: val,
        brand: (!prev.brand || isCustomBrand) && autoBrand ? autoBrand : (prev.brand || autoBrand || ""),
      }));
      if (autoBrand && isCustomBrand) {
        setIsCustomBrand(false);
      }
    }
  };

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
        throw new Error(err.detail || (isTh ? "ลงทะเบียนลูกค้าไม่สำเร็จ" : "Customer registration failed"));
      }
      const data = await res.json();
      const newCustId = data.customer?.customer_id;
      const registeredData = {
        customer_id: newCustId,
        name: custForm.name.trim(),
        phone: custForm.phone.trim(),
      };

      if (onRegisterSuccess) {
        onRegisterSuccess(registeredData);
      }
      
      setCustForm({ name: "", phone: "" });
      
      // เลือกเจ้าของนี้ในแท็บรถยนต์ให้อัตโนมัติทันที
      if (newCustId) {
        setVehForm((prev) => ({ ...prev, customer_id: newCustId }));
      }

      onRefresh();

      if (pendingItemName) {
        setMsg(
          isTh
            ? `ลงทะเบียนสำเร็จ! รหัส ${newCustId} กำลังเพิ่ม "${pendingItemName}" ลงในตะกร้าของคุณ...`
            : `Registered successfully! Customer ${newCustId}. Adding "${pendingItemName}" to your cart...`
        );
        setTimeout(() => {
          setMsg("");
          onClose();
        }, 1100);
      } else {
        setMsg(
          isTh
            ? `ลงทะเบียนสำเร็จ! รหัสลูกค้าของคุณคือ ${newCustId}`
            : `Registration successful! Customer ID is ${newCustId}`
        );
        setTimeout(() => {
          setMsg("");
          setTab("vehicle"); // สลับไปแท็บลงทะเบียนรถต่อ
        }, 1200);
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVehicle = async (e) => {
    e.preventDefault();
    try {
      if (!vehForm.brand.trim()) {
        setErrorMsg(isTh ? "กรุณาเลือกหรือระบุยี่ห้อรถยนต์" : "Please select or enter vehicle brand");
        return;
      }
      if (!vehForm.model.trim()) {
        setErrorMsg(isTh ? "กรุณาเลือกหรือระบุรุ่นรถยนต์" : "Please select or enter vehicle model");
        return;
      }

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
        throw new Error(err.detail || (isTh ? "ลงทะเบียนรถยนต์ไม่สำเร็จ" : "Vehicle registration failed"));
      }

      const owner = customers?.find((c) => c.customer_id === vehForm.customer_id) || {
        customer_id: vehForm.customer_id,
        name: `Customer ${vehForm.customer_id}`,
        phone: "",
      };
      const enrichedCustomer = {
        ...owner,
        license_plate: vehForm.license_plate.trim().toUpperCase(),
        brand: vehForm.brand.trim(),
        model: vehForm.model.trim(),
      };

      if (onRegisterSuccess) {
        onRegisterSuccess(enrichedCustomer);
      }

      setVehForm({ license_plate: "", brand: "", model: "", customer_id: "" });
      setIsCustomBrand(false);
      setIsCustomModel(false);
      onRefresh();

      if (pendingItemName) {
        setMsg(
          isTh
            ? `ลงทะเบียนรถยนต์สำเร็จ! กำลังเพิ่ม "${pendingItemName}" ลงในตะกร้าของคุณ...`
            : `Vehicle registered successfully! Adding "${pendingItemName}" to your cart...`
        );
      } else {
        setMsg(isTh ? "ลงทะเบียนรถยนต์และบันทึกข้อมูลเจ้าของรถสำเร็จเรียบร้อย!" : "Vehicle registered and linked successfully!");
      }

      setTimeout(() => {
        setMsg("");
        onClose();
      }, 1100);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectExistingCustomer = (e) => {
    e.preventDefault();
    const found = customers?.find((c) => c.customer_id === selectedExistingCustId);
    if (!found) {
      setErrorMsg(isTh ? "กรุณาเลือกลูกค้าจากรายชื่อ" : "Please select a customer from the list");
      return;
    }
    if (onRegisterSuccess) {
      onRegisterSuccess(found);
    }
    if (pendingItemName) {
      setMsg(
        isTh
          ? `เข้าสู่ระบบในชื่อ "${found.name}" สำเร็จ! กำลังเพิ่ม "${pendingItemName}" ลงในตะกร้า...`
          : `Logged in as "${found.name}"! Adding "${pendingItemName}" to your cart...`
      );
    } else {
      setMsg(isTh ? `เข้าสู่ระบบในชื่อ "${found.name}" สำเร็จ!` : `Logged in as "${found.name}" successfully!`);
    }
    setTimeout(() => {
      setMsg("");
      onClose();
    }, 900);
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1055 }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow border-0 rounded-3">
          <div className="modal-header border-bottom py-3">
            <h5 className="modal-title fw-bold fs-6 d-flex align-items-center">
              <i className="bi bi-person-plus text-primary me-2 fs-5"></i>
              {isTh ? "ลงทะเบียนลูกค้าและยานพาหนะ" : "Register Customer & Vehicle"}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4">
            {/* กล่องแจ้งเตือนเมื่อเปิดจากความพยายามเพิ่มสินค้าลงตะกร้า */}
            {pendingItemName && (
              <div className="alert alert-warning py-2.5 px-3 small d-flex align-items-center gap-2 mb-3 shadow-sm rounded-3 border-warning">
                <i className="bi bi-shield-lock-fill fs-4 text-warning"></i>
                <div>
                  <div className="fw-bold text-dark">
                    {isTh ? "จำเป็นต้องลงทะเบียนก่อนเพิ่มสินค้าลงในตะกร้า" : "Registration Required Before Adding to Cart"}
                  </div>
                  <div className="text-muted" style={{ fontSize: "0.82rem" }}>
                    {isTh
                      ? `กรุณาลงทะเบียนลูกค้าหรือเลือกลูกค้าเดิมเพื่อเพิ่ม "${pendingItemName}" ลงในตะกร้าทันที`
                      : `Please register or select existing customer to add "${pendingItemName}" to your cart.`}
                  </div>
                </div>
              </div>
            )}

            <ul className="nav nav-pills nav-fill mb-3 p-1 bg-light rounded-2">
              <li className="nav-item">
                <button
                  className={`nav-link py-2 fw-semibold small ${tab === "vehicle" ? "active shadow-sm" : ""}`}
                  onClick={() => { setTab("vehicle"); setErrorMsg(""); }}
                >
                  <i className="bi bi-car-front me-1"></i> {isTh ? "ลงทะเบียนรถยนต์" : "Register Vehicle"}
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link py-2 fw-semibold small ${tab === "customer" ? "active shadow-sm" : ""}`}
                  onClick={() => { setTab("customer"); setErrorMsg(""); }}
                >
                  <i className="bi bi-person me-1"></i> {isTh ? "ลงทะเบียนลูกค้าใหม่" : "Register Customer"}
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link py-2 fw-semibold small ${tab === "login" ? "active shadow-sm" : ""}`}
                  onClick={() => { setTab("login"); setErrorMsg(""); }}
                >
                  <i className="bi bi-person-check me-1"></i> {isTh ? "เลือกลูกค้าเดิม" : "Existing Customer"}
                </button>
              </li>
            </ul>

            {msg && <div className="alert alert-success py-2 small d-flex align-items-center gap-2 mb-3"><i className="bi bi-check-circle-fill"></i> {msg}</div>}
            {errorMsg && <div className="alert alert-danger py-2 small d-flex align-items-center gap-2 mb-3"><i className="bi bi-exclamation-triangle-fill"></i> {errorMsg}</div>}

            {tab === "customer" && (
              <form onSubmit={handleCreateCustomer}>
                <div className="alert alert-info py-2 small d-flex align-items-center gap-2 mb-3">
                  <i className="bi bi-info-circle-fill fs-6"></i>
                  <span>
                    {isTh ? (
                      <>ระบบจะสร้าง<strong>รหัสลูกค้า (Customer ID)</strong> ให้อัตโนมัติเมื่อกดบันทึก</>
                    ) : (
                      <>A unique <strong>Customer ID</strong> will be generated automatically upon saving.</>
                    )}
                  </span>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">
                    {isTh ? "ชื่อ-นามสกุล ลูกค้า" : "Customer Full Name"}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={isTh ? "เช่น สมชาย ใจดี" : "e.g. John Doe"}
                    required
                    value={custForm.name}
                    onChange={(e) => setCustForm({ ...custForm, name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">
                    {isTh ? "เบอร์โทรศัพท์ติดต่อ" : "Phone Number"}
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder={isTh ? "เช่น 081-234-5678" : "e.g. 081-234-5678"}
                    required
                    value={custForm.phone}
                    onChange={(e) => setCustForm({ ...custForm, phone: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold" disabled={loading}>
                  {loading ? (isTh ? "กำลังบันทึก..." : "Saving...") : (isTh ? "บันทึกข้อมูลลูกค้า" : "Save Customer")}
                </button>
              </form>
            )}

            {tab === "vehicle" && (
              <form onSubmit={handleCreateVehicle}>
                <div className="mb-2">
                  <label className="form-label small fw-semibold">
                    {isTh ? "เจ้าของรถยนต์ (เลือกลูกค้า)" : "Vehicle Owner (Select Customer)"}
                  </label>
                  <select
                    className="form-select form-select-sm"
                    required
                    value={vehForm.customer_id}
                    onChange={(e) => setVehForm({ ...vehForm, customer_id: e.target.value })}
                  >
                    <option value="">{isTh ? "-- เลือกลูกค้าที่เป็นเจ้าของรถ --" : "-- Select Customer Owner --"}</option>
                    {customers?.map((c) => (
                      <option key={c.customer_id} value={c.customer_id}>
                        {c.name} ({c.customer_id})
                      </option>
                    ))}
                  </select>
                  <small className="text-muted d-block mt-1" style={{ fontSize: "0.75rem" }}>
                    {isTh
                      ? 'หากยังไม่มีลูกค้า ให้กดแท็บ "ลงทะเบียนลูกค้าใหม่" ด้านบน'
                      : 'If not registered, click "Register Customer" tab above'}
                  </small>
                </div>

                <div className="mb-2">
                  <label className="form-label small fw-semibold">
                    {isTh ? "หมายเลขทะเบียนรถ" : "License Plate"}
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder={isTh ? "เช่น กข-1234 กทม." : "e.g. 1AB-1234 BKK"}
                    required
                    value={vehForm.license_plate}
                    onChange={(e) => setVehForm({ ...vehForm, license_plate: e.target.value })}
                  />
                </div>

                <div className="row g-2 mb-3">
                  {/* ยี่ห้อรถ (Brand) */}
                  <div className="col-6">
                    <label className="form-label small fw-semibold">
                      {isTh ? "ยี่ห้อ (Brand)" : "Brand"}
                    </label>
                    <select
                      className="form-select form-select-sm"
                      value={isCustomBrand ? "__custom__" : (vehForm.brand || "")}
                      onChange={(e) => handleBrandChange(e.target.value)}
                    >
                      <option value="">{isTh ? "ยี่ห้อรถ (ทั้งหมด)" : "-- Select Brand --"}</option>
                      {BRAND_OPTIONS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                      <option value="__custom__">
                        ✏️ {isTh ? "อื่นๆ (พิมพ์ระบุเอง)" : "Other (Type custom)"}
                      </option>
                    </select>

                    {isCustomBrand && (
                      <div className="input-group input-group-sm mt-1">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder={isTh ? "เช่น BYD, BMW..." : "e.g. BYD, BMW..."}
                          required
                          autoFocus
                          value={vehForm.brand}
                          onChange={(e) => setVehForm({ ...vehForm, brand: e.target.value })}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          title={isTh ? "เลือกจากรายการ" : "Choose from list"}
                          onClick={() => {
                            setIsCustomBrand(false);
                            setVehForm((prev) => ({ ...prev, brand: "" }));
                          }}
                        >
                          <i className="bi bi-x"></i>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* รุ่นรถ (Model) */}
                  <div className="col-6">
                    <label className="form-label small fw-semibold">
                      {isTh ? "รุ่น (Model)" : "Model"}
                    </label>
                    <select
                      className="form-select form-select-sm"
                      value={isCustomModel ? "__custom__" : (vehForm.model || "")}
                      onChange={(e) => handleModelChange(e.target.value)}
                    >
                      <option value="">{isTh ? "รุ่นรถ (ทั้งหมด)" : "-- Select Model --"}</option>
                      {availableModels.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                      <option value="__custom__">
                        ✏️ {isTh ? "อื่นๆ (พิมพ์ระบุเอง)" : "Other (Type custom)"}
                      </option>
                    </select>

                    {isCustomModel && (
                      <div className="input-group input-group-sm mt-1">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder={isTh ? "เช่น Corolla Cross 2023..." : "e.g. Corolla Cross 2023..."}
                          required
                          autoFocus
                          value={vehForm.model}
                          onChange={(e) => setVehForm({ ...vehForm, model: e.target.value })}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          title={isTh ? "เลือกจากรายการ" : "Choose from list"}
                          onClick={() => {
                            setIsCustomModel(false);
                            setVehForm((prev) => ({ ...prev, model: "" }));
                          }}
                        >
                          <i className="bi bi-x"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-sm w-100 py-2 fw-semibold" disabled={loading}>
                  {loading ? (isTh ? "กำลังบันทึก..." : "Saving...") : (isTh ? "บันทึกรถและผูกกับเจ้าของ" : "Save & Link Vehicle")}
                </button>
              </form>
            )}

            {tab === "login" && (
              <form onSubmit={handleSelectExistingCustomer}>
                <div className="alert alert-light border py-2 px-3 small d-flex align-items-center gap-2 mb-3 rounded-2">
                  <i className="bi bi-person-badge fs-5 text-primary"></i>
                  <span>
                    {isTh
                      ? "หากคุณเคยลงทะเบียนลูกค้าไว้แล้ว สามารถเลือกลูกค้าเพื่อเข้าใช้งานและสั่งซื้อได้ทันที"
                      : "If you are already registered, select your profile to log in and proceed."}
                  </span>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">
                    {isTh ? "เลือกลูกค้าที่ลงทะเบียนแล้ว" : "Select Registered Customer"}
                  </label>
                  <select
                    className="form-select form-select-sm"
                    required
                    value={selectedExistingCustId}
                    onChange={(e) => setSelectedExistingCustId(e.target.value)}
                  >
                    <option value="">{isTh ? "-- เลือกลูกค้าจากรายชื่อในระบบ --" : "-- Select Customer Profile --"}</option>
                    {customers?.map((c) => (
                      <option key={c.customer_id} value={c.customer_id}>
                        {c.name} ({c.customer_id}) {c.phone ? `• ${c.phone}` : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 fw-semibold"
                  disabled={loading || !selectedExistingCustId}
                >
                  <i className="bi bi-box-arrow-in-right me-1"></i>
                  {isTh ? "ยืนยันเข้าสู่ระบบด้วยลูกค้านี้" : "Confirm & Login as Customer"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
