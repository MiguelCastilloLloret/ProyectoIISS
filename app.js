
/**
 * Module dependencies.
 */

var express = require('express');
var notas = require('./routes/notas');
var contacto = require('./routes/contacto');
var nueva = require('./routes/nueva');
var acerca= require('./routes/acerca');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon(path.join(__dirname, 'public/images/favicon.ico'))); 
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.bodyParser());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', notas.index);
app.get('/notas/:name',notas.cat);
app.post('/nueva/addNota',notas.add);
app.post('/notas/deleteNota',notas.borrar);
app.get('/nueva',nueva.index);
app.get('/acerca',acerca.index);
app.get('/contacto',contacto.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
