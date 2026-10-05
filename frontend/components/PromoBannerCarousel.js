"use client";

export default function PromoBannerCarousel({ onShopNow, onEstimate }) {
  return (
    <div
      className="position-relative overflow-hidden rounded-4 shadow-sm mb-4 cursor-pointer select-none"
      style={{
        cursor: "pointer",
        backgroundColor: "#001a38",
        aspectRatio: "1024 / 371",
        maxHeight: "420px",
      }}
      onClick={onShopNow}
      title="คลิกเพื่อสั่งซื้ออะไหล่หรือรับส่วนลดพิเศษทันที"
    >
      <img
        src="/images/banners/banner_revitalize.png"
        alt="Revitalize & Refine คืนสภาพรถของคุณให้เหมือนใหม่ - โปรโมชันคูปองส่วนลดสูงสุด 25%"
        className="w-100 h-100"
        style={{
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
        }}
      />
    </div>
  );
}
