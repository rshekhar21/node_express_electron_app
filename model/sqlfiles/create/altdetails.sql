CREATE TABLE altdetails(
    id SERIAL PRIMARY KEY
    ,   party VARCHAR(255) NOT NULL
    ,   alt_contact VARCHAR(255) NULL
    ,   alt_email VARCHAR(255) NULL
    ,   alt_address VARCHAR(255) NULL
    ,   company VARCHAR(255) NULL
    ,	FOREIGN KEY(party) REFERENCES party(party) ON DELETE CASCADE
);