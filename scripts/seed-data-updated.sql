-- Insert instructors with correct names
INSERT INTO instructors (name, specialties, phone, email) VALUES
('Fernando Ruiz', ARRAY['Microblading', 'Permanent Makeup', 'Eyebrow Design'], '+52 55 1234 5678', 'fernando.ruiz@maxfra.mx'),
('Maggy Acosta', ARRAY['Volume Lashes', 'Classic Lashes', 'Lash Lifting'], '+52 55 2345 6789', 'maggy.acosta@maxfra.mx'),
('Pao Pao', ARRAY['Henna Brows', 'Eyebrow Lamination', 'Tinting'], '+52 55 3456 7890', 'pao.pao@maxfra.mx'),
('Rosi R', ARRAY['Advanced Microblading', 'Ombre Brows', 'Training'], '+52 55 4567 8901', 'rosi.r@maxfra.mx'),
('Carlos Rivera', ARRAY['Academy Management', 'Business Development'], '+52 55 3333 4444', 'carlos.rivera@maxfra.mx'),
('Sofia Mendez', ARRAY['Student Coordination', 'Customer Service'], '+52 55 1111 2222', 'sofia.mendez@maxfra.mx'),
('Diana Herrera', ARRAY['Operations Management', 'Quality Control'], '+52 55 5555 6666', 'diana.herrera@maxfra.mx');

-- Insert locations with correct names
INSERT INTO locations (name, address, phone, manager_id) VALUES
('Polanco', 'Presidente Masaryk 456, Polanco, Miguel Hidalgo, 11560 Ciudad de México, CDMX', '+52 55 3333 4444', (SELECT id FROM instructors WHERE name = 'Carlos Rivera')),
('Ciudad Brisas', 'Av. Insurgentes Sur 123, Ciudad Brisas, Cuauhtémoc, 06700 Ciudad de México, CDMX', '+52 55 1111 2222', (SELECT id FROM instructors WHERE name = 'Sofia Mendez')),
('Perisur', 'Periférico Sur 789, Jardines del Pedregal, Tlalpan, 14200 Ciudad de México, CDMX', '+52 55 5555 6666', (SELECT id FROM instructors WHERE name = 'Diana Herrera'));

-- Insert services (same as before)
INSERT INTO services (name, duration_hours, price, category, description) VALUES
-- Courses
('Microblading Certification', 3.0, 3500, 'course', 'Complete microblading certification course with hands-on practice and certification'),
('Advanced Microblading', 3.0, 4200, 'course', 'Advanced techniques for experienced microblading artists'),
('Volume Lashes Course', 3.0, 2800, 'course', 'Professional volume lash extension certification program'),
('Classic Lashes Course', 2.5, 2200, 'course', 'Foundation course for classic eyelash extensions'),
('Henna Specialist Certification', 2.0, 1800, 'course', 'Natural henna brow styling and application techniques'),
('Permanent Makeup Course', 4.0, 5500, 'course', 'Comprehensive permanent makeup artistry program'),
('Ombre Brows Technique', 2.5, 3200, 'course', 'Modern ombre and powder brow techniques'),

-- Services
('Microblading Touch-up', 1.0, 800, 'service', 'Professional microblading touch-up and refresh service'),
('Eyelash Application', 1.5, 600, 'service', 'Professional eyelash extension application'),
('Eyebrow Shaping', 0.5, 300, 'service', 'Precision eyebrow shaping and styling'),
('Henna Brow Treatment', 1.0, 450, 'service', 'Natural henna eyebrow tinting and shaping'),
('Lash Lifting', 1.0, 550, 'service', 'Natural lash lifting and curling treatment'),
('Eyebrow Lamination', 1.0, 650, 'service', 'Eyebrow lamination for fuller, styled brows'),

-- Consultations
('Initial Consultation', 0.5, 200, 'consultation', 'Comprehensive beauty consultation and treatment planning'),
('Career Information Session', 1.0, 0, 'consultation', 'Information about career opportunities in beauty industry'),
('Course Overview', 0.75, 0, 'consultation', 'Detailed overview of available certification courses'),
('Academy Tour', 0.5, 0, 'consultation', 'Guided tour of academy facilities and equipment');

-- Insert students (same as before)
INSERT INTO students (full_name, phone, email, program_id, enrollment_date, progress_percentage, status) VALUES
('Emma Rodriguez Sanchez', '+52 55 1234 5678', 'emma.rodriguez@email.com', (SELECT id FROM services WHERE name = 'Microblading Certification'), '2024-11-15', 85, 'active'),
('Sophia Kim Lee', '+52 55 2345 6789', 'sophia.kim@email.com', (SELECT id FROM services WHERE name = 'Volume Lashes Course'), '2024-12-01', 92, 'active'),
('Isabella Chen Wang', '+52 55 3456 7890', 'isabella.chen@email.com', (SELECT id FROM services WHERE name = 'Henna Specialist Certification'), '2024-12-10', 78, 'active'),
('Maria Garcia Lopez', '+52 55 4567 8901', 'maria.garcia@email.com', (SELECT id FROM services WHERE name = 'Advanced Microblading'), '2024-10-20', 100, 'graduated'),
('Ana Gutierrez Morales', '+52 55 5678 9012', 'ana.gutierrez@email.com', (SELECT id FROM services WHERE name = 'Volume Lashes Course'), '2024-11-25', 65, 'active'),
('Carmen Flores Ruiz', '+52 55 6789 0123', 'carmen.flores@email.com', (SELECT id FROM services WHERE name = 'Classic Lashes Course'), '2024-12-05', 45, 'active'),
('Lucia Mendoza Torres', '+52 55 7890 1234', 'lucia.mendoza@email.com', (SELECT id FROM services WHERE name = 'Permanent Makeup Course'), '2024-11-01', 88, 'active'),
('Valentina Castro Jimenez', '+52 55 8901 2345', 'valentina.castro@email.com', (SELECT id FROM services WHERE name = 'Ombre Brows Technique'), '2024-12-12', 55, 'active');

