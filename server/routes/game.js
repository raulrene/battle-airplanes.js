app.get('/game', function (req, res){
	res.sendfile(path.resolve(__dirname, '../views/boards.html'));
});