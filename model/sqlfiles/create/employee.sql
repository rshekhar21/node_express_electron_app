CREATE TABLE employee(
    id SERIAL PRIMARY KEY
    ,   emp_id VARCHAR(255) UNIQUE 
    ,   emp_code VARCHAR(255) NULL
    ,   doj DATE NULL
    ,   dob VARCHAR(255) NULL
    ,   department VARCHAR(255) NULL
    ,   salary DECIMAL NULL
    ,   gender VARCHAR(255) NULL
    ,	FOREIGN KEY(emp_id) REFERENCES party(party) ON DELETE CASCADE
);