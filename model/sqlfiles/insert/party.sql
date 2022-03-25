INSERT INTO public.party(
	party, reg_date, ptype, fullname, contact, email, local_address, debit, credit, bdate, pan_num, refby, comments)
	VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9, $10, $11, $12, $13) RETURNING *;