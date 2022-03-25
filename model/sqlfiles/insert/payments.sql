INSERT INTO public.payments(
	party, pymt_date, debit, credit, pymt_type, pymt_mode, narraction)
	VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;