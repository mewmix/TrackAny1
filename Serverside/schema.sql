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
    tracker_id INT NOT NULL,
    user_id INT NOT NULL, 
    UNIQUE (unixTime, tracker_id),
    FOREIGN KEY (tracker_id) REFERENCES trackers(id) ON DELETE CASCADE
);

CREATE TABLE public_groups(
    id INT AUTO_INCREMENT PRIMARY KEY,
    creatorID VARCHAR (255) NOT NULL,
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
    FOREIGN KEY (group_id) REFERENCES public_groups(id) ON DELETE CASCADE,
    FOREIGN KEY (member_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users(fName, lName) VALUES 
('Mark','Faulkner'),
('Brad', 'Stevenson'),
('Willy','Dydo'),
('Chris','Cote'),
('Jason','Lombard'),
('Honza','Rejmanek');

INSERT INTO trackers(owner_id, trkName, trkType, trkLink) VALUES 
(1, 'Mark Garmin Inreach', 'inreach', 'https://us0.inreach.garmin.com/Feed/Share/markfaulk'),
(2, 'Brad Garmin Inreach', 'inreach', 'https://us0.inreach.garmin.com/Feed/Share/bradstevenson'),
(3, 'Willy SPOT Tracker', 'spot', 'https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/0uDYpNSftFoxXHSlTJVzo57ty2DBikQHb'),
(4, 'Chris SPOT Tracker', 'spot', 'https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/0OQC2EvSbXKVozJGR0Sg7vE8HYfvzdyps'),
(5, 'Jason SPOT Tracker', 'spot', 'https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/0lOSqK4ZMcY7h6ulQ936SqUeQqSTlNHDa'),
(6, 'Honza SPOT Tracker', 'spot', 'https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/0qTK7XC70JsCahvvnBcOkcfNJ12VFaTHX');

INSERT INTO public_groups(creatorID, groupName, region) VALUES (2, 'San Diego Paragliding', 'San Diego, Ca');

INSERT INTO groups_have_members(group_id, member_id) VALUES (1, 2), (1, 3), (1, 4), (1, 5), (1, 6);