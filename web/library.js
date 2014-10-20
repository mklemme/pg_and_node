"use strict"

var DB = require('./mydb_lib.js');

var db = new DB("library_example_app", 5432, "localhost");

function Book(title, author, id) {
  this.id = id;
  this.title = title;
  this.author = author;
}

function Library() {
}
// TOGETHER!
Library.prototype.all = function(buzzer) {
	var allBooks = [];

   db.query("SELECT * FROM books;", [], function(err, resultSet){
    if (err) console.log("QUERY FAILED", err);
    resultSet.rows.forEach(function(row){
    	var aBook = new Book(row.title, row.author, row.id);
 			allBooks.push(aBook);
    });
    console.log(allBooks);
    buzzer(allBooks);
	});
};

Library.prototype.add = function(bookTitle, bookAuthor, buzzer) {
  var newBook;
	db.query("INSERT INTO books (title, author) VALUES ($1, $2);", [bookTitle, bookAuthor], function(err, resultSet){
    if (err) console.log("INSERT FAILED :-(", err);
    //console.log(bookTitle, bookAuthor);
    buzzer(resultSet);
  });
};

Library.prototype.destroy = function(id, buzzer) {
  db.query("DELETE FROM books WHERE id = ($1)",[id],
    function(err, resultSet){
      if (err) console.log("INSERT FAILED :-(", err);
      console.log("book "+ id +" destoryed");
      buzzer();
  });
};

Library.prototype.update = function(id, title, author, buzzer) {
  db.query("UPDATE books SET author = ($1), title = ($2) WHERE id = ($3);",[author, title, id],
    function(err, resultSet){
      if (err) console.log("Update FAILED :-(", err);
      console.log("book " + id + " updated with" + title + author);
      buzzer();
  });

};


Library.prototype.findById = function(id, buzzer) {
  // Search the database
  db.query("SELECT * FROM books WHERE id = $1;",
  [id], function(err, resultSet){
    if (err) console.log("INSERT FAILED :-(", err);
    buzzer(resultSet.rows);
  });
};

module.exports = Library;
