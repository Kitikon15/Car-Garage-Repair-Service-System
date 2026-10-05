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

export default function MegaMenu({
  activeCategoryKey,
  onClose,
  onSelectItem,
  onSelectBrand,
}) {
  const modalRef = useRef(null);

  if (!activeCategoryKey || !megaMenuData[activeCategoryKey]) {
    return null;
  }

  const category = megaMenuData[activeCategoryKey];

  return (
    <>
      {/* 1. Backdrop Overlay (ฉากหลังมืดแบบโปร่งแสง สร้างมิติและความชัดเจนตามแบบ Superpart) */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{
          backgroundColor: "rgba(15, 23, 42, 0.55)",
          backdropFilter: "blur(2px)",
          zIndex: 1040,
          transition: "opacity 0.2s ease-in-out",
        }}
        onClick={onClose}
      />

      {/* 2. Mega Menu Container (การ์ดสีขาวขอบมน เงาลอย พรีเมียม ตรงตาม media_1791176439057.png) */}
      <div
        ref={modalRef}
        className="position-absolute start-50 translate-middle-x bg-white shadow-lg border-0"
        style={{
          top: "100%",
          width: "95%",
          maxWidth: "1040px",
          borderRadius: "18px",
          zIndex: 1050,
          marginTop: "6px",
          padding: "2rem 2.5rem",
          animation: "megaMenuFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
        }}
        onMouseLeave={onClose}
      >
        <div className="row g-4">
          {/* คอลัมน์ที่ 1: หมวดหมู่ย่อยกลุ่มที่ 1 */}
          <div className="col-12 col-md-4">
            {category.columns[0]?.groups?.map((group, gIdx) => (
              <div key={gIdx} className={gIdx > 0 ? "mt-3 pt-1" : ""}>
                {group.isDirect ? (
                  <button
                    type="button"
                    className="btn btn-link text-start text-dark p-0 fw-black text-decoration-none d-block w-100 mega-item-link"
                    style={{ fontSize: "1.05rem", letterSpacing: "-0.2px" }}
                    onClick={() => {
                      onSelectItem && onSelectItem(group.query, category.id);
                      onClose();
                    }}
                  >
                    {group.title}
                  </button>
                ) : (
                  <>
                    <h6
                      className="fw-black text-dark mb-2"
                      style={{ fontSize: "1.05rem", letterSpacing: "-0.2px" }}
                    >
                      {group.title}
                    </h6>
                    <ul className="list-unstyled mb-0 ps-1">
                      {group.items?.map((item, iIdx) => (
                        <li key={iIdx} className="py-1">
                          <button
                            type="button"
                            className="btn btn-link text-start p-0 text-decoration-none mega-sub-link"
                            style={{
                              fontSize: "0.92rem",
                              color: "#334155",
                              lineHeight: "1.4",
                            }}
                            onClick={() => {
                              onSelectItem && onSelectItem(item.query, category.id);
                              onClose();
                            }}
                          >
                            {item.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* คอลัมน์ที่ 2: หมวดหมู่ย่อยกลุ่มที่ 2 */}
          <div className="col-12 col-md-4 border-start-md ps-md-4">
            {category.columns[1]?.groups?.map((group, gIdx) => (
              <div key={gIdx} className={gIdx > 0 ? "mt-3 pt-1" : ""}>
                {group.isDirect ? (
                  <button
                    type="button"
                    className="btn btn-link text-start text-dark p-0 fw-black text-decoration-none d-block w-100 mega-item-link"
                    style={{ fontSize: "1.05rem", letterSpacing: "-0.2px" }}
                    onClick={() => {
                      onSelectItem && onSelectItem(group.query, category.id);
                      onClose();
                    }}
                  >
                    {group.title}
                  </button>
                ) : (
                  <>
                    <h6
                      className="fw-black text-dark mb-2"
                      style={{ fontSize: "1.05rem", letterSpacing: "-0.2px" }}
                    >
                      {group.title}
                    </h6>
                    <ul className="list-unstyled mb-0 ps-1">
                      {group.items?.map((item, iIdx) => (
                        <li key={iIdx} className="py-1">
                          <button
                            type="button"
                            className="btn btn-link text-start p-0 text-decoration-none mega-sub-link"
                            style={{
                              fontSize: "0.92rem",
                              color: "#334155",
                              lineHeight: "1.4",
                            }}
                            onClick={() => {
                              onSelectItem && onSelectItem(item.query, category.id);
                              onClose();
                            }}
                          >
                            {item.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* คอลัมน์ที่ 3: ตารางแบรนด์สินค้าชั้นนำ (12 โลโก้แบรนด์ ตรงตาม media_1791176439057.png) */}
          <div className="col-12 col-md-4 border-start-md ps-md-4 d-flex align-items-center justify-content-center">
            <div className="row g-3 w-100 justify-content-center align-items-center">
              {category.brands?.map((brand, bIdx) => (
                <div className="col-4 text-center d-flex align-items-center justify-content-center" key={bIdx}>
                  <div
                    className="p-2 rounded-2 mega-brand-card d-flex align-items-center justify-content-center w-100"
                    style={{
                      height: "72px",
                      backgroundColor: "#ffffff",
                      cursor: "pointer",
                      transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                    onClick={() => {
                      onSelectBrand && onSelectBrand(brand.name);
                      onClose();
                    }}
                    title={`ดูสินค้าแบรนด์ ${brand.name}`}
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="img-fluid"
                      style={{
                        maxHeight: "56px",
                        maxWidth: "92px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
