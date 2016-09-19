# ES6 Data Structures

## Development

All source code under the [`src`](./src) directory is written in ES6, and compiled with Babel:

    $ npm install

## Testing

To run all the tests:

    $ npm test

When writing the code during [TDD](http://agiledata.org/essays/tdd.html), it is useful to automatically re-run tests by watching any changes:

    $ npm run test:watch

To test a specific file:

    $ node_modules/.bin/mocha --compilers js:babel-core/register ./test/ToBeTested.spec.js

# License

See [__LICENSE__](./LICENSE).
