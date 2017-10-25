import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the MostrarFechaPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'mostrarFecha',
})
export class MostrarFechaPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(num) {
    let Nfecha = new Date(num)
    let dia = ""
    let mes = ""

    if (Nfecha.getDay() == 1) {
      dia = "Lunes "
    } else if (Nfecha.getDay() == 2) {
      dia = "Martes "
    } else if (Nfecha.getDay() == 3) {
      dia = "Miercoles "
    } else if (Nfecha.getDay() == 4) {
      dia = "Jueves "
    } else if (Nfecha.getDay() == 5) {
      dia = "Viernes "
    } else if (Nfecha.getDay() == 6) {
      dia = "Sabado "
    } else if (Nfecha.getDay() == 7) {
      dia = "Domingo "
    }
    if (Nfecha.getMonth() == 0) {
      mes = " Enero, "
    } else if (Nfecha.getMonth() == 1) {
      mes = " Febrero, "
    } else if (Nfecha.getMonth() == 2) {
      mes = " Marzo, "
    } else if (Nfecha.getMonth() == 3) {
      mes = " Abril, "
    } else if (Nfecha.getMonth() == 4) {
      mes = " Mayo, "
    } else if (Nfecha.getMonth() == 5) {
      mes = " Junio, "
    } else if (Nfecha.getMonth() == 6) {
      mes = " Julio, "
    } else if (Nfecha.getMonth() == 7) {
      mes = " Agosto, "
    } else if (Nfecha.getMonth() == 8) {
      mes = " Septiembre, "
    } else if (Nfecha.getMonth() == 9) {
      mes = " Octubre, "
    } else if (Nfecha.getMonth() == 10) {
      mes = " Noviembre, "
    } else if (Nfecha.getMonth() == 11) {
      mes = " Diciembre, "
    }


    return dia + Nfecha.getDate() + mes + Nfecha.getFullYear() + ", " + Nfecha.toLocaleTimeString();
  }
}
