CREATE TYPE method_type AS ENUM('credit', 'debit', 'stripe');

CREATE TABLE payment_methods (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
  method_type method_type, 
  created_at TIMESTAMPTZ DEFAULT NOW(),
  provider_details JSONB
)