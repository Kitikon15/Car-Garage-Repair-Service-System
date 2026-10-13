"use client";

import { useState } from "react";

export default function ProductImage({
  partId,
  partName = "อะไหล่รถยนต์",
  imageUrl,
  size = "card", // 'sm' | 'md' | 'lg' | 'card'
  height,
  className = "",
  style = {},
}) {
  const [imgError, setImgError] = useState(false);

  const finalSrc = imageUrl || `/images/parts/${partId}.jpg`;

  // กำหนดขนาดตาม size prop
  let containerStyle = {
    backgroundColor: "#ffffff",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...style,
  };

  let imgMaxHeight = "140px";

  if (size === "sm") {
    containerStyle = {
      ...containerStyle,
      width: "48px",
      height: "48px",
      borderRadius: "0.5rem",
      border: "1px solid #e2e8f0",
      flexShrink: 0,
    };
    imgMaxHeight = "44px";
  } else if (size === "md") {
    containerStyle = {
      ...containerStyle,
      width: "80px",
      height: "80px",
      borderRadius: "0.6rem",
      border: "1px solid #e2e8f0",
      flexShrink: 0,
    };
    imgMaxHeight = "72px";
  } else if (size === "lg") {
    containerStyle = {
      ...containerStyle,
      width: "120px",
      height: "120px",
      borderRadius: "0.75rem",
      border: "1px solid #e2e8f0",
    };
    imgMaxHeight = "110px";
  } else if (size === "card") {
    containerStyle = {
      ...containerStyle,
      width: "100%",
      height: "160px",
      borderRadius: "0.65rem",
      border: "1px solid #e9eef5",
      background: "radial-gradient(circle at center, #ffffff 0%, #f8fafc 100%)",
    };
    imgMaxHeight = "145px";
  }

  if (height) {
    containerStyle.height = height;
    imgMaxHeight = `calc(${height} - 16px)`;
  }

  if (imgError) {
    return (
      <div
        className={`sp-img-fallback d-flex flex-column align-items-center justify-content-center text-muted ${className}`}
        style={containerStyle}
        title={partName}
      >
        <i className="bi bi-gear-wide-connected fs-2 text-sp-blue opacity-50"></i>
        <span className="font-monospace small opacity-75 mt-1" style={{ fontSize: "0.65rem" }}>
          {partId}
        </span>
      </div>
    );
  }

  return (
    <div className={`sp-img-container ${className}`} style={containerStyle}>
      <img
        src={finalSrc}
        alt={partName}
        loading="lazy"
        onError={() => setImgError(true)}
        className="img-fluid"
        style={{
          maxHeight: imgMaxHeight,
          maxWidth: "92%",
          objectFit: "contain",
          transition: "transform 0.3s ease",
        }}
      />
    </div>
  );
}
