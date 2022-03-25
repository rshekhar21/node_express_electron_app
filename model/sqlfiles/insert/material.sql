INSERT INTO public.material(
	matid
	, mcode, material_name, unit_type, unit_cost, qty_purchased, purch_cost, purchased_on, supplier
	-- , units_given
	-- , given_to
	, comments)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8
	-- , $9
	-- , $10
	, $9, $10) RETURNING *;