function validarEmail(email) {
  var regex = /^[-\w.%+]{1,34}@(?:[A-Z0-9-]{1,10}\.){1,10}[A-Z]{2,10}$/i;
  return regex.test(email) ? true : false;
}
function validarNombres(Nombre) {
  var regex = /^[A-Z]{1,32}$/i;
  return regex.test(Nombre) ? true : false;
}
function validarNombreLista(Nombre) {
  var regex = /^[A-Z]{1,20}$/i;
  return regex.test(Nombre) ? true : false;
}
function validarContraseñas(Contraseña) {
  var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,64}$/;
  return regex.test(Contraseña) ? true : false;
}
function ValidarObjetoLista(){
  





}

function CalcularEdad(fecha_nacimiento) {
  var hoy = new Date();
  var cumpleanos = new Date(fecha_nacimiento);
  var edad = hoy.getFullYear() - cumpleanos.getFullYear();
  var m = hoy.getMonth() - cumpleanos.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
    edad--;
  }
  return edad;
}

//Falta añadir una funcion de parte del backend para que valide que el correo no halla sido utilizado
function ValidarLogin(event) {
  var email = validarEmail(document.getElementById('inputemail').value);
  if (email == true) {
    alert('La dirección de email ' + document.getElementById('inputemail').value + ' es correcta.');
  } else {
    alert('La dirección de email ' + document.getElementById('inputemail').value + ' es incorrecta.');
  }
}
function ValidarRegistro(event) {

  var email = validarEmail(document.getElementById('inputemail').value);
  var nombre = validarNombres(document.getElementById('inputNombre').value);
  var contraseña = validarContraseñas(document.getElementById('inputContraseña1').value);
  var confirmacion = validarContraseñas(document.getElementById('inputContraseña2').value);
  var edad = CalcularEdad(document.getElementById('inputdate').value);
  var isChecked = document.getElementById('aviso').checked;

  //colocar lo que va a hacer en caso de que las validaciones sean correctas o incorrectas

  if (email == true) {
    alert('La dirección de email ' + document.getElementById('inputemail').value + ' es correcta.');
    if (nombre == true) {
      alert('El nombre ' + document.getElementById('inputNombre').value + ' es correcto.');
      if (contraseña == true && confirmacion == true && document.getElementById('inputContraseña1').value == document.getElementById('inputContraseña2').value) {
        alert('Las contraseñas ' + ' son correctas.');
        if (edad >= 18) {
          alert('Eres mayor de edad');
          if (document.registroForm.SelectAlcaldia.value == 0 || document.registroForm.SelectAlcaldia.value == 'Alcaldía') {
            alert('Selecciona una alcaldia');
            if (isChecked) {
              alert('Has leido y aceptas el aviso de privacidad');
              // Todo ha sido validado
            } else {
              alert('no has leido y no aceptas el aviso de privacidad');
            }
          }
        } else {
          alert('Eres menor de edad ');
        }
      } else {
        alert('Las contraseñas ' + ' son incorrectas.');
      }
    } else {
      alert('El nombre ' + document.getElementById('inputNombre').value + ' es incorrecto.');
    }
  } else {
    alert('La dirección de email ' + document.getElementById('inputemail').value + ' es incorrecta.');
  }

}
function ValidarLista(event){
  var nombreLista = validarNombreLista(document.getElementById('inputNombre').value);
  if (nombreLista == true) {
    alert('El nombre ' + document.getElementById('inputNombre').value + ' es correcto.');
  } else {
    alert('El nombre ' + document.getElementById('inputNombre').value + ' es incorrecto.');
  }
}