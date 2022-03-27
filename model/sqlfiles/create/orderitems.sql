CREATE TABLE orderitems(
    id SERIAL PRIMARY KEY
    ,   orderid VARCHAR(255) REFERENCES orders (orderid) ON DELETE CASCADE 
    ,   matid VARCHAR(255) NULL
    ,   material VARCHAR(255) NULL
    ,   unit_cost DECIMAL NULL
    ,   untsreq_perpiece DECIMAL NULL DEFAULT 0 -- UNITS REQUIRED PER PIECE
    ,   untcost_perpiece DECIMAL NULL DEFAULT 0 -- UNIT COST PER PIECE
    ,   units_available VARCHAR(255) NULL   -- UNITS AVAILABLE AT CONTRACTOR AT THAT TIME
    ,   untsreq_perorder DECIMAL NULL DEFAULT 0 -- UNITS REQUIRED PER ORDER
    ,   total_cost DECIMAL 
);

-- DROP TABLE IF EXISTS orderitems;