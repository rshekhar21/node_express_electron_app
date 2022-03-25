UPDATE allocate
	SET matid=($1), cntr_id=($2), qty_given=($3), given_on=($4), comments=($5)
	WHERE id=($6) RETURNING *;