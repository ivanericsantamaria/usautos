
var autos = [];
var autosSelected = [];

$.getJSON("https://raw.githubusercontent.com/ivanericsantamaria/pruebaAjax/master/autos.json", function(data) {
    autos = data;
    $.each(data, function(i,obj) {
        var option = '<option value="' + obj.marca + '">' + obj.marca + '</option>';
        $("#inputState").append(option);
        $.each(obj.modelos, function (j,obj2){
            $.each(obj2.version, function(h,obj3){
                autosSelected.push(obj3);
            })
        })
        
        
    })
//console.log(autosSelected);

});


var marcaSelected;

$("#inputState").change(function(){
    if (autos.length>0) {
        marcaSelected = $('#inputState option:selected').val();
        if (marcaSelected == "Elegir Marca") {
            $("#inputState2").empty();
            var modeloVacio = '<option value="">Elegir Modelo</option>';
            $("#inputState2").append(modeloVacio);
        }else{
            $.each(autos, function(i,obj){
                if (obj.marca==marcaSelected) {
                    autosSelected= [];
                    
                   // console.log(autosSelected);  
                    $("#inputState2").empty();
                    var modeloVacio = '<option value="">Elegir Modelo</option>';
                    $("#inputState2").append(modeloVacio);
                    $.each(obj.modelos, function(j,obj2){
                    var option = '<option value="' + obj2.modelo + '">' + obj2.modelo + '</option>';
                        $("#inputState2").append(option);
                        $.each(obj2.version, function(k,obj3){
                            autosSelected.push(obj3);
                        });
                        
                        
                    });
                
                }
            })
        }
        console.log(autosSelected);
    }
    
})

$("#inputState2").change(function(){
    var modeloSelected = $('#inputState2 option:selected').val();
    autosSelected= [];
    $.each(autos, function(i, obj)  {              
        if (marcaSelected == obj.marca){
            $.each(obj.modelos, function(j,obj2) {
                if (obj2.modelo == modeloSelected){
                    $.each(obj2.version, function(h,obj3){
                        autosSelected.push(obj3);
                        
                    });
                }
            });
        }
            
    });
    console.log(autosSelected);                           
});

var minPrecio;
var maxPrecio;





$("#boton").click(function(){
    minPrecio = parseInt($("#minPrecio").val(),10);
    maxPrecio = parseInt($("#maxPrecio").val(),10);
    var autosSelectedAux = [];
    $.each(autosSelected, function(i,obj){
        if(minPrecio<=obj.precio && maxPrecio>=obj.precio){
            autosSelectedAux.push(obj);
        }
    })
    autosSelected = autosSelectedAux;
    console.log(autosSelected);
});

