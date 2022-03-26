INSERT INTO public.daybook(
	party, fullname, entry_date, amt_paid, amt_received, pymt_mode, narraction)
	VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;