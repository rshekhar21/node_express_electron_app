UPDATE public.shipping
	SET address=($1), city=($2), state=($3), pincode=($4), notes=($5)
	WHERE id =($6) RETURNING *;