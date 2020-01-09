# TrackAny1 Node & Express API 

# How to deploy
run "make deploy"
upload dist/deploy.zip to AWS Lambda
fill out env variables in AWS console found in src/envVar.txt
connect lambda function to API GW Proxy