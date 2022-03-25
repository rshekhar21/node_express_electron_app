select 
  a.id
  -- , row_number() over() psn
  , concat(p.fullname, ' / ', a.cntr_id) "given_to (contractor)"
  -- , case when 
  --   row_number() over(partition by  m.material_name) = 1 then  concat(m.material_name, ' / ', a.matid) 
  --   else ''
    -- end material_name
  , concat(m.material_name, ' / ', a.matid) material_name
  , a.qty_given units_given
  , to_char(a.given_on, 'DD/MM/YYYY') given_on
  , a.comments
from allocate a
left join material m on m.matid = a.matid
left join party p on p.party = a.cntr_id
order by m.material_name






-- SELECT 
--   row_number() over(order by m.material_name) sn
--   , a.id id
--   , m.material_name material
--   , p.fullname contractor
--   , a.qty_given 
--   , to_char(a.given_on, 'DD/MM/YYYY') given_on
--   , a.comments
-- FROM allocate a
--   left join material m on a.matid = m.matid
--   left join party p on a.cntr_id = p.party
-- ORDER by m.material_name asc
