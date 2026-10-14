"use client";

import { useLanguage } from "../context/LanguageContext";

export default function InvoiceList({ invoices, onSelectInvoice }) {
  const { lang } = useLanguage ? useLanguage() : { lang: "th" };
  const isTh = lang !== "en";

  return (
    <div className="card h-100">
      <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title mb-0 fw-bold d-flex align-items-center gap-2">
            <i className="bi bi-file-earmark-text text-primary"></i>
            <span>{isTh ? "ประวัติใบแจ้งหนี้ / ใบเสร็จรับเงิน (Invoices)" : "Invoice & Payment History"}</span>
          </h5>
          <small className="text-muted">
            {isTh
              ? "รายการใบแจ้งหนี้และใบเสร็จรับเงินสำหรับงานซ่อมบำรุงและเช็กระยะทั้งหมด"
              : "Summary of all invoices, service orders, and scheduled maintenance receipts"}
          </small>
        </div>
        <span className="badge bg-primary rounded-pill">
          {isTh ? `ทั้งหมด ${invoices?.length || 0} ใบ` : `Total ${invoices?.length || 0} Invoices`}
        </span>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col" className="ps-3">{isTh ? "เลขที่ใบแจ้งหนี้" : "Invoice No."}</th>
              <th scope="col">{isTh ? "ลูกค้า / ทะเบียนรถ" : "Customer / Plate"}</th>
              <th scope="col">{isTh ? "ประเภทงาน" : "Job Type"}</th>
              <th scope="col" className="text-end">{isTh ? "ยอดรวมสุทธิ" : "Total Amount"}</th>
              <th scope="col" className="text-center">{isTh ? "สถานะ" : "Status"}</th>
              <th scope="col" className="text-end pe-3">{isTh ? "ดำเนินการ" : "Action"}</th>
            </tr>
          </thead>
          <tbody>
            {invoices?.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  {isTh ? "ยังไม่มีประวัติใบแจ้งหนี้ในระบบ" : "No invoice records found in system"}
                </td>
              </tr>
            ) : (
              invoices?.map((inv) => {
                const isPaid = inv.payment_status === "PAID";
                const isRepair = inv.job?.job_type === "REPAIR";

                return (
                  <tr key={inv.invoice_id}>
                    <td className="ps-3 font-monospace fw-semibold small text-primary">
                      {inv.invoice_id}
                    </td>
                    <td>
                      <div className="fw-medium">{inv.customer?.name || (isTh ? "ลูกค้าทั่วไป" : "Walk-in Customer")}</div>
                      <div className="text-muted small font-monospace">
                        {isTh ? `ทะเบียน ${inv.vehicle?.license_plate} (${inv.vehicle?.brand})` : `Plate ${inv.vehicle?.license_plate} (${inv.vehicle?.brand})`}
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${isRepair ? "bg-danger-subtle text-danger border border-danger-subtle" : "bg-success-subtle text-success border border-success-subtle"}`}>
                        {isRepair ? (isTh ? "งานซ่อมทั่วไป" : "General Repair") : (isTh ? "งานบำรุงรักษา" : "Maintenance")}
                      </span>
                    </td>
                    <td className="text-end fw-bold text-dark">
                      ฿{inv.total_amount?.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="text-center">
                      <span className={`badge ${isPaid ? "bg-success" : "bg-warning text-dark"}`}>
                        {isPaid ? (isTh ? "ชำระเงินแล้ว" : "Paid") : (isTh ? "รอชำระเงิน" : "Pending")}
                      </span>
                    </td>
                    <td className="text-end pe-3">
                      <button
                        className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1"
                        onClick={() => onSelectInvoice(inv)}
                      >
                        <i className="bi bi-eye"></i>
                        <span>{isTh ? "ดูใบเสร็จ" : "View Invoice"}</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
