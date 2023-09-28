CREATE TABLE book (
    id INT AUTO_INCREMENT PRIMARY KEY,
	thumnail VARCHAR(255),
    slide TEXT,
    maintext VARCHAR(255),
    category VARCHAR(255),
    author VARCHAR(255),
    price NUMERIC(10, 3),
    sold integer,
    quantity integer,
    create_at DATE,
    update_at Date
);

INSERT INTO book (thumnail, slide, maintext, author, price, sold, quantity, create_at, update_at,category)
VALUES

    ("https://salt.tikicdn.com/cache/368x368/ts/product/15/11/f8/56b303e000cb42faada663569fc5d7c9.jpg.webp", '["https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg, "https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg]', 'Sách Thay Đổi Cuộc Sống Với Nhân Số Học', 'Lê Đỗ Quỳnh Hương', 173600, 500, 1000, '2023-09-15', '2023-09-15','Self-help'),
    ("https://salt.tikicdn.com/cache/750x750/ts/product/ea/80/aa/76487dc3664207976a100b4b1b932cd6.jpg.webp", '["https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg, "https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg]', 'Sách Sức Mạnh Tiềm Thức (Tái Bản)', 'Joseph Murphyc', 95100, 500, 1000, '2023-09-15', '2023-09-15','Orther'),
	("https://salt.tikicdn.com/cache/750x750/ts/product/80/14/8b/61fb657f347d14d9d7bf6fe901001a8e.jpg.webp", '["https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg, "https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg]', 'Sách Đi Tìm Lẽ Sống (Tái Bản )', 'Viktor Emil Frankl', 87000, 500, 1000, '2023-09-15', '2023-09-15','Self-help'),
	("https://salt.tikicdn.com/cache/750x750/media/catalog/producttmp/1b/d0/54/d9b746933e8dc26b678f19e2dad6aebe.jpg.webp", '["https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg, "https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg]', 'Sách Hiểu Về Trái Tim (Tái Bản 2019)', 'Minh Niệm', 126000, 500, 1000, '2023-09-15', '2023-09-15','Self-help'),
	("https://salt.tikicdn.com/cache/750x750/ts/product/2e/eb/ad/3e776fea882655620441ec9f6eba9a04.jpg.webp", '["https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg, "https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg]', 'Sách Đắc Nhân Tâm (Bìa Cứng)', 'Dale Carnegie', 80000, 500, 1000, '2023-09-15', '2023-09-15','Self-help'),
    
	("https://salt.tikicdn.com/cache/368x368/ts/product/ed/db/18/d7fa85aac9548c497698d90e842815a3.png.webp", '["https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg, "https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg]', 'Diệt Slime Suốt 300 Năm, Tôi Levelmax Lúc Nào Chẳng Ha', 'Morita Kisetsu', 42100, 500, 1000, '2023-09-15', '2023-09-15','Manga'),
	("https://salt.tikicdn.com/cache/750x750/media/catalog/product/i/m/image_7414.jpg.webp", '["https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg, "https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg]', 'Tales of Horror: Elementary Level', 'Edgar Allan Poe', 65600, 500, 1000, '2023-09-15', '2023-09-15','Horror'),
	("https://salt.tikicdn.com/cache/750x750/ts/product/01/df/f6/7d4e6251bfe4afab9af63eacdd247744.jpg.webp", '["https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg, "https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg]', 'FINAL FANTASY XIV: SHADOWBRINGERS | The Art Of Reflection', 'Histories Forsaken', 944000 ,500, 1000, '2023-09-15', '2023-09-15','Fantasy '),
	("https://salt.tikicdn.com/cache/368x368/ts/product/9d/d0/0a/5edbfd3c6989c6fb70a99e6f063cb886.jpg.webp", '["https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg, "https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg]', 'A History Of Vn In Pictures. Lý Thường Kiệt (In Colour)', 'Trần Bạch Đằng', 161500, 500, 1000, '2023-09-15', '2023-09-15','History'),
	("https://salt.tikicdn.com/cache/750x750/ts/product/55/3e/f8/f9233f5cc76ddf78e5d6adc8734beced.jpg.webp", '["https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg, "https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg]', 'Sách IRED Books - Những tiểu luận triết học (Philosophy Essays)', 'Bertrand Russell',64000, 500, 1000, '2023-09-15', '2023-09-15','Essays'),
    
	("https://salt.tikicdn.com/cache/750x750/ts/product/15/d4/d5/70ad904b07a46853d61af141185078f5.jpg.webp", '["https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg, "https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg]', 'Khoa Học Về Nấu Ăn - The Science Of Cooking', 'Stuart Farrimond', 312500, 500, 1000, '2023-09-15', '2023-09-15','Cookbooks'),
    ("https://salt.tikicdn.com/cache/750x750/ts/product/08/cf/a0/16e5e6d8aee89cd8d17ee0dff004cc42.jpg.webp", '["https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg, "https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg]', 'The Mystery of Three Quarters - Bí Ẩn Ba Phần Tư', 'Sophie Hannah', 162000, 500, 1000, '2023-09-15', '2023-09-15','Mystery'),
    ("https://salt.tikicdn.com/cache/368x368/ts/product/02/68/94/8ac980202b4d1fd0db204098e8bc68ae.jpg.webp", '["https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg, "https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg]', 'Me Before You- Trước ngày em đến', 'Jojo Moyes', 155400, 500, 1000, '2023-09-15', '2023-09-15','Romance');




CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
	category VARCHAR(255)
);

INSERT INTO categories (category)
VALUES 
("Orther"),
("Manga"),
("Horror"),
("Fantasy"),
("History"),
("Essays"),
("Cookbooks"),
("Self-help"),
("Mystery"),
("Romance");

CREATE TABLE usertable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    role VARCHAR(255),
    avatar VARCHAR(255),
    is_active Boolean,
    password VARCHAR(255), -- Thêm trường password
    create_at DATE,
    update_at Date
);

-- INSERT INTO userdata (full_name, email, phone, role, avatar, is_active, password, create_at, update_at) VALUES
-- ('John Doe', 'john.doe@example.com', '123456789', 'Admin', 'avatar1.jpg', TRUE,'123456', '2023-09-15', '2023-09-15'),
-- ('Alice Smith', 'alice.smith@example.com', '987654321', 'User', 'avatar2.jpg', TRUE,'123456', '2023-09-16', '2023-09-16'),
-- ('Bob Johnson', 'bob.johnson@example.com', '555555555', 'User', 'avatar3.jpg', FALSE,'123456', '2023-09-17', '2023-09-17');

INSERT INTO userdata (full_name, email, phone, role, avatar, is_active, password, create_at, update_at) VALUES
('John Doe', 'john.doe@example.com', '123456789', 'Admin', 'avatar1.jpg', TRUE, '$2a$10$7WIPd9U8yqu6H3ct9oBPIOMuYdQ8tD/fcCxOzo0fOjxyxNADT6n5e', '2023-09-15', '2023-09-15'),
('Alice Smith', 'alice.smith@example.com', '987654321', 'User', 'avatar2.jpg', TRUE, '$2a$10$7WIPd9U8yqu6H3ct9oBPIOMuYdQ8tD/fcCxOzo0fOjxyxNADT6n5e', '2023-09-16', '2023-09-16'),
('Bob Johnson', 'bob.johnson@example.com', '555555555', 'User', 'avatar3.jpg', FALSE, '$2a$10$7WIPd9U8yqu6H3ct9oBPIOMuYdQ8tD/fcCxOzo0fOjxyxNADT6n5e', '2023-09-17', '2023-09-17');