-- Insert appointments with correct instructor names
INSERT INTO appointments (student_id, instructor_id, service_id, location_id, appointment_date, start_time, end_time, status, notes) VALUES
-- Today's appointments (June 24, 2025)
((SELECT id FROM students WHERE full_name = 'Emma Rodriguez Sanchez'), (SELECT id FROM instructors WHERE name = 'Fernando Ruiz'), (SELECT id FROM services WHERE name = 'Microblading Certification'), (SELECT id FROM locations WHERE name = 'Polanco'), '2025-06-24', '10:00', '13:00', 'confirmed', 'Final practical session'),
((SELECT id FROM students WHERE full_name = 'Ana Gutierrez Morales'), (SELECT id FROM instructors WHERE name = 'Maggy Acosta'), (SELECT id FROM services WHERE name = 'Volume Lashes Course'), (SELECT id FROM locations WHERE name = 'Polanco'), '2025-06-24', '10:00', '13:00', 'confirmed', 'Advanced volume techniques'),

-- Tomorrow's appointments (June 25, 2025)
((SELECT id FROM students WHERE full_name = 'Isabella Chen Wang'), (SELECT id FROM instructors WHERE name = 'Pao Pao'), (SELECT id FROM services WHERE name = 'Henna Specialist Certification'), (SELECT id FROM locations WHERE name = 'Ciudad Brisas'), '2025-06-25', '09:00', '12:00', 'confirmed', 'Henna application practice'),
((SELECT id FROM students WHERE full_name = 'Sophia Kim Lee'), (SELECT id FROM instructors WHERE name = 'Maggy Acosta'), (SELECT id FROM services WHERE name = 'Volume Lashes Course'), (SELECT id FROM locations WHERE name = 'Perisur'), '2025-06-25', '14:00', '17:00', 'pending', 'Volume lash assessment'),

-- Day after tomorrow (June 26, 2025)
((SELECT id FROM students WHERE full_name = 'Carmen Flores Ruiz'), (SELECT id FROM instructors WHERE name = 'Fernando Ruiz'), (SELECT id FROM services WHERE name = 'Classic Lashes Course'), (SELECT id FROM locations WHERE name = 'Polanco'), '2025-06-26', '10:00', '13:00', 'confirmed', 'Classic lash certification exam'),
((SELECT id FROM students WHERE full_name = 'Lucia Mendoza Torres'), (SELECT id FROM instructors WHERE name = 'Rosi R'), (SELECT id FROM services WHERE name = 'Permanent Makeup Course'), (SELECT id FROM locations WHERE name = 'Ciudad Brisas'), '2025-06-26', '15:00', '19:00', 'confirmed', 'Permanent makeup final project'),

-- Future appointments
((SELECT id FROM students WHERE full_name = 'Valentina Castro Jimenez'), (SELECT id FROM instructors WHERE name = 'Rosi R'), (SELECT id FROM services WHERE name = 'Ombre Brows Technique'), (SELECT id FROM locations WHERE name = 'Perisur'), '2025-06-27', '11:00', '13:30', 'pending', 'Ombre technique workshop'),
((SELECT id FROM students WHERE full_name = 'Emma Rodriguez Sanchez'), (SELECT id FROM instructors WHERE name = 'Fernando Ruiz'), (SELECT id FROM services WHERE name = 'Microblading Touch-up'), (SELECT id FROM locations WHERE name = 'Polanco'), '2025-06-30', '14:00', '15:00', 'pending', 'Post-course touch-up session');

-- Insert receipts (same as before)
INSERT INTO receipts (receipt_number, student_id, service_id, amount, payment_status, payment_method, issued_date) VALUES
('REC-001', (SELECT id FROM students WHERE full_name = 'Emma Rodriguez Sanchez'), (SELECT id FROM services WHERE name = 'Microblading Certification'), 3500, 'paid', 'card', '2024-11-15'),
('REC-002', (SELECT id FROM students WHERE full_name = 'Sophia Kim Lee'), (SELECT id FROM services WHERE name = 'Volume Lashes Course'), 2800, 'paid', 'transfer', '2024-12-01'),
('REC-003', (SELECT id FROM students WHERE full_name = 'Isabella Chen Wang'), (SELECT id FROM services WHERE name = 'Henna Specialist Certification'), 1800, 'paid', 'cash', '2024-12-10'),
('REC-004', (SELECT id FROM students WHERE full_name = 'Maria Garcia Lopez'), (SELECT id FROM services WHERE name = 'Advanced Microblading'), 4200, 'paid', 'card', '2024-10-20'),
('REC-005', (SELECT id FROM students WHERE full_name = 'Ana Gutierrez Morales'), (SELECT id FROM services WHERE name = 'Volume Lashes Course'), 2800, 'paid', 'transfer', '2024-11-25'),
('REC-006', (SELECT id FROM students WHERE full_name = 'Carmen Flores Ruiz'), (SELECT id FROM services WHERE name = 'Classic Lashes Course'), 2200, 'pending', 'card', '2024-12-05'),
('REC-007', (SELECT id FROM students WHERE full_name = 'Lucia Mendoza Torres'), (SELECT id FROM services WHERE name = 'Permanent Makeup Course'), 5500, 'paid', 'transfer', '2024-11-01'),
('REC-008', (SELECT id FROM students WHERE full_name = 'Valentina Castro Jimenez'), (SELECT id FROM services WHERE name = 'Ombre Brows Technique'), 3200, 'pending', 'card', '2024-12-12');
