UPDATE public.gstdetails
	SET party=($1), corp_contact=($2), corp_email=($3), register_name=($4), gst_number=($5), gst_address=($6), gst_city=($7), gst_pin=($8), gst_state=($9), state_code=($10)
	WHERE id=($11) RETURNING *;