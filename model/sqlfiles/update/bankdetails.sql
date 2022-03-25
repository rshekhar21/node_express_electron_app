UPDATE public.bankdetails
	SET party=($1), bank_name=($2), account_number=($3), account_name=($4), ifs_code=($5)
	WHERE id=($6) RETURNING *;