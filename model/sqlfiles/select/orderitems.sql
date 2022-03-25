select 
  i.id
  , i.orderid odr_id
  , CASE WHEN (ROW_NUMBER() OVER(PARTITION BY o.id ORDER BY o.id asc)) = 1 
    THEN o.id ELSE NULL END odr_id
    , CASE WHEN (ROW_NUMBER() OVER(PARTITION BY o.id ORDER BY o.id asc)) = 1 
    THEN to_char(o.order_date, 'DD/MM/YYYY') ELSE NULL END order_date
  , CASE WHEN (ROW_NUMBER() OVER(PARTITION BY o.id ORDER BY o.id asc)) = 1 
    THEN p.fullname ELSE NULL END contractor
  , CASE WHEN (ROW_NUMBER() OVER(PARTITION BY o.id ORDER BY o.id asc)) = 1 
    THEN d.product_name ELSE NULL END product_name
  , CASE WHEN (ROW_NUMBER() OVER(PARTITION BY o.id ORDER BY o.id asc)) = 1 
    THEN o.order_qty ELSE NULL END order_qty
  , i.material raw_material
  , i.unit_cost
  , i.untsreq_perpiece "required/piece"
  , i.untcost_perpiece "cost/piece"
  , i.untsreq_perorder "required/lot"
  -- , i.total_cost 
  -- , TO_CHAR(i.total_cost, 'fm999G999D99');
  , cast(i.total_cost as money) total_cost
  , CASE WHEN (ROW_NUMBER() OVER(PARTITION BY o.id ORDER BY o.id asc)) = 1 
    THEN cast(o.misc_exp as money) ELSE NULL END misc_exp
  , CASE WHEN (ROW_NUMBER() OVER(PARTITION BY o.id ORDER BY o.id asc)) = 1 
    THEN cast(o.order_total as money) ELSE NULL END order_total
from orderitems i
  left join orders o on i.orderid = o.orderid
  left join party p on o.cntr_id = p.party
  left join product d on o.prod_id = d.prod_id
  