CREATE TABLE carts (
	id INTEGER PRIMARY KEY, 
  user_id INTEGER REFERENCES users(id), 
  created_at TIMESTAMP
);