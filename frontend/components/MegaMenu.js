"use client";

import { useState, useRef, useEffect } from "react";

export const megaMenuData = {
  fluids: {
    id: "fluids",
    name: "น้ำมันเครื่องและของเหลว",
    columns: [
      {
        groups: [
          {
            title: "น้ำมันเครื่อง",
            items: [
              { label: "น้ำมันเครื่องเบนซิน", query: "น้ำมันเครื่อง เบนซิน" },
              { label: "น้ำมันเครื่องดีเซล", query: "น้ำมันเครื่อง ดีเซล" },
              { label: "น้ำมันเครื่องมอเตอร์ไซค์", query: "น้ำมันเครื่อง มอเตอร์ไซค์" },
            ],
          },
          {
            title: "น้ำมันเกียร์",
            items: [
              { label: "น้ำมันเกียร์อัตโนมัติทั่วไป", query: "น้ำมันเกียร์ อัตโนมัติ" },
              { label: "น้ำมันเกียร์อัตโนมัติ CVT", query: "น้ำมันเกียร์ CVT" },
              { label: "น้ำมันเกียร์ธรรมดา", query: "น้ำมันเกียร์ ธรรมดา" },
            ],
          },
          {
            title: "น้ำยาหล่อเย็นหม้อน้ำ",
            query: "น้ำยาหล่อเย็นหม้อน้ำ",
            isDirect: true,
          },
          {
            title: "น้ำยาแอร์",
            query: "น้ำยาแอร์ R134a",
            isDirect: true,
          },
        ],
      },
      {
        groups: [
          { title: "น้ำมันเบรก", query: "น้ำมันเบรก DOT", isDirect: true },
          { title: "น้ำมันพวงมาลัยพาวเวอร์", query: "น้ำมันพวงมาลัยพาวเวอร์", isDirect: true },
          { title: "น้ำยาล้างหัวฉีด", query: "น้ำยาล้างหัวฉีด", isDirect: true },
          { title: "น้ำมันเฟืองท้าย", query: "น้ำมันเฟืองท้าย", isDirect: true },
          { title: "น้ำยาล้างคาร์บูเรเตอร์", query: "น้ำยาล้างคาร์บูเรเตอร์", isDirect: true },
          { title: "น้ำมันไฮดรอลิค", query: "น้ำมันไฮดรอลิค", isDirect: true },
          { title: "ฟลัชชิ่งออยล์", query: "ฟลัชชิ่งออยล์", isDirect: true },
        ],
      },
    ],
    brands: [
      { name: "ENEOS", logo: "/images/part_brands/logo_eneos.png", query: "ENEOS" },
      { name: "Valvoline", logo: "/images/part_brands/logo_valvoline.png", query: "Valvoline" },
      { name: "Shell", logo: "/images/part_brands/logo_shell.png", query: "Shell" },
      { name: "MOTUL", logo: "/images/part_brands/logo_motul.png", query: "MOTUL" },
      { name: "Mobil", logo: "/images/part_brands/logo_mobil.png", query: "Mobil" },
      { name: "PTT", logo: "/images/part_brands/logo_ptt.png", query: "PTT" },
      { name: "TRES", logo: "/images/part_brands/logo_tres.png", query: "TRES" },
      { name: "Castrol", logo: "/images/part_brands/logo_castrol.png", query: "Castrol" },
      { name: "CALTEX", logo: "/images/part_brands/logo_caltex.png", query: "CALTEX" },
      { name: "ACDelco", logo: "/images/part_brands/logo_acdelco.png", query: "ACDelco" },
      { name: "AISIN", logo: "/images/part_brands/logo_aisin.png", query: "AISIN" },
      { name: "PULZAR", logo: "/images/part_brands/logo_pulzar.png", query: "PULZAR" },
    ],
  },
  body: {
    id: "body",
    name: "ชิ้นส่วนตัวถัง",
    columns: [
      {
        groups: [
          {
            title: "ไฟและระบบส่องสว่าง",
            items: [
              { label: "ไฟหน้ารถยนต์", query: "ไฟหน้า" },
              { label: "ไฟท้าย", query: "ไฟท้าย" },
              { label: "ไฟตัดหมอก", query: "ไฟตัดหมอก" },
              { label: "ไฟเลี้ยวและไฟส่องป้าย", query: "ไฟเลี้ยว" },
            ],
          },
          {
            title: "กระจกและอุปกรณ์",
            items: [
              { label: "กระจกมองข้างไฟฟ้า", query: "กระจกมองข้าง" },
              { label: "เลนส์กระจกมองข้าง", query: "เลนส์กระจก" },
              { label: "กระจกบังลมหน้า", query: "กระจกบังลม" },
            ],
          },
        ],
      },
      {
        groups: [
          {
            title: "ชิ้นส่วนตัวถังภายนอก",
            items: [
              { label: "กันชนหน้า / กันชนหลัง", query: "กันชน" },
              { label: "หน้ากระจังรถยนต์", query: "กระจังหน้า" },
              { label: "ฝากระโปรงหน้า", query: "ฝากระโปรง" },
              { label: "แก้มบังโคลนหน้า-หลัง", query: "บังโคลน" },
              { label: "ซุ้มล้อและพลาสติกใต้เครื่อง", query: "ซุ้มล้อ" },
            ],
          },
          {
            title: "มือเปิดประตูและอุปกรณ์ล็อก",
            query: "มือเปิดประตู",
            isDirect: true,
          },
        ],
      },
    ],
    brands: [
      { name: "TYC", logo: "/images/part_brands/logo_3m.png", query: "TYC" },
      { name: "DEPO", logo: "/images/part_brands/logo_denso.png", query: "DEPO" },
      { name: "STANLEY", logo: "/images/part_brands/logo_bando.png", query: "Stanley" },
      { name: "KOITO", logo: "/images/part_brands/logo_bosch.png", query: "Koito" },
    ],
  },
  suspension: {
    id: "suspension",
    name: "ช่วงล่างและระบบเบรก",
    columns: [
      {
        groups: [
          {
            title: "ระบบเบรก",
            items: [
              { label: "ผ้าเบรกหน้า-หลัง", query: "ผ้าเบรก" },
              { label: "จานดิสก์เบรก", query: "จานเบรก" },
              { label: "ก้ามเบรก / ดรัมเบรก", query: "ก้ามเบรก" },
              { label: "แม่ปั๊มเบรกและกระบอกเบรก", query: "ปั๊มเบรก" },
            ],
          },
          {
            title: "โช้คอัพและสปริง",
            items: [
              { label: "โช้คอัพแก๊ส / น้ำมัน", query: "โช้คอัพ" },
              { label: "สปริงโช้คอัพ", query: "สปริง" },
              { label: "ยางกันฝุ่น / เบ้าโช้ค", query: "เบ้าโช้ค" },
            ],
          },
        ],
      },
      {
        groups: [
          {
            title: "ระบบบังคับเลี้ยวและลูกหมาก",
            items: [
              { label: "ลูกหมากคันชักนอก-ใน", query: "ลูกหมากคันชัก" },
              { label: "ลูกหมากปีกนกบน-ล่าง", query: "ลูกหมากปีกนก" },
              { label: "ลูกหมากแร็คพวงมาลัย", query: "ลูกหมากแร็ค" },
              { label: "ลูกหมากกันโคลง", query: "ลูกหมากกันโคลง" },
            ],
          },
          { title: "ลูกปืนล้อและดุมล้อ", query: "ลูกปืนล้อ", isDirect: true },
          { title: "เพลาขับและยางหุ้มเพลา", query: "เพลาขับ", isDirect: true },
          { title: "ปีกนกและบูชปีกนก", query: "บูชปีกนก", isDirect: true },
        ],
      },
    ],
    brands: [
      { name: "Brembo", logo: "/images/part_brands/logo_brembo.png", query: "Brembo" },
      { name: "TRW", logo: "/images/part_brands/logo_trw.png", query: "TRW" },
      { name: "Monroe", logo: "/images/part_brands/logo_monroe.png", query: "Monroe" },
      { name: "Bando", logo: "/images/part_brands/logo_bando.png", query: "Bando" },
      { name: "Bosch", logo: "/images/part_brands/logo_bosch.png", query: "Bosch" },
      { name: "AISIN", logo: "/images/part_brands/logo_aisin.png", query: "AISIN" },
    ],
  },
  cooling: {
    id: "cooling",
    name: "ระบบระบายความร้อน",
    columns: [
      {
        groups: [
          {
            title: "หม้อน้ำและฝาหม้อน้ำ",
            items: [
              { label: "หม้อน้ำรถยนต์เกรดแท้", query: "หม้อน้ำ" },
              { label: "ฝาหม้อน้ำแรงดันสูง", query: "ฝาหม้อน้ำ" },
              { label: "ถังพักน้ำสำรอง", query: "ถังพักน้ำ" },
            ],
          },
          {
            title: "พัดลมและมอเตอร์",
            items: [
              { label: "มอเตอร์พัดลมหม้อน้ำ", query: "มอเตอร์พัดลม" },
              { label: "ใบพัดลมหม้อน้ำ", query: "ใบพัดลม" },
              { label: "โครงพัดลมหม้อน้ำ", query: "โครงพัดลม" },
            ],
          },
        ],
      },
      {
        groups: [
          { title: "ปั๊มน้ำเครื่องยนต์", query: "ปั๊มน้ำ", isDirect: true },
          { title: "วาล์วน้ำและคอห่าน", query: "วาล์วน้ำ", isDirect: true },
          { title: "ท่อยางหม้อน้ำบน-ล่าง", query: "ท่อยางหม้อน้ำ", isDirect: true },
          { title: "น้ำยาหล่อเย็นหม้อน้ำ", query: "น้ำยาหล่อเย็น", isDirect: true },
        ],
      },
    ],
    brands: [
      { name: "Denso", logo: "/images/part_brands/logo_denso.png", query: "Denso" },
      { name: "Valvoline", logo: "/images/part_brands/logo_valvoline.png", query: "Valvoline" },
      { name: "AISIN", logo: "/images/part_brands/logo_aisin.png", query: "AISIN" },
      { name: "Bosch", logo: "/images/part_brands/logo_bosch.png", query: "Bosch" },
    ],
  },
  engine: {
    id: "engine",
    name: "ระบบเครื่องยนต์และส่งกำลัง",
    columns: [
      {
        groups: [
          {
            title: "ระบบจุดระเบิด",
            items: [
              { label: "หัวเทียนอิริเดียม / แพลทินัม", query: "หัวเทียน" },
              { label: "คอยล์จุดระเบิด", query: "คอยล์จุดระเบิด" },
              { label: "สายหัวเทียน", query: "สายหัวเทียน" },
            ],
          },
          {
            title: "สายพานและลูกรอก",
            items: [
              { label: "สายพานไทม์มิ่ง", query: "สายพานไทม์มิ่ง" },
              { label: "สายพานหน้าเครื่อง", query: "สายพานหน้าเครื่อง" },
              { label: "ลูกรอกสายพาน", query: "ลูกรอก" },
            ],
          },
        ],
      },
      {
        groups: [
          {
            title: "ระบบส่งกำลังและคลัตช์",
            items: [
              { label: "จานคลัตช์และหวีคลัตช์", query: "คลัตช์" },
              { label: "ลูกปืนกดคลัตช์", query: "ลูกปืนคลัตช์" },
              { label: "แม่ปั๊มคลัตช์บน-ล่าง", query: "ปั๊มคลัตช์" },
            ],
          },
          { title: "ปะเก็นฝาสูบและชุดปะเก็น", query: "ปะเก็น", isDirect: true },
          { title: "กรองน้ำมันเครื่องและกรองอากาศ", query: "กรองน้ำมันเครื่อง", isDirect: true },
        ],
      },
    ],
    brands: [
      { name: "NGK", logo: "/images/part_brands/logo_ngk.png", query: "NGK" },
      { name: "Denso", logo: "/images/part_brands/logo_denso.png", query: "Denso" },
      { name: "Bando", logo: "/images/part_brands/logo_bando.png", query: "Bando" },
      { name: "AISIN", logo: "/images/part_brands/logo_aisin.png", query: "AISIN" },
      { name: "Bosch", logo: "/images/part_brands/logo_bosch.png", query: "Bosch" },
      { name: "Mobil", logo: "/images/part_brands/logo_mobil.png", query: "Mobil" },
    ],
  },
  paint: {
    id: "paint",
    name: "ซ่อมสีและตัวถัง",
    columns: [
      {
        groups: [
          {
            title: "สีพ่นรถยนต์",
            items: [
              { label: "สีสเปรย์เทียบเบอร์ศูนย์", query: "สีสเปรย์" },
              { label: "สีรองพื้นกันสนิม", query: "สีรองพื้น" },
              { label: "แล็กเกอร์เคลือบเงา 2K", query: "แล็กเกอร์" },
            ],
          },
          {
            title: "สีโป๊วและสารเร่ง",
            items: [
              { label: "สีโป๊วพลาสติกเหลือง", query: "สีโป๊ว" },
              { label: "น้ำยาเร่งแข็ง Hardener", query: "Hardener" },
            ],
          },
        ],
      },
      {
        groups: [
          { title: "กระดาษทรายน้ำและจานขัด", query: "กระดาษทราย", isDirect: true },
          { title: "เทปกาวพ่นสีและกระดาษกั้น", query: "เทปกาวพ่นสี", isDirect: true },
          { title: "น้ำยาเช็ดคราบไขมันซิลิโคน", query: "น้ำยาเช็ดคราบ", isDirect: true },
          { title: "กาพ่นสีและอุปกรณ์ลม", query: "กาพ่นสี", isDirect: true },
        ],
      },
    ],
    brands: [
      { name: "3M", logo: "/images/part_brands/logo_3m.png", query: "3M" },
      { name: "NIPPON", logo: "/images/part_brands/logo_bando.png", query: "Nippon Paint" },
      { name: "TOA", logo: "/images/part_brands/logo_valvoline.png", query: "TOA" },
    ],
  },
  care: {
    id: "care",
    name: "สินค้าดูแลรถยนต์",
    columns: [
      {
        groups: [
          {
            title: "ดูแลภายนอก",
            items: [
              { label: "แชมพูล้างรถผสมแว็กซ์", query: "แชมพูล้างรถ" },
              { label: "แว็กซ์เคลือบเงาสีรถ", query: "แว็กซ์เคลือบสี" },
              { label: "น้ำยาเคลือบกระจกไล่น้ำ", query: "เคลือบกระจก" },
              { label: "น้ำยาเคลือบยางดำเงา", query: "เคลือบยาง" },
            ],
          },
        ],
      },
      {
        groups: [
          {
            title: "ดูแลภายในและห้องเครื่อง",
            items: [
              { label: "น้ำยาฟอกเบาะผ้าและหนัง", query: "ฟอกเบาะ" },
              { label: "น้ำยาเคลือบเงาคอนโซล", query: "เคลือบคอนโซล" },
              { label: "สเปรย์ล้างห้องเครื่อง", query: "ล้างห้องเครื่อง" },
              { label: "สเปรย์ขจัดกลิ่นอับ", query: "สเปรย์ปรับอากาศ" },
            ],
          },
        ],
      },
    ],
    brands: [
      { name: "3M", logo: "/images/part_brands/logo_3m.png", query: "3M" },
      { name: "Valvoline", logo: "/images/part_brands/logo_valvoline.png", query: "Valvoline" },
      { name: "Shell", logo: "/images/part_brands/logo_shell.png", query: "Shell" },
      { name: "ACDelco", logo: "/images/part_brands/logo_acdelco.png", query: "ACDelco" },
    ],
  },
};

