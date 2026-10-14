"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

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

const categoryDescriptionsEn = {
  fluids: "Fully synthetic engine oil, transmission fluid, coolant, and international standard lubricants.",
  body: "Headlights, tail lights, bumpers, side mirrors, and OEM-spec body panels fitting 100%.",
  suspension: "Brembo/TRW brake systems, shock absorbers, coil springs, ball joints, and control arms.",
  cooling: "Radiators, electric cooling fans, thermostats, and complete engine cooling components.",
  engine: "Spark plugs, belts, filters, cylinder gaskets, and powertrain components.",
  paint: "Automotive spray paints, body filler putty, polishing compounds, and bodywork repair tools.",
  care: "Car wash shampoos, ceramic coatings, interior cleaners, and professional car care supplies.",
};

const categoryNamesEn = {
  fluids: "Engine Oil & Fluids",
  body: "Body Parts & Lights",
  suspension: "Suspension & Brakes",
  cooling: "Cooling System",
  engine: "Engine & Drivetrain",
  paint: "Automotive Paint & Body",
  care: "Care & Maintenance",
};

const labelTranslationMap = {
  "น้ำมันเครื่อง": "Engine Oil",
  "น้ำมันเครื่องเบนซิน": "Gasoline Engine Oil",
  "น้ำมันเครื่องดีเซล": "Diesel Engine Oil",
  "น้ำมันเครื่องมอเตอร์ไซค์": "Motorcycle Engine Oil",
  "น้ำมันเกียร์": "Transmission Fluid",
  "น้ำมันเกียร์อัตโนมัติทั่วไป": "Automatic Transmission Fluid (ATF)",
  "น้ำมันเกียร์อัตโนมัติ CVT": "CVT Transmission Fluid",
  "น้ำมันเกียร์ธรรมดา": "Manual Transmission Fluid (MTF)",
  "น้ำยาหล่อเย็นหม้อน้ำ": "Radiator Coolant",
  "น้ำยาแอร์": "A/C Refrigerant",
  "น้ำมันเบรก": "Brake Fluid",
  "น้ำมันพวงมาลัยพาวเวอร์": "Power Steering Fluid",
  "น้ำยาล้างหัวฉีด": "Fuel Injector Cleaner",
  "น้ำมันเฟืองท้าย": "Differential Gear Oil",
  "น้ำยาล้างคาร์บูเรเตอร์": "Carburetor Cleaner",
  "น้ำมันไฮดรอลิค": "Hydraulic Fluid",
  "ฟลัชชิ่งออยล์": "Flushing Oil",
  "ไฟและระบบส่องสว่าง": "Lighting & Lamps",
  "ไฟหน้ารถยนต์": "Car Headlights",
  "ไฟท้าย": "Tail Lights",
  "ไฟตัดหมอก": "Fog Lights",
  "ไฟเลี้ยวและไฟส่องป้าย": "Turn Signals & Plate Lamps",
  "กระจกและอุปกรณ์": "Mirrors & Glass",
  "กระจกมองข้างไฟฟ้า": "Power Side Mirrors",
  "เลนส์กระจกมองข้าง": "Side Mirror Glass",
  "กระจกบังลมหน้า": "Front Windshield",
  "ชิ้นส่วนตัวถังภายนอก": "Exterior Body Parts",
  "กันชนหน้า / กันชนหลัง": "Front / Rear Bumpers",
  "หน้ากระจังรถยนต์": "Front Grille",
  "ฝากระโปรงหน้า": "Front Hood / Bonnet",
  "แก้มบังโคลนหน้า-หลัง": "Front / Rear Fenders",
  "ระบบกันสะเทือน": "Suspension System",
  "โช้คอัพหน้า-หลัง": "Front / Rear Shock Absorbers",
  "สปริงโหลดและสปริงเดิม": "Coil Springs",
  "ลูกหมากปีกนกและคันชัก": "Ball Joints & Tie Rods",
  "ยางแท่นเครื่องและแท่นเกียร์": "Engine & Transmission Mounts",
  "ระบบเบรก": "Braking System",
  "ผ้าเบรกหน้า-หลัง": "Front / Rear Brake Pads",
  "จานเบรกมาตรฐานและแต่ง": "Brake Rotors / Discs",
  "ก้ามเบรกหลัง (ดรัมเบรก)": "Rear Drum Brake Shoes",
  "แม่ปั๊มเบรกและกระบอกเบรก": "Brake Master Cylinders",
  "สายอ่อนเบรก": "Brake Lines & Hoses",
  "ระบบสายพานและไทม์มิ่ง": "Belts & Timing",
  "สายพานไทม์มิ่ง": "Timing Belts",
  "สายพานหน้าเครื่อง (พัดลม/ได)": "Serpentine Accessory Belts",
  "ลูกรอกสายพาน": "Belt Tensioner Pulleys",
  "ระบบจุดระเบิด": "Ignition System",
  "หัวเทียนมาตรฐาน / อิริเดียม": "Spark Plugs (Standard/Iridium)",
  "คอยล์จุดระเบิด": "Ignition Coils",
  "ปั๊มน้ำหล่อเย็นเครื่องยนต์": "Engine Water Pumps",
  "ปะเก็นฝาสูบและชุดซีล": "Head Gaskets & Oil Seals",
  "หม้อน้ำและพัดลม": "Radiators & Fans",
  "หม้อน้ำรถยนต์": "Engine Radiators",
  "พัดลมหม้อน้ำและพัดลมแอร์": "Radiator & Condenser Fans",
  "ฝาหม้อน้ำแรงดัน": "Radiator Pressure Caps",
  "ระบบควบคุมอุณหภูมิ": "Thermostat System",
  "วาล์วน้ำ": "Engine Thermostats",
  "ท่อยางหม้อน้ำบน-ล่าง": "Radiator Upper/Lower Hoses",
  "ปั๊มน้ำรถยนต์": "Water Pumps",
  "ผลิตภัณฑ์ทำความสะอาดภายนอก": "Exterior Detailing",
  "แชมพูล้างรถผสมแว็กซ์": "Car Wash Shampoo & Wax",
  "น้ำยาเคลือบสีและเซรามิก": "Color Wax & Ceramic Coatings",
  "ดินน้ำมันลูบผิวสี": "Detailing Clay Bars",
  "เคมีภัณฑ์บำรุงรักษาเชิงกล": "Maintenance Chemicals",
  "น้ำยาทำความสะอาดเบรก": "Brake Cleaner Spray",
  "น้ำยาฉีดล้างลิ้นปีกผีเสื้อ": "Throttle Body Cleaner",
  "สเปรย์หล่อลื่นอเนกประสงค์": "Multi-Purpose Lubricant Spray",
  "จารบีทนความร้อนสูง": "High-Temp Bearing Grease",
  "สีพ่นและสีสเปรย์ตัวถัง": "Automotive Paints & Sprays",
  "สีสเปรย์พ่นรถยนต์มาตรฐาน": "Standard Automotive Spray Paint",
  "สีสเปรย์รองพื้นกันสนิม": "Anti-Rust Primer Spray",
  "แลกเกอร์เคลือบเงา 2K": "2K Clear Coat Lacquer",
  "งานโป๊วและขัดสี": "Putty & Polishing",
  "สีโป๊วตัวถังรถยนต์": "Auto Body Putty / Filler",
  "ยาขัดหยาบและขัดละเอียด": "Rubbing & Polishing Compounds",
  "กระดาษทรายน้ำสำหรับงานสี": "Wet Sandpaper for Auto Paint",
};

