"use strict"

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    Library = require('./library.js');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

var library = new Library();

//Home
app.get('/', function(req, res){
  res.render('home');
});

//Index
app.get('/books', function(req, res){
  //DONE!
  console.log("/BOOKS")
  library.all( function(allBooks){
    res.render('library/index', {allBooks: allBooks});
  });

});

//New
app.get('/books/new', function(req, res){
  //DONE
	res.render("library/new");
});

//Create
app.post('/books', function(req, res) {
  var title = req.body.book.title;
  var author = req.body.book.author;

  library.add(title, author, function(newBook){
    console.log(newBook);
    res.redirect('/books');
  });
});

//Show
app.get('/books/:id', function(req, res) {
  var id = Number(req.params.id);

  library.findById(id, function(result){
    console.log(result);
    res.send("implement show book. showing book " + result[0].title);
  });
});

//Edit
app.get('/books/:id/edit', function(req, res) {
	var id = req.params.id;

  library.findById(id, function(result){
    var book = result[0];
    res.render('library/edit',{book : book});
  });
});

//Update
app.put('/books/:id', function(req, res) {
  var id = req.params.id;
  var title = req.body.book.title;
  var author = req.body.book.author;
  library.update(id, title, author, function(result){
    res.redirect('/books');
  });
});

//Delete
app.delete('/books/:id', function(req, res) {
	var id = req.params.id;

  library.destroy(id, function(result){
    res.redirect('/books');
  });
});




var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
