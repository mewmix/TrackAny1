# Variables
BINARY_NAME=deploy
PROD_FILES=app.js db.js package-lock.json package.json
PROD_FOLDERS=controllers middleware node_modules routes services

# Commands
cleanDist:
	rm -f ../dist/$(BINARY_NAME).zip
zip: 
	zip -r $(BINARY_NAME).zip $(PROD_FILES) $(PROD_FOLDERS)
moveToDist:
	mv $(BINARY_NAME).zip ../dist

deploy: cleanDist zip moveToDist