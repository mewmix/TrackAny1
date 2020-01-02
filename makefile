# Variables
BINARY_NAME=deploy

Need to destroy previous binary file
Need to copy contents of entire project to another folder called deploy
Need to specify all the unnessisary files to delete when deploying to AWS
Need to zip this into deploy.zip

# Commands
clean: 
	rm -f $(BINARY_NAME) main.zip

build: 
	GOOS=linux go build -o $(BINARY_NAME)

zip: 
	zip -r main.zip $(BINARY_NAME)

local:
	go run main.go

deploy: clean build zip