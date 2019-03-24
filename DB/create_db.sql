CREATE DATABASE bathroom;
USE bathroom;

CREATE TABLE user (
	user_id SERIAL,
    username VARCHAR(25),
    PRIMARY KEY(user_id)
);

CREATE TABLE organization (
	org_id SERIAL NOT NULL,
    org_name VARCHAR(75) NOT NULL,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    city_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (org_id)
);

CREATE TABLE building (
	build_id TINYINT UNSIGNED AUTO_INCREMENT NOT NULL,
    org_id BIGINT UNSIGNED NOT NULL,
    build_name varchar(50) NOT NULL,
    PRIMARY KEY(build_id, org_id),
    FOREIGN KEY (org_id)
		REFERENCES organization(org_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE bathroom (
	bath_id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
    org_id BIGINT UNSIGNED NOT NULL,
    build_id TINYINT UNSIGNED NOT NULL,
    bath_name VARCHAR(50) NOT NULL,
    gender CHAR(1) NOT NULL, #M F O male female other
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
    stars DECIMAL(2, 1) NOT NULL, #0-9 with tenth values. Must constrain by other means to 0-5 with .5 increments
    flags SET('gross', 'biohazard'),
    date_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, #auto set to submission time. Updated on edit.
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