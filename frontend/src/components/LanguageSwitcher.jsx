"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

/**
 * Vuexy Standard [A 文] Translation Icon
 * Matches the exact design of Vuexy / Materio admin navbar:
 * Front light card with 'A' over Back dark card with '文' glyph
 */
function VuexyTranslateIcon({ size = 22, isLight = false }) {
  const darkColor = isLight ? "#ffffff" : "#5d596c";
  const lightBg = isLight ? "rgba(255, 255, 255, 0.2)" : "#ffffff";
  const lightStroke = isLight ? "#ffffff" : "#5d596c";
  const lightTextColor = isLight ? "#ffffff" : "#5d596c";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ verticalAlign: "middle", display: "inline-block", flexShrink: 0 }}
    >
      {/* Back Dark Tile with '文' glyph */}
      <rect
        x="7.2"
        y="7.2"
        width="13.2"
        height="13.2"
        rx="2.8"
        fill={darkColor}
      />
      {/* Character '文' strokes */}
      <path
        d="M13.8 9.2 V10.2"
        stroke={isLight ? "#334155" : "#ffffff"}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M10.4 11.5 H17.2"
        stroke={isLight ? "#334155" : "#ffffff"}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M15.2 12.8 C14.3 14.6 12.8 16.2 11 17"
        stroke={isLight ? "#334155" : "#ffffff"}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M12.8 13.5 L16.8 17"
        stroke={isLight ? "#334155" : "#ffffff"}
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Front Light Tile with 'A' */}
      <rect
        x="3.6"
        y="3.6"
        width="13.2"
        height="13.2"
        rx="2.8"
        fill={lightBg}
        stroke={lightStroke}
        strokeWidth="1.4"
      />
      <text
        x="10.2"
        y="13.2"
        fontSize="9"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fill={lightTextColor}
        textAnchor="middle"
      >
        A
      </text>
    </svg>
  );
}

export default function LanguageSwitcher({ variant = "admin" }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentCode = lang === "th" ? "TH" : "EN";

  if (variant === "customer") {
    return (
      <div className="position-relative d-inline-block" ref={dropdownRef}>
        <button
          type="button"
          className="btn btn-sm btn-link text-decoration-none text-light p-1 d-flex align-items-center gap-1.5 opacity-90 hover-opacity-100 shadow-none"
          onClick={() => setOpen(!open)}
          style={{ fontSize: "0.82rem", fontWeight: 600 }}
          title={lang === "th" ? "เปลี่ยนภาษา (Language)" : "Switch Language"}
        >
          <VuexyTranslateIcon size={20} isLight={true} />
          <span style={{ letterSpacing: "0.5px" }}>{currentCode}</span>
          <i className="bi bi-chevron-down opacity-50" style={{ fontSize: "0.6rem" }}></i>
        </button>

        {open && (
          <div
            className="position-absolute end-0 mt-1.5 bg-white rounded-3 shadow-lg border p-1"
            style={{ minWidth: "150px", zIndex: 1100 }}
          >
            <button
              type="button"
              className={`btn btn-sm w-100 text-start px-2.5 py-1.5 rounded-2 d-flex align-items-center justify-content-between ${
                lang === "th" ? "bg-primary text-white fw-bold" : "text-dark hover-bg-light"
              }`}
              onClick={() => {
                setLang("th");
                setOpen(false);
              }}
            >
              <span>ภาษาไทย (TH)</span>
              {lang === "th" && <i className="bi bi-check2"></i>}
            </button>
            <button
              type="button"
              className={`btn btn-sm w-100 text-start px-2.5 py-1.5 rounded-2 d-flex align-items-center justify-content-between mt-1 ${
                lang === "en" ? "bg-primary text-white fw-bold" : "text-dark hover-bg-light"
              }`}
              onClick={() => {
                setLang("en");
                setOpen(false);
              }}
            >
              <span>English (EN)</span>
              {lang === "en" && <i className="bi bi-check2"></i>}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Admin Variant (Exact Vuexy [A 文] EN Style)
  return (
    <div className="position-relative d-inline-block" ref={dropdownRef}>
      <button
        type="button"
        className="btn btn-sm btn-link text-decoration-none p-1.5 d-flex align-items-center gap-1.5 rounded-2 hover-bg-light shadow-none transition-all"
        style={{
          color: "#5d596c",
          border: "none",
        }}
        onClick={() => setOpen(!open)}
        title={lang === "th" ? "เปลี่ยนภาษา (Change Language)" : "Switch Language"}
      >
        {/* Exact [A 文] Graphic */}
        <VuexyTranslateIcon size={22} isLight={false} />

        {/* Text EN / TH */}
        <span
          className="fw-semibold"
          style={{
            fontSize: "0.95rem",
            color: "#5d596c",
            letterSpacing: "0.3px",
            lineHeight: 1,
          }}
        >
          {currentCode}
        </span>
      </button>

      {open && (
        <div
          className="position-absolute end-0 mt-2 bg-white rounded-3 shadow-lg border p-1.5 animate-fade-in"
          style={{
            minWidth: "155px",
            zIndex: 1060,
            borderColor: "rgba(75, 70, 92, 0.1)",
            boxShadow: "0 10px 30px rgba(75, 70, 92, 0.14)",
          }}
        >
          <div className="px-2 py-1 text-uppercase text-muted fw-bold" style={{ fontSize: "0.65rem", letterSpacing: "0.5px" }}>
            Select Language
          </div>

          <button
            type="button"
            className={`btn btn-sm w-100 text-start px-2.5 py-1.5 rounded-2 d-flex align-items-center justify-content-between ${
              lang === "en" ? "text-white fw-bold shadow-sm" : "text-dark hover-bg-light"
            }`}
            style={{
              background: lang === "en" ? "#7367f0" : "transparent",
            }}
            onClick={() => {
              setLang("en");
              setOpen(false);
            }}
          >
            <span className="small">English (EN)</span>
            {lang === "en" && <i className="bi bi-check2"></i>}
          </button>

          <button
            type="button"
            className={`btn btn-sm w-100 text-start px-2.5 py-1.5 rounded-2 d-flex align-items-center justify-content-between mt-1 ${
              lang === "th" ? "text-white fw-bold shadow-sm" : "text-dark hover-bg-light"
            }`}
            style={{
              background: lang === "th" ? "#7367f0" : "transparent",
            }}
            onClick={() => {
              setLang("th");
              setOpen(false);
            }}
          >
            <span className="small">ภาษาไทย (TH)</span>
            {lang === "th" && <i className="bi bi-check2"></i>}
          </button>
        </div>
      )}
    </div>
  );
}
