CREATE TABLE material(
    id SERIAL
    ,   matid VARCHAR(255) NOT NULL PRIMARY KEY
    ,   mcode VARCHAR(255)
    ,   material_name VARCHAR(255) NOT NULL
    ,   unit_type VARCHAR(255)
    ,   unit_cost DECIMAL DEFAULT 0    
    ,   qty_purchased INT NULL DEFAULT 0
    ,   purch_cost DECIMAL NULL DEFAULT 0   
    ,   purchased_on DATE NULL
    ,   supplier VARCHAR(255) NULL --FOREIGN KEY REFERENCES party(party)   -- supplier id
    -- ,   units_given INT NULL DEFAULT 0 -- given to contractor    
    -- ,   given_to VARCHAR(255) NULL --FOREIGN KEY REFERENCES party(party)   -- contractor id 
    ,   comments VARCHAR(255) NULL
);

-- DROP TABLE IF EXISTS material;