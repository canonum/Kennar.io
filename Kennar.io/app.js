var http = require('http');
var fs = require('fs');
var path = require('path');
const directoryPath = path.join(__dirname, 'Documents');

http.createServer(function (req, res) {


    fs.readFile('./empty-example/index.html', function(err, data) {
        if(err){return console.log('Unable action:' + err)}
        else{

        }  


        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(8080);

