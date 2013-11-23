app.get('/register', function (req, res) {
	res.sendfile(path.resolve(__dirname, '../views/register.html'));
});	