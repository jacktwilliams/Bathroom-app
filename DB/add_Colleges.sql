DROP TABLE IF EXISTS excel_table;
CREATE temporary TABLE excel_table (
	schoolName VARCHAR(255),
    cityName VARCHAR(255),
    state VARCHAR(255),
    country VARCHAR(255),
    latitude DECIMAL(16, 13),
    longitude DECIMAL(16, 13)
);

LOAD DATA LOCAL INFILE '/home/jack/Downloads/trimmedCollegeData.csv' 
INTO TABLE excel_table 
CHARACTER SET utf8
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 LINES;

INSERT INTO organization (org_name, org_city, org_state, org_country, latitude, longitude)
	SELECT schoolName, cityName, state, country, latitude, longitude
    FROM excel_table
    ORDER BY schoolName;