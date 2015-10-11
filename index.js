var through = require('through2');

module.exports = function(settings){
	if(!settings){
		settings = {};
	}

	return through(function (chunk, enc, callback) {
		var stream = this;
		
	   	setTimeout(function(){
	   		if(settings.copper && Math.random() * 100 < 1){
	   			// (╯°□°)╯︵ ┻━┻
	   			return;
	   		}

	    	stream.push(chunk);

    		callback()
	   	}, settings.latency || Math.random() * 200);
   });
};