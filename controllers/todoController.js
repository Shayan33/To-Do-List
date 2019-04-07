//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var bodyParser = require('body-parser');
var urlencoderParser = bodyParser.urlencoded({extended: false});
var mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb+srv://test:test@cluster0-txjpc.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });

// Create a schema
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = function(app){

  app.get('/todo', function(req, res){
    // get data from mongodb and pass it to view
    Todo.find({}, function(err, data){
      if (err) throw err;
      res.render('todo', {todos: data});
    });
  });

  app.post('/todo', urlencoderParser, function(req, res){
    // get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data){
      if (err) throw err;
      res.json(data);
    })
  });

  app.delete('/todo/:item', function(req, res){
  Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne(function(err, data) {
    if (err) throw err;
    res.json(data);
  });
});

}
