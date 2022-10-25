CREATE TABLE IF NOT EXISTS products(
    id uuid DEFAULT uuid_generate_v4 (),
    title varchar(50) NOT NULL,
    description varchar(255),
    price int,
    PRIMARY KEY(id)
);