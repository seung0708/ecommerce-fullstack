CREATE TYPE payment_status AS ENUM('pending', 'completed', 'failed');

CREATE TABLE payments (
  id INTEGER PRIMARY KEY GENERATE ALWAYS IDENTITY, 
  order_id INTEGER REFERENCES orders(id), 
  user_id INTEGER REFERENCES users(id), 
  payment_method_id INTEGER REFERENCES payment_methods(id), 
  amount MONEY, 
  status payment_status, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);