select id,
  party,
  fullname, 
  to_char(entry_date, 'DD/MM/YYYY'),
  amt_paid,
  amt_received,
  pymt_mode,
  narraction commetns
 from daybook order by entry_date desc;