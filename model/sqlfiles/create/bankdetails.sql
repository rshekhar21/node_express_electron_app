CREATE TABLE bankdetails(
    id SERIAL PRIMARY KEY
    ,   party VARCHAR(255) NOT NULL 
    ,   bank_name VARCHAR(255) NULL
    ,   account_number VARCHAR(255) NULL
    ,   account_name VARCHAR(255) NULL
    ,   ifs_code VARCHAR(255)
    ,	FOREIGN KEY(party) REFERENCES party(party) ON DELETE CASCADE
);