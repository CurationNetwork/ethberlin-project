.PHONY: build test

node_modules: package.json
	npm install

installed_contracts:
	./node_modules/.bint/truffle install


ganache.pid: node_modules
	./node_modules/.bin/ganache-cli -u 0 -u 1 -u 2 -u 3 -u 4 -u 5 --gasLimit 10000000000000 -e 100000000 --gasPrice 200 > ganache.log & echo $$! > $@
	sleep 2

build: node_modules installed_contracts 
	./node_modules/.bin/truffle compile

test: 
	./node_modules/.bin/truffle test

clean: ganache.pid
	kill -9 `cat $<` && rm $<