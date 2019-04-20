/* 
INSERT INTO userinfo(user_id, user_name, user_email) VALUES
 	(1, "kgulden", "kgulden14@winona.edu"),
	(2, "smcvicker", "smcvicker14@winona.edu"),
	(3, "kbrist", "kbrist16@winona.edu");
*/

/* I haven't used SQL in years; hopefully this is helpful */


INSERT INTO user(fire_id, user_name) VALUES
	('1', "kgulden"),
    ('2', "smcvicker");

INSERT INTO organization(org_name, org_city, org_state, org_country, latitude, longitude) VALUES
	("Winona State University", "Winona", "Minnesota", "United States of America", 44.0492869, -91.7357308),
	("Saint Mary's University", "Winona", "Minnesota", "United States of America", 44.04478, -91.6981098),
	("Minnesota State College Southeast - Winona Campus", "Winona", "Minnesota", "United States of America", 44.0245836, -91.6209096);

INSERT INTO building(org_id, build_name) VALUES
	(1, "Somsen Hall"),
	(1, "Stark Hall"),
	(1, "Watkins Hall"),
    (1, "Richards Hall"), /* No exact locaiton is available, so null, default to organization.latitude/organization.longitude */
	(1, "Conway Hall"),
	(1, "Shepard Hall"),
	(1, "Morey Hall"),
	(1, "Lucas Hall"),
	(1, "Prentiss Hall"),
	(1, "Sheehan Hall"),
	(1, "New Center West"),
	(1, "Kirkland Hall"),
	(1, "Science Laboratory Center"),
	(1, "Pasteur Hall"),
	(1, "Gildemeister Hall"),
	(1, "Minné Hall"),
	(1, "Phelps Hall"),
	(1, "Maxwell Hall"),
	(1, "Performing Arts Center"),
	(1, "Darrell W Krueger Library"),
	(1, "Integrated Wellness Complex"),
	(1, "Memorial Hall"),
	(1, "Alumni House"),
	(1, "Facilities Services"),
	(1, "Utility Plant"),
	(1, "Verizon Stadium"),
	(1, "Wabasha Recreation Center"),
	(1, "Sustainability House"),
    (1, "Baldwin Hall");
	
INSERT INTO bathroom(org_id, build_id, room_num, floor_num, loc_desc, change_station, multi_person, gender) VALUES
	(1, 1, null, 1, "Near the Systems Admin office", 1, 1, "O"),
	(1, 1, null, 2, "Near the entrance of 208F", 1, 0, "F"),
	(1, 1, null, 2, "Near the vending machine outside of Tech Support", 1, 0, "M"),
	(1, 3, null, 1, "Near the iDesign Lab and kitchenette area", 1, 0, "M"),
    (1, 10, null, 2, "Near the glass offices with the white boards", 0, 0, "M");

INSERT INTO review(org_id, build_id, bath_id, user_id, review_text, stars, wifi_stars, cell_stars, cell_providor) VALUES
	(1, 3, 4, 2, "It was kinda smelly", 3, 4, null, null),
    (1, 10, 5, 1, "This is the best bathroom on campus", 5, 4, 4, "Verizon");