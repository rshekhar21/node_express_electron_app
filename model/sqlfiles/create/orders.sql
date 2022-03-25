CREATE TABLE orders(
    id SERIAL
    ,   orderid VARCHAR(255) PRIMARY KEY NOT NULL
    ,   order_date DATE NOT NULL DEFAULT CURRENT_DATE
    ,   prod_id VARCHAR(255) --FOREIGN KEY REFERENCES product(prod_id)
    ,   cntr_id VARCHAR(255) --FOREIGN KEY REFERENCES party(party)    
    ,   order_qty INT NOT NULL
    ,   misc_exp DECIMAL NULL DEFAULT 0
    ,   article_cost DECIMAL NULL DEFAULT 0
    ,   order_total DECIMAL NOT NULL
    ,   comments VARCHAR(255) NULL
);