const categoryIcons = {
  fluids: "bi-droplet-half",
  body: "bi-car-front",
  suspension: "bi-shield-shaded",
  cooling: "bi-snow",
  engine: "bi-gear-wide-connected",
  paint: "bi-paint-bucket",
  care: "bi-stars",
};

const categoryDescriptions = {
  fluids: "น้ำมันเครื่องสังเคราะห์แท้ น้ำมันเกียร์ น้ำยาหล่อเย็น และเคมีภัณฑ์มาตรฐานสากล",
  body: "ไฟหน้า-ท้าย กันชน กระจกมองข้าง และชิ้นส่วนตัวถังมาตรฐาน OEM เข้ารูป 100%",
  suspension: "ระบบเบรก Brembo/TRW โช้คอัพ สปริง ลูกหมาก และชุดควบคุมช่วงล่าง",
  cooling: "หม้อน้ำ พัดลมไฟฟ้า วาล์วน้ำ และระบบระบายความร้อนเครื่องยนต์",
  engine: "หัวเทียน สายพาน ไส้กรอง ปะเก็น และชิ้นส่วนระบบเครื่องยนต์ส่งกำลัง",
  paint: "สีสเปรย์ สีโป๊ว น้ำยาขัดเงา และอุปกรณ์ซ่อมแซมสีตัวถังรถยนต์",
  care: "แชมพูล้างรถ เคลือบแก้ว น้ำยาทำความสะอาดภายใน และอุปกรณ์คาร์แคร์",
};

