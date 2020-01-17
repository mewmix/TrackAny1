# TrackAny1 Node & Express API 

[Postman API Documentation](https://documenter.getpostman.com/view/4885205/SWLmYk58?version=latest)

# How to deploy
run "make deploy"
upload dist/deploy.zip to AWS Lambda
fill out env variables in AWS console found in src/envVar.txt
change lambda handler from index.handler to app.server
connect lambda function to API GW Proxy