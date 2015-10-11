# Turnbull

Takes a perfectly good stream and throttles it down to nearly useless, optionally just failing outright.

## Why

Exactly.

# No but seriously why would I use it?

You wouldn't, this is clearly much worse than the alternative. Not to mention it takes MORE effort and will ultimately make your project worse in the long run.

## Usage

```
var turnbull = require('turnbull');

var readStream = fs.createReadStream('./someFile');

readStream.pipe(turnbull({
	latency: 200, // Optional latency when transmitting chunks.
	copper: true // Optionally just shit the bed and never complete.
})).pipe(outStream);

```