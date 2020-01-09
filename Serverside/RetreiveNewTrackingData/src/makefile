# Variables
BINARY_NAME=deploy
PROD_FILES=app.js db.js package-lock.json package.json
PROD_FOLDERS=node_modules services

# Commands
clean:
	rm -f ../dist/$(BINARY_NAME).zip

zip: 
	zip -r $(BINARY_NAME).zip $(PROD_FILES) $(PROD_FOLDERS)
moveup:
	mv $(BINARY_NAME).zip ../dist

deploy: clean zip moveup