export default function MegaMenu({
  activeCategoryKey,
  onClose,
  onSelectItem,
  onSelectBrand,
  onGoToJobs,
  onGoToVehicleSearch,
}) {
  const { lang } = useLanguage ? useLanguage() : { lang: "th" };
  const isTh = lang !== "en";
  const modalRef = useRef(null);

  const getLabel = (thaiText) => (isTh ? thaiText : (labelTranslationMap[thaiText] || thaiText));

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
  const catName = isTh ? category.name : (categoryNamesEn[category.id] || category.name);
  const catDesc = isTh ? (categoryDescriptions[category.id] || "ศูนย์รวมอะไหล่รถยนต์คุณภาพสูง คัดสรรเฉพาะแบรนด์มาตรฐาน") : (categoryDescriptionsEn[category.id] || "High quality automotive replacement parts and genuine OEM components");

  return (
    <>
      {/* 1. Backdrop Overlay (ฉากหลังมืดแบบโปร่งแสง) */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{
          backgroundColor: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(3px)",
          zIndex: 1060,
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
          maxWidth: "1140px",
          zIndex: 1065,
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
                background: "linear-gradient(135deg, #1e204c 0%, #2f3388 50%, #5b5ffd 100%)",
              }}
            >
              <i className={`bi ${categoryIcons[category.id] || "bi-grid-fill"} fs-4 text-warning`}></i>
            </div>
            <div>
              <div className="d-flex align-items-center gap-2">
                <h5 className="fw-black text-dark mb-0" style={{ letterSpacing: "-0.3px" }}>
                  {catName}
                </h5>
                <span className="badge ms-1 small fw-bold text-dark" style={{ fontSize: "0.68rem", background: "var(--theme-accent-gradient)" }}>
                  {isTh ? "อะไหล่แท้ 100%" : "100% Genuine OEM"}
                </span>
              </div>
              <p className="text-muted mb-0 small" style={{ fontSize: "0.82rem" }}>
                {catDesc}
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
              title={isTh ? "ดูสินค้าทั้งหมดในหมวดนี้" : "View all items in this category"}
            >
              <i className="bi bi-box-seam-fill"></i>
              <span>{isTh ? "ดูสินค้าทั้งหมดในหมวดนี้" : "View All In Category"}</span>
              <i className="bi bi-arrow-right ms-1"></i>
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "34px", height: "34px" }}
              onClick={onClose}
              title={isTh ? "ปิดหน้าต่างเมนู" : "Close Menu"}
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
                        <i className="bi bi-record-circle text-primary small"></i>
                        <span>{getLabel(group.title)}</span>
                      </span>
                      <i className="bi bi-chevron-right small text-muted mega-arrow"></i>
                    </button>
                  ) : (
                    <>
                      <div className="d-flex align-items-center gap-2 mb-2 pb-1 border-bottom border-light">
                        <span
                          className="d-inline-block rounded-pill"
                          style={{ width: "3.5px", height: "14px", backgroundColor: "#5b5ffd" }}
                        />
                        <h6
                          className="fw-bold text-dark mb-0"
                          style={{ fontSize: "0.96rem", letterSpacing: "-0.2px" }}
                        >
                          {getLabel(group.title)}
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
                              <i className="bi bi-chevron-right text-primary opacity-50 small" style={{ fontSize: "0.7rem" }}></i>
                              <span>{getLabel(item.label)}</span>
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
                    {isTh ? "ผลิตภัณฑ์เฉพาะระบบและการดูแล" : "System Products & Maintenance"}
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
                        <i className="bi bi-record-circle text-primary small"></i>
                        <span>{getLabel(group.title)}</span>
                      </span>
                      <i className="bi bi-chevron-right small text-muted mega-arrow"></i>
                    </button>
                  ) : (
                    <>
                      <div className="d-flex align-items-center gap-2 mb-2 pb-1 border-bottom border-light">
                        <span
                          className="d-inline-block rounded-pill"
                          style={{ width: "3.5px", height: "14px", backgroundColor: "#5b5ffd" }}
                        />
                        <h6
                          className="fw-bold text-dark mb-0"
                          style={{ fontSize: "0.96rem", letterSpacing: "-0.2px" }}
                        >
                          {getLabel(group.title)}
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
                              <i className="bi bi-chevron-right text-primary opacity-50 small" style={{ fontSize: "0.7rem" }}></i>
                              <span>{getLabel(item.label)}</span>
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

            {/* คอลัมน์ที่ 3: ศูนย์บริการและงานช่างประจำอู่ ServiceGarage */}
            <div className="col-12 col-md-4 ps-md-4">
              <div
                className="p-3 rounded-4 shadow-sm"
                style={{
                  backgroundColor: "#fffdfa",
                  border: "1px solid #fed7aa",
                }}
              >
                <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom border-warning-subtle">
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="p-2 rounded-3 bg-warning text-dark d-flex align-items-center justify-content-center"
                      style={{ width: "32px", height: "32px" }}
                    >
                      <i className="bi bi-tools fs-6"></i>
                    </div>
                    <div>
                      <span className="fw-black text-dark" style={{ fontSize: "0.95rem" }}>
                        {isTh ? "บริการงานช่าง & อู่ซ่อม" : "Garage & Technical Services"}
                      </span>
                    </div>
                  </div>
                  <span className="badge bg-warning-subtle text-dark border border-warning small fw-bold" style={{ fontSize: "0.68rem" }}>
                    Service Garage
                  </span>
                </div>

                <p className="text-muted small mb-3" style={{ fontSize: "0.82rem", lineHeight: "1.5" }}>
                  {isTh
                    ? "มีบริการตรวจเช็กสภาพและเปลี่ยนอะไหล่โดยช่างผู้เชี่ยวชาญ พร้อมระบบประเมินราคาซ่อมและค่าแรงมาตรฐาน"
                    : "Expert technician inspection and parts replacement with standardized repair estimation and labor costs."}
                </p>

                <div className="d-flex flex-column gap-2 mb-3">
                  <div className="d-flex align-items-start gap-2 small">
                    <i className="bi bi-check-circle-fill text-success mt-1"></i>
                    <span className="text-dark">
                      <strong>{isTh ? "ออกใบสั่งซ่อมทันที:" : "Instant Repair Orders:"}</strong>{" "}
                      {isTh ? "แยกงานซ่อมบำรุงและรายการเช็กระยะชัดเจน" : "Clear separation of maintenance and repair items"}
                    </span>
                  </div>
                  <div className="d-flex align-items-start gap-2 small">
                    <i className="bi bi-check-circle-fill text-success mt-1"></i>
                    <span className="text-dark">
                      <strong>{isTh ? "ตัดสต็อกอัตโนมัติ:" : "Auto Stock Deduction:"}</strong>{" "}
                      {isTh ? "อัปเดตยอดคงเหลือคลังอะไหล่แบบ Real-time" : "Real-time warehouse inventory synchronization"}
                    </span>
                  </div>
                  <div className="d-flex align-items-start gap-2 small">
                    <i className="bi bi-check-circle-fill text-success mt-1"></i>
                    <span className="text-dark">
                      <strong>{isTh ? "คำนวณภาษี & ส่วนลด:" : "Tax & Discount Calculator:"}</strong>{" "}
                      {isTh ? "ราคาสุทธิมาตรฐาน ออกใบเสร็จรับเงินถูกต้อง" : "Standardized net pricing and official invoices"}
                    </span>
                  </div>
                </div>

                <div className="d-flex flex-column gap-2 pt-2 border-top">
                  <button
                    type="button"
                    className="btn btn-garage-unique w-100 py-2 btn-sm fw-bold shadow-sm"
                    onClick={() => {
                      if (onGoToJobs) onGoToJobs();
                      onClose();
                    }}
                  >
                    <i className="bi bi-calculator-fill me-1"></i>
                    <span>{isTh ? "ประเมินราคาซ่อม & ค่าแรงทันที" : "Instant Repair & Labor Estimator"}</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-primary w-100 py-2 btn-sm fw-semibold"
                    onClick={() => {
                      if (onGoToVehicleSearch) onGoToVehicleSearch();
                      onClose();
                    }}
                  >
                    <i className="bi bi-car-front-fill me-1"></i>
                    <span>{isTh ? "ค้นหาอะไหล่ตามรุ่นรถยนต์" : "Search Parts by Vehicle Model"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* แถบล่าง Mega Menu (Footer Garage Badges) */}
        <div
          className="d-flex flex-wrap align-items-center justify-content-between p-3 px-md-4 border-top"
          style={{
            backgroundColor: "#f8fafc",
            fontSize: "0.82rem",
          }}
        >
          <div className="d-flex flex-wrap align-items-center gap-3 text-muted">
            <span className="d-flex align-items-center gap-1">
              <i className="bi bi-tools text-primary"></i>{" "}
              {isTh ? "บริการซ่อมบำรุงและติดตั้ง ณ ศูนย์ ServiceGarage" : "Maintenance & installation at ServiceGarage Centers"}
            </span>
            <span className="opacity-50 d-none d-sm-inline">•</span>
            <span className="d-flex align-items-center gap-1">
              <i className="bi bi-shield-check text-primary"></i>{" "}
              {isTh ? "รับประกันคุณภาพอะไหล่แท้ทุกชิ้นงาน" : "100% Genuine OEM Quality Warranty"}
            </span>
            <span className="opacity-50 d-none d-md-inline">•</span>
            <span className="d-flex align-items-center gap-1 d-none d-md-inline-flex">
              <i className="bi bi-receipt text-success"></i>{" "}
              {isTh ? "ออกใบสั่งซ่อมและใบแจ้งหนี้อัตโนมัติ" : "Automated Repair Orders & Official Invoices"}
            </span>
          </div>

          <div className="small text-muted fw-semibold mt-1 mt-sm-0">
            <i className="bi bi-info-circle text-warning me-1"></i>{" "}
            {isTh ? "คลิกเลือกหมวดหมู่เพื่อค้นหาอะไหล่" : "Select category to browse parts"}
          </div>
        </div>
      </div>
    </>
  );
}
