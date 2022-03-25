CREATE TABLE product(
    id SERIAL
    ,   prod_id VARCHAR(255) NOT NULL PRIMARY KEY
    ,   pcode VARCHAR(255) NULL
    ,   product_name VARCHAR(255) NOT NULL
    ,   comments VARCHAR(255)
    ,   contractor VARCHAR(255) NULL --FOREIGN KEY REFERENCES party(party)
    ,   stamp DATE DEFAULT CURRENT_DATE
);