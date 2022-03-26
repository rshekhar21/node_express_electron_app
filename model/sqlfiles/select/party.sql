SELECT id
	, party
	, to_char(reg_date, 'DD/MM/YYYY') reg_date
	, ptype
	, fullname
	, contact
	, email
	, local_address	as address
	, debit
	, credit
	, to_char(bdate, 'DD/MM/YYYY') bal_data
	, pan_num as pan
	, refby
	, comments
	FROM public.party
	ORDER BY id DESC;