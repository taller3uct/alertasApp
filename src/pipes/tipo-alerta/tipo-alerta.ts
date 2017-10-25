import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TipoAlertaPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'tipoAlerta',
})
export class TipoAlertaPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    if (value === "Policial") return  {"numero": "133", "nombre": "Carabineros" };
    else if (value === "Ambulancia") return {"numero": "131","nombre": "Ambulancia"};
    else if (value === "Incendio") return {"numero": "132","nombre": "Bomberos"};
    else return {"numero": "","nombre": ""}
  }
}