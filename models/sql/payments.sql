CREATE TYPE payment_status AS ENUM('pending', 'completed', 'failed');

CREATE TABLE payments (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
  user_id INTEGER NOT NULL, 
  order_id INTEGER REFERENCES orders(id),
  payment_method_id INTEGER REFERENCES payment_methods(id),
  amount MONEY, 
  transaction_reference VARCHAR(255), 
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status payment_status
);