DROP TABLE IF EXISTS 
	booking, 
	employee, 
	guest, 
	guest_payment, 
	payment_info, 
	room, 
	room_description, 
	transactions;

-- only one room per booking
CREATE TABLE booking(

	booking_id SERIAL PRIMARY KEY,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	check_in_date DATE NOT NULL,
	check_out_date DATE NOT NULL,
	price INT NOT NULL,
	-- this keeps a history of at what price a room was booked in case room price changes later
	-- in galleons (signed integer, no decimals unless dealing with sickles and knuts) 
	number_of_guests NUMERIC(1) NOT NULL,
	name_on_booking VARCHAR(255) NOT NULL,
	email_on_booking VARCHAR(255) NOT NULL,
	phone_on_booking NUMERIC(10) NOT NULL,
	guest_id INT NOT NULL REFERENCES guest(guest_id),
	employee_id INT NOT NULL REFERENCES employee(employee_id),
	room_id INT NOT NULL REFERENCES room(room_id)
);

CREATE TABLE employee(
	
	employee_id SERIAL PRIMARY KEY,
	employee_role VARCHAR(20) NOT NULL,
	-- role is a keyword in SQL
	-- can be admin or hotel manager
	home_address VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	middle_name VARCHAR(255)
);


-- Lookup Table --
CREATE TABLE guest(

	guest_id SERIAL PRIMARY KEY,
	email VARCHAR(255) NOT NULL,
	first_name VARCHAR(255) NOT NULL,
	middle_name VARCHAR(255),
	last_name VARCHAR(255) NOT NULL,
	home_address VARCHAR(255),
	-- address is a keyword in SQL
	phone_number NUMERIC(10)
	-- 10-digit number (no country codes in the wizarding world)
);

-- Junction Table --
CREATE TABLE guest_payment(
	guest_id INT NOT NULL REFERENCES guest(guest_id),
	payment_info_id INT NOT NULL REFERENCES payment_info(payment_info_id),
	PRIMARY KEY (guest_id, payment_info_id)
);

-- Lookup Table --
CREATE TABLE payment_info(

	payment_info_id SERIAL PRIMARY KEY

	/* 
	payment_hash BYTEA NOT NULL
	-- for raw binary 
	-- OR:
	payment_hash VARCHAR(64) NOT NULL 
	-- for SHA-256 hex string
	*/

	-- below attributes to be replaced with the above hash:

	/* 
	card_number NUMERIC(16) NOT NULL,
	expiration NUMERIC(4) NOT NULL,
	-- four digit number: MMYY
	csv NUMERIC(3) NOT NULL,
	zip_code NUMERIC(5) NOT NULL,
	name_on_card VARCHAR(255) NOT NULL
	-- must be exactly as appears on card 
	*/
);

CREATE TABLE transactions(
	-- transaction is a keyword in SQL

	transaction_id SERIAL PRIMARY KEY,

	payment_status VARCHAR(20) NOT NULL,
	-- status is a keyword in SQL
	-- can be: pending, authorized, processing, completed, declined, refunded, cancelled

	payment INT NOT NULL,
	-- in galleons (signed integer, no decimals unless dealing with sickles and knuts) 

	transaction_description VARCHAR(100) NOT NULL,
	-- e.g. room reservation, room service, spa treatment, gift shop, etc.
	-- not-optional

	payment_info_id INT NOT NULL REFERENCES payment_info(payment_info_id),

	booking_id INT NOT NULL REFERENCES booking(booking_id)
);