-- EMPLOYEE TABLE --
INSERT INTO employee (employee_role, email, first_name, middle_name, last_name, home_address, phone_number)
VALUES ('admin', 'matthew.wright.ttb@gmail.com', 'Matthew', 'Allen', 'Wright', '4787 Carson Ct, Woodburn IN 46797', 2146067487);
INSERT INTO employee (employee_role, email, first_name, last_name, home_address, phone_number)
VALUES ('admin', 'madam.rosmerta.ttb@gmail.com', 'Madam', 'Rosmerta', 'The Three Broomsticks, Hogsmeade, Scotland ', 1234567890);

-- ROOM_DESCRIPTION TABLE --
INSERT INTO room_description (room_colors, max_occupancy, is_smoking, ada_compliant, bed_style, room_image, price)
VALUES ('Griffindor', 2, FALSE, TRUE, '1 King Bed', 'assets/griffindor_room.png', 175);
INSERT INTO room_description (room_colors, max_occupancy, is_smoking, ada_compliant, bed_style, room_image, price)
VALUES ('Griffindor', 4, FALSE, TRUE, '2 Queen Beds', 'assets/griffindor_room.png', 175);
INSERT INTO room_description (room_colors, max_occupancy, is_smoking, ada_compliant, bed_style, room_image, price)
VALUES ('Ravenclaw', 2, FALSE, TRUE, '1 King Bed', 'assets/ravenclaw_room.png', 175);
INSERT INTO room_description (room_colors, max_occupancy, is_smoking, ada_compliant, bed_style, room_image, price)
VALUES ('Ravenclaw', 4, FALSE, TRUE, '2 Queen Beds', 'assets/ravenclaw_room.png', 175);
INSERT INTO room_description (room_colors, max_occupancy, is_smoking, ada_compliant, bed_style, room_image, price)
VALUES ('Hufflepuff', 2, FALSE, TRUE, '1 King Bed', 'assets/hufflepuff_room.png', 175);
INSERT INTO room_description (room_colors, max_occupancy, is_smoking, ada_compliant, bed_style, room_image, price)
VALUES ('Hufflepuff', 4, FALSE, TRUE, '2 Queen Beds', 'assets/hufflepuff_room.png', 175);
INSERT INTO room_description (room_colors, max_occupancy, is_smoking, ada_compliant, bed_style, room_image, price)
VALUES ('Slytherin', 2, FALSE, TRUE, '1 King Bed', 'assets/slytherin_room.png', 175);
INSERT INTO room_description (room_colors, max_occupancy, is_smoking, ada_compliant, bed_style, room_image, price)
VALUES ('Slytherin', 4, FALSE, TRUE, '2 Queen Beds', 'assets/slytherin_room.png', 175);

-- ROOM TABLE --
INSERT INTO room (room_description_id) VALUES (1);
INSERT INTO room (room_description_id) VALUES (1);
INSERT INTO room (room_description_id) VALUES (1);
INSERT INTO room (room_description_id) VALUES (1);
INSERT INTO room (room_description_id) VALUES (2);
INSERT INTO room (room_description_id) VALUES (2);
INSERT INTO room (room_description_id) VALUES (2);
INSERT INTO room (room_description_id) VALUES (3);
INSERT INTO room (room_description_id) VALUES (3);
INSERT INTO room (room_description_id) VALUES (4);
INSERT INTO room (room_description_id) VALUES (4);
INSERT INTO room (room_description_id) VALUES (4);
INSERT INTO room (room_description_id) VALUES (4);
INSERT INTO room (room_description_id) VALUES (5);
INSERT INTO room (room_description_id) VALUES (5);
INSERT INTO room (room_description_id) VALUES (6);
INSERT INTO room (room_description_id) VALUES (6);
INSERT INTO room (room_description_id) VALUES (8);