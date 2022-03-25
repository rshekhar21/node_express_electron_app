UPDATE public.party	SET 
  reg_date=($1)
  , ptype=($2)
  , fullname=($3)
  , contact=($4)
  , email=($5)
  , local_address=($6)
  , debit=($7)
  , credit=($8)
  , bdate=($9)
  , pan_num=($10)
  , refby=($11)
  , comments=($12)
	WHERE id = ($13) RETURNING *;