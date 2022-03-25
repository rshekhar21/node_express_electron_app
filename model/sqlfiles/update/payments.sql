UPDATE public.payments
	SET party=($1), pymt_date=($2), debit=($3), credit=($4), pymt_type=($5), pymt_mode=($6), narraction=($7)
	WHERE id=($8) RETURNING *;