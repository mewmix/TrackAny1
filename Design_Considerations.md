# TrackAny1 UX/UI Considerations
## The purpose of this document is to determine how the app will be used and by whom, in order to determine an effective flow and page layout.

## It's important to think about the first and following times a users visits the app. For orientation, setup, and normal use.

## There are 2 types of people that will be using the application.
1. The person being tracked. The pilot, sailor, off-roader, mountaineer, explorer, etc.
2. Friends, family, and co-workers that are keeping tabs on the person with the tracker.

## The 2 types of users will have different orientation, setup, and use cases.
* Orientation - What the user looks for when they first visit the website. Does the landing page make it obvious what the app is used for? How is this tracking application different from any other tracking application? Who is using this? Will this be useful to me? 
* Setup - Is the setup self explanatory for both types of users? Are there instructions? 
* Use Case - Does it do everthing I need it to? When the user visits the app a second or third time, is the navigation streamlined? Does it remember which groups and people I was tracking last time?

# Setup 
## (Person being tracked)
1. Sign in with Google or Facebook
2. Update / Complete user profile
3. Register satellite tracker using devices public tracking URL
    * What is a public tracking URL? How do I get my devices tracking URL?
    * I have added my device, but how do I know it's working and the info I have added is correct?
4. Create a public group. OR Search for and join a public group.



## (Person doing the tracking)
1. Sign in with Google or Facebook Oauth
2. Update / Complete user profile
3. Look for the group or specific user to track
4. Favorite the users or groups you follow the most so that they show up in your side-navbar


# Normal Use
## (Person being tracked)
1. Automatic login using localStorage and JWT. Then redirect to dashboard.

## (Person doing the tracking)
1. Automatic login using localStorage and JWT. Then redirect to dashboard.





# Pages Needed For Application
1. Landing page
2. Login page
3. 404 page
4. User Profile page - 
5. Single User Tracking Map page
6. Group Profile page
7. Group Tracking Map page
8. User / Group search & filter page