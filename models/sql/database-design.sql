CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "password" varchar NOT NULL,
  "created_at" datetime
);

CREATE TABLE "sellers" (
  "seller_id" integer PRIMARY KEY,
  "user_id" integer,
  "store_name" varchar,
  "created_at" datetime
);


CREATE TABLE user_roles (
	user_id INTEGER REFERENCES users(id), 
  role_id INTEGER REFERENCES roles(id),
  PRIMARY KEY (user_id, role_id)
);
CREATE TABLE roles (
	id INTEGER PRIMARY KEY,
  name VARCHAR(50)
);


CREATE TABLE "categories" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "description" varchar,
  "created_at" timestamp
);

CREATE TABLE "products" (
  "id" integer PRIMARY KEY,
  "seller_id" integer,
  "category_id" integer,
  "name" varchar,
  "description" varchar,
  "price" money,
  "stock_quantity" INT,
  "created_at" timestamp
);

CREATE TABLE "product_attributes" (
  "id" integer PRIMARY KEY,
  "type" product_attribute_type,
  "value" varchar,
  "created_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "products_skus" (
  "id" integer PRIMARY KEY,
  "product_id" integer,
  "size_attribute_id" integer,
  "color_attribute_id" integer,
  "sku" varchar,
  "price" varchar,
  "quantity" integer,
  "created_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "cart" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "total" integer,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "cart_item" (
  "id" integer PRIMARY KEY,
  "cart_id" integer,
  "product_id" integer,
  "products_sku_id" integer,
  "quantity" integer,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "order_details" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "payment_id" integer,
  "total" integer,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "order_item" (
  "id" integer PRIMARY KEY,
  "order_id" integer,
  "product_id" integer,
  "products_sku_id" integer,
  "quantity" integer,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "payment_details" (
  "id" integer PRIMARY KEY,
  "order_id" integer,
  "amount" integer,
  "provider" varchar,
  "status" value,
  "created_at" timestamp,
  "updated_at" timestamp
);

COMMENT ON COLUMN "users"."users_type" IS 'sellers or users';

ALTER TABLE "sellers" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

CREATE TABLE "products_categories" (
  "products_category_id" integer,
  "categories_id" integer,
  PRIMARY KEY ("products_category_id", "categories_id")
);

ALTER TABLE "products_categories" ADD FOREIGN KEY ("products_category_id") REFERENCES "products" ("category_id");

ALTER TABLE "products_categories" ADD FOREIGN KEY ("categories_id") REFERENCES "categories" ("id");


CREATE TABLE "product_attributes_products_skus" (
  "product_attributes_id" integer,
  "products_skus_size_attribute_id" integer,
  PRIMARY KEY ("product_attributes_id", "products_skus_size_attribute_id")
);

ALTER TABLE "product_attributes_products_skus" ADD FOREIGN KEY ("product_attributes_id") REFERENCES "product_attributes" ("id");

ALTER TABLE "product_attributes_products_skus" ADD FOREIGN KEY ("products_skus_size_attribute_id") REFERENCES "products_skus" ("size_attribute_id");


CREATE TABLE "product_attributes_products_skus(1)" (
  "product_attributes_id" integer,
  "products_skus_color_attribute_id" integer,
  PRIMARY KEY ("product_attributes_id", "products_skus_color_attribute_id")
);

ALTER TABLE "product_attributes_products_skus(1)" ADD FOREIGN KEY ("product_attributes_id") REFERENCES "product_attributes" ("id");

ALTER TABLE "product_attributes_products_skus(1)" ADD FOREIGN KEY ("products_skus_color_attribute_id") REFERENCES "products_skus" ("color_attribute_id");


ALTER TABLE "products_skus" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "cart" ("user_id");

ALTER TABLE "cart_item" ADD FOREIGN KEY ("cart_id") REFERENCES "cart" ("id");

CREATE TABLE "cart_item_products" (
  "cart_item_product_id" integer,
  "products_id" integer,
  PRIMARY KEY ("cart_item_product_id", "products_id")
);

ALTER TABLE "cart_item_products" ADD FOREIGN KEY ("cart_item_product_id") REFERENCES "cart_item" ("product_id");

ALTER TABLE "cart_item_products" ADD FOREIGN KEY ("products_id") REFERENCES "products" ("id");


CREATE TABLE "cart_item_products_skus" (
  "cart_item_products_sku_id" integer,
  "products_skus_id" integer,
  PRIMARY KEY ("cart_item_products_sku_id", "products_skus_id")
);

ALTER TABLE "cart_item_products_skus" ADD FOREIGN KEY ("cart_item_products_sku_id") REFERENCES "cart_item" ("products_sku_id");

ALTER TABLE "cart_item_products_skus" ADD FOREIGN KEY ("products_skus_id") REFERENCES "products_skus" ("id");


ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "order_details" ("user_id");

ALTER TABLE "order_item" ADD FOREIGN KEY ("order_id") REFERENCES "order_details" ("id");

CREATE TABLE "order_item_products" (
  "order_item_product_id" integer,
  "products_id" integer,
  PRIMARY KEY ("order_item_product_id", "products_id")
);

ALTER TABLE "order_item_products" ADD FOREIGN KEY ("order_item_product_id") REFERENCES "order_item" ("product_id");

ALTER TABLE "order_item_products" ADD FOREIGN KEY ("products_id") REFERENCES "products" ("id");


CREATE TABLE "order_item_products_skus" (
  "order_item_products_sku_id" integer,
  "products_skus_id" integer,
  PRIMARY KEY ("order_item_products_sku_id", "products_skus_id")
);

ALTER TABLE "order_item_products_skus" ADD FOREIGN KEY ("order_item_products_sku_id") REFERENCES "order_item" ("products_sku_id");

ALTER TABLE "order_item_products_skus" ADD FOREIGN KEY ("products_skus_id") REFERENCES "products_skus" ("id");


ALTER TABLE "order_details" ADD FOREIGN KEY ("id") REFERENCES "payment_details" ("order_id");
