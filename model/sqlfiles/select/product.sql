SELECT id, prod_id, product_name, comments 
FROM product;

-- SELECT pr.id, pr.prod_id, pr.product_name "prodct name", pr.comments, py.fullname contractor
--   FROM product pr LEFT JOIN party py on pr.contractor = py.party ORDER BY pr.id;