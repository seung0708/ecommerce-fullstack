CREATE TABLE order_items (
	id INTEGER PRIMARY KEY, 
  order_id INTEGER REFERENCES orders(id), 
  product_id INTEGER REFERENCES products(id), 
  quantity INTEGER, 
  price MONEY
);