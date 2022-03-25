INSERT INTO public.daybook(
	party, entry_date, amt_debit, amt_credit, pymt_mode, narraction)
	VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;