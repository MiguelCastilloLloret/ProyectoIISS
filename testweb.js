var assert=require('assert');
var zombie = require('zombie');

describe("Probando Web Principal", function() {

it("Carga de Pagina", function() {
zombie.visit("http://pacific-dawn-9912.herokuapp.com/", function() {
assert.ok(zombie.success, 'La pagina se ha cargado');
done();
});
});
it("Comprobar elementos", function(){
zombie.visit("http://pacific-dawn-9912.herokuapp.com/", function(err,zombie) {
	if (err) throw err;
	var h3 = zombie.query('h3');
	assert(h3, 'El H3 aparece');
	var div = zombie.query('.marketing');
	assert(div, 'Las categorias aparecen');
	done();
});
});
});

describe("Probando Web Añadir", function() {

it("Carga de Pagina", function() {
zombie.visit("http://pacific-dawn-9912.herokuapp.com/nueva", function() {
assert.ok(zombie.success, 'La pagina se ha cargado');
done();
});
});
it("Comprobar elementos", function(){
zombie.visit("http://pacific-dawn-9912.herokuapp.com/nueva", function(err,zombie) {
	if (err) throw err;
	var h3 = zombie.query('h3');
	assert(h3, 'El H3 aparece');
	var form = zombie.query('form');
	assert(form, 'form exists');
	assert(zombie.query('input[type=text]#autor', form),'tiene campo autor');
	assert(zombie.query('input[type=text]#categoria', form),'tiene campo categoria');
	assert(zombie.query('textarea #recuadro', form),'tiene campo de frase');
	assert(zombie.query('div #nueva_frase', form),'tiene boton');
	assert.equal(form.method, 'POST', 'uses POST method');
	assert.equal(form.action, '#', 'posts to #');
	done();
});
});
});
