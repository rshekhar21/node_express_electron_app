INSERT INTO public.gstdetails(
	party, corp_contact, corp_email, register_name, gst_number, gst_address, gst_city, gst_pin, gst_state, state_code)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;