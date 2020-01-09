# TrackAny1 Retreive New Tracking Data Lambda Function
This lambda function keeps our MySQL database up to date with the latest tracking data from companies like Garmin and SPOT.

# How does it work?
Every 5 min Cloudwatch triggers this lambda function. The lambda function grabs all the tracking device URLs from our database and makes an API call to each and every one. The Gamin and SPOT servers will send us back raw data. The lambda function will parse this data and save it to the MySQL database.