"use client";

import { useState } from "react";
import ProductImage from "./ProductImage";

export default function PartsInventory({ parts, onRefresh, apiUrl }) {
  const [restockingId, setRestockingId] = useState(null);
  const [restockQty, setRestockQty] = useState(5);
  const [showAddPartModal, setShowAddPartModal] = useState(false);
  const [newPart, setNewPart] = useState({
    part_id: "",
    part_name: "",
    price: "",
    stock_qty: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // การทำงานเติมสต็อก (Encapsulated add_stock บนคลาส Part)
  const handleRestock = async (partId) => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/api/parts/${partId}/restock`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: parseInt(restockQty, 10) || 5 }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "ไม่สามารถเติมสต็อกได้");
      }
      setRestockingId(null);
      setRestockQty(5);
      onRefresh();
    } catch (err) {
      alert(`การเติมสต็อกผิดพลาด: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // การเพิ่มอะไหล่ใหม่
  const handleCreatePart = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMsg("");
      const res = await fetch(`${apiUrl}/api/parts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          part_id: newPart.part_id.trim().toUpperCase(),
          part_name: newPart.part_name.trim(),
          price: parseFloat(newPart.price),
          stock_qty: parseInt(newPart.stock_qty, 10),
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "ไม่สามารถเพิ่มอะไหล่ได้");
      }
      setShowAddPartModal(false);
      setNewPart({ part_id: "", part_name: "", price: "", stock_qty: "" });
      onRefresh();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card h-100">
      <div className="card-header bg-white py-3 d-flex align-items-center justify-content-between border-bottom">
        <div>
          <h5 className="card-title mb-0 fw-bold d-flex align-items-center gap-2">
            <i className="bi bi-boxes text-primary"></i>
            <span>คลังอะไหล่และอุปกรณ์ (Parts Inventory)</span>
          </h5>
          <small className="text-muted">
            หลักการ Encapsulation: ควบคุมการตัดสต็อกผ่านเมธอด <code>deduct_stock()</code>
          </small>
        </div>
        <button
          className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
          onClick={() => setShowAddPartModal(true)}
        >
          <i className="bi bi-plus-circle"></i>
          <span>เพิ่มอะไหล่</span>
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col" className="ps-3">รหัส SKU</th>
              <th scope="col">รายการอะไหล่</th>
              <th scope="col" className="text-end">ราคา/ชิ้น</th>
              <th scope="col" className="text-center">คงเหลือ</th>
              <th scope="col" className="text-center">สถานะ</th>
              <th scope="col" className="text-end pe-3">จัดการสต็อก</th>
            </tr>
          </thead>
          <tbody>
            {parts?.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  ยังไม่มีรายการอะไหล่ในคลัง
                </td>
              </tr>
            ) : (
              parts?.map((p) => {
                const isLow = p.stock_qty <= 5;
                const isOut = p.stock_qty === 0;

                return (
                  <tr key={p.part_id}>
                    <td className="ps-3 font-monospace fw-semibold small text-primary">
                      <div className="d-flex align-items-center gap-2">
                        <ProductImage partId={p.part_id} partName={p.part_name} size="sm" style={{ width: "36px", height: "36px" }} />
                        <span>{p.part_id}</span>
                      </div>
                    </td>
                    <td className="fw-medium">{p.part_name}</td>
                    <td className="text-end fw-semibold">฿{p.price.toLocaleString("th-TH", { minimumFractionDigits: 2 })}</td>
                    <td className="text-center">
                      <span className={`fw-bold ${isOut ? "text-danger" : isLow ? "text-warning" : "text-dark"}`}>
                        {p.stock_qty}
                      </span>{" "}
                      <span className="text-muted small">ชิ้น</span>
                    </td>
                    <td className="text-center">
                      {isOut ? (
                        <span className="badge bg-danger">สินค้าหมด</span>
                      ) : isLow ? (
                        <span className="badge bg-warning text-dark">
                          <i className="bi bi-exclamation-triangle-fill me-1"></i> สต็อกใกล้หมด
                        </span>
                      ) : (
                        <span className="badge bg-success-subtle text-success border border-success-subtle">
                          พร้อมใช้งาน
                        </span>
                      )}
                    </td>
                    <td className="text-end pe-3">
                      {restockingId === p.part_id ? (
                        <div className="d-flex align-items-center justify-content-end gap-1">
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: "70px" }}
                            min="1"
                            value={restockQty}
                            onChange={(e) => setRestockQty(e.target.value)}
                          />
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => handleRestock(p.part_id)}
                            disabled={loading}
                            title="ยืนยันการเติมสต็อก"
                          >
                            <i className="bi bi-check-lg"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => setRestockingId(null)}
                            title="ยกเลิก"
                          >
                            <i className="bi bi-x-lg"></i>
                          </button>
                        </div>
                      ) : (
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          title="เติมจำนวนสต็อกอะไหล่"
                          onClick={() => {
                            setRestockingId(p.part_id);
                            setRestockQty(5);
                          }}
                        >
                          <i className="bi bi-plus-square me-1"></i> เติมสต็อก
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Modal เพิ่มอะไหล่ใหม่ */}
      {showAddPartModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={handleCreatePart}>
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">
                    <i className="bi bi-plus-circle text-primary me-2"></i>
                    เพิ่มรายการอะไหล่เข้าคลัง
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAddPartModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  {errorMsg && (
                    <div className="alert alert-danger py-2 small">{errorMsg}</div>
                  )}
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">รหัส SKU อะไหล่</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="เช่น PART-010"
                      required
                      value={newPart.part_id}
                      onChange={(e) => setNewPart({ ...newPart, part_id: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">ชื่ออะไหล่ / อุปกรณ์</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="เช่น ฝาหม้อน้ำ 1.1 Bar"
                      required
                      value={newPart.part_name}
                      onChange={(e) => setNewPart({ ...newPart, part_name: e.target.value })}
                    />
                  </div>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-semibold">ราคาต่อหน่วย (฿)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        className="form-control"
                        placeholder="1850.00"
                        required
                        value={newPart.price}
                        onChange={(e) => setNewPart({ ...newPart, price: e.target.value })}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold">จำนวนเริ่มต้น</label>
                      <input
                        type="number"
                        min="0"
                        className="form-control"
                        placeholder="10"
                        required
                        value={newPart.stock_qty}
                        onChange={(e) => setNewPart({ ...newPart, stock_qty: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowAddPartModal(false)}
                  >
                    ยกเลิก
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "กำลังบันทึก..." : "บันทึกอะไหล่"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
