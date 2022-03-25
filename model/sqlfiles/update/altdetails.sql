UPDATE public.altdetails
	SET party=($1), alt_contact=($2), alt_email=($3), alt_address=($4), company=($5)
	WHERE id = ($6) RETURNING *;