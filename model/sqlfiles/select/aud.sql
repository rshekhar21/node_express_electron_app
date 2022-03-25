-- select 
--   -- a.id
--    p.fullname contractor
--   , m.material_name
--   , sum(a.qty_given) qty_given
-- from allocate a 
-- left join material m on m.matid = a.matid
-- left join party p on a.cntr_id = p.party
-- group by
--  a.matid
--   , p.fullname
--   , m.material_name
--   -- , a.id
--   , a.qty_given

  select 
    -- a.cntr_id, 
    concat(p.fullname, ' / ', a.cntr_id) contractor, 
    -- a.matid, 
    concat(m.material_name, ' / ', a.matid) material_given,
    sum(a.qty_given) qty_given, 
    coalesce(q.units_used, 0) ordered_qty,
    sum(a.qty_given) -  coalesce(q.units_used, 0) qty_available
    from allocate a    
    left join(
      select 
        o.cntr_id, 
        i.matid, 
        sum(i.untsreq_perorder) units_used 
      from orderitems i
      left join orders o on o.orderid = i.orderid
      group by i.matid, o.cntr_id
    ) q on q.matid = a.matid
    left join material m on a.matid = m.matid
    join party p on a.cntr_id = p.party
    GROUP by 
      a.matid, 
      a.cntr_id, 
      q.units_used,
      m.material_name,
      p.fullname
    order by a.cntr_id



-- select o.cntr_id, i.matid, sum(i.untsreq_perorder) units_used from orderitems i
--   left join orders o on o.orderid = i.orderid
--   group by i.matid, o.cntr_id


--   select * from orderitems


-- select 
--   a.id
--   -- , row_number() over(partition by a.cntr_id) psn
--   -- , case 
--   --   when row_number() over(partition by a.cntr_id) = 1 then p.fullname 
--   --   else ''
--   --   end contractor
  
--   , p.fullname as contractor
--   , m.material_name
--   -- , sum(a.qty_given) qty_given
--   -- , sum(s.urpo) cunsumed
--   , a.qty_given
--   , s.urpo cunsumed
--   , a.qty_given - s.urpo as available
-- from allocate a 
-- left join party p on a.cntr_id = p.party
-- left join material m on a.matid = m.matid
-- left join (
--   select 
--   i.matid
--   , p.party
--   , sum(i.untsreq_perorder) urpo
-- from orderitems i
-- left join orders o on i.orderid = o.orderid
-- left join party p on o.cntr_id = p.party
-- group by i.matid, p.party
-- ) s on s.party = a.cntr_id
-- group by m.material_name, a.id, p.fullname, a.qty_given,s.urpo, a.cntr_id
-- order by cntr_id

-- aud = alocatedunitdetails



