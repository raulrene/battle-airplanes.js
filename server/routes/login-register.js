app.get('/login', function (req, res) {
	res.sendfile(path.resolve(__dirname, '../views/login.html'));
});

app.get('/register', function (req, res) {
	res.sendfile(path.resolve(__dirname, '../views/register.html'));
});	