create table allocate(
  id SERIAL
  , matid VARCHAR(255) REFERENCES material (matid) ON DELETE CASCADE
  , cntr_id VARCHAR(255) REFERENCES party (party) ON DELETE CASCADE
  , qty_given DECIMAL
  , given_on DATE NULL DEFAULT CURRENT_DATE
  , comments VARCHAR(255) NULL
)

-- DROP TABLE IF EXISTS allocate;