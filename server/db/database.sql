CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_address VARCHAR(255) NOT NULL,
    user_number VARCHAR(255) DEFAULT NULL
);

CREATE TABLE admin(
    admin_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES users(user_id) ON DELETE CASCADE
);
INSERT INTO admin (user_id) VALUES ('5fb66606-7617-4bf6-b9b4-965b9f7948ff');


CREATE TABLE products(
    product_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_name VARCHAR(255) NOT NULL,
    product_desc VARCHAR(500) DEFAULT NULL,
    product_price INT NOT NULL,
    category_id uuid REFERENCES category(category_id) ON DELETE SET NULL,
    product_image VARCHAR(255) NOT NULL
);


CREATE TABLE category(
    category_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_name VARCHAR(255) NOT NULL
);

CREATE TABLE recommended(
    product_id uuid REFERENCES products(product_id) ON DELETE CASCADE,
    PRIMARY KEY(product_id)
);

INSERT INTO category (category_name) VALUES ('men');
INSERT INTO category (category_name) VALUES ('women');


INSERT INTO products (product_name, product_desc, product_price,category_id) VALUES ('testtt', 'ok', 40, '49557c7d-caa6-4450-8dae-64346a23d6bf');



CREATE TABLE cart(
    user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
    product_id uuid REFERENCES products(product_id) ON DELETE CASCADE,
    product_quantity INT DEFAULT 1
);
INSERT INTO cart (user_id, product_id) VALUES ('5fb66606-7617-4bf6-b9b4-965b9f7948ff', '4951d1cf-49f1-4518-acbe-ace6e46042b7');


CREATE TABLE wishList(
    user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
    product_id uuid REFERENCES products(product_id) ON DELETE CASCADE,
    PRIMARY kEY(user_id, product_id)
);
