CREATE TABLE book (
    id INT AUTO_INCREMENT PRIMARY KEY,
    thumnail MEDIUMBLOB,
    slide JSON,
    maintext VARCHAR(255),
    category VARCHAR(255),
    author VARCHAR(255),
    price NUMERIC(10, 3),
    sold integer,
    quantity integer,
    createAt DATE,
    updateAt Date
);

INSERT INTO images (thumnail, slide,image_name ) 
VALUES (
	'C:/Users/Gigabyte/Pictures/Funny Pic/Lonly.jpg', 
    '["C:/Users/Gigabyte/Pictures/Dev/background_1.jpg", "C:/Users/Gigabyte/Pictures/Dev/background-1.jpg"]',
    'image');


INSERT INTO book (thumnail, slide, maintext, author, price, sold, quantity, createAt, updateAt,category)
VALUES
    ("C:/Users/cmMai/OneDrive/Hình ảnh/Games/Jingliu.jpg", '["C:/Users/cmMai/OneDrive/Hình ảnh/Games/Jingliu.jpg", "C:/Users/cmMai/OneDrive/Hình ảnh/Games/Jingliu.jpg"]', 'The Da Vinci Code', 'Dan Brown', 19.99, 500, 1000, '2023-09-15', '2023-09-15','Thriller'),
    ("C:/Users/cmMai/OneDrive/Hình ảnh/Games/Jingliu.jpg", '["C:/Users/cmMai/OneDrive/Hình ảnh/Games/Jingliu.jpg", "C:/Users/cmMai/OneDrive/Hình ảnh/Games/Jingliu.jpg"]', 'Dune', 'Frank Herbert', 24.95, 300, 750, '2023-09-15', '2023-09-15','Thriller'),
    ("C:/Users/cmMai/OneDrive/Hình ảnh/Meme/MeoMeo.jpg", '["C:/Users/cmMai/OneDrive/Hình ảnh/Meme/MeoMeo.jpg", "C:/Users/cmMai/OneDrive/Hình ảnh/Meme/MeoMeo.jpg"]', 'Harry Potter and the Sorcerer\'s Stone', 'J.K. Rowling', 14.99, 800, 1200, '2023-09-15', '2023-09-15','Thriller'),
    ("C:/Users/cmMai/OneDrive/Hình ảnh/Meme/MeoMeo.jpg", '["C:/Users/cmMai/OneDrive/Hình ảnh/Games/Jingliu.jpg", "C:/Users/cmMai/OneDrive/Hình ảnh/Games/Jingliu.jpg"]', 'The Girl with the Dragon Tattoo', 'Stieg Larsson', 12.49, 200, 500, '2023-09-15', '2023-09-15','Thriller'),
    ("C:/Users/cmMai/OneDrive/Hình ảnh/Meme/MeoMeo.jpg", '["C:/Users/cmMai/OneDrive/Hình ảnh/Games/Jingliu.jpg", "C:/Users/cmMai/OneDrive/Hình ảnh/Games/Jingliu.jpg"]', 'Foundation', 'Isaac Asimov', 9.99, 350, 900, '2023-09-15', '2023-09-15','Thriller'),
    ("C:/Users/cmMai/OneDrive/Hình ảnh/Games/Jingliu.jpg", '["C:/Users/cmMai/OneDrive/Hình ảnh/Games/Jingliu.jpg", "C:/Users/cmMai/OneDrive/Hình ảnh/Games/Jingliu.jpg"]', 'The Hobbit', 'J.R.R. Tolkien', 10.79, 400, 800, '2023-09-15', '2023-09-15','Thriller'),
    ("C:/Users/cmMai/OneDrive/Hình ảnh/Meme/MeoMeo.jpg", '["C:/Users/cmMai/OneDrive/Hình ảnh/Meme/MeoMeo.jpg", "C:/Users/cmMai/OneDrive/Hình ảnh/Meme/MeoMeo.jpg"]', 'Gone Girl', 'Gillian Flynn', 13.95, 600, 1100, '2023-09-15', '2023-09-15','Thriller'),
    ("C:/Users/cmMai/OneDrive/Hình ảnh/Meme/MeoMeo.jpg", '["C:/Users/cmMai/OneDrive/Hình ảnh/Games/Jingliu.jpg", "C:/Users/cmMai/OneDrive/Hình ảnh/Games/Jingliu.jpg"]', 'Neuromancer', 'William Gibson', 8.99, 150, 400, '2023-09-15', '2023-09-15','Thriller'),
    ("C:/Users/cmMai/OneDrive/Hình ảnh/Games/Jingliu.jpg", '["C:/Users/cmMai/OneDrive/Hình ảnh/Games/Jingliu.jpg", "C:/Users/cmMai/OneDrive/Hình ảnh/Games/Jingliu.jpg"]', 'A Game of Thrones', 'George R.R. Martin', 17.49, 750, 1500, '2023-09-15', '2023-09-15','Thriller'),
    ("C:/Users/cmMai/OneDrive/Hình ảnh/Games/Jingliu.jpg", '["C:/Users/cmMai/OneDrive/Hình ảnh/Meme/MeoMeo.jpg", "C:/Users/cmMai/OneDrive/Hình ảnh/Meme/MeoMeo.jpg"]', 'The Sherlock Holmes Collection', 'Arthur Conan Doyle', 29.99, 700, 1300, '2023-09-15', '2023-09-15','Thriller');
    
    
    