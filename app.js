"use strict"

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    Library = require('./library.js');


app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({entended:true}));
app.use(methodOverride('_method'));

var library = new Library();
var bodyClass = "library";
//Home
app.get('/', function(req, res){
  bodyClass = "home";
  res.render('home', {bodyClass : bodyClass});
});

//Index
app.get('/books', function(req, res){
  //DONE!
  bodyClass = "library";
  console.log("/BOOKS")
  library.all( function(allBooks){
    res.render('library/index', {allBooks: allBooks, bodyClass : bodyClass});
  });

});

//New
app.get('/books/new', function(req, res){
  //DONE
  bodyClass = "library";
	res.render("library/new", {bodyClass : bodyClass});
});

//Create
app.post('/books', function(req, res) {
  var title = req.body.book.title;
  var author = req.body.book.author;
  var color = req.body.book.color;
  library.add(title, author, color, function(newBook){
    console.log(newBook);
    res.redirect('/books');
  });
});

//Show
app.get('/books/:id', function(req, res) {
  bodyClass = "library";
  var id = Number(req.params.id);
  library.findById(id, function(result){
    var book = result[0];
    res.render('library/single.ejs', {book : book, bodyClass : bodyClass});
  });
});

//Edit
app.get('/books/:id/edit', function(req, res) {
	var id = req.params.id;
  bodyClass = "library";
  library.findById(id, function(result){
    var book = result[0];
    res.render('library/edit',{book : book, bodyClass : bodyClass});
  });
});

//Update
app.put('/books/:id', function(req, res) {
  var id = req.params.id;
  var title = req.body.book.title;
  var author = req.body.book.author;
  var color = req.body.book.color;
  library.update(id, title, author, color, function(result){
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
