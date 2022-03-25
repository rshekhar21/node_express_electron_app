CREATE TABLE party(
    id SERIAL
    ,   party VARCHAR(255) NOT NULL PRIMARY KEY
    ,   reg_date DATE NULL -- date of registration
    ,   ptype VARCHAR(255) NULL DEFAULT 'Other' -- contrctor/supplier/customer/vendor/employee or any other party 
    ,   fullname VARCHAR(255)
    ,   contact VARCHAR(255) NULL
    ,   email VARCHAR(255) NULL
    ,   local_address VARCHAR(255) NULL
    ,   debit DECIMAL NULL DEFAULT 0 -- TO GIVE
    ,   credit DECIMAL NULL DEFAULT 0 -- TO RECEIVE
    ,   bdate DATE NULL -- opening balance date
    ,   pan_num VARCHAR(255) NULL
    ,   refby VARCHAR(255) NULL
    ,   comments VARCHAR(255) NULL
    ,   stamp DATE DEFAULT CURRENT_DATE
);