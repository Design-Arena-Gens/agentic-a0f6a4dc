-- Seed roles
INSERT INTO roles (name, description)
SELECT role_name, CONCAT(role_name, ' role')
FROM (VALUES
             ('SUPER_ADMIN'),
             ('FARM_MANAGER'),
             ('VERIFIER'),
             ('APPROVER'),
             ('WORKER'),
             ('VET')) AS r(role_name)
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE roles.name = r.role_name);

-- Seed farms
INSERT INTO farms (id, name, location, description, capacity, area_acres, created_at)
VALUES (1, 'Sitamarhi Barbari Farm', 'Sitamarhi, Bihar, India', 'Primary farm for GFMS demo', 500, 12.5, now())
ON CONFLICT (id) DO NOTHING;

-- Seed users
INSERT INTO users (id, username, email, password_hash, active, created_at)
VALUES (1, 'superadmin', 'superadmin@goatfarm.io', '$2a$10$CY8tNdm42Hcps225y7sY7OSsY9qsK0kGugHgd6NqBJ38qRAjPR9U2', true, now()),
       (2, 'manager', 'manager@goatfarm.io', '$2a$10$CY8tNdm42Hcps225y7sY7OSsY9qsK0kGugHgd6NqBJ38qRAjPR9U2', true, now()),
       (3, 'vet', 'vet@goatfarm.io', '$2a$10$CY8tNdm42Hcps225y7sY7OSsY9qsK0kGugHgd6NqBJ38qRAjPR9U2', true, now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO user_roles (user_id, role_id)
SELECT 1, r.id
FROM roles r
WHERE r.name = 'SUPER_ADMIN'
  AND NOT EXISTS (SELECT 1 FROM user_roles ur WHERE ur.user_id = 1 AND ur.role_id = r.id);
INSERT INTO user_roles (user_id, role_id)
SELECT 2, r.id
FROM roles r
WHERE r.name IN ('FARM_MANAGER', 'APPROVER')
  AND NOT EXISTS (SELECT 1 FROM user_roles ur WHERE ur.user_id = 2 AND ur.role_id = r.id);
INSERT INTO user_roles (user_id, role_id)
SELECT 3, r.id
FROM roles r
WHERE r.name = 'VET'
  AND NOT EXISTS (SELECT 1 FROM user_roles ur WHERE ur.user_id = 3 AND ur.role_id = r.id);

-- Seed goats with 3 generations using generate_series
DO $$
DECLARE
    goat_count INTEGER := (SELECT COUNT(*) FROM goats);
BEGIN
    IF goat_count < 1000 THEN
        INSERT INTO goats (tag_id, gender, date_of_birth, color, photo_url, breed_composition, generation, farm_id, sire_id, dam_id, active)
        SELECT
            CONCAT('GF', LPAD(g::text, 4, '0')),
            CASE WHEN random() > 0.5 THEN 'FEMALE' ELSE 'MALE' END,
            DATE '2022-01-01' + (g % 365),
            CASE WHEN random() > 0.5 THEN 'White' ELSE 'Brown' END,
            NULL,
            jsonb_build_object('Boer', 80 + (random() * 20), 'Barbari', 20 - (random() * 10)),
            1 + (g % 3),
            1,
            NULL,
            NULL,
            true
        FROM generate_series(1, 1000) AS g
        ON CONFLICT DO NOTHING;
    END IF;
END $$;

-- Seed finance records
INSERT INTO finance_records (record_type, record_date, amount, category, description, counterparty, farm_id, reference_id)
VALUES ('SALE', CURRENT_DATE - 10, 250000, 'GOAT_SALE', 'Bulk sale of Boer-Barbari cross', 'Local Trader', 1, 'SALE-001'),
       ('EXPENSE', CURRENT_DATE - 5, 55000, 'FEED', 'Purchase of concentrate feed', 'Feed Supplier', 1, 'EXP-001')
ON CONFLICT DO NOTHING;
