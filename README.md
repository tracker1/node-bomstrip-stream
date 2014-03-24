node-bomstrip-stream
====================

Node.js transformation stream that will strip a UTF-8 Byte Order Mark from the beginning.

If you are dealing with text files that are edited and may include a Byte Order Mark (BOM) from the editor, this transform will easily remove those for use by the rest of your utility.  This is especially useful when accessing files created with editors in Windows, which will often be saved as UTF-8 with BOM. 

Usage
-----
    var fs = require('fs');
	var bomstrip = require('bomstrip');
	var stripped_stream = fs.createReadStream("path/to/file").pipe(new bomstrip());

Install
-------

    npm install --save bomstrip

Testing
----
TODO: Need to add unit tests, this is a very simple Transform stream that will simply strip the UTF-8 BOM bytes from the first portion of the stream.  Pull request(s) welcome.
