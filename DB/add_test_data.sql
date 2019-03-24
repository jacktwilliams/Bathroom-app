insert into organization(org_name, latitude, longitude, city_name) values
	('Winona State University', 1.0, 1.0, 'Winona');
    
insert into building(org_id, build_name) values
	(1, 'Watkins');

insert into bathroom(org_id, build_id, bath_name, gender) values
	(1, 1, '100', 'M'),
    (1, 1, '100', 'F');
    
INSERT INTO user(username) VALUES
	('jackamaka');

INSERT INTO review(org_id, bath_id, build_id, user_id, review_text, stars) VALUES
	(1, 1, 1, 1, 'Looks pretty damn old.', 3);