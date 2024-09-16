CREATE TYPE order_status AS ENUM('pending', 'shipped', 'delivered');

CREATE TABLE orders (
	id INTEGER PRIMARY KEY, 
  user_id INTEGER REFERENCES users(id), 
  total_amount MONEY, 
  status order_status,
  created_at TIMESTAMP
);