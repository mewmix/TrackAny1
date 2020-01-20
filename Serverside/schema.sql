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
    alt VARCHAR(255) DEFAULT 'n/a',
    elevation VARCHAR(255) DEFAULT 'n/a',
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

CREATE TABLE follow_users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    follower_id INT NOT NULL,
    followee_id INT NOT NULL,
    UNIQUE (follower_id, followee_id),
    FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (followee_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE follow_groups(
    id INT AUTO_INCREMENT PRIMARY KEY,
    follower_id INT NOT NULL,
    group_id INT NOT NULL,
    UNIQUE (follower_id, group_id),
    FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES public_groups(id) ON DELETE CASCADE
);

INSERT INTO users(fName, lName) VALUES 
('Mark','Faulkner'),
('Brad', 'Stevenson'),
('Willy','Dydo'),
('Chris','Cote'),
('Jason','Lombard'),
('Honza','Rejmanek'),
('Benzie',''),
('Mitchell','LeMieur'),
('Chuck','Leathers'),
('Alex','Raymont'),
('Mike', 'Miller'),
('Elena', 'Tolkacheva');

INSERT INTO trackers(owner_id, trkName, trkType, trkLink) VALUES 
(1, 'Mark Garmin Inreach', 'inreach', 'markfaulk'),
(2, 'Brad Garmin Inreach', 'inreach', 'bradstevenson'),
(3, 'Willy SPOT Tracker', 'spot', '0uDYpNSftFoxXHSlTJVzo57ty2DBikQHb'),
(4, 'Chris SPOT Tracker', 'spot', '0OQC2EvSbXKVozJGR0Sg7vE8HYfvzdyps'),
(5, 'Jason SPOT Tracker', 'spot', '0lOSqK4ZMcY7h6ulQ936SqUeQqSTlNHDa'),
(6, 'Honza SPOT Tracker', 'spot', '0qTK7XC70JsCahvvnBcOkcfNJ12VFaTHX'),
(7, 'Benzie SPOT Tracker', 'spot', '0JpOELBiVrMdhqzJZ47DitBKRTQlk6lM3'),
(8, 'Mitchell SPOT Tracker', 'spot', '0SSeZQV8hdiJmzoXAH5tLF4l76n95zyRe'),
(9, 'Chuck SPOT Tracker', 'spot', '0TKW3rOn7LfYiWip4WhTgbYOc6IktaOFv'),
(10, 'Alex SPOT Tracker', 'spot', '0493yZtJ1YldN2NuxgOTUcSJjyPFY09I8'),
(11, 'Mike SPOT Tracker', 'spot', '0Ed5WdEtzXWiyc8zCN85WOZYOi2XgvssT'),
(12, 'Elena SPOT Tracker', 'spot', '0VYOBeYul1HvjS0ZS13fcF11244uZzerO');


INSERT INTO public_groups(creatorID, groupName, region) VALUES (2, 'San Diego Paragliding', 'San Diego, Ca'), (3, 'Red Bull X-Alps 2020', 'Chamonix, Fr');

INSERT INTO groups_have_members(group_id, member_id) VALUES (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10), (1, 11), (1, 12);