CREATE TYPE method_type AS ENUM('credit', 'debit', 'stripe');

CREATE TABLE payment_methods (
  id INTEGER PRIMARY KEY GENERATED ALWAYS IDENTITY, 
  user_id INTEGER REFERENCES users(id),
  stripe_payment_method_id VARCHAR(255), 
  type method_type, 
  expiry_date TIMESTAMP, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 