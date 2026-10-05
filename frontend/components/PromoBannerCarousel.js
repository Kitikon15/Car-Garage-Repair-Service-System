"use client";

export default function PromoBannerCarousel({ onShopNow, onEstimate }) {
  return (
    <div
      className="w-100 rounded-4 overflow-hidden shadow-sm mb-4 cursor-pointer select-none"
      style={{
        cursor: "pointer",
        backgroundColor: "#001a38",
        width: "100%",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
      }}
      onClick={onShopNow}
      title="คลิกเพื่อสั่งซื้ออะไหล่หรือรับส่วนลดพิเศษทันที"
    >
      <img
        src="/images/banners/banner_revitalize.png"
        alt="Revitalize & Refine คืนสภาพรถของคุณให้เหมือนใหม่ - โปรโมชันคูปองส่วนลดสูงสุด 25%"
        className="w-100 h-auto d-block"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          objectFit: "contain",
        }}
      />
    </div>
  );
}
