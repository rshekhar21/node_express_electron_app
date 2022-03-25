INSERT INTO orders(
	orderid, order_date, prod_id, cntr_id, order_qty, misc_exp, article_cost, order_total, comments)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;