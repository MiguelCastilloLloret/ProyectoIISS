$( document ).ready(function() {

  mostrar($('a.cat:first').text());

  $('#inicio').addClass('active');

});

$('a.cat').click(function() {

    var name = $(this).text();

    mostrar(name);

    return false;

    });


function borrar(pos)
{
    var cat = $('#seccion').text();
  
    $.ajax({
      type: "POST",
      url: "/notas/deleteNota",
      data: JSON.stringify({ categoria: cat, posicion: pos }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        mostrar(cat);
      },
      error: function(err) {
        var msg = 'Status: ' + err.status + ': ' + err.responseText;
        alert(msg);
      }
    });
}

function mostrar(name)
    {
      $('#right-column').hide();

      $('#seccion').text(name);
    
      $('#frases div').remove();
      
      $.getJSON('/notas/' + name, function(data) {
        for (var i = 0; i < data.length; i++) {
          var sub = data[i].split("||");

          $('<div class="row">').appendTo('#frases').html("<div class=\"col-md-1\"><a onclick=\"borrar("+i+")\"class=\"delete\" id=\"b_1_"+i+"\"></a></div><div class=\"col-md-11\" id=\"b_2_"+i+"\"></div>");

          $('<img src="./images/delete.png" style="width: 10px; height: 10px;margin: 0 auto; display: block">').appendTo('#b_1_'+i);
          $('<p>').appendTo('#b_2_'+i).text(sub[1]);
          $('<h5>').appendTo('#b_2_'+i).text('Autor: '+sub[0]);
          $('<h5>').appendTo('#b_2_'+i).text('Fecha: '+sub[2]);
        }});
      
      $('#right-column').show();
    }