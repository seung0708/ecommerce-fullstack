CREATE TABLE sellers (
	id INTEGER PRIMARY KEY, 
  user_id INTEGER REFERENCES users(id),
  store_name VARCHAR(200) NOT NULL, 
  created_at TIMESTAMP
);
