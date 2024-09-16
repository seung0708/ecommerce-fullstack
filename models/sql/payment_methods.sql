CREATE TYPE method_type AS ENUM('credit', 'debit', 'paypal', 'google pay');

CREATE TABLE payment_methods (
  id INTEGER PRIMARY KEY, 
  user_id INTEGER REFERENCES users(id), 
  method_type method_type, 
  expiry_date TIMESTAMP, 
  added_at TIMESTAMP
);