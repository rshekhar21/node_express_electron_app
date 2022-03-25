INSERT INTO public.allocate(
	matid, cntr_id, qty_given, given_on, comments)
	VALUES ($1,$2,$3,$4,$5) returning *;

-- insert into allocation (matid, cntr_id, qty_given, given_on) VALUES($1,$2,$3,$4) returning *;