/* 
INSERT INTO userinfo(user_id, user_name, user_email) VALUES
 	(1, "kgulden", "kgulden14@winona.edu"),
	(2, "smcvicker", "smcvicker14@winona.edu"),
	(3, "kbrist", "kbrist16@winona.edu");
*/

/* I haven't used SQL in years; hopefully this is helpful */

INSERT INTO user(user_id, user_name, user_email) VALUES
	(1, "kgulden", "kgulden14@winona.edu"),
    (2, "smcvicker", "smcvicker14@winona.edu");

INSERT INTO organization(org_name, org_city, org_state, org_country, latitude, longitude) VALUES
	("Winona State University", "Winona", "Minnesota", "United States of America", 44.0492869, -91.7357308),
	("Saint Mary's University", "Winona", "Minnesota", "United States of America", 44.04478, -91.6981098),
	("Minnesota State College Southeast - Winona Campus", "Winona", "Minnesota", "United States of America", 44.0245836, -91.6209096);

INSERT INTO building(org_id, build_name, latitude, longitude) VALUES
	(1, "Somsen Hall", 44.0477437, -91.6442243),
	(1, "Stark Hall", 44.0473347, -91.643937),
	(1, "Watkins Hall", 44.0482327, -91.6443067),
    (1, "Richards Hall", null, null), /* No exact locaiton is available, so null, default to organization.latitude/organization.longitude */
	(1, "Conway Hall", null, null),
	(1, "Shepard Hall", null, null),
	(1, "Morey Hall", null, null),
	(1, "Lucas Hall", null, null),
	(1, "Prentiss Hall", null, null),
	(1, "Sheehan Hall", null, null),
	(1, "New Center West", null, null),
	(1, "Kirkland Hall", null, null),
	(1, "Science Laboratory Center", null, null),
	(1, "Pasteur Hall", null, null),
	(1, "Gildemeister Hall", null, null),
	(1, "Minné Hall", null, null),
	(1, "Phelps Hall", null, null),
	(1, "Maxwell Hall", null, null),
	(1, "Performing Arts Center", null, null),
	(1, "Darrell W Krueger Library", null, null),
	(1, "Integrated Wellness Complex", null, null),
	(1, "Memorial Hall", null, null),
	(1, "Alumni House", null, null),
	(1, "Facilities Services", null, null),
	(1, "Utility Plant", null, null),
	(1, "Verizon Stadium", null, null),
	(1, "Wabasha Recreation Center", null, null),
	(1, "Sustainability House", null, null),
    (1, "Baldwin Hall", null, null);
	
INSERT INTO bathroom(org_id, build_id, room_num, floor_num, loc_desc, change_station, multi_person, gender) VALUES
	(1, 1, null, 1, "Near the Systems Admin office", 1, 1, "O"),
	(1, 1, null, 2, "Near the entrance of 208F", 1, 0, "F"),
	(1, 1, null, 2, "Near the vending machine outside of Tech Support", 1, 0, "M"),
	(1, 3, null, 1, "Near the iDesign Lab and kitchenette area", 1, 0, "M"),
    (1, 10, null, 2, "Near the glass offices with the white boards", 0, 0, "M");

INSERT INTO review(org_id, build_id, bath_id, user_id, review_text, stars, wifi_stars, cell_stars, cell_providor) VALUES
	(1, 3, 4, 2, "It was kinda smelly", 3, 4, null, null),
    (1, 10, 5, 1, "This is the best bathroom on campus", 5, 4, 4, "Verizon");