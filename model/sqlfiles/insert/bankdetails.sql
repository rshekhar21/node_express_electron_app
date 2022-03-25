INSERT INTO public.bankdetails(
	party, bank_name, account_number, account_name, ifs_code)
	VALUES ($1, $2, $3, $4, $5) RETURNING *;