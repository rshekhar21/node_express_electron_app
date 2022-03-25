SELECT P.id
  , P.party Cntr_ID
  , P.fullname "full name"
  , P.contact
  , P.email
  , case 
      when P.debit > 0 then p.debit
      when p.credit > 0 then p.credit
    end "bal. amt."
  , case 
      when P.credit > 0 then 'To Receive'
      when P.debit > 0 then 'To Pay'
    end "bal. type"
  -- , P.debit "to give"
  -- , p.credit "to receive"
  -- , p.bdate "balance on"
  -- , to_char(p.bdate,'Dy, DD, Mon, YYYY') "balance on"
  , to_char(p.bdate,'DD-MM-YYYY') "bal. date"
  -- , p.pan_num pan
  -- , p.refby reference
  -- , P.local_address "local address"
  -- , p.comments
  -- , m.material_name
  FROM party P WHERE P.ptype = 'Contractor' 
  -- LEFT JOIN allocate a on a.cntr_id = p.party
  -- left join material m on a.matid = m.matid
  
  ORDER BY P.id ASC;