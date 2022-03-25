select 
  o.id
  , o.orderid odr_id
  , to_char(o.order_date, 'DD-MM-YYYY') order_date
  , concat(p.product_name, ' /',  o.prod_id) product_name
  , concat(pt.fullname, ' /', o.cntr_id) contractor
  , o.order_qty
  , o.article_cost
  , o.misc_exp
  , o.order_total total_cost
  , o.comments
from orders o
  left join product p on o.prod_id = p.prod_id
  left join party pt on o.cntr_id = pt.party