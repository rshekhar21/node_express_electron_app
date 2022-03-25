INSERT INTO public.shipping(
	party, address, city, state, pincode, notes)
	VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;