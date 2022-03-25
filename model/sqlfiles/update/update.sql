UPDATE public.daybook
	SET party=($1), entry_date=($2), amt_debit=($3), amt_credit=($4), pymt_mode=($5), narraction=($6)
	WHERE id=($7) RETURNING *;