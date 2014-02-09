var _ = require('underscore');

// TODO: This should be read from a database
var notas = [
  { 
    name: 'Universidad', 
    frases: [
      'Pablo||Los alumnos no suspenden, los profesores no les aprueban||15 Enero', 
      'Juan Carlos||Deja que el 5 fluya a ti||15 Enero',
      'Manolo||Gadechi es un ejemplo de democracia en la Universidad||15 Enero'] 
  },
  {
    name: 'Personales',
    frases: [
      'Paco Maestre||Un delegado siempre es un buen soldado||15 Enero', 
      'Miguel Castillo||Hay que matar a Mou||15 Enero',
      'Miguel Moral||Nunca te presentes a delegado de centro||15 Enero']
  }
];

exports.index = function(req, res) {
	var cat = notas.map(function(p){return p.name});
  	res.render('notas', {categorias: cat})
};


exports.cat = function(req, res) {
  var lista = _(notas).detect(function (p) { 
    return p.name == req.params.name;
  }).frases;
  res.json(lista);
};

exports.add = function(req, res) {

  var cat = req.body.categoria.replace("\n","");

  var categoria = _(notas).detect(function (p) {
    return p.name == cat;
  });

  if(_.isUndefined(categoria))
  {
    notas.push({name: cat, frases: []});

    categoria = _(notas).detect(function (p) {
    return p.name == cat;
    });
  }

  
  categoria.frases.push(req.body.autor+'||'+req.body.frase+'||'+req.body.fecha);
    
  res.json({status: 'ok' });
  }

  exports.borrar = function(req, res) {

  var cat = req.body.categoria.replace("\n","");

  var categoria = _(notas).detect(function (p) {
    return p.name == cat;
  });

  if(_.isUndefined(categoria))
  {
    res.json({status: 'ok' });
  }

  categoria.frases.splice(req.body.posicion,1);
      
    res.json({status: 'ok' });
  }