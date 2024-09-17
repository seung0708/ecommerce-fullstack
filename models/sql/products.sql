CREATE TABLE products (
  id INTEGER PRIMARY KEY, 
  seller_id INTEGER REFERENCES sellers(id), 
  category_id INTEGER REFERENCES categories(id), 
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL, 
  price MONEY NOT NULL, 
  quantity INTEGER NOT NULL,
  created_at TIMESTAMP  
);


INSERT INTO products (seller_id, category_id, name, description, price, quantity, images)
VALUES (
  	3,
  	3,
    'Blue & Black Check Shirt',
    'The Blue & Black Check Shirt is a stylish and comfortable men''s shirt featuring a classic check pattern. Made from high-quality fabric, it''s suitable for both casual and semi-formal occasions.',
    29.99,
  	44,
    '[
        "https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20&%20Black%20Check%20Shirt/1.png",
  			"https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20&%20Black%20Check%20Shirt/2.png",
  			"https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20&%20Black%20Check%20Shirt/3.png"
    ]'
)