CREATE TABLE cart_items (
	id INTEGER PRIMARY KEY, 
  cart_id INTEGER REFERENCES carts(id), 
  product_id INTEGER REFERENCES products(id), 
  quantity INTEGER, 
  added_at TIMESTAMP
);