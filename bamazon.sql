-- Create a database called 'Bamazon' --
CREATE DATABASE Bamazon;
USE Bamazon;

-- Create a table called 'products' which will contain the all the store items/products --
CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);

-- Insert data into the 'products' table --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Shea Body Butter', 'Cosmetics', 5.75, 500),
		('Eye Cream', 'Cosmetics', 6.25, 627),
		('Whole Wheat Bread', 'Grocery', 5.99, 300),
		('Eggplant', 'Grocery', 4.25, 400),
		('Apples', 'Produce', 0.35, 800),
		('Bannana', 'Produce', 0.20, 10000),
		('Eggs', 'Dairy', 4.45, 267),
		('Lactose free Milk', 'Dairy', 4.50, 200),
		('Notebooks', 'STationary', 2.75, 476),
		('Coffee', 'Grocery', 12.99, 575),
		('Toys', 'Children', 1.50, 423),
		('Basketball', 'Sports', 12.75, 150),
		('Tennis-Rackets', 'Sports', 7.99, 89),
		('Suits', 'Clothing', 55.55, 120),
		('Yoga Pants', 'Clothing', 17.88, 250),
		('Nuts', 'Grocery', 7.25, 157),
		('Soups', 'Grocery', 12.50, 163),
		('Panadol', 'Pharmacy', 4.95, 389),
		('Chicken', 'Meat', 3.25, 550),
		('Ben & Jerry Ice Cream', 'Grocery', 3.25, 432);