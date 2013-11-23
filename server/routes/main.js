app.get('/', function (req, res) {
	res.writeHead(301, {Location: '/register'});
	res.end();
});