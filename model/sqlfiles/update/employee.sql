UPDATE public.employee
	SET emp_code=($1), doj=($2), dob=($3), department=($4), salary=($5), gender=($6)
	WHERE id=($7) RETURNING *;