.PHONY: build

node_modules:
	npm install

installed_contracts:
	./node_modules/.bint/truffle install

build: node_modules installed_contracts
	./node_modules/.bin/truffle compile

test:
	./node_modules/.bin/truffle test
