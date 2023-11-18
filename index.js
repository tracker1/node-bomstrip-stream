var util = require('util')
	,stream = require('stream')
	;

module.exports = BomStrippingStream;

util.inherits(BomStrippingStream, stream.Transform);

function BomStrippingStream(options) {
	if (!(this instanceof BomStrippingStream)) return new BomStrippingStream(options);

	stream.Transform.apply(this, arguments);

	var atStart = true;
	this._transform = function(chunk, encoding, done) {
		if (atStart) {
			atStart = false; //only runs this at the beginning
			// UTF8
			if (chunk[0] == 0xEF && chunk[1] == 0xBB && chunk[2] == 0xBF) {
				chunk = chunk.slice(3);
			}
			// UTF16-LE
			if (chunk[0] == 0xFF && chunk[1] == 0xFE) {
				chunk = chunk.slice(2);
			}
			// UTF16-BE
			if (chunk[0] == 0xFE && chunk[1] == 0xFF) {
				chunk = chunk.slice(2);
			}
			// UTF32-LE
			if (chunk[0] == 0xFE && chunk[1] == 0xFF && chunk[2] == 0x00 && chunk[3] == 0x00) {
				chunk = chunk.slice(4);
			}
			// UTF32-BE
			if (chunk[0] == 0x00 && chunk[1] == 0x00 && chunk[2] == 0xFE && chunk[3] == 0xFF) {
				chunk = chunk.slice(4);
			}			
		}
		this.push(chunk);
		return done();
	};
}
