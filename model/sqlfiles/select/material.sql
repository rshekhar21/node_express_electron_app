-- SELECT * FROM material;
SELECT 
  m.id
  , m.matid
  , m.mcode
  , m.material_name
  , m.unit_type
  , cast(m.unit_cost as money) unit_cost
  , cast(m.purch_cost as money) purch_cost
  , to_char(m.purchased_on, 'DD-MM-YYYY') purchd_on
  -- , m.supplier
  -- , p.fullname given_to
  , cast(m.qty_purchased as decimal) qty_purch
  , a.units_given units_given
  , m.qty_purchased - a.units_given as remaning
  , m.comments
	FROM public.material m 
    left join (select matid, sum(qty_given) units_given from allocate group by matid) a on m.matid = a.matid
    -- LEFT JOIN party p ON a.given_to = p.party 
  ORDER BY m.id ASC;

-- select 
--   x.au
-- from (
--   select 
--     m.matid,
--     m.qty_purchased - a.ug as au
--   from material m 
--   left join (select matid, sum(qty_given) ug from allocate group by matid) a on m.matid = a.matid
-- ) x where x.matid = 'm_wbrq'