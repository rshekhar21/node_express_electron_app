INSERT INTO public.altdetails(
	party, alt_contact, alt_email, alt_address, company)
	VALUES ($1, $2, $3, $4, $5) RETURNING *;