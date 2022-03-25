UPDATE public.material
	SET mcode=($1)
	, material_name=($2)
	, unit_type=($3)
	, unit_cost=($4)
	, qty_purchased=($5)
	, purch_cost=($6)
	, purchased_on=($7)
	, supplier=($8)
	, comments=($9)
	WHERE id=($10) RETURNING *;