-- EMPLOYEE TABLE --
INSERT INTO app_user (user_role, email, first_name, middle_name, last_name, home_address, phone_number)
VALUES ('admin', 'matthew.wright.ttb@gmail.com', 'Matthew', 'Allen', 'Wright', '4787 Carson Ct, Woodburn IN 46797', 2146067487);
INSERT INTO app_user (user_role, email, first_name, last_name, home_address, phone_number)
VALUES ('admin', 'madam.rosmerta.ttb@gmail.com', 'Madam', 'Rosmerta', 'The Three Broomsticks, Hogsmeade, Scotland ', 1234567890);
INSERT INTO app_user (user_role, email, first_name, last_name, home_address, phone_number)
VALUES ('manager', 'darkkn1ght9630@gmail.com', 'Billy', 'Smith', '15 Main St, Scotland', 1234567890);
-- INSERT INTO app_user (user_role, email, first_name, middle_name, last_name, home_address, phone_number)
-- VALUES ('guest', 'matthew.laura.wright@gmail.com', 'Laura', 'Jacqueline', 'Wright', '4787 Carson Ct, Woodburn IN 46797 ', 2146067487);

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
