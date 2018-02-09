var net = require('net');
var readlineSync = require('readline-sync');
var http = require('http');

var HOST = "10.0.0.53",
    PORT = 2001,
	client = null;

function OpenConnection(){
	if (client) {
		console.log("Connection already open");
		setTimeout(function () {
			menu();
		}, 1000);
		return;
	}

	client = new net.Socket();
	
	client.on("error", function(err) {
		client.destroy();
		client = null;
		console.log("ERROR: HOST could not be reached. MSG: %s", err.message);
		setTimeout(function () {
			menu();
		}, 1000);
	});

	client.connect(PORT, HOST, function() {
		console.log("Connection Established");
		setTimeout(function () {
			menu();
		}, 1000);
	});

	var init = '\r\n';
	client.write(init, null, function(){

	});

	client.on("data", function (init) {
		console.clear();
		// console.log("Received-1: %s", data);
		setTimeout(function () {
			menu();
		}, 1000);
	}); 
}


function SendData(lv) {
	if (!client) {
		console.log("Connection is not active");
		setTimeout(function () {
			menu();
		}, 1000);
		return;
	}

 	client.write(lv, null, function() {
		console.log("Sent: %s", lv);
		setTimeout(function () {
			menu();
		}, 1000);
	});

	client.on("data", function(lv) {
		console.log("Received-3: %s", lv);
	});

}


function CloseConnection() {
	if (!client) {
		console.log("Connection is already closed");
		return;
	}

	client.destroy();
	client = null;
	console.log("Connection is now closed");

}

function menu(){
	var lineRead = readlineSync.question("\n\nEnter option (1-Open/Send, 2-Send, 3-Close, 4-Quit): ");

	switch (lineRead) {
		case "1":
			OpenConnection();
			break;
		case "2":
			// var data = 'readlineSync.question("Enter data to send:")';
			var lv = 'lv';
			SendData(lv + '\r\n');
			break;
		case "3":
			CloseConnection();
			break;
		case "4":
			return;
			break;
		default:
			setTimeout(function () {
				menu();
			}, 0);
			break;

	}

}

setTimeout(function () {
	menu();
}, 1000);

/* var server = http.createServer(function(req, res){
	console.log('request was made: ' + req.url);
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.writeBody(data);
	var lvReadStream = fs.createReadStream(__dirname + data, 'utf8');
	lvReadStream.pipe(res);
});

server.listen(3001, '127.0.0.1');
console.log('now listening on port 3000'); */
