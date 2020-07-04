
var autos = [];

$.getJSON("https://raw.githubusercontent.com/ivanericsantamaria/pruebaAjax/master/autos.json", function(data) {
    autos = data;
    $.each(data, function(i,obj) {
        var option = '<option value="' + obj.marca + '">' + obj.marca + '</option>';
        $("#inputState").append(option);
    
    })

});


var marcaSelected;
var modeloSelected;
var minPrecio;
var maxPrecio;

var autosFiltrados=[];
function filtrar() {
 
  marcaSelected = $('#inputState option:selected').val();
  modeloSelected = $('#inputState2 option:selected').val();
  minPrecio = parseInt($("#minPrecio").val(),10);
  maxPrecio = parseInt($("#maxPrecio").val(),10);
  
  autosFiltrados=[];
  $.each(autos, function(i,obj){
          if (marcaSelected == obj.marca || marcaSelected=='elegido') {
		  var auto={};
		  auto['id'] = obj.id;
		  auto['marca'] = obj.marca;
		  auto['modelos'] = [];
		  $.each(obj.modelos, function(j,obj2){
                     if (modeloSelected == obj2.modelo || modeloSelected=='elegido') {
			     var modelo={};
			     modelo['id'] = obj2.id;
			     modelo['id_marca'] = obj2.id_marca;
			     modelo['modelo'] = obj2.modelo;
			     modelo['version'] = [];
			     $.each(obj2.version, function(k,obj3){
				if(minPrecio<=obj3.precio && maxPrecio>=obj3.precio){
				     	var version={};
					version['id'] = obj3.id;
					version['id_modelo'] = obj3.id_modelo;
					version['año'] = obj3.año;
					version['precio'] = obj3.precio;
					version['tipo'] = obj3.tipo;
					version['imagen'] = obj3.imagen;
					modelo['version'].push(version);
				}
			     });
			   auto['modelos'].push(modelo);
                    }
		  });
	       autosFiltrados.push(auto);
       }
  });
   
}

$("#filtrar").click(function(){
	filtrar();
	console.log(autosFiltrados);
      $.each(autosFiltrados, function(i,obj){
		  $.each(obj.modelos, function(j,obj2){
			     $.each(obj2.version, function(k,obj3){
				 console.log(obj.marca);
				console.log(obj2.modelo);
				console.log(obj3);
			     });
		  });
  });
});


$("#inputState").change(function(){
    if (autos.length>0) {
        marcaSelected = $('#inputState option:selected').val();
        if (marcaSelected == "elegido") {
            $("#inputState2").empty();
            var modeloVacio = '<option value="elegido" selected>Elegir Modelo</option>';
            $("#inputState2").append(modeloVacio);
        }else{
            $.each(autos, function(i,obj){
                if (obj.marca==marcaSelected) {
        
                    $("#inputState2").empty();
                    var modeloVacio = '<option value="elegido" selected>Elegir Modelo</option>';
                    $("#inputState2").append(modeloVacio);
                    $.each(obj.modelos, function(j,obj2){
                    var option = '<option value="' + obj2.modelo + '">' + obj2.modelo + '</option>';
                        $("#inputState2").append(option);
                          
                    });
                
                }
            })
        }
    }
    
})









