CREATE TYPE type AS ENUM('seller', 'customer');

CREATE TABLE users(
  id integer PRIMARY KEY, 
  first_name VARCHAR(100) NOT NULL, 
  last_name VARCHAR(100) NOT NULL, 
  email VARCHAR(200) NOT NULL UNIQUE, 
  password VARCHAR(255) NOT NULL UNIQUE, 
  user_type type,
  created_at TIMESTAMP 
 );
