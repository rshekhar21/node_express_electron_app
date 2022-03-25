select qty_used from (
select i.matid
 , a.qg - sum(i.untsreq_perorder) qty_used
from  orderitems i
        left join orders o on i.orderid = o.orderid
        left join (select matid, sum(qty_given) qg from allocate where cntr_id = 'n_qzfa' group by matid) a on a.matid = i.matid
where o.cntr_id = 'n_qzfa'
group by i.matid, i.untsreq_perorder, a.qg) q where q.matid = 'm_1lmq'


select i.matid
 , m.material_name
 , m.unit_type
 , m.unit_cost
 , a.qg - sum(i.untsreq_perorder) qty_used
from  orderitems i
        left join orders o on i.orderid = o.orderid
        left join material m on m.matid = i.matid
        left join (select matid, sum(qty_given) qg from allocate where cntr_id = 'n_qzfa' group by matid) a on a.matid = i.matid
where o.cntr_id = 'n_qzfa'
group by i.matid, i.untsreq_perorder, a.qg, m.material_name, m.unit_cost, m.unit_type

SELECT CONCAT(m.material_name, ' / ', m.matid) name FROM allocate a LEFT JOIN material m ON a.matid = m.matid
    WHERE a.cntr_id = 'n_qzfa'
    GROUP BY a.cntr_id, m.material_name, m.matid


    select qty_used from ( select i.matid , a.qg - case when sum(i.untsreq_perorder) = 0 then 0 else sum(i.untsreq_perorder) end  qty_used from orderitems i left join orders o on i.orderid = o.orderid left join (select matid, sum(qty_given) qg from allocate where cntr_id = 'n_qzfa' group by matid) a on a.matid = i.matid where o.cntr_id = 'n_qzfa' group by i.matid, i.untsreq_perorder, a.qg) q where q.matid = 'm_wqzw'



-- select       
--   a.id
--   -- , row_number() over(partition by a.cntr_id) psn
--   , case 
--     when row_number() over(partition by a.cntr_id) = 1 then p.fullname 
--     else ''
--     end contractor
--   -- , p.fullname as contractor
--   , m.material_name
--   , a.qty_given
-- from allocate a 
-- left join party p on a.cntr_id = p.party
-- left join material m on a.matid = m.matid
-- order by cntr_id;


-- select 
--   o.id
--   , o.orderid
--   , to_char(o.order_date, 'DD-MM-YYYY')
--   , p.product_name
--   , pt.fullname contractor
--   , o.order_qty
--   , o.article_cost
--   , o.misc_exp
--   , o.order_total total_cost
--   , o.comments
-- from orders o
--   left join product p on o.prod_id = p.prod_id
--   left join party pt on o.cntr_id = pt.party



select 
--   case when count(qty_used)=0 then 0 else qty_used end qty_used
case when count(q.qty_used) = 0 then 0 else q.qty_used end qty_used
--  qty_used
from 
  (
    select 
      o.orderid,
      i.matid, 
      a.qg - sum(i.untsreq_perorder) qty_used
--       ,case when a.qg - sum(i.untsreq_perorder) = 0 then 0 else a.qg - sum(i.untsreq_perorder)  end abcd
    from 
      orderitems i 
      left join orders o on i.orderid = o.orderid 
      left join (
        select 
          matid, 
          sum(qty_given) qg 
        from 
          allocate 
        where 
          cntr_id = 'n_qzfa' 
        group by 
          matid
      ) a on a.matid = i.matid 
    where 
      o.cntr_id = 'n_qzfa' --n_ejhp
    group by 
      i.matid, 
      i.untsreq_perorder, 
      o.orderid,
      a.qg
      order by o.orderid
  ) q 
where 
  q.matid = 'm_1lmq'
  group by q.qty_used


  select 
    m.matid
    , o.cntr_id
    , coalesce(sum(i.untsreq_perorder),0) qty_used
    , m.qty_purchased - coalesce(sum(i.untsreq_perorder),0) qty_avl
  from material m 
  left join orderitems i on m.matid = i.matid
  left join orders o on o.orderid = i.orderid  
  group by  m.matid, m.qty_purchased, o.cntr_id



  select 
        a.matid,
        a.cntr_id
        -- , sum(a.qty_given)
  from allocate a 
  left join orders o on o.cntr_id = a.cntr_id
  where a.cntr_id = 'n_qzfa'

  group by a.matid

  select * from allocate



select 
qyt_aval
from (
        select 
        a.matid, 
        m.material_name
        , a.cntr_id
        , p.fullname
        ,sum(a.qty_given) units_given,
        coalesce(s.cunsumed,0) cunsumed,
        coalesce(sum(a.qty_given),0) - coalesce(s.cunsumed,0) qyt_aval
        from allocate a left join (
        select i.matid,  
        o.cntr_id,
        sum(i.untsreq_perorder) cunsumed
        from orderitems i
        left join orders o on o.orderid = i.orderid        
        group by i.matid, o.cntr_id
        ) s on a.matid = s.matid
        left join material m on a.matid = m.matid
        left join party p on a.cntr_id = p.party
        -- where a.cntr_id = 'n_qzfa'
        group by a.matid, a.cntr_id, s.cunsumed, m.material_name, p.fullname
) q
WHERE q.matid = 'm_wqzw'


select * from material

select q.aval from ( select a.matid, a.cntr_id, sum(a.qty_given) units_given, s.cunsumed, coalesce(sum(a.qty_given) - s.cunsumed,0) aval from allocate a left join ( select i.matid, o.cntr_id, sum(i.untsreq_perorder) cunsumed from orderitems i left join orders o on o.orderid = i.orderid group by i.matid, o.cntr_id ) s on a.matid = s.matid where a.cntr_id = 'n_qzfa' group by a.matid, a.cntr_id, s.cunsumed ) q WHERE q.matid = 'm_1lmq'



select q.aval qty_used from ( select a.matid, a.cntr_id, sum(a.qty_given) units_given, s.cunsumed, coalesce(sum(a.qty_given) - s.cunsumed,0) aval from allocate a left join ( select i.matid, o.cntr_id, sum(i.untsreq_perorder) cunsumed from orderitems i left join orders o on o.orderid = i.orderid group by i.matid, o.cntr_id ) s on a.matid = s.matid where a.cntr_id = 'n_qzfa' group by a.matid, a.cntr_id, s.cunsumed ) q WHERE q.matid = 'm_wqzw'






        




select qyt_aval from ( select a.matid, a.cntr_id, sum(a.qty_given) units_given, coalesce(s.cunsumed,0) cunsumed, coalesce(sum(a.qty_given),0) - coalesce(s.cunsumed,0) qyt_aval from allocate a left join ( select i.matid, o.cntr_id, sum(i.untsreq_perorder) cunsumed from orderitems i left join orders o on o.orderid = i.orderid group by i.matid, o.cntr_id ) s on a.matid = s.matid where a.cntr_id = 'n_qzfa' group by a.matid, a.cntr_id, s.cunsumed ) q WHERE q.matid = 'm_wqzw'