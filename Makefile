EMBER_ENV ?= development
SRC = $(wildcard src/*.js)
LIB = $(SRC:src/%.js=lib/%.js)

all: clean lib dist

.PHONY: clean all test deps distro tag release

clean:
	@rm -rf $(LIB) tmp dist doc public/articles/*.json public/pages/*.json public/pages.json public/articles.json

node_modules:
	npm install

bower_components:
	bower install

bundle: node_modules bower_components

lib: bundle $(LIB)
lib/%.js: src/%.js
	@mkdir -p $(@D)
	babel $< -o $@

dist: bundle lib
	@ember build --environment $(EMBER_ENV)

test: bundle lib
	@npm test

watch: bundle clean lib
	@npm start

doc:
	esdoc -c config/docs.json

distro:
	npm run-script invalidate-cdn
