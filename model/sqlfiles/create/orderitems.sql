CREATE TABLE orderitems(
    id SERIAL PRIMARY KEY
    ,   orderid VARCHAR(255) REFERENCES orders (orderid) ON DELETE CASCADE 
    ,   matid VARCHAR(255) NULL
    ,   material VARCHAR(255) NULL
    ,   unit_cost DECIMAL NULL
    ,   untsreq_perpiece INT NULL DEFAULT 0 -- UNITS REQUIRED PER PIECE
    ,   untcost_perpiece INT NULL DEFAULT 0 -- UNIT COST PER PIECE
    ,   untsreq_perorder INT NULL DEFAULT 0 -- UNITS REQUIRED PER ORDER
    ,   total_cost INT 
);

-- DROP TABLE IF EXISTS orderitems;