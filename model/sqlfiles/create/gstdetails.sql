CREATE TABLE gstdetails(
    id SERIAL PRIMARY KEY
    ,   party VARCHAR(255) NOT NULL 
    ,   corp_contact VARCHAR(255)
    ,   corp_email VARCHAR(255)
    ,   register_name VARCHAR(255) NULL
    ,   gst_number VARCHAR(255) NULL
    ,   gst_address VARCHAR(255) NULL
    ,   gst_city VARCHAR(255) NULL
    ,   gst_pin VARCHAR(255) NULL
    ,   gst_state VARCHAR(255) NULL
    ,   state_code VARCHAR(255) NULL 
    ,	FOREIGN KEY(party) REFERENCES party(party) ON DELETE CASCADE
);