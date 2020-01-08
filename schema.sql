SELECT DATABASE();
SHOW DATABASES;

DROP DATABASE IF EXISTS auth_test_db;
CREATE DATABASE auth_test_db;
USE auth_test_db;

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    fName VARCHAR (255),
    lName VARCHAR (255),
    email VARCHAR (255),
    picture VARCHAR (255),
    googleID VARCHAR (255) UNIQUE,
    facebookID VARCHAR (255) UNIQUE,
    created TIMESTAMP DEFAULT NOW()
);

CREATE TABLE trackers(
    id INT AUTO_INCREMENT PRIMARY KEY,
    trkName VARCHAR (255),
    trkType VARCHAR (255) NOT NULL,
    trkLink VARCHAR (255) NOT NULL UNIQUE,
    lastLocationPing INT UNSIGNED DEFAULT 0,
    lastApiCall INT UNSIGNED DEFAULT 0,
    owner_id INT NOT NULL, 
    created TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
)

CREATE TABLE pings(
    id INT AUTO_INCREMENT PRIMARY KEY,
    unixTime INT UNSIGNED NOT NULL,
    lat DECIMAL(11, 8) NOT NULL,
    lng DECIMAL(12, 8) NOT NULL,
    alt INT,
    agl VARCHAR(255) DEFAULT 'n/a',
    velocity VARCHAR(255) DEFAULT 'n/a',
    heading VARCHAR(255) DEFAULT 'n/a',
    txtMsg VARCHAR(255),
    isEmergency VARCHAR(255),
    tracker_id INT,
    UNIQUE (unixTime, tracker_id),
    FOREIGN KEY (tracker_id) REFERENCES trackers(id) ON DELETE CASCADE
);

CREATE TABLE flying_groups(
    id INT AUTO_INCREMENT PRIMARY KEY,
    creatorId VARCHAR (255) NOT NULL,
    groupName VARCHAR (255) NOT NULL UNIQUE,
    region VARCHAR (255) DEFAULT '',
    info VARCHAR (255) DEFAULT '',
    radioFrq VARCHAR (255) DEFAULT '',
    created TIMESTAMP DEFAULT NOW()
);

CREATE TABLE groups_have_members(
    id INT AUTO_INCREMENT PRIMARY KEY,
    created TIMESTAMP DEFAULT NOW(),
    group_id INT NOT NULL,
    member_id INT NOT NULL,
    UNIQUE (group_id, member_id),
    FOREIGN KEY (group_id) REFERENCES flying_groups(id) ON DELETE CASCADE,
    FOREIGN KEY (member_id) REFERENCES users(id) ON DELETE CASCADE
);





















DROP DATABASE IF EXISTS trackpilots_db;
CREATE DATABASE trackpilots_db;
USE trackpilots_db;

CREATE TABLE pilots(
    id INT AUTO_INCREMENT PRIMARY KEY,
    fName VARCHAR (255) NOT NULL,
    lName VARCHAR (255) NOT NULL,
    email VARCHAR (255) UNIQUE,
    phone VARCHAR (255) DEFAULT 'n/a',
    country VARCHAR (255) DEFAULT 'n/a',
    trkLink VARCHAR (255) NOT NULL,
    trkType VARCHAR (255) NOT NULL,
    gldBrand VARCHAR (255) DEFAULT 'n/a',
    gldMake VARCHAR (255) DEFAULT 'n/a',
    gldColor VARCHAR (255) DEFAULT 'n/a',
    lastLocationPing INT UNSIGNED DEFAULT 0,
    lastApiCall INT UNSIGNED DEFAULT 0,
    created TIMESTAMP DEFAULT NOW()
);

CREATE TABLE pings(
    id INT AUTO_INCREMENT PRIMARY KEY,
    unixTime INT UNSIGNED NOT NULL,
    lat DECIMAL(11, 8) NOT NULL,
    lng DECIMAL(12, 8) NOT NULL,
    alt INT,
    agl VARCHAR(255) DEFAULT 'n/a',
    velocity VARCHAR(255) DEFAULT 'n/a',
    heading VARCHAR(255) DEFAULT 'n/a',
    txtMsg VARCHAR(255),
    isEmergency VARCHAR(255),
    pilot_id INT,
    UNIQUE (unixTime, pilot_id),
    FOREIGN KEY (pilot_id) REFERENCES pilots(id) ON DELETE CASCADE
);

