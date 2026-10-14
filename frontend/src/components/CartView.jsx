"use client";

import { useState, useEffect } from "react";
import ProductImage from "./ProductImage";
import { useLanguage } from "../context/LanguageContext";

export default function CartView({
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onContinueShopping,
  apiUrl,
  onOrderCompleted,
  currentCustomer,
  onOpenRegister,
}) {
  const { lang } = useLanguage ? useLanguage() : { lang: "th" };
  const isTh = lang !== "en";

  const [checkoutName, setCheckoutName] = useState(() => currentCustomer?.name || "");
  const [checkoutPhone, setCheckoutPhone] = useState(() => currentCustomer?.phone || "");
  const [checkoutAddress, setCheckoutAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("transfer"); // 'transfer' | 'cod' | 'credit'
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  useEffect(() => {
    if (currentCustomer) {
      if (!checkoutName && currentCustomer.name) setCheckoutName(currentCustomer.name);
      if (!checkoutPhone && currentCustomer.phone) setCheckoutPhone(currentCustomer.phone);
    }
  }, [currentCustomer]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = couponApplied ? couponDiscount : 0;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const vat = taxableAmount * 0.07;
  const grandTotal = taxableAmount + vat;
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "GARAGE35" || couponCode.trim().toUpperCase() === "SERVICE35") {
      setCouponDiscount(subtotal * 0.35);
      setCouponApplied(true);
      alert(isTh ? "ใช้งานโค้ดส่วนลด 35% พิเศษสำหรับอู่ซ่อมรถสำเร็จ!" : "Garage 35% discount code applied successfully!");
    } else if (couponCode.trim().toUpperCase() === "VIP500") {
      setCouponDiscount(500);
      setCouponApplied(true);
      alert(isTh ? "ใช้งานโค้ดส่วนลด ฿500 สำเร็จ!" : "฿500 discount voucher applied successfully!");
    } else {
      alert(isTh ? "โค้ดส่วนลดไม่ถูกต้อง ลองใช้โค้ด 'GARAGE35' หรือ 'VIP500'" : "Invalid promo code. Try 'GARAGE35' or 'VIP500'");
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!currentCustomer) {
      alert(isTh ? "⚠️ กรุณาลงทะเบียนลูกค้าก่อนทำการสั่งซื้อ" : "⚠️ Please register as a customer before checkout");
      if (onOpenRegister) onOpenRegister();
      return;
    }
    if (!checkoutName || !checkoutPhone) {
      alert(isTh ? "กรุณากรอกชื่อและเบอร์โทรศัพท์สำหรับจัดส่ง" : "Please enter recipient name and phone number for delivery");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        orderId: `ORD-${Date.now().toString().slice(-6)}`,
        customerName: checkoutName,
        phone: checkoutPhone,
        address: checkoutAddress || (isTh ? "รับที่ศูนย์บริการ ServiceGarage" : "Pick up at ServiceGarage Center"),
        paymentMethod: paymentMethod === "transfer" 
          ? (isTh ? "โอนเงินผ่านธนาคาร (QR PromptPay)" : "Bank Transfer (PromptPay QR)") 
          : paymentMethod === "cod" 
          ? (isTh ? "เก็บเงินปลายทาง (COD)" : "Cash on Delivery (COD)") 
          : (isTh ? "บัตรเครดิต / เดบิต" : "Credit / Debit Card"),
        items: [...cart],
        subtotal: subtotal,
        discount: discountAmount,
        vat: vat,
        total: grandTotal,
        date: new Date().toLocaleString(isTh ? "th-TH" : "en-US"),
      };

      setOrderSuccess(orderData);
      onClearCart();
      if (onOrderCompleted) onOrderCompleted(orderData);
    } catch (err) {
      alert(isTh ? `การสั่งซื้อผิดพลาด: ${err.message}` : `Checkout error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="cart-page pb-5">
        {/* Charcoal Banner สำหรับหน้าเสร็จสิ้น */}
        <div className="shop-charcoal-banner shadow-sm mb-4">
          <div className="container-fluid px-3 px-lg-4">
            <h1 className="shop-charcoal-title mb-0 d-flex align-items-center gap-2">
              <i className="bi bi-check2-circle text-success"></i>
              <span>{isTh ? "ยืนยันการสั่งซื้อสำเร็จ" : "Order Placed Successfully"}</span>
            </h1>
          </div>
        </div>

        <div className="container px-3 px-lg-4">
          <div className="card border-0 shadow bg-white p-4 p-md-5 text-center my-3 rounded-4">
            <div className="mb-3">
              <div
                className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center shadow-lg"
                style={{ width: "80px", height: "80px" }}
              >
                <i className="bi bi-check-lg fs-1"></i>
              </div>
            </div>
            <h3 className="fw-black text-dark mb-2">{isTh ? "สั่งซื้ออะไหล่สำเร็จเรียบร้อย!" : "Your Order Has Been Confirmed!"}</h3>
            <p className="text-muted">
              {isTh ? "หมายเลขคำสั่งซื้อ:" : "Order ID:"} <strong className="font-monospace text-primary fs-5">{orderSuccess.orderId}</strong>
            </p>

            <div className="card bg-light border-0 p-4 mx-auto my-3 text-start rounded-3" style={{ maxWidth: "600px" }}>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">{isTh ? "ผู้รับสินค้า:" : "Recipient:"}</span>
                <strong className="text-dark">{orderSuccess.customerName} ({orderSuccess.phone})</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">{isTh ? "สถานที่จัดส่ง:" : "Delivery Address:"}</span>
                <span className="text-dark text-end">{orderSuccess.address}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">{isTh ? "วิธีชำระเงิน:" : "Payment Method:"}</span>
                <span className="badge bg-secondary-subtle text-secondary-emphasis">{orderSuccess.paymentMethod}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fs-5 fw-black text-dark">
                <span>{isTh ? "ยอดชำระสุทธิ:" : "Total Amount:"}</span>
                <span className="text-sp-blue">฿{orderSuccess.total.toLocaleString("th-TH", { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <div className="mt-3 d-flex justify-content-center gap-3">
              <button
                className="btn btn-garage-unique px-4 py-2"
                onClick={() => {
                  setOrderSuccess(null);
                  onContinueShopping();
                }}
              >
                <i className="bi bi-bag-plus-fill me-1"></i> {isTh ? "เลือกซื้ออะไหล่รายการอื่นต่อ" : "Continue Shopping for Parts"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page pb-5">
      {/* 1. ส่วนหัวแถบรายการเบิกอะไหล่และคำสั่งซื้อ (Parts Requisition Hub) */}
      <div className="shop-charcoal-banner shadow-sm mb-4">
        <div className="container-fluid px-3 px-lg-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <h1 className="shop-charcoal-title mb-1 d-flex align-items-center gap-2">
                <i className="bi bi-cart-check-fill text-warning"></i>
                <span>{isTh ? "รายการเบิกอะไหล่ & คำสั่งซื้อ" : "Parts Requisition & Order Hub"}</span>
              </h1>
              <p className="text-white opacity-90 small mb-0 fw-medium">
                {isTh
                  ? "สรุปรายการชิ้นส่วนอะไหล่ คำนวณภาษี และบันทึกประวัติการเบิกใช้อะไหล่ของศูนย์บริการ"
                  : "Itemized parts summary, tax calculation, and garage requisition management."}
              </p>
            </div>

            <button
              className="btn btn-outline-light btn-sm px-3 py-2 rounded-3"
              onClick={onContinueShopping}
            >
              <i className="bi bi-arrow-left me-1"></i> {isTh ? "เลือกดูอะไหล่ต่อ" : "Back to Catalog"}
            </button>
          </div>

          {/* รายการลิงก์ย่อยในแถบชาร์โคล */}
          <div className="d-flex gap-2 flex-wrap overflow-x-auto scrollbar-none pt-2 pb-1">
            <span className="shop-banner-link active">
              <i className="bi bi-bag-check-fill"></i>
              <span>{isTh ? `รายการเบิกในตะกร้า (${totalItemCount} ชิ้น)` : `Cart Items (${totalItemCount} items)`}</span>
            </span>
            <span className="shop-banner-link">
              <i className="bi bi-shield-check"></i>
              <span>{isTh ? "ตรวจสอบสเปกชิ้นส่วนตรงรุ่น" : "100% Exact OEM Spec Fit"}</span>
            </span>
            <span className="shop-banner-link">
              <i className="bi bi-patch-check-fill"></i>
              <span>{isTh ? "อะไหล่แท้ห้างและเกรดพรีเมียม" : "Genuine & Premium OEM Quality"}</span>
            </span>
            <span className="shop-banner-link">
              <i className="bi bi-credit-card-2-front-fill"></i>
              <span>{isTh ? "รองรับชำระเงินหลายรูปแบบ & โอนชำระ" : "Multiple Payment & Transfer Options"}</span>
            </span>
            <span className="shop-banner-link">
              <i className="bi bi-receipt"></i>
              <span>{isTh ? "ออกใบเสร็จรับเงิน / ใบสั่งซ่อมทางการ" : "Official Tax Invoice & Service Slip"}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="container-fluid px-3 px-lg-4">
        {/* 2. Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb mb-0 fw-semibold" style={{ fontSize: "0.95rem" }}>
            <li className="breadcrumb-item">
              <a href="#" className="text-decoration-none text-muted" onClick={(e) => { e.preventDefault(); onContinueShopping(); }}>
                {isTh ? "หน้าแรก" : "Home"}
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href="#" className="text-decoration-none text-muted" onClick={(e) => { e.preventDefault(); onContinueShopping(); }}>
                {isTh ? "คลังเบิก-จ่ายอะไหล่" : "Parts Inventory"}
              </a>
            </li>
            <li className="breadcrumb-item active text-dark" aria-current="page">
              {isTh ? "รายการเบิกอะไหล่" : "Parts Requisition Cart"}
            </li>
          </ol>
        </nav>

        {/* 3. แถบสรุปสถิติด่วน 4 ช่องสไตล์โมเดิร์น */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card bg-white border-0 shadow-sm p-3 rounded-3 d-flex flex-row align-items-center gap-3">
              <div className="p-3 rounded-circle bg-primary-subtle text-primary fs-4">
                <i className="bi bi-box-seam-fill"></i>
              </div>
              <div>
                <small className="text-muted fw-bold">{isTh ? "จำนวนสินค้าทั้งหมด" : "Total Items"}</small>
                <h5 className="fw-black mb-0 text-dark">{totalItemCount} {isTh ? "ชิ้น" : "items"}</h5>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card bg-white border-0 shadow-sm p-3 rounded-3 d-flex flex-row align-items-center gap-3">
              <div className="p-3 rounded-circle bg-warning-subtle text-warning fs-4">
                <i className="bi bi-cash-stack"></i>
              </div>
              <div>
                <small className="text-muted fw-bold">{isTh ? "ยอดรวมอะไหล่" : "Subtotal Parts"}</small>
                <h5 className="fw-black mb-0 text-sp-blue">฿{subtotal.toLocaleString("th-TH")}</h5>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card bg-white border-0 shadow-sm p-3 rounded-3 d-flex flex-row align-items-center gap-3">
              <div className="p-3 rounded-circle bg-info-subtle text-info fs-4">
                <i className="bi bi-file-earmark-text-fill"></i>
              </div>
              <div>
                <small className="text-muted fw-bold">{isTh ? "VAT 7% (รวมในบิล)" : "VAT 7% (Tax Included)"}</small>
                <h5 className="fw-black mb-0 text-dark">฿{vat.toLocaleString("th-TH", { maximumFractionDigits: 0 })}</h5>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="card bg-white border-0 shadow-sm p-3 rounded-3 d-flex flex-row align-items-center gap-3">
              <div className="p-3 rounded-circle bg-success-subtle text-success fs-4">
                <i className="bi bi-truck"></i>
              </div>
              <div>
                <small className="text-muted fw-bold">{isTh ? "บริการจัดส่งด่วน" : "Express Shipping"}</small>
                <h5 className="fw-black mb-0 text-success">{isTh ? "ฟรีทั่วไทย" : "Free Nationwide"}</h5>
              </div>
            </div>
          </div>
        </div>

        {cart.length === 0 ? (
          /* ตะกร้าว่างเปล่า */
          <div className="card bg-white border-0 shadow-sm p-5 text-center my-4 rounded-4">
            <div className="mb-3">
              <i className="bi bi-cart-x text-muted" style={{ fontSize: "4.5rem" }}></i>
            </div>
            <h4 className="fw-bold text-dark mb-2">{isTh ? "ยังไม่มีรายการอะไหล่ในตะกร้า" : "Your Parts Cart is Empty"}</h4>
            <p className="text-muted">
              {isTh
                ? "สามารถเข้าไปเลือกดูอะไหล่แท้และ OEM จากคลังสินค้า ServiceGarage ได้ทันที"
                : "Browse our catalog of genuine OEM parts and supplies for your vehicle."}
            </p>
            <div className="mt-3">
              <button className="btn btn-garage-unique px-4 py-2" onClick={onContinueShopping}>
                <i className="bi bi-search me-1"></i> {isTh ? "ไปยังหน้าร้านค้าอะไหล่" : "Go to Parts Catalog"}
              </button>
            </div>
          </div>
        ) : (
          /* รายการสินค้าในตะกร้า & ฟอร์มสั่งซื้อ */
          <div className="row g-4">
            {/* รายการสินค้าในตะกร้า (ซ้ายมือ) */}
            <div className="col-12 col-lg-8">
              <div className="card border-0 shadow-sm bg-white rounded-4 p-4 mb-4">
                <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom">
                  <h5 className="fw-black text-dark mb-0 d-flex align-items-center gap-2">
                    <i className="bi bi-list-check text-sp-blue"></i>
                    <span>{isTh ? `รายการอะไหล่ในคำสั่งซื้อ (${cart.length} ชนิด)` : `Cart Items (${cart.length} items)`}</span>
                  </h5>
                  <button
                    className="btn btn-outline-secondary btn-sm rounded-pill px-3"
                    onClick={onClearCart}
                  >
                    <i className="bi bi-trash3 me-1"></i> {isTh ? "ล้างตะกร้า" : "Clear Cart"}
                  </button>
                </div>

                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead className="table-light">
                      <tr className="small text-muted text-uppercase">
                        <th style={{ width: "90px" }}>{isTh ? "รูปสินค้า" : "Image"}</th>
                        <th>{isTh ? "รายละเอียดอะไหล่" : "Part Details"}</th>
                        <th className="text-center" style={{ width: "130px" }}>{isTh ? "ราคาต่อชิ้น" : "Unit Price"}</th>
                        <th className="text-center" style={{ width: "130px" }}>{isTh ? "จำนวน" : "Quantity"}</th>
                        <th className="text-end" style={{ width: "120px" }}>{isTh ? "ยอดรวม" : "Total"}</th>
                        <th className="text-center" style={{ width: "50px" }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => {
                        const itemTotal = item.price * item.quantity;
                        return (
                          <tr key={item.part_id}>
                            {/* รูปภาพสินค้า */}
                            <td>
                              <div
                                className="bg-light rounded-3 p-1 d-flex align-items-center justify-content-center"
                                style={{ width: "70px", height: "70px" }}
                              >
                                <ProductImage
                                  partId={item.part_id}
                                  partName={item.part_name}
                                  height="60px"
                                />
                              </div>
                            </td>

                            {/* รายละเอียด */}
                            <td>
                              <div className="badge bg-light text-secondary border font-monospace mb-1 small">
                                {item.part_id}
                              </div>
                              <div className="fw-bold text-dark" style={{ fontSize: "0.95rem" }}>
                                {item.part_name}
                              </div>
                              <small className="text-muted">
                                {isTh ? `สต็อกคงเหลือ: ${item.stock_qty} ชิ้น` : `In Stock: ${item.stock_qty} pcs`}
                              </small>
                            </td>

                            {/* ราคาต่อชิ้น */}
                            <td className="text-center fw-semibold text-muted">
                              ฿{item.price.toLocaleString("th-TH")}
                            </td>

                            {/* ตัวปรับจำนวน */}
                            <td className="text-center">
                              <div className="input-group input-group-sm mx-auto" style={{ width: "95px" }}>
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary px-2"
                                  onClick={() => onUpdateQty(item.part_id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </button>
                                <input
                                  type="text"
                                  className="form-control text-center px-1 fw-bold"
                                  value={item.quantity}
                                  readOnly
                                />
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary px-2"
                                  onClick={() => onUpdateQty(item.part_id, item.quantity + 1)}
                                  disabled={item.quantity >= item.stock_qty}
                                >
                                  +
                                </button>
                              </div>
                            </td>

                            {/* ยอดรวมต่อแถว */}
                            <td className="text-end fw-black text-sp-blue fs-6">
                              ฿{itemTotal.toLocaleString("th-TH", { minimumFractionDigits: 0 })}
                            </td>

                            {/* ลบ */}
                            <td className="text-center">
                              <button
                                className="btn btn-link text-danger p-0"
                                onClick={() => onRemoveItem(item.part_id)}
                                title={isTh ? "ลบรายการนี้" : "Remove this item"}
                              >
                                <i className="bi bi-x-circle fs-5"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                  <button
                    className="btn btn-outline-sp-primary btn-sm px-3 rounded-pill"
                    onClick={onContinueShopping}
                  >
                    <i className="bi bi-plus-lg me-1"></i> {isTh ? "เพิ่มอะไหล่รายการอื่น" : "Add More Parts"}
                  </button>

                  <div className="text-end text-muted small">
                    {isTh ? "ราคาส่งมาตรฐาน ServiceGarage คำนวณตามจริง" : "Standard wholesale pricing with transparent calculation"}
                  </div>
                </div>
              </div>
            </div>

            {/* สรุปยอดและฟอร์มข้อมูลจัดส่ง (ขวามือ) */}
            <div className="col-12 col-lg-4">
              <div className="card border-0 shadow-sm bg-white rounded-4 p-4 mb-4">
                <h5 className="fw-black text-dark mb-3 pb-2 border-bottom">
                  {isTh ? "สรุปการสั่งซื้อ (Order Summary)" : "Order Summary"}
                </h5>

                {/* โค้ดส่วนลด */}
                <form onSubmit={handleApplyCoupon} className="mb-3">
                  <label className="form-label small fw-bold text-muted">{isTh ? "โค้ดส่วนลดโปรโมชั่น" : "Promotion / Coupon Code"}</label>
                  <div className="input-group input-group-sm">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={isTh ? "ใส่โค้ด เช่น GARAGE35" : "e.g. GARAGE35"}
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button className="btn btn-garage-unique btn-sm px-3" type="submit">
                      {isTh ? "ใช้งาน" : "Apply"}
                    </button>
                  </div>
                  {couponApplied && (
                    <small className="text-success fw-bold mt-1 d-block">
                      <i className="bi bi-check-circle-fill"></i> {isTh ? `ใช้งานส่วนลดแล้ว -฿${couponDiscount.toLocaleString("th-TH")}` : `Discount applied -฿${couponDiscount.toLocaleString("th-TH")}`}
                    </small>
                  )}
                </form>

                {/* รายการคำนวณราคา */}
                <div className="d-flex justify-content-between mb-2 small">
                  <span className="text-muted">{isTh ? `ยอดรวมสินค้า (${totalItemCount} ชิ้น):` : `Subtotal (${totalItemCount} items):`}</span>
                  <span className="fw-semibold">฿{subtotal.toLocaleString("th-TH", { minimumFractionDigits: 2 })}</span>
                </div>

                {couponApplied && (
                  <div className="d-flex justify-content-between mb-2 small text-success">
                    <span>{isTh ? "ส่วนลดโปรโมชั่น:" : "Promo Discount:"}</span>
                    <span>-฿{couponDiscount.toLocaleString("th-TH", { minimumFractionDigits: 2 })}</span>
                  </div>
                )}

                <div className="d-flex justify-content-between mb-2 small">
                  <span className="text-muted">{isTh ? "ภาษีมูลค่าเพิ่ม (VAT 7%):" : "VAT (7%):"}</span>
                  <span className="fw-semibold">฿{vat.toLocaleString("th-TH", { minimumFractionDigits: 2 })}</span>
                </div>

                <div className="d-flex justify-content-between mb-3 small">
                  <span className="text-muted">{isTh ? "ค่าจัดส่งด่วน:" : "Express Shipping:"}</span>
                  <span className="text-success fw-bold">{isTh ? "ฟรี (Free Shipping)" : "Free"}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between align-items-baseline mb-4">
                  <span className="fw-black text-dark fs-5">{isTh ? "ยอดรวมสุทธิ:" : "Grand Total:"}</span>
                  <span className="fw-black text-sp-blue fs-3" style={{ letterSpacing: "-0.5px" }}>
                    ฿{grandTotal.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {/* ฟอร์มจัดส่ง */}
                <form onSubmit={handleCheckout}>
                  <div className="mb-2">
                    <label className="form-label small fw-bold text-dark mb-1">
                      {isTh ? "ชื่อผู้ติดต่อ / อู่ซ่อม" : "Contact / Garage Name"} <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder={isTh ? "เช่น สมชาย การช่าง" : "e.g. John Miller"}
                      value={checkoutName}
                      onChange={(e) => setCheckoutName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label small fw-bold text-dark mb-1">
                      {isTh ? "เบอร์โทรศัพท์ติดต่อ" : "Phone Number"} <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      className="form-control form-control-sm"
                      placeholder={isTh ? "เช่น 081-234-5678" : "e.g. 081-234-5678"}
                      value={checkoutPhone}
                      onChange={(e) => setCheckoutPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold text-dark mb-1">
                      {isTh ? "ที่อยู่จัดส่ง / สาขาอู่" : "Delivery Address / Garage Branch"}
                    </label>
                    <textarea
                      className="form-control form-control-sm"
                      rows="2"
                      placeholder={isTh ? "ระบุสถานที่จัดส่งหรือมารับเอง" : "Enter delivery address or request garage pickup"}
                      value={checkoutAddress}
                      onChange={(e) => setCheckoutAddress(e.target.value)}
                    ></textarea>
                  </div>

                  {/* วิธีชำระเงิน */}
                  <div className="mb-4">
                    <label className="form-label small fw-bold text-dark mb-2">{isTh ? "ช่องทางชำระเงิน" : "Payment Method"}</label>
                    <div className="d-flex flex-column gap-2 small">
                      <label className="form-check d-flex align-items-center gap-2 p-2 border rounded-3 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          className="form-check-input mt-0"
                          checked={paymentMethod === "transfer"}
                          onChange={() => setPaymentMethod("transfer")}
                        />
                        <span><i className="bi bi-qr-code-scan text-primary me-1"></i> {isTh ? "โอนเงินผ่าน PromptPay / ธนาคาร" : "Bank Transfer / PromptPay QR"}</span>
                      </label>
                      <label className="form-check d-flex align-items-center gap-2 p-2 border rounded-3 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          className="form-check-input mt-0"
                          checked={paymentMethod === "cod"}
                          onChange={() => setPaymentMethod("cod")}
                        />
                        <span><i className="bi bi-cash text-success me-1"></i> {isTh ? "เก็บเงินปลายทาง (COD)" : "Cash on Delivery (COD)"}</span>
                      </label>
                    </div>
                  </div>

                  {/* แจ้งเตือนเมื่อยังไม่ลงทะเบียนลูกค้า */}
                  {!currentCustomer && (
                    <div className="alert alert-warning py-2.5 px-3 small d-flex align-items-center justify-content-between mb-3 rounded-3 shadow-sm border-warning">
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-shield-lock-fill text-warning fs-5"></i>
                        <span className="text-dark fw-semibold">
                          {isTh ? "ยังไม่ได้ลงทะเบียนลูกค้า กรุณาลงทะเบียนก่อนสั่งซื้อ" : "Not registered yet. Please register before ordering."}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="btn btn-warning btn-sm py-1 px-3 fw-bold rounded-pill text-dark shadow-sm"
                        onClick={onOpenRegister}
                      >
                        {isTh ? "ลงทะเบียน" : "Register"}
                      </button>
                    </div>
                  )}

                  {/* ปุ่มยืนยันคำสั่งซื้อสไตล์ Unique Gradient */}
                  <button
                    type="submit"
                    className="btn btn-garage-fire w-100 py-3 fs-6 shadow"
                    disabled={loading}
                  >
                    {loading ? (
                      <span>{isTh ? "กำลังดำเนินการ..." : "Processing..."}</span>
                    ) : (
                      <>
                        <i className="bi bi-check2-circle fs-5"></i>
                        <span>{isTh ? `ยืนยันการสั่งซื้อ (฿${grandTotal.toLocaleString("th-TH", { minimumFractionDigits: 0 })})` : `Confirm Order (฿${grandTotal.toLocaleString("th-TH", { minimumFractionDigits: 0 })})`}</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
