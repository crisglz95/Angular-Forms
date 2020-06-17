import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageErrorsService {

  constructor() { }

  public messageError(errorRecibido: Object){
    let message: string = '';

    if(errorRecibido == null){
      return {
        error: false
      }
    }

    switch(true){
      case errorRecibido.hasOwnProperty('required'):
        message = 'Es necesario este campo';
        break;
      case errorRecibido.hasOwnProperty('onlyAlpha'):
        message = 'Este campo tiene caracteres innecesarios';
        break;
      case errorRecibido.hasOwnProperty('minLength'):
        message = 'La longitud minima es de 3 caracteres';
        break;
      case errorRecibido.hasOwnProperty('notEmpty'):
        message = 'El campo debe de tener texto';
        break;
      case errorRecibido.hasOwnProperty('numeric'):
        message = 'El campo solo recibe numeros';
        break;
      case errorRecibido.hasOwnProperty('maxLength'):
        message = `La longitud maxima es excedida`;
        break;
      case errorRecibido.hasOwnProperty('phoneNumber'):
        message = 'El campo tiene caracteres innecesarios';
        break;
      case errorRecibido.hasOwnProperty('email'):
        message = 'No cumple con el formato de email';
        break;
      case errorRecibido.hasOwnProperty('compare'):
        message = 'El correo electronico no es igual';
        break;
    }
    return {
      message,
      error: true
    };
  }
}
