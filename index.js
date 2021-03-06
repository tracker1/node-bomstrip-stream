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
			if (chunk[0] == 0xEF && chunk[1] == 0xBB && chunk[2] == 0xBF) {
				chunk = chunk.slice(3);
			}
		}
		this.push(chunk);
		return done();
	};
}