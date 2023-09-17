CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    thumbnail MEDIUMBLOB,
    slider TEXT,
    mainText VARCHAR(255),
    author VARCHAR(255),
    price DECIMAL(10, 2),
    sold INT,
    quantity INT,
    category VARCHAR(255),
    createdAt DATETIME,
    updatedAt DATETIME,
    INDEX (_id)
);

-- Chuyển đổi dữ liệu datetime sang định dạng DATETIME của MySQL
INSERT INTO books ( thumbnail, slider, mainText, author, price, sold, quantity, category, createdAt, updatedAt)
VALUES (
    '3-931186dd6dcd231da1032c8220332fea.jpg',
    '[]',
    'Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và Sáng Suốt Hơn',
    'Jonathan Clements',
    70000,
    20,
    1000,
    'Arts',
    '2023-08-24 08:45:16', -- Định dạng DATETIME
    '2023-08-24 08:45:16'  -- Định dạng DATETIME
);


CREATE TABLE images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    thumnail MEDIUMBLOB,
    slide JSON,
    image_name VARCHAR(255)
);

INSERT INTO images (thumnail, slide,image_name ) 
VALUES (
	'C:/Users/Gigabyte/Pictures/Funny Pic/Lonly.jpg', 
    '["C:/Users/Gigabyte/Pictures/Dev/background_1.jpg", "C:/Users/Gigabyte/Pictures/Dev/background-1.jpg"]',
    'image');

SELECT * FROM images;
