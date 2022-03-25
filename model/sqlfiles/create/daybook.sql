CREATE TABLE daybook(
    id SERIAL PRIMARY KEY
    ,   party VARCHAR(255) NULL
    ,   entry_date DATE NOT NULL DEFAULT CURRENT_DATE
    ,   amt_debit DECIMAL DEFAULT 0     -- amount given
    ,   amt_credit DECIMAL DEFAULT 0    -- amoutn received
    ,   pymt_mode VARCHAR(255) --CASH/CARD
    ,   narraction VARCHAR(255) NULL
    ,	FOREIGN KEY(party) REFERENCES party(party) ON DELETE CASCADE
);