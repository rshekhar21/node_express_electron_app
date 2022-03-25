CREATE TABLE shipping(
    id SERIAL PRIMARY KEY
    ,   party VARCHAR(255) NOT NULL --FOREIGN KEY REFERENCES party(party)
    ,   ship_address VARCHAR(255) NULL
    ,   city VARCHAR(255) NULL
    ,   ship_state VARCHAR(255) NULL
    ,   pincode VARCHAR(255) NULL
    ,   notes VARCHAR(255) NULL
    ,	FOREIGN KEY(party) REFERENCES party(party) ON DELETE CASCADE
);