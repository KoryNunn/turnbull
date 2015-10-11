# Turnbull

Takes a perfectly good stream and throttles it down to nearly useless.

## Why

Exactly.

## Usage

```
var turnbull = require('turnbull');

var readStream = fs.createReadStream('./someFile');

readStream.pipe(turnbull()).pipe(concat)

```