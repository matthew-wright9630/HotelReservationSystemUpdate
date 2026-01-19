-- EMPLOYEE TABLE --
INSERT INTO app_user (user_role, email, first_name, middle_name, last_name, home_address, phone_number, onboarding_complete, deleted)
VALUES ('admin', 'matthew.wright.ttb@gmail.com', 'Matthew', 'Allen', 'Wright', '4787 Carson Ct, Woodburn IN 46797', 2146067487, true, false);
INSERT INTO app_user (user_role, email, first_name, last_name, home_address, phone_number, deleted)
VALUES ('admin', 'madam.rosmerta.ttb@gmail.com', 'Madam', 'Rosmerta', 'The Three Broomsticks, Hogsmeade, Scotland ', 1234567890, false);
INSERT INTO app_user (user_role, email, first_name, last_name, home_address, phone_number, deleted)
VALUES ('manager', 'darkkn1ght9630@gmail.com', 'Billy', 'Smith', '15 Main St, Scotland', 1234567890, false);
INSERT INTO app_user (user_role, email, first_name, last_name, home_address, phone_number, deleted)
VALUES ('manager', 'john.smith9630@gmail.com', 'Johnny', 'Smith', '480 Side St, Scotland', 1234567890, true);
INSERT INTO app_user (user_role, email, first_name, middle_name, last_name, home_address, phone_number, onboarding_complete, deleted)
VALUES ('guest', 'matthew.laura.wright@gmail.com', 'Laura', 'Jacqueline', 'Wright', '4787 Carson Ct, Woodburn IN 46797 ', 2146067487, true, false);

-- ROOM_DESCRIPTION TABLE --
INSERT INTO room_description (room_colors, max_occupancy, is_smoking, ada_compliant, bed_style, room_image, price, deleted)
VALUES ('Griffindor', 2, FALSE, TRUE, '1 King Bed', 'assets/griffindor_room.png', 175, false);
INSERT INTO room_description (room_colors, max_occupancy, is_smoking, ada_compliant, bed_style, room_image, price, deleted)
VALUES ('Griffindor', 4, FALSE, TRUE, '2 Queen Beds', 'assets/griffindor_room.png', 175, false);
INSERT INTO room_description (room_colors, max_occupancy, is_smoking, ada_compliant, bed_style, room_image, price, deleted)
VALUES ('Ravenclaw', 2, FALSE, TRUE, '1 King Bed', 'assets/ravenclaw_room.png', 175, false);
INSERT INTO room_description (room_colors, max_occupancy, is_smoking, ada_compliant, bed_style, room_image, price, deleted)
VALUES ('Ravenclaw', 4, FALSE, TRUE, '2 Queen Beds', 'assets/ravenclaw_room.png', 175, false);
INSERT INTO room_description (room_colors, max_occupancy, is_smoking, ada_compliant, bed_style, room_image, price, deleted)
VALUES ('Hufflepuff', 2, FALSE, TRUE, '1 King Bed', 'assets/hufflepuff_room.png', 175, false);
INSERT INTO room_description (room_colors, max_occupancy, is_smoking, ada_compliant, bed_style, room_image, price, deleted)
VALUES ('Hufflepuff', 4, FALSE, TRUE, '2 Queen Beds', 'assets/hufflepuff_room.png', 175, false);
INSERT INTO room_description (room_colors, max_occupancy, is_smoking, ada_compliant, bed_style, room_image, price, deleted)
VALUES ('Slytherin', 2, FALSE, TRUE, '1 King Bed', 'assets/slytherin_room.png', 175, false);
INSERT INTO room_description (room_colors, max_occupancy, is_smoking, ada_compliant, bed_style, room_image, price, deleted)
VALUES ('Slytherin', 4, FALSE, TRUE, '2 Queen Beds', 'assets/slytherin_room.png', 175, false);

-- ROOM TABLE --
INSERT INTO room (room_description_id, deleted) VALUES (1, false);
INSERT INTO room (room_description_id, deleted) VALUES (1, false);
INSERT INTO room (room_description_id, deleted) VALUES (1, false);
INSERT INTO room (room_description_id, deleted) VALUES (1, false);
INSERT INTO room (room_description_id, deleted) VALUES (2, false);
INSERT INTO room (room_description_id, deleted) VALUES (2, false);
INSERT INTO room (room_description_id, deleted) VALUES (2, false);
INSERT INTO room (room_description_id, deleted) VALUES (3, false);
INSERT INTO room (room_description_id, deleted) VALUES (3, false);
INSERT INTO room (room_description_id, deleted) VALUES (4, false);
INSERT INTO room (room_description_id, deleted) VALUES (4, false);
INSERT INTO room (room_description_id, deleted) VALUES (4, false);
INSERT INTO room (room_description_id, deleted) VALUES (4, false);
INSERT INTO room (room_description_id, deleted) VALUES (5, false);
INSERT INTO room (room_description_id, deleted) VALUES (5, false);
INSERT INTO room (room_description_id, deleted) VALUES (6, false);
INSERT INTO room (room_description_id, deleted) VALUES (6, false);
INSERT INTO room (room_description_id, deleted) VALUES (8, false);

INSERT INTO booking (check_in_date, check_out_date, price, number_of_guests, email_on_booking, name_on_booking, phone_on_booking, checked_in, guest_id, employee_id, room_id)
VALUES ('2026-01-19', '2026-01-20', 175, 2, 'matthew.laura.wright@gmail.com', 'Laura Wright', 2146067487, FALSE, 5, 1, 7);
