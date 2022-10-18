/*
*@author alejo
*/
/*
*Funcion para validar los elementos requeridos
@param {object} forma
el parametro es el formulario
*/

function validarForma(forma){
	//validamos el usuario
	var usuario = forma.usuario;
	if(usuario.value == "" || usuario.value == "Escribir usuario"){
		alert("Debe proporcionar un nombre de usuario");
		//focus y select se encargan de poner el curso en el campo incorrecto
		usuario.focus();
		usuario.select();
		return false;
	}


	//validamos el password
	var password = forma.password;
	if(password.value == "" || password.value.length < 3){
		alert("Debe proporcionar un password al menos de 3 caracteres");
		password.focus();
		password.select();
		return false;
	}
	
	//validamos las tecnologias de interés
	var tecnologias = forma.tecnologia;
	var checkSeleccionado = false;
	for(i = 0; i < tecnologias.length; i++){
		if(tecnologias[i].checked){
			checkSeleccionado = true;
		}
	}
		if(!checkSeleccionado){
			alert("Debe proporcionar una tecnologia");
			return false;
		}
	
	
	//validamos el genero
	var generos = forma.genero;
	var radioSeleccionado = false;
	
	//revisamos si se selecciono algun radiobutton
	for(i = 0; i < generos.length; i++){
		if(generos[i].checked){
			radioSeleccionado = true;
		}
	}
		if(!radioSeleccionado){
			alert("Debe seleccionar el genero");
			return false;
		}
	
	//validamos la ocupacion
	var ocupacion = forma.ocupacion;
	if(ocupacion.value == ""){
		alert("Debe seleccionar una ocupacion");
		return false;
	}
	
	//formulario validado
	alert("Formulario validado, enviando datos...");
	return true;
	
}

