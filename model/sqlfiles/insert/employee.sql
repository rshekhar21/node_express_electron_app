INSERT INTO public.employee(
	emp_id, emp_code, doj, dob, department, salary, gender)
	VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;