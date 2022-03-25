UPDATE public.product
	SET pcode=($1), product_name=($2), comments=($3), contractor=($4)
	WHERE id=($5) RETURNING *;