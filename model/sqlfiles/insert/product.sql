INSERT INTO product(
	prod_id, pcode, product_name, comments, contractor)
	VALUES ($1, $2, $3, $4, $5) RETURNING *;