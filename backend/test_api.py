"""
Automated Integration & OOP Verification Test Suite
"""

from fastapi.testclient import TestClient
from backend.main import app

def test_full_system_flow():
    client = TestClient(app)

    # 1. Health check
    res = client.get("/api/health")
    assert res.status_code == 200
    print("✓ Health Check:", res.json())

    # 2. Check Parts Inventory
    res = client.get("/api/parts")
    assert res.status_code == 200
    parts = res.json()
    assert len(parts) >= 8
    p001 = next(p for p in parts if p["part_id"] == "PART-001")
    initial_qty = p001["stock_qty"]
    print(f"✓ Inventory Loaded: {len(parts)} parts. PART-001 stock = {initial_qty}")

    # 3. Create Repair Job with Stock Deduction
    # Parts: 2 x 1850.00 = 3700.00
    # Labor: 800.00
    # Severity MAJOR surcharge: 1800.00
    # Total expected: 3700 + 800 + 1800 = 6300.00
    res = client.post("/api/jobs/repair", json={
        "license_plate": "ABC-1234",
        "labor_cost": 800.0,
        "description": "Brake pads replacement and rotor inspection",
        "severity": "MAJOR",
        "parts": [{"part_id": "PART-001", "quantity": 2}],
        "auto_generate_invoice": True
    })
    assert res.status_code == 201, res.text
    repair_data = res.json()
    assert repair_data["calculated_cost"] == 6300.0
    assert repair_data["invoice"]["total_amount"] == 6300.0
    print(f"✓ RepairJob Polymorphic Cost = ฿{repair_data['calculated_cost']} (Expected ฿6300.00)")

    # 4. Verify Stock Deduction (Encapsulation)
    res = client.get("/api/parts")
    parts_after = res.json()
    p001_after = next(p for p in parts_after if p["part_id"] == "PART-001")
    assert p001_after["stock_qty"] == initial_qty - 2
    print(f"✓ Stock Encapsulation Verified: PART-001 reduced from {initial_qty} to {p001_after['stock_qty']}")

    # 5. Create Maintenance Job with Package Discount
    # Parts: 1 x 2150.00 (PART-002) = 2150.00
    # Labor: 650.00
    # Subtotal: 2800.00
    # Discount (PERIODIC_10K = 10%): 280.00
    # Total expected: 2800 - 280 = 2520.00
    res = client.post("/api/jobs/maintenance", json={
        "license_plate": "XYZ-7890",
        "labor_cost": 650.0,
        "description": "10,000 km Scheduled Service Package",
        "package_name": "PERIODIC_10K",
        "parts": [{"part_id": "PART-002", "quantity": 1}],
        "auto_generate_invoice": True
    })
    assert res.status_code == 201, res.text
    maint_data = res.json()
    assert maint_data["calculated_cost"] == 2520.0
    print(f"✓ MaintenanceJob Polymorphic Cost = ฿{maint_data['calculated_cost']} (Expected ฿2520.00)")

    # 6. Verify Invoices List
    res = client.get("/api/invoices")
    assert res.status_code == 200
    invoices = res.json()
    print(f"✓ Invoices Verified: {len(invoices)} invoices stored.")

    # 7. Check Dashboard Stats
    res = client.get("/api/stats")
    assert res.status_code == 200
    stats = res.json()
    print(f"✓ Dashboard Stats Verified: {stats}")

    print("\n=======================================================")
    print("🎉 ALL OOP & OOAD SYSTEM VERIFICATION TESTS PASSED! 🎉")
    print("=======================================================")

if __name__ == "__main__":
    test_full_system_flow()
