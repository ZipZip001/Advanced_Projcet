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
    ("https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg", '["https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg", "https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg"]', 'The Da Vinci Code', 'Dan Brown', 19.99, 500, 1000, '2023-09-15', '2023-09-15','Romance'),
    ("https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg", '["https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg", "https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg"]', 'The Da Vinci Code', 'Dan Brown', 19.99, 500, 1000, '2023-09-15', '2023-09-15','Mystery'),
	("https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg", '["https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg", "https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg"]', 'The Da Vinci Code', 'Dan Brown', 19.99, 500, 1000, '2023-09-15', '2023-09-15','Self-help'),
	("https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg", '["https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg", "https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg"]', 'The Da Vinci Code', 'Dan Brown', 19.99, 500, 1000, '2023-09-15', '2023-09-15','Cookbooks'),
	("https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg", '["https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg", "https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg"]', 'The Da Vinci Code', 'Dan Brown', 19.99, 500, 1000, '2023-09-15', '2023-09-15','Essays'),
	("https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg", '["https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg", "https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg"]', 'The Da Vinci Code', 'Dan Brown', 19.99, 500, 1000, '2023-09-15', '2023-09-15','History'),
	("https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg", '["https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg", "https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg"]', 'The Da Vinci Code', 'Dan Brown', 19.99, 500, 1000, '2023-09-15', '2023-09-15','Fantasy '),
	("https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg", '["https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg", "https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg"]', 'The Da Vinci Code', 'Dan Brown', 19.99, 500, 1000, '2023-09-15', '2023-09-15','Horror'),
	("https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg", '["https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg", "https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg"]', 'The Da Vinci Code', 'Dan Brown', 19.99, 500, 1000, '2023-09-15', '2023-09-15','Manga'),
	("https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg", '["https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg", "https://media.post.rvohealth.io/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1-732x549.jpg"]', 'The Da Vinci Code', 'Dan Brown', 19.99, 500, 1000, '2023-09-15', '2023-09-15','Orther');



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
("Romance")