CREATE TABLE flying_groups(
    id INT AUTO_INCREMENT PRIMARY KEY,
    groupName VARCHAR (255) NOT NULL UNIQUE,
    creatorId VARCHAR (255) NOT NULL,
    region VARCHAR (255) DEFAULT '',
    info VARCHAR (255) DEFAULT '',
    radioFrq VARCHAR (255) DEFAULT '',
    created TIMESTAMP DEFAULT NOW()
);

CREATE TABLE groups_have_pilots(
    id INT AUTO_INCREMENT PRIMARY KEY,
    created TIMESTAMP DEFAULT NOW(),
    group_id INT NOT NULL,
    pilot_id INT NOT NULL,
    UNIQUE (group_id, pilot_id),
    FOREIGN KEY (group_id) REFERENCES flying_groups(id) ON DELETE CASCADE,
    FOREIGN KEY (pilot_id) REFERENCES pilots(id) ON DELETE CASCADE
);


INSERT INTO `trackpilots_db`.`pilots` (`fName`, `lName`, `email`, `phone`, `country`, `trkLink`, `trkType`, `gldBrand`, `gldMake`, `gldColor`) VALUES
('Mark', 'Faulkner', 'markfaulk350@gmail.com', '1(760)846-0475', 'USA', 'https://us0.inreach.garmin.com/Feed/Share/markfaulk', 'inreach', 'Advance', 'Epsilon 8', 'Lime green, Blue'),
('Brad', 'Stevenson', 'brad@email.com', '1(766)445-0344', 'USA', 'https://us0.inreach.garmin.com/Feed/Share/bradstevenson', 'inreach', 'Ozone', 'Zeno', 'Yellow, Black'),
('Chris', 'Cote', 'cote@email.com', '1(800)445-03433', 'USA', 'https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/0OQC2EvSbXKVozJGR0Sg7vE8HYfvzdyps', 'spot', 'Ozone', 'Enzo 3', 'Red, Orange'),
('Jonathan', 'Dietch', 'john@email.com', '+49(345)445-03433', 'Germany', 'https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/0fTO7dcPGBEIRy3x8VlDPURJF1IYcYxJx', 'spot',  'Gin', 'Atlas', 'Red, Blue, White'),
('Honza', 'Rejmanek', 'honza@email.com', '1(760)846-0475', 'USA', 'https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/0qTK7XC70JsCahvvnBcOkcfNJ12VFaTHX', 'spot', 'Ozone', 'Enzo 3', 'Red, Orange'),
('Theresa', 'Fielding', 'theresa@email.com', '1(760)846-0475', 'USA', 'https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/0cWM26rpFF1HyqzuDKTSRYQSOVjfF1Py3', 'spot', 'Ozone', 'Enzo 3', 'Red, Orange'),
('Corina', 'Beerly', 'beerly@email.com', '1(760)846-0475', 'USA', 'https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/0k9ZgmHPvQsHIuvUZEbx0WG50MHUsNE3f', 'spot', 'Ozone', 'Enzo 3', 'Red, Orange'),
('Mateo', 'Caicedo', 'Mateo@email.com', '1(760)846-0475', 'USA', 'https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/093XBo8oPVqocZZ9gTn9NZOlqQ4B6pA6Q', 'spot', 'Ozone', 'Enzo 3', 'Red, Orange');

INSERT INTO `trackpilots_db`.`flying_groups` (`groupName`, `creatorId`, `region`, `info`, `radioFrq`) VALUES ('San Diego Paragliding', '1', 'San Diego, Ca', 'Southern California Paragliding Group info', '144-495');
INSERT INTO `trackpilots_db`.`flying_groups` (`groupName`, `creatorId`, `region`, `info`, `radioFrq`) VALUES ('Red Bull X-Alps 2020', '2', 'Europe', 'more info', '144-495');

INSERT INTO `trackpilots_db`.`groups_have_pilots` (`group_id`, `pilot_id`) VALUES ('1', '1'), ('1', '2'), ('1', '3'), ('1', '4'), ('1', '5'), ('1', '6'), ('1', '7'), ('1', '8');

