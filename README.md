# 🚗 Car Garage & Repair Service Management System (CarGarage PRO)
> **ระบบบริหารจัดการศูนย์บริการและอู่ซ่อมรถยนต์ครบวงจร (Version 2.5 Update)**  
> **Course Project:** Object-Oriented Programming (OOP) & Object-Oriented Analysis and Design (OOAD)  
> **Architecture:** Decoupled RESTful Architecture — Python FastAPI (Backend) + React & Bootstrap 5 (Frontend - Vite)  
> **Key Features:** Vuexy Admin Backoffice, Live Workshop Bays, Bilingual System (TH/EN), Live Chat Desk, Master Mechanic Tools Card  
> **Repository:** [Kitikon15/Car-Garage-Repair-Service-System](https://github.com/Kitikon15/Car-Garage-Repair-Service-System)

---

## 📋 สารบัญ (Table of Contents)
1. [ภาพรวมของระบบ (System Overview)](#-1-ภาพรวมของระบบ-system-overview)
2. [แผนภาพยูสเคสและบทบาทผู้ใช้งาน (Use Case Diagram & System Actors)](#-2-แผนภาพยูสเคสและบทบาทผู้ใช้งาน-use-case-diagram--system-actors)
3. [รายละเอียดข้อกำหนดยูสเคสเชิงลึก (Detailed Use Case Specifications)](#-3-รายละเอียดข้อกำหนดยูสเคสเชิงลึก-detailed-use-case-specifications)
4. [สถาปัตยกรรม OOP & OOAD Design (Class Diagram)](#-4-สถาปัตยกรรม-oop--ooad-design-class-diagram)
5. [หลักการ OOP ทั้ง 4 เสาหลัก (Core OOP Principles)](#-5-หลักการ-oop-ทั้ง-4-เสาหลัก-core-oop-principles)
6. [ฟังก์ชันเด่นของระบบ (Key System Features)](#-6-ฟังก์ชันเด่นของระบบ-key-system-features)
7. [โครงสร้างโฟลเดอร์โปรเจกต์ (Project Structure)](#-7-โครงสร้างโฟลเดอร์โปรเจกต์-project-structure)
8. [ขั้นตอนการติดตั้งและเริ่มใช้งาน (Getting Started)](#-8-ขั้นตอนการติดตั้งและเริ่มใช้งาน-getting-started)
---

## 🌟 1. ภาพรวมของระบบ (System Overview)

**CarGarage PRO** เป็นระบบบริหารจัดการงานซ่อมบำรุงและศูนย์บริการรถยนต์ ออกแบบตามหลักการเขียนโปรแกรมเชิงวัตถุ (**Object-Oriented Programming: OOP**) และการวิเคราะห์ออกแบบเชิงวัตถุ (**OOAD**) เพื่อจำลองกระบวนการทำงานจริงของศูนย์บริการยานยนต์มาตรฐาน ตั้งแต่การลงทะเบียนรถยนต์, การเปิดใบสั่งซ่อมบำรุง, การคำนวณราคาประเมินค่าแรงช่าง, การเบิกจ่ายอะไหล่พร้อมตัดสต็อกคลังอัตโนมัติ ไปจนถึงการออกใบแจ้งหนี้และบันทึกการชำระเงิน

---

## 🎯 2. แผนภาพยูสเคสและบทบาทผู้ใช้งาน (Use Case Diagram & System Actors)

ระบบแบ่งบทบาทของผู้ใช้งาน (Actors) ออกเป็น 6 กลุ่ม เพื่อรองรับขั้นตอนการทำงานในอู่ซ่อมรถยนต์ได้อย่างสมบูรณ์:
1. **👤 ลูกค้า / เจ้าของรถ (Customer):** นำรถเข้าตรวจเช็ก, ดูประวัติการซ่อม, ประเมินราคา, สอบถามช่างผ่านแชทสด และชำระเงิน
2. **👨‍💼 พนักงานรับรถ / ที่ปรึกษางานบริการ (Service Advisor):** ลงทะเบียนรถ, เปิดใบสั่งซ่อม (Repair/Maintenance), ประเมินราคา และประสานงาน
3. **👨‍🔧 ช่างเทคนิคประจำอู่ (Technician / Mechanic):** ดำเนินการซ่อมบำรุง, ตรวจสอบอะไหล่ และเบิกใช้อะไหล่ตรงรุ่น
4. **📦 ผู้ดูแลคลังอะไหล่ (Parts Storekeeper):** ตรวจสอบจำนวนอะไหล่, เติมสต็อกสินค้า (Restock) และจัดการแคตตาล็อกอะไหล่
5. **🧑‍💼 เจ้าหน้าที่การเงิน / แคชเชียร์ (Cashier):** ตรวจสอบใบแจ้งหนี้, แจกแจงภาษี VAT 7% และบันทึกการชำระเงิน
6. **🛡️ ผู้ดูแลระบบและแอดมิน (Garage Administrator):** เพิ่มอะไหล่สินค้าใหม่, แก้ไขราคา/สต็อก, ลบรายการสินค้า และตอบแชทลูกค้าสัมพันธ์ (Live Chat Desk)

### 📊 แผนภาพ Use Case Diagram (UML)

```mermaid
flowchart LR
    %% Actors
    Customer["👤 ลูกค้า / เจ้าของรถ\n(Customer)"]
    Advisor["👨‍💼 พนักงานรับรถ\n(Service Advisor)"]
    Mechanic["👨‍🔧 ช่างเทคนิคประจำอู่\n(Mechanic / Technician)"]
    Storekeeper["📦 ผู้ดูแลคลังอะไหล่\n(Parts Storekeeper)"]
    Cashier["🧑‍💼 เจ้าหน้าที่การเงิน\n(Cashier)"]
    Admin["🛡️ แอดมินศูนย์บริการ\n(Garage Administrator)"]

    %% System Boundary
    subgraph SystemBoundary ["🚘 ระบบบริหารจัดการศูนย์บริการและอู่ซ่อมรถยนต์ (CarGarage PRO)"]
        direction TB
        UC1(["UC-01: ลงทะเบียนลูกค้าและยานพาหนะ\n(Register Customer & Vehicle)"])
        UC2(["UC-02: จำลองและประเมินราคาซ่อม\n(Estimate Service Cost)"])
        UC3(["UC-03: เปิดใบสั่งซ่อมทั่วไป\n(Create Repair Job)"])
        UC4(["UC-04: เปิดใบสั่งงานเช็กระยะตามรอบ\n(Create Maintenance Job)"])
        UC5(["UC-05: ตรวจสอบและตัดสต็อกอะไหล่\n(Deduct Parts Stock)"])
        UC6(["UC-06: ตรวจสอบและเติมสต็อกอะไหล่\n(Check & Restock Parts)"])
        UC7(["UC-07: ค้นหาประวัติรถและทะเบียน\n(Search Vehicle & History)"])
        UC8(["UC-08: สร้างใบแจ้งหนี้และคำนวณภาษี\n(Generate Invoice & Tax)"])
        UC9(["UC-09: บันทึกการชำระเงิน\n(Process Payment)"])
        UC10(["UC-10: คัดกรองและเบิกอะไหล่ในคลัง\n(Browse & Order Parts)"])
        UC11(["UC-11: เพิ่มและจัดการอะไหล่สินค้า\n(Admin Add & Manage Parts SKU)"])
        UC12(["UC-12: แชทสดบริการลูกค้าสัมพันธ์\n(Customer Live Chat Desk)"])
    end

    %% Actor Connections
    Customer --> UC1
    Customer --> UC2
    Customer --> UC7
    Customer --> UC12

    Advisor --> UC1
    Advisor --> UC2
    Advisor --> UC3
    Advisor --> UC4
    Advisor --> UC7

    Mechanic --> UC3
    Mechanic --> UC4
    Mechanic --> UC10

    Storekeeper --> UC5
    Storekeeper --> UC6
    Storekeeper --> UC10

    Cashier --> UC8
    Cashier --> UC9

    Admin --> UC11
    Admin --> UC12

    %% Use Case Relationships
    UC3 -.->|"<<include>>"| UC5
    UC4 -.->|"<<include>>"| UC5
    UC3 -.->|"<<include>>"| UC8
    UC4 -.->|"<<include>>"| UC8
    UC2 -.->|"<<extend>>"| UC3
    UC8 -.->|"<<include>>"| UC9
```

---

## 📝 3. รายละเอียดข้อกำหนดยูสเคสเชิงลึก (Detailed Use Case Specifications)

### 📌 UC-01: ลงทะเบียนลูกค้าและยานพาหนะ (Register Customer & Vehicle)
- **Primary Actor:** พนักงานรับรถ (Service Advisor) / ลูกค้า (Customer)
- **Pre-conditions:** ระบบเปิดใช้งาน และเชื่อมต่อฐานข้อมูลได้ปกติ
- **Main Flow:**
  1. ผู้ใช้เปิดหน้าต่าง "ลงทะเบียนรถ/ลูกค้า" (Register Modal)
  2. ระบุข้อมูลลูกค้า: รหัสลูกค้า, ชื่อ-นามสกุล, เบอร์โทรศัพท์
  3. ระบุข้อมูลรถยนต์: ป้ายทะเบียน, ยี่ห้อ (Brand), รุ่น (Model)
  4. ระบบตรวจสอบความถูกต้องของข้อมูล (Data Validation) ผ่าน Pydantic Schema
  5. ระบบบันทึกข้อมูล Association ระหว่าง `Vehicle` กับ `Customer`
- **Post-conditions:** รถยนต์และลูกค้าถูกผูกเข้าด้วยกัน พร้อมสำหรับการเปิดใบสั่งซ่อมบำรุง
- **OOP Mapping:** `Customer` class (`customer.py`), `Vehicle` class (`vehicle.py`)

---

### 📌 UC-02: จำลองและประเมินราคาซ่อม (Estimate Service Cost)
- **Primary Actor:** พนักงานรับรถ (Service Advisor) / ลูกค้า (Customer)
- **Pre-conditions:** มีข้อมูลรถยนต์และรายการอะไหล่ในระบบ
- **Main Flow:**
  1. ผู้ใช้เลือกยี่ห้อและรุ่นรถยนต์ที่ต้องการประเมิน
  2. เลือกระบบงานซ่อม (เครื่องยนต์, เบรก, น้ำมันเครื่อง, ระบบไฟ ฯลฯ)
  3. เลือกรายการอะไหล่และระบุจำนวนที่ต้องการใช้
  4. กำหนดค่าแรงช่างตามความซับซ้อนของงาน
  5. ระบบคำนวณค่าอะไหล่รวม ค่าแรง และภาษีมูลค่าเพิ่ม 7% แบบเรียลไทม์
  6. ผู้ใช้สามารถส่งข้อมูลประเมินราคาไปเปิดใบสั่งซ่อมจริงได้ทันที (`<<extend>>`)
- **Post-conditions:** แสดงตารางสรุปราคาประเมินค่าซ่อมเบื้องต้นแก่ลูกค้า
- **OOP Mapping:** `GarageBuilder.js`, `ServiceJob.calculate_cost()`

---

### 📌 UC-03: เปิดใบสั่งซ่อมบำรุงทั่วไป (Create Repair Job)
- **Primary Actor:** พนักงานรับรถ (Service Advisor) / ช่างเทคนิค (Mechanic)
- **Pre-conditions:** รถยนต์ต้องลงทะเบียนในระบบแล้ว และอะไหล่ในคลังมีเพียงพอ
- **Main Flow:**
  1. เลือกป้ายทะเบียนรถที่เข้ารับบริการ
  2. ระบุรายละเอียดความเสียหาย และระดับความรุนแรง (`MINOR`, `MODERATE`, `MAJOR`)
  3. เลือกอะไหล่ที่ต้องใช้ พร้อมระบุจำนวน
  4. ระบบตรวจสอบจำนวนสต็อกอะไหล่ (`part.is_low_stock()`)
  5. ระบบหักจำนวนอะไหล่จากคลังอัตโนมัติ (`part.deduct_stock()`) — `<<include>> UC-05`
  6. ระบบคำนวณราคางานซ่อมแบบ Polymorphic:  
     $$\text{Total Cost} = \text{Labor Cost} + \text{Parts Total} + \text{Severity Fee}$$
  7. ระบบสร้างใบแจ้งหนี้อัตโนมัติ (`auto_generate_invoice = true`) — `<<include>> UC-08`
- **Alternate Flow (สต็อกไม่พอ):** ระบบแจ้งเตือนสต็อกไม่เพียงพอ และยกเลิกการสร้างใบสั่งซ่อมเพื่อป้องกันสต็อกติดลบ
- **OOP Mapping:** `RepairJob` class (`service_job.py`), `Part.deduct_stock()` (`part.py`)

---

### 📌 UC-04: เปิดใบสั่งงานเช็กระยะตามรอบ (Create Maintenance Job)
- **Primary Actor:** พนักงานรับรถ (Service Advisor)
- **Pre-conditions:** รถยนต์ลงทะเบียนแล้ว และมีแพ็กเกจระยะทางรองรับ
- **Main Flow:**
  1. เลือกทะเบียนรถยนต์ และเลือกแพ็กเกจเช็กระยะ (`PERIODIC_10K`, `PERIODIC_20K`, `PERIODIC_50K`, `PERIODIC_100K`)
  2. เลือกรายการของเหลว ไส้กรอง และอะไหล่ตามรอบ
  3. ระบบตัดสต็อกอะไหล่ในคลัง — `<<include>> UC-05`
  4. ระบบคำนวณราคางานเช็กระยะแบบ Polymorphic พร้อมหักส่วนลดแพ็กเกจ:  
     $$\text{Total Cost} = (\text{Labor Cost} + \text{Parts Total}) - \text{Package Discount}$$
  5. ระบบสร้างใบแจ้งหนี้เพื่อรอชำระเงิน — `<<include>> UC-08`
- **OOP Mapping:** `MaintenanceJob` class (`service_job.py`)

---

### 📌 UC-05: ตรวจสอบและตัดสต็อกอะไหล่ (Deduct Parts Stock)
- **Primary Actor:** ระบบอัตโนมัติ (System) / ผู้ดูแลคลังอะไหล่ (Parts Storekeeper)
- **Pre-conditions:** มีคำสั่งเบิกจ่ายอะไหล่จากใบสั่งซ่อมหรือตะกร้าสินค้า
- **Main Flow:**
  1. รับคำขอเบิกอะไหล่ตาม `part_id` และจำนวน `quantity`
  2. เมธอด `deduct_stock(quantity)` ตรวจสอบว่า `stock_qty >= quantity` หรือไม่
  3. หากผ่านเงื่อนไข ระบบจะลดจำนวนคงเหลือในคลังทันที
  4. หากสต็อกคงเหลือต่ำกว่าเกณฑ์ ระบบจะติดสถานะ `Low Stock Alert`
- **OOP Mapping:** Encapsulation ใน `Part` class (`part.py`)

---

### 📌 UC-06: จัดการและเติมสต็อกอะไหล่ (Manage & Restock Parts)
- **Primary Actor:** ผู้ดูแลคลังอะไหล่ (Parts Storekeeper)
- **Pre-conditions:** เข้าสู่แท็บจัดการสต็อกอะไหล่ (Parts Inventory)
- **Main Flow:**
  1. ผู้ใช้ดูรายการอะไหล่ทั้งหมด 27 รายการ พร้อมตัวกรองสถานะสต็อก
  2. กดปุ่ม "เติมสต็อก" (Restock) ที่รายการที่ต้องการ
  3. ระบุจำนวนที่ต้องการนำเข้าคลัง
  4. เมธอด `part.add_stock(qty)` ทำการเพิ่มจำนวนสต็อกเข้าสู่ระบบ
- **Post-conditions:** จำนวนสต็อกในคลังอัปเดตแบบเรียลไทม์
- **OOP Mapping:** `Part.add_stock()` (`part.py`), `PartsInventory.js`

---

### 📌 UC-07: ออกใบแจ้งหนี้และบันทึกการชำระเงิน (Generate Invoice & Process Payment)
- **Primary Actor:** เจ้าหน้าที่การเงิน (Cashier) / ลูกค้า (Customer)
- **Pre-conditions:** ใบสั่งซ่อม (RepairJob หรือ MaintenanceJob) ถูกสร้างเรียบร้อยแล้ว
- **Main Flow:**
  1. ระบบนำอ็อบเจกต์ `ServiceJob` ส่งต่อให้คลาส `Invoice`
  2. คลาส `Invoice` เรียก `service_job.calculate_cost()` แบบ Polymorphic เพื่อหายอดรวมสุทธิ
  3. ระบบคำนวณแจกแจง: ค่าแรง, ค่าอะไหล่, ส่วนลด, ภาษีมูลค่าเพิ่ม (VAT 7%)
  4. เจ้าหน้าที่การเงินกดปุ่ม "บันทึกการชำระเงิน" (Mark as Paid)
  5. เมธอด `invoice.mark_as_paid()` เปลี่ยนสถานะเป็น `PAID`
- **Post-conditions:** ใบแจ้งหนี้ถูกบันทึกสถานะชำระเงินเรียบร้อย สามารถพิมพ์หรือดูใบเสร็จย้อนหลังได้
- **OOP Mapping:** `Invoice` class (`invoice.py`), `InvoiceModal.js`

---

## 🏛️ 4. สถาปัตยกรรม OOP & OOAD Design (Class Diagram)

ระบบได้รับการออกแบบโครงสร้างคลาสตามมาตรฐาน OOAD โดยแยกความรับผิดชอบของแต่ละโมเดลอย่างชัดเจน (Single Responsibility Principle) แสดงความสัมพันธ์ผ่าน **Mermaid Class Diagram**:

```mermaid
classDiagram
    direction TB

    class Customer {
        -str _customer_id
        -str _name
        -str _phone
        +customer_id: str
        +name: str
        +phone: str
        +to_dict() dict
    }

    class Vehicle {
        -str _license_plate
        -str _brand
        -str _model
        -Customer _owner
        +license_plate: str
        +brand: str
        +model: str
        +owner: Customer
        +get_full_description() str
        +to_dict() dict
    }

    class Part {
        -str _part_id
        -str _part_name
        -float _price
        -int _stock_qty
        +part_id: str
        +part_name: str
        +price: float
        +stock_qty: int
        +deduct_stock(qty: int) int
        +add_stock(qty: int) int
        +is_low_stock(threshold: int) bool
        +to_dict() dict
    }

    class JobPartItem {
        +Part part
        +str part_id
        +str part_name
        +float unit_price
        +int quantity
        +get_subtotal() float
        +to_dict() dict
    }

    class ServiceJob {
        <<Abstract>>
        -str _job_id
        -Vehicle _vehicle
        -float _labor_cost
        -List~JobPartItem~ _parts_used
        +str status
        +datetime created_at
        +add_part(part: Part, quantity: int) JobPartItem
        +get_parts_total() float
        +calculate_cost()* float
        +get_job_type()* str
        +get_cost_breakdown() dict
        +to_dict() dict
    }

    class RepairJob {
        -str _severity
        +severity: str
        +severity_fee: float
        +calculate_cost() float
        +get_job_type() str
    }

    class MaintenanceJob {
        -str _package_name
        +package_name: str
        +discount_rate: float
        +calculate_cost() float
        +get_job_type() str
    }

    class Invoice {
        -str _invoice_id
        -ServiceJob _service_job
        -float _total_amount
        +datetime issue_date
        +str payment_status
        +generate_invoice() dict
        +mark_as_paid() void
    }

    %% Relationships
    Customer <-- Vehicle : Association (Vehicle has an Owner)
    Vehicle <-- ServiceJob : Association (Job targets a Vehicle)
    ServiceJob *-- JobPartItem : Composition (Job owns itemized part usages)
    JobPartItem --> Part : References
    ServiceJob <|-- RepairJob : Inheritance (extends ServiceJob)
    ServiceJob <|-- MaintenanceJob : Inheritance (extends ServiceJob)
    Invoice o-- ServiceJob : Aggregation/Association (Invoice bills a ServiceJob)
```

---

## 🧩 5. หลักการ OOP ทั้ง 4 เสาหลัก (Core OOP Principles)

| หลักการ OOP | การประยุกต์ใช้ในโค้ด (Implementation Details) |
| :--- | :--- |
| **1. การห่อหุ้มข้อมูล (Encapsulation)** | • ใน `backend/models/part.py`: ฟิลด์ `_stock_qty` และ `_price` เป็น private/protected attribute เข้าถึงผ่าน `@property` และ Setter<br>• เมธอด `deduct_stock(qty)` ตรวจสอบเงื่อนไขป้องกันสต็อกติดลบก่อนตัดยอดจริง<br>• ใน `Customer` และ `Vehicle`: ตรวจสอบความถูกต้องของข้อมูลก่อนเซ็ตค่า |
| **2. การสืบทอดคุณสมบัติ (Inheritance)** | • `ServiceJob` ใน `backend/models/service_job.py` เป็น Abstract Base Class (`abc.ABC`) กำหนดโครงสร้างมาตรฐานของงานบริการ<br>• `RepairJob` และ `MaintenanceJob` สืบทอดแอตทริบิวต์ร่วม (`job_id`, `vehicle`, `labor_cost`, `parts_used`, `status`) และเมธอดจัดการอะไหล่จากคลาสแม่ |
| **3. ความหลากหลายของรูปแบบ (Polymorphism)** | • ทั้ง `RepairJob` และ `MaintenanceJob` ทำการ Override เมธอดนามธรรม `calculate_cost()` ด้วยอัลกอริทึมเฉพาะของแต่ละประเภทงาน:<br>&nbsp;&nbsp;• **งานซ่อมทั่วไป (`RepairJob`)**: `Total = labor_cost + parts_total + severity_fee` (คิดค่าความรุนแรงตามระดับงานซ่อม Minor, Moderate, Major)<br>&nbsp;&nbsp;• **งานเช็กระยะ (`MaintenanceJob`)**: `Total = (labor_cost + parts_total) - package_discount` (มอบส่วนลดตามแพ็กเกจระยะทาง 10k, 20k, 50k, 100k)<br>• ใน `backend/models/invoice.py`: เมธอด `Invoice.generate_invoice()` เรียกใช้งาน `self.service_job.calculate_cost()` แบบ Polymorphic โดยไม่ต้องเขียน `if/else` หรือตรวจสอบ `isinstance` |
| **4. ความสัมพันธ์แบบ Composition & Association** | • **Composition (`*--`)**: `ServiceJob` เป็นเจ้าของ `JobPartItem` เมื่อบันทึกการใช้อะไหล่ ข้อมูลราคา ณ ขณะเปิดใบงานจะถูกบันทึกไว้ในรายการ<br>• **Association (`<--`)**: `Vehicle` มีความสัมพันธ์กับ `Customer` ในฐานะเจ้าของรถ โดยทั้งสองสามารถดำรงอยู่อย่างอิสระได้ |

---

## ⚡ 6. ฟังก์ชันเด่นของระบบ (Key System Features)

1. **Garage Operations Command Center (ศูนย์ควบคุมการปฏิบัติการหน้าแรก)**:
   - แบนเนอร์ฮีโร่พร้อมตัวนับสถิติสด (Live Metrics) รถในระบบ, อะไหล่ในคลัง, ใบสั่งซ่อม และสถานะเซิร์ฟเวอร์
   - ปุ่มทางลัดเปิดใบสั่งซ่อมบำรุง, จำลองประเมินราคา, เบิกจ่ายอะไหล่ และค้นหาประวัติรถ
2. **ระบบประเมินราคาซ่อม & เปิดใบสั่งซ่อมบำรุง (Jobs & Repair Cost Estimator)**:
   - จำลองเลือกสเปกอะไหล่และคำนวณค่าแรงแบบเรียลไทม์
   - รองรับทั้งงานซ่อมด่วน (Repair) และงานเช็กระยะบำรุงรักษา (Maintenance)
3. **คลังเบิก-จ่ายอะไหล่มาตรฐาน OEM (Parts Dispensary & Inventory)**:
   - บรรจุข้อมูลอะไหล่รถยนต์จริงกว่า **27 รายการ** ครอบคลุม 10 ระบบงานซ่อม:
     - ระบบของเหลว & น้ำมันเครื่อง, ระบบเบรก & ช่วงล่าง, เครื่องยนต์ & ระบบส่งกำลัง, ระบบระบายความร้อน, ระบบไฟ & แบตเตอรี่, ไส้กรอง, ตัวถัง, อะไหล่ศูนย์ OEM และเครื่องมือช่าง
   - แบรนด์อะไหล่ชั้นนำ: Mobil 1, Castrol, Motul, Brembo, Bendix, NGK, Denso, Bosch, 3M, GS Battery
   - ตรวจจับสต็อกขั้นต่ำ (Low Stock Alert) และมีปุ่มเติมสต็อก (Restock) ทันที
4. **ศูนย์ค้นหาตามรุ่นรถและประวัติ (Vehicle Hub & Fleet Search)**:
   - ค้นหาอะไหล่ที่ตรงรุ่นกับยี่ห้อรถยนต์ยอดนิยม (Toyota, Honda, Isuzu, Ford, Mazda, Nissan, Mitsubishi)
5. **ระบบการเงินและใบแจ้งหนี้ (Billing & Invoices)**:
   - ออกใบเสร็จรับเงิน แจกแจงรายการค่าแรง, ค่าอะไหล่, ส่วนลด, ภาษีมูลค่าเพิ่ม (VAT 7%)
   - รองรับการกดบันทึกการชำระเงิน (Mark as Paid) แบบเรียลไทม์
6. **แถบนำทางเพรียวบาง สบายตา (Sleek Compact Navigation)**:
   - แถบเมนูสีแดงเพรียวบาง 38–40px ข้อความบรรทัดเดียวไม่ตกบรรทัด
   - ปุ่ม Active แท็บทรงแคปซูลโค้งมนพรีเมียม (Gold Pill Accent) พร้อมตะกร้าเบิกอะไหล่
7. **ระบบสลับภาษา 2 ภาษาเต็มรูปแบบ (Bilingual Support: TH / EN)**:
   - สลับภาษาระหว่าง **ภาษาไทย (TH)** และ **English (EN)** ได้แบบไดนามิกผ่าน `LanguageContext.jsx`
   - ไอคอนสลับภาษามาตรฐานสากลสไตล์ Vuexy `[A 文] EN / TH` บน Topbar ทั้งหน้าลูกค้าและหน้าแอดมิน
   - รองรับการแปลครอบคลุมทุกส่วน: เมนูนำทาง, การ์ดสถิติ, รายการอะไหล่, ข้อมูลรถ, ใบแจ้งหนี้, และโต๊ะแชทสด
8. **Vuexy Admin Backoffice & Garage Analytics (`/admin`)**:
   - แดชบอร์ดผู้ดูแลระบบสไตล์โมเดิร์น Vuexy / Materio Dashboard รองรับ Dark/Light Theme
   - **Live Workshop Bays Monitor**: มอนิเตอร์สถานะช่องซ่อมรถยนต์ 4 ช่องสด (Bay 1: เช็กระยะ, Bay 2: ยกเครื่องยนต์, Bay 3: ของเหลว, Bay 4: ซ่อมเบรก) พร้อมแถบแสดงเปอร์เซ็นต์ความคืบหน้า
   - **Master Technician Card**: การ์ดหัวหน้าช่างประจำอู่ "ช่างจันทร์ บรรลัยการช่าง" พร้อมกราฟิกเครื่องมือช่าง Automotive Mechanic Tools SVG (ประแจแหวนข้างปากตาย, ไขควง, น็อตหกเหลี่ยม, เฟืองเกียร์)
   - **Garage Notification Center**: ศูนย์แจ้งเตือนอู่รถยนต์ 4 รายการ (อะไหล่ใกล้หมด, ลูกค้าเข้าเช็กระยะ, ใบงานเสร็จสิ้น, แชทใหม่) พร้อมเคาน์เตอร์ตัวเลขแจ้งเตือนไดนามิก และปุ่ม "ทำเครื่องหมายว่าอ่านแล้วทั้งหมด" (Mark all as read)
   - **Customer Live Chat Desk**: ระบบโต๊ะตอบแชทลูกค้าสด พร้อมฟังก์ชัน Auto-Read อัตโนมัติเมื่อแอดมินคลิกเลือกบทสนทนาหรือตอบกลับ
   - **Full Inventory & SKU Control**: สิทธิ์แอดมินในการเพิ่มสินค้าใหม่ (Add Part SKU), แก้ไขราคา/สต็อก และลบรายการสินค้า
9. **ระบบสตาร์ทอัจฉริยะคลิกเดียว (1-Click Launch Script)**:
   - ไฟล์สคริปต์ `start_all.bat` สำหรับ Windows สามารถเปิดทั้ง FastAPI Backend (Port 8000) และ React Vite Frontend (Port 3000) พร้อมกันในคลิกเดียว

---

## 📂 7. โครงสร้างโฟลเดอร์โปรเจกต์ (Project Structure)

```text
car-garage/
├── backend/
│   ├── models/
│   │   ├── __init__.py           # Package exports
│   │   ├── customer.py           # Customer model (Encapsulation)
│   │   ├── vehicle.py            # Vehicle model (Association with Customer)
│   │   ├── part.py               # Part model (Encapsulation & Stock Guard)
│   │   ├── service_job.py        # ServiceJob (ABC), RepairJob & MaintenanceJob (Inheritance & Polymorphism)
│   │   └── invoice.py            # Invoice model (Polymorphic Billing Calculation)
│   ├── database.py               # In-Memory DB, Live Chat Data & 27 Seed Parts
│   ├── schemas.py                # Pydantic Schemas for Request & Response Validation
│   ├── main.py                   # FastAPI Application & REST Endpoints (Jobs, Parts, Invoices, Chat)
│   └── test_api.py               # Backend Unit & Integration Tests
│
├── frontend/
│   ├── index.html            # HTML Entrypoint พร้อม Bootstrap Icons CDN
│   ├── vite.config.js        # การตั้งค่า Vite React Dev Server (Port 3000)
│   ├── package.json          # รายการ Dependencies (React 19, Bootstrap 5, Vite)
│   ├── public/               # รูปภาพอะไหล่ 27 รายการ, โลโก้แบรนด์ และไอคอนหมวดหมู่
│   └── src/
│       ├── main.jsx          # React DOM Application Entrypoint
│       ├── App.jsx           # Main Dashboard, Tabs Controller & Global State
│       ├── globals.css       # Custom Garage Themes, Compact Navbar & Card Styles
│       ├── context/
│       │   └── LanguageContext.jsx # Bilingual Context Provider (TH / EN)
│       └── components/       # Pure React Components
│           ├── Navbar.jsx            # Sleek compact garage navigation bar with cart badge
│           ├── LanguageSwitcher.jsx  # Exact Vuexy-style [A 文] EN / TH language toggle
│           ├── PromoBannerCarousel.jsx # Garage Operations Command Center hero section
│           ├── StatsCards.jsx        # Top KPI metrics (Revenue, Invoices, Low Stock, Fleet)
│           ├── OrderCatalog.jsx      # 10-Subsystem Parts Catalog with filters
│           ├── PartsInventory.jsx    # Real-time stock management table with restock modal
│           ├── CreateServiceJob.jsx  # Polymorphic Job creation form & live preview
│           ├── GarageBuilder.jsx     # Interactive Repair Cost Estimator
│           ├── VehicleSearch.jsx     # Vehicle hub & fleet history search by brand/model
│           ├── CartView.jsx          # Parts requisition cart & order checkout
│           ├── InvoiceList.jsx       # Past service invoices list & status filter
│           ├── InvoiceModal.jsx      # Itemized receipt popup with tax breakdown
│           ├── RegisterModal.jsx     # Vehicle & Customer registration modal
│           ├── ContactSales.jsx      # Garage hotline (02-888-7999), branches & hours
│           ├── AdminPage.jsx         # หน้าเว็บแอดมินแยกต่างหาก (/admin) พร้อมระบบตรวจสอบสิทธิ์
│           ├── AdminLogin.jsx        # หน้าต่างเข้าสู่ระบบความปลอดภัยสำหรับแอดมิน (Security Login Gate)
│           ├── AdminPortal.jsx       # ศูนย์ควบคุมแอดมิน: เพิ่ม/แก้ไข/ลบอะไหล่ & ตอบแชทลูกค้าสด
│           ├── AdminVuexyDashboard.jsx # Modern Vuexy-style backoffice dashboard (Workshop bays, stats, quick actions)
│           ├── CustomerChatWidget.jsx# วิดเจ็ตแชทสดมุมขวาล่างสำหรับลูกค้าปรึกษาช่างและสอบถามข้อมูล
│           ├── Footer.jsx            # High-contrast garage footer
│           └── ProductImage.jsx      # Dynamic SVG & placeholder image handler
│
├── start_all.bat             # สคริปต์ 1-Click Launch เปิดทั้ง Backend และ Frontend บน Windows
└── README.md
```

---

## 🚀 8. ขั้นตอนการติดตั้งและเริ่มใช้งาน (Getting Started)

### ความต้องการของระบบ (Prerequisites)
- **Python:** เวอร์ชัน 3.9 หรือใหม่กว่า (แนะนำ Python 3.10 / 3.11 / 3.12)
- **Node.js:** เวอร์ชัน 18+ และ npm
- **Git:** สำหรับโคลนและจัดการซอร์สโค้ด

---

### วิธีที่ 1: เริ่มต้นใช้งานง่ายที่สุดผ่าน 1-Click Script (Windows)

หากคุณติดตั้ง Python dependencies และ npm packages เรียบร้อยแล้ว สามารถเริ่มระบบทั้งหมดได้ทันทีด้วย:
```bash
# ดับเบิลคลิกไฟล์ start_all.bat หรือรันผ่าน Terminal
.\start_all.bat
```
สคริปต์จะทำการเปิดหน้าต่าง Terminal 2 บานอัตโนมัติ:
- บานที่ 1: รัน **FastAPI Backend** ที่พอร์ต `8000`
- บานที่ 2: รัน **React Vite Frontend** ที่พอร์ต `3000`

---

### วิธีที่ 2: เริ่มต้นแบบ Manual (Command-Line)

1. **โคลนโปรเจกต์จาก GitHub:**
   ```bash
   git clone https://github.com/Kitikon15/Car-Garage-Repair-Service-System.git
   cd Car-Garage-Repair-Service-System
   ```

2. **เปิด Terminal ที่ 1: เริ่มต้นฝั่ง Backend (FastAPI)**
   ```bash
   # สร้าง Virtual Environment และติดตั้ง dependencies
   python -m venv venv
   # บน Windows:
   .\venv\Scripts\activate
   # บน macOS/Linux:
   # source venv/bin/activate

   pip install -r requirements.txt
   uvicorn backend.main:app --reload --port 8000
   ```
   - **Backend API:** `http://127.0.0.1:8000`
   - **Swagger UI Interactive Docs:** `http://127.0.0.1:8000/docs`

3. **เปิด Terminal ที่ 2: เริ่มต้นฝั่ง Frontend (React + Vite)**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   - **หน้าเว็บหลักสำหรับลูกค้า (Public Customer Portal):** `http://localhost:3000/`
   - **หน้าเว็บระบบแอดมินหลังบ้าน (Dedicated Admin Portal):** `http://localhost:3000/admin`
     - **ระบบความปลอดภัย (Security Gate):** มีระบบตรวจสอบสิทธิ์ป้องกันผู้ไม่เกี่ยวข้องเข้าถึง
     - **ชื่อผู้ใช้งาน (Username):** `admin`
     - **รหัสผ่าน (Password):** `admin123`

---