export default function MegaMenu({
  activeCategoryKey,
  onClose,
  onSelectItem,
  onSelectBrand,
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!activeCategoryKey || !megaMenuData[activeCategoryKey]) {
    return null;
  }

  const category = megaMenuData[activeCategoryKey];

  return (
    <>
      {/* 1. Backdrop Overlay (ฉากหลังมืดแบบโปร่งแสง) */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{
          backgroundColor: "rgba(15, 23, 42, 0.55)",
          backdropFilter: "blur(3px)",
          zIndex: 1040,
          transition: "opacity 0.2s ease-in-out",
        }}
        onClick={onClose}
      />

      {/* 2. Mega Menu Container (การ์ดดีไซน์ระดับพรีเมียม สไตล์ Red & White) */}
      <div
        ref={modalRef}
        className="position-absolute start-50 translate-middle-x mega-menu-card"
        style={{
          top: "100%",
          width: "96%",
          maxWidth: "1120px",
          zIndex: 1050,
          marginTop: "4px",
        }}
      >
        {/* ส่วนหัว Mega Menu พรีเมียม (Header Bar) */}
        <div
          className="d-flex flex-wrap align-items-center justify-content-between p-3 px-md-4 border-bottom"
          style={{
            background: "linear-gradient(90deg, #fef2f2 0%, #ffffff 100%)",
            borderColor: "#fee2e2",
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <div
              className="rounded-3 d-flex align-items-center justify-content-center text-white shadow-sm"
              style={{
                width: "44px",
                height: "44px",
                background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
              }}
            >
              <i className={`bi ${categoryIcons[category.id] || "bi-grid-fill"} fs-4 text-warning`}></i>
            </div>
            <div>
              <div className="d-flex align-items-center gap-2">
                <h5 className="fw-black text-dark mb-0" style={{ letterSpacing: "-0.3px" }}>
                  {category.name}
                </h5>
                <span className="badge bg-danger text-white small" style={{ fontSize: "0.68rem" }}>
                  อะไหล่แท้ 100%
                </span>
              </div>
              <p className="text-muted mb-0 small" style={{ fontSize: "0.82rem" }}>
                {categoryDescriptions[category.id] || "ศูนย์รวมอะไหล่รถยนต์คุณภาพสูง คัดสรรเฉพาะแบรนด์มาตรฐาน"}
              </p>
            </div>
          </div>

          {/* Quick Actions & Close */}
          <div className="d-flex align-items-center gap-2 mt-2 mt-md-0">
            <button
              type="button"
              className="btn btn-garage-unique btn-sm px-3 py-2 shadow-sm d-flex align-items-center gap-1"
              onClick={() => {
                onSelectItem && onSelectItem("", category.id);
                onClose();
              }}
              title="ดูสินค้าทั้งหมดในหมวดนี้"
            >
              <i className="bi bi-box-seam-fill"></i>
              <span>ดูสินค้าทั้งหมดในหมวดนี้</span>
              <i className="bi bi-arrow-right ms-1"></i>
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "34px", height: "34px" }}
              onClick={onClose}
              title="ปิดหน้าต่างเมนู"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </div>

        {/* เนื้อหาภายในแบ่งเป็น 3 คอลัมน์ที่ชัดเจน มีสัดส่วน */}
        <div className="p-3 p-md-4">
          <div className="row g-4">
            {/* คอลัมน์ที่ 1: หมวดหมู่ย่อยกลุ่มที่ 1 */}
            <div className="col-12 col-md-4 border-end-md">
              {category.columns[0]?.groups?.map((group, gIdx) => (
                <div key={gIdx} className={gIdx > 0 ? "mt-3 pt-1" : ""}>
                  {group.isDirect ? (
                    <button
                      type="button"
                      className="btn btn-link w-100 text-start text-decoration-none mega-direct-link"
                      onClick={() => {
                        onSelectItem && onSelectItem(group.query, category.id);
                        onClose();
                      }}
                    >
                      <span className="d-flex align-items-center gap-2">
                        <i className="bi bi-record-circle text-danger small"></i>
                        <span>{group.title}</span>
                      </span>
                      <i className="bi bi-chevron-right small text-muted mega-arrow"></i>
                    </button>
                  ) : (
                    <>
                      <div className="d-flex align-items-center gap-2 mb-2 pb-1 border-bottom border-light">
                        <span
                          className="d-inline-block rounded-pill"
                          style={{ width: "3.5px", height: "14px", backgroundColor: "#dc2626" }}
                        />
                        <h6
                          className="fw-bold text-dark mb-0"
                          style={{ fontSize: "0.96rem", letterSpacing: "-0.2px" }}
                        >
                          {group.title}
                        </h6>
                      </div>
                      <div className="d-flex flex-column gap-1 ps-1">
                        {group.items?.map((item, iIdx) => (
                          <button
                            key={iIdx}
                            type="button"
                            className="btn btn-link text-start text-decoration-none mega-sub-link"
                            onClick={() => {
                              onSelectItem && onSelectItem(item.query, category.id);
                              onClose();
                            }}
                          >
                            <span className="d-flex align-items-center gap-2">
                              <i className="bi bi-chevron-right text-danger opacity-50 small" style={{ fontSize: "0.7rem" }}></i>
                              <span>{item.label}</span>
                            </span>
                            <i className="bi bi-arrow-up-right small text-muted opacity-0 mega-arrow" style={{ fontSize: "0.75rem" }}></i>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* คอลัมน์ที่ 2: หมวดหมู่ย่อยกลุ่มที่ 2 */}
            <div className="col-12 col-md-4 border-end-md ps-md-4">
              {/* หัวข้อสำหรับกลุ่ม direct links ในคอลัมน์ที่ 2 */}
              {category.columns[1]?.groups?.[0]?.isDirect && (
                <div className="d-flex align-items-center gap-2 mb-2 pb-1 border-bottom border-light">
                  <span
                    className="d-inline-block rounded-pill"
                    style={{ width: "3.5px", height: "14px", backgroundColor: "#f59e0b" }}
                  />
                  <h6
                    className="fw-bold text-dark mb-0"
                    style={{ fontSize: "0.96rem", letterSpacing: "-0.2px" }}
                  >
                    ผลิตภัณฑ์เฉพาะระบบและการดูแล
                  </h6>
                </div>
              )}

              {category.columns[1]?.groups?.map((group, gIdx) => (
                <div key={gIdx} className={gIdx > 0 && !group.isDirect ? "mt-3 pt-1" : ""}>
                  {group.isDirect ? (
                    <button
                      type="button"
                      className="btn btn-link w-100 text-start text-decoration-none mega-direct-link mb-1"
                      onClick={() => {
                        onSelectItem && onSelectItem(group.query, category.id);
                        onClose();
                      }}
                    >
                      <span className="d-flex align-items-center gap-2">
                        <i className="bi bi-record-circle text-danger small"></i>
                        <span>{group.title}</span>
                      </span>
                      <i className="bi bi-chevron-right small text-muted mega-arrow"></i>
                    </button>
                  ) : (
                    <>
                      <div className="d-flex align-items-center gap-2 mb-2 pb-1 border-bottom border-light">
                        <span
                          className="d-inline-block rounded-pill"
                          style={{ width: "3.5px", height: "14px", backgroundColor: "#dc2626" }}
                        />
                        <h6
                          className="fw-bold text-dark mb-0"
                          style={{ fontSize: "0.96rem", letterSpacing: "-0.2px" }}
                        >
                          {group.title}
                        </h6>
                      </div>
                      <div className="d-flex flex-column gap-1 ps-1">
                        {group.items?.map((item, iIdx) => (
                          <button
                            key={iIdx}
                            type="button"
                            className="btn btn-link text-start text-decoration-none mega-sub-link"
                            onClick={() => {
                              onSelectItem && onSelectItem(item.query, category.id);
                              onClose();
                            }}
                          >
                            <span className="d-flex align-items-center gap-2">
                              <i className="bi bi-chevron-right text-danger opacity-50 small" style={{ fontSize: "0.7rem" }}></i>
                              <span>{item.label}</span>
                            </span>
                            <i className="bi bi-arrow-up-right small text-muted opacity-0 mega-arrow" style={{ fontSize: "0.75rem" }}></i>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* คอลัมน์ที่ 3: ตารางแบรนด์สินค้าชั้นนำ */}
            <div className="col-12 col-md-4 ps-md-4">
              <div
                className="p-3 rounded-4"
                style={{
                  backgroundColor: "#fdfdfd",
                  border: "1px solid #f1f5f9",
                }}
              >
                <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                  <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-patch-check-fill text-warning fs-5"></i>
                    <span className="fw-bold text-dark" style={{ fontSize: "0.95rem" }}>
                      แบรนด์ผู้ผลิตชั้นนำ
                    </span>
                  </div>
                  <span className="badge bg-light text-muted border small" style={{ fontSize: "0.68rem" }}>
                    {category.brands?.length || 0} แบรนด์
                  </span>
                </div>

                <div className="row g-2 justify-content-center align-items-center">
                  {category.brands?.map((brand, bIdx) => (
                    <div className="col-4 text-center" key={bIdx}>
                      <div
                        className="mega-brand-card d-flex align-items-center justify-content-center p-2"
                        style={{
                          height: "64px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          onSelectBrand && onSelectBrand(brand.name);
                          onClose();
                        }}
                        title={`เลือกดูสินค้าแบรนด์ ${brand.name}`}
                      >
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="img-fluid"
                          style={{
                            maxHeight: "44px",
                            maxWidth: "76px",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-3 pt-2 border-top">
                  <small className="text-muted fw-semibold" style={{ fontSize: "0.74rem" }}>
                    <i className="bi bi-shield-lock-fill text-success me-1"></i>
                    อะไหล่แท้เบิกศูนย์และ OEM 100%
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* แถบล่าง Mega Menu (Footer Trust Badges) */}
        <div
          className="d-flex flex-wrap align-items-center justify-content-between p-3 px-md-4 border-top"
          style={{
            backgroundColor: "#f8fafc",
            fontSize: "0.82rem",
          }}
        >
          <div className="d-flex flex-wrap align-items-center gap-3 text-muted">
            <span className="d-flex align-items-center gap-1">
              <i className="bi bi-patch-check-fill text-success"></i> สินค้าแท้เบิกศูนย์และ OEM 100%
            </span>
            <span className="opacity-50 d-none d-sm-inline">•</span>
            <span className="d-flex align-items-center gap-1">
              <i className="bi bi-truck text-danger"></i> จัดส่งด่วน กทม. ภายใน 3 ชม.
            </span>
            <span className="opacity-50 d-none d-md-inline">•</span>
            <span className="d-flex align-items-center gap-1 d-none d-md-inline-flex">
              <i className="bi bi-receipt text-primary"></i> ออกใบเสร็จ / ใบกำกับภาษีเต็มรูป
            </span>
          </div>

          <div className="small text-muted fw-semibold mt-1 mt-sm-0">
            <i className="bi bi-info-circle text-warning me-1"></i> คลิกเลือกหมวดหรือแบรนด์เพื่อดูสินค้า
          </div>
        </div>
      </div>
    </>
  );
}
