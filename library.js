"use strict"

var DB = require('./mydb_lib.js');

var db = new DB("library_example_app", 5432, "localhost");

function Book(title, author, id, color) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.color = color;
}

function Library() {
}
// TOGETHER!
Library.prototype.all = function(buzzer) {
	var allBooks = [];

   db.query("SELECT * FROM books;", [], function(err, resultSet){
    if (err) console.log("QUERY FAILED", err);
    resultSet.rows.forEach(function(row){
    	var aBook = new Book(row.title, row.author, row.id, row.color);
 			allBooks.push(aBook);
    });
    //console.log(allBooks);
    buzzer(allBooks);
	});
};

Library.prototype.add = function(bookTitle, bookAuthor, color, buzzer) {
  var newBook;
	db.query("INSERT INTO books (title, author, color) VALUES ($1, $2, $3);", [bookTitle, bookAuthor, color], function(err, resultSet){
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

Library.prototype.update = function(id, bookTitle, bookAuthor, color, buzzer) {
  db.query("UPDATE books SET title = ($1), author = ($2), color = ($3) WHERE id = ($4);",[bookTitle, bookAuthor, color, id],
    function(err, resultSet){
      if (err) console.log("Update FAILED :-(", err);
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
