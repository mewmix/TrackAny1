# TrackAny1.com
Track anyone, anywhere in the world, with the most popular and trusted Satellite Trackers.

[TrackAny1.com](https://trackany1.com)

[REST API Documentation](https://api.trackany1.com/docs)

# Why build this application?
Keeping tabs on multiple people with different satellite trackers has always been a chore. As a paragliding pilot and offroader, I am constantly using websites like Garmin and SPOT to keep track of my friends. Each tracker has a unique URL you visit for location information and messages. This means you have to open multiple browser tabs to keep track of multiple people. You have to hop from one browser tab to the next, constantly refreshing and re-zooming trying to figure out where you are in relation to your friends. 

And remembering which URL belongs to which friend is another nightmare. The URLs are long and randomized. And if I lose them I have no other way of tracking my friends.
ex)
https://share.findmespot.com/shared/faces/viewspots.jsp?glId=0OQC2EvSbXKVozJGR0Sg7vE8HYfvzdyps

Every time my friends and I go out flying or riding, we have to log in to our accounts on Garmin or SPOT and copy-paste the tracking URL to a group chat. Its a hassle.

One of the biggest things I hate is that I cant see my location on the map in relation to my friend. I have to manually copy-paste the coordinates into google maps.

# What are my goals for the project and what type of functionality should be expected?
Sign in with Google and Facebook. Users shouldnt have to remember passwords!
Users can register multiple Satellite Trackers with the application.
Users can create and join tracking groups.
Tracking groups can be public, private, or personal.
Users can have a list of favorite groups and friends.
Live tracking page should allow user to see thier own location on the map using cellphones GPS.
Users can view and share their tracking logs.


# Supported Devices
![Satellite Trackers](docs/trackers.jpg)

  - [Garmin Inreach Satellite Trackers](https://explore.garmin.com/en-US/inreach/)
  - [Delorme Inreach Satellite Trackers](https://www.amazon.com/DeLorme-inReach-SE-Satellite-Tracker/dp/B00BX7TJ2O)
  - [SPOT Satellite Trackers](https://www.findmespot.com/en/)
  - iOS & Android (with cell reception) 

# Un-Supported Devices (Coming Soon)
 - [FlyMaster Flight Instruments](https://www.flymaster.net/)
 - [Yellow Brick Satellite Trackers](https://www.ybtracking.com/)
 - [FLARM](https://flarm.com/)
 - OGN/ICA

# App Structure
  ![App Structure](docs/appStructure.png)
  A CloudWatch Rule triggers a lambda function every 5 minutes that goes out and grabs all of our users latest tracking data. This tracking data will be provided by companies like Garmin, SPOT, FlyMaster, etc. Each Satellite Messenger has its own unique URL that can pinged for raw tracking data. The lambda function will recieve the tracking data from the providers listed and save it to a MySQL Database in a single standardized format. This API will expose that tracking data and make tracking multiple users with disimilar devices simple and easy.