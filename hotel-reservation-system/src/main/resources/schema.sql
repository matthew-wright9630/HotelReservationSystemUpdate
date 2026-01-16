DROP TABLE IF EXISTS 
	booking, 
	app_user, 
	guest_payment, 
	payment_info, 
	room, 
	room_description,
	room_colors, 
	transactions;

DROP TYPE IF EXISTS pay_status CASCADE;
DROP TYPE IF EXISTS role_type CASCADE;

CREATE TABLE app_user(
	
	user_id SERIAL PRIMARY KEY,
	user_role VARCHAR(20) NOT NULL,
	email VARCHAR(255) NOT NULL,
	first_name VARCHAR(255) NOT NULL,
	middle_name VARCHAR(255),
	last_name VARCHAR(255),
	home_address VARCHAR(255),
	onboarding_complete BOOLEAN DEFAULT FALSE,
	phone_number NUMERIC(10),
	deleted BOOLEAN DEFAULT FALSE
	-- 10-digit number (no country codes in the wizarding world)
);

-- Lookup Table --
-- CREATE TABLE guest(

-- 	guest_id SERIAL PRIMARY KEY,
-- 	email VARCHAR(255) NOT NULL,
-- 	first_name VARCHAR(255) NOT NULL,
-- 	middle_name VARCHAR(255),
-- 	last_name VARCHAR(255) NOT NULL,
-- 	home_address VARCHAR(255),
-- 	-- address is a keyword in SQL
-- 	phone_number NUMERIC(10)
-- 	-- 10-digit number (no country codes in the wizarding world)
-- );

-- Lookup Table --
CREATE TABLE room_description (
	room_description_id SERIAL PRIMARY KEY,
	room_colors VARCHAR(50) NOT NULL,
	-- References the room_colors enum value.
	max_occupancy INT NOT NULL,
	is_smoking BOOLEAN NOT NULL,
	ada_compliant BOOLEAN NOT NULL,
	bed_style TEXT NOT NULL,
	room_image TEXT NOT NULL,
	price INT NOT NULL,
	deleted BOOLEAN NOT NULL
);

-- Lookup Table --
CREATE TABLE room(
	room_id SERIAL PRIMARY KEY,
	deleted BOOLEAN NOT NULL,
	room_description_id INT NOT NULL REFERENCES room_description(room_description_id)
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

-- Junction Table --
CREATE TABLE guest_payment(
	guest_id INT NOT NULL REFERENCES app_user(user_id),
	payment_info_id INT NOT NULL REFERENCES payment_info(payment_info_id),
	PRIMARY KEY (guest_id, payment_info_id)
);

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
	email_on_booking VARCHAR(255) NOT NULL,
	name_on_booking VARCHAR(255) NOT NULL,
	phone_on_booking NUMERIC(10) NOT NULL,
	guest_id INT NOT NULL REFERENCES app_user(user_id),
	employee_id INT REFERENCES app_user(user_id),
	room_id INT NOT NULL REFERENCES room(room_id)
);

-- Only allow the following statuses
CREATE TYPE pay_status AS ENUM ('pending', 'authorized','processing','completed','declined','refunded', 'cancelled');

CREATE TABLE transactions(
	-- transaction is a keyword in SQL

	transaction_id SERIAL PRIMARY KEY,

	payment_status pay_status NOT NULL,

	payment INT NOT NULL,
	-- in galleons (signed integer, no decimals unless dealing with sickles and knuts) 

	transaction_description VARCHAR(100) NOT NULL,
	-- e.g. room reservation, room service, spa treatment, gift shop, etc.
	-- not-optional

	payment_info_id INT NOT NULL REFERENCES payment_info(payment_info_id),

	booking_id INT NOT NULL REFERENCES booking(booking_id)
);