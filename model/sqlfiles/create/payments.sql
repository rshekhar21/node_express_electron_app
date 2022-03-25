CREATE TABLE payments(
    id SERIAL PRIMARY KEY
    ,   party VARCHAR(255) NULL --FOREIGN KEY REFERENCES party(party) -- paymetn made to party
    ,   pymt_date DATE NOT NULL DEFAULT CURRENT_DATE
    ,   debit DECIMAL NULL DEFAULT 0 -- pymt given
    ,   credit DECIMAL NULL DEFAULT 0 -- pymt receive
    ,   pymt_type VARCHAR(255) NOT NULL -- pay/receive
    ,   pymt_mode VARCHAR(255) NULL
    ,   narraction VARCHAR(255) NULL
    ,	FOREIGN KEY(party) REFERENCES party(party) ON DELETE CASCADE
);