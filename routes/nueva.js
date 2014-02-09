exports.index = function(req, res) {
  	res.render('nueva')
};

exports.add = function(req, res) {

  var cat = req.body.name.replace("\n","");

  console.log(req.body.name);

  console.log(cat);

  var categoria = _(notas).detect(function (p) {
    return p.name == cat;
  });
  
  categoria.frases.push(req.body.frase);
    
  res.json({status: 'ok' });
  }