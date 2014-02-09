$( document ).ready(function() {

  $('#nueva').addClass('active');

});


$('#nueva_frase').click(function() {

    var cat = $('#categoria').val();
    var autor = $('#autor').val();
    var frase = $('#recuadro').val();
    var fecha = "";

    $.ajax({
        url: 'http://pinf.alacartatech.com/time.php?callback=?',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "jsonpCallbackfunction",
        success: function (data) {
            fecha = data.time;

            $.ajax({
                type: "POST",
                url: "/nueva/addNota",
                data: JSON.stringify({ categoria: cat, autor: autor, frase: frase , fecha: fecha}),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data) {
                  alert("Nota Creada");
                },
                error: function(err) {
                  var msg = 'Status: ' + err.status + ': ' + err.responseText;
                  alert(msg);
                }
              });

        },
        error: function (xhr, ajaxOptions, thrownError) {
           console.log('on error!');
           console.log("xhr.status: " + xhr.status);
           console.log("xhr.statusText: " + xhr.statusText);
           console.log("xhr.readyState: " + xhr.readyState);
           console.log("textStatus: " + textStatus);
           console.log("errorThrown: " + errorThrown);
           console.log("xhr.redirect: " + xhr.redirect);
        }
    });
    return false;
});