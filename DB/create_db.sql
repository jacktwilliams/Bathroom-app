DROP DATABASE bathroom;
CREATE DATABASE bathroom;
USE bathroom;

CREATE TABLE user (
	user_id SERIAL NOT NULL,
	fire_id TINYTEXT NOT NULL,
    user_name VARCHAR(64),
    PRIMARY KEY(user_id)
);

CREATE TABLE organization(
    org_id SERIAL NOT NULL,
    org_name VARCHAR(64) NOT NULL,
    org_city VARCHAR(64) NOT NULL,
    org_state VARCHAR(64) NOT NULL,
    org_country VARCHAR(64) NOT NULL,
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    PRIMARY KEY (org_id)
);

CREATE TABLE building (
    org_id BIGINT UNSIGNED NOT NULL,
	build_id TINYINT UNSIGNED AUTO_INCREMENT NOT NULL,
    build_name varchar(64) NOT NULL,
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    PRIMARY KEY(build_id, org_id),
    FOREIGN KEY (org_id)
		REFERENCES organization(org_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE bathroom (
    org_id BIGINT UNSIGNED NOT NULL,
    build_id TINYINT UNSIGNED NOT NULL,
	bath_id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
    /* bath_name VARCHAR(64) NOT NULL, */
    room_num SMALLINT,
    floor_num TINYINT NOT NULL,
    loc_desc TEXT NOT NULL,
    change_station BIT NOT NULL, /* 0 false, 1 true */
    multi_person BIT NOT NULL, /* 0 false, 1 true */
    gender VARCHAR(1) NOT NULL, /* #M F O male female other */
    PRIMARY KEY(org_id, build_id, bath_id),
	FOREIGN KEY (org_id)
		REFERENCES organization(org_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
	FOREIGN KEY (build_id, org_id)
		REFERENCES building(build_id, org_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE review (
	review_id SERIAL,
    org_id BIGINT UNSIGNED NOT NULL,
    build_id TINYINT UNSIGNED NOT NULL,
    bath_id TINYINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    review_text TEXT,
    stars DECIMAL(2, 1) NOT NULL, /* #0-9 with tenth values. Must constrain by other means to 0-5 with .5 increments */
    wifi_stars DECIMAL(2, 1),
    cell_stars DECIMAL(2, 1),
    cell_providor VARCHAR(32),
    flags SET('gross', 'biohazard'),
    date_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, /* #auto set to submission time. Updated on edit. */
    PRIMARY KEY(review_id),
    FOREIGN KEY (org_id)
		REFERENCES organization(org_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
	FOREIGN KEY (org_id, build_id, bath_id)
		REFERENCES bathroom(org_id, build_id, bath_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
	FOREIGN KEY (user_id)
		REFERENCES user(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
	FOREIGN KEY (build_id, org_id)
		REFERENCES building(build_id, org_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
