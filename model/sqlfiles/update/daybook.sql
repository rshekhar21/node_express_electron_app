UPDATE daybook SET 	
	pymt_mode=($1),
	narraction=($2),
	fullname=($3),
	entry_date=($4),
	amt_paid=($5),
	amt_received=($6),
	party=($7)
	WHERE id=($8) RETURNING *;