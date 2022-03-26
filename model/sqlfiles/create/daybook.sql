CREATE TABLE daybook(
    id SERIAL PRIMARY KEY
    ,   party VARCHAR(255) NULL
    ,   fullname VARCHAR(255) NOT NULL
    ,   entry_date DATE NOT NULL DEFAULT CURRENT_DATE
    ,   amt_paid DECIMAL NULL DEFAULT 0     -- amount given
    ,   amt_received DECIMAL NULL DEFAULT 0    -- amoutn received
    ,   pymt_mode VARCHAR(255) NULL --CASH/CARD
    ,   narraction VARCHAR(255) NULL
    ,	FOREIGN KEY(party) REFERENCES party(party) ON DELETE CASCADE
);

-- DROP TABLE daybook;