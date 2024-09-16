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
