# Variables
BINARY_NAME=deploy
PROD_FILES=controllers middleware node_modules routes services
PROD_FOLDERS=app.js db.js package-lock.json package.json


# Commands
clean:
	rm -f $(BINARY_NAME).zip

zip: 
	zip -r $(BINARY_NAME).zip $(PROD_FILES) $(PROD_FOLDERS)

deploy: clean zip