import { Injectable } from '@angular/core';

@Injectable()
export class HeroesService {

    private heroes: Heroe[]= [
            {
              nombre: 'Felipe Hernández.',
              // tslint:disable-next-line:max-line-length
              bio: 'Incendio en la avenida recabarren.',
              img: 'assets/img/user.png',
              aparicion: '2017-10-27',
              casa: 'DC'
            },
            {
              nombre: 'Batman reportando.',
              // tslint:disable-next-line:max-line-length
              bio: 'Choque en av caupolican con garibaldi.',
              img: 'assets/img/batman.png',
              aparicion: '1939-05-01',
              casa: 'DC'
            },
            {
              nombre: 'Daredevil reportando.',
              // tslint:disable-next-line:max-line-length
              bio: 'Asalto a mano armada a las afuera de la UCT.',
              img: 'assets/img/daredevil.png',
              aparicion: '1964-01-01',
              casa: 'Marvel'
            },
            {
              nombre: 'Hulk reportando.',
              // tslint:disable-next-line:max-line-length
              bio: 'Emergencia en la entrada de Cunco.',
              img: 'assets/img/hulk.png',
              aparicion: '1962-05-01',
              casa: 'Marvel'
            },
            {
              nombre: 'Linterna Verde reportando.',
              // tslint:disable-next-line:max-line-length
              bio: 'Incendio en el mercado',
              img: 'assets/img/linterna-verde.png',
              aparicion: '1940-06-01',
              casa: 'DC'
            },
            {
              nombre: 'Spider-Man reportando.',
              // tslint:disable-next-line:max-line-length
              bio: 'Intento de asalto en montt con aldunate.',
              img: 'assets/img/spiderman.png',
              aparicion: '1962-08-01',
              casa: 'Marvel'
            },
            {
              nombre: 'Wolverine reportando.',
              // tslint:disable-next-line:max-line-length
              bio: 'Choque en Av alemania a las afueras de la universidad catolica.',
              img: 'assets/img/wolverine.png',
              aparicion: '1974-11-01',
              casa: 'Marvel'
            }
          ];

    constructor() {
        console.log('Servicio listo!');
     }
          // tslint:disable-next-line:one-line
          // Devuelve en forma de arreglo
          // tslint:disable-next-line:one-line
          getHeroes(): Heroe[]{
            return this.heroes;
        }
        // retornamos la lista de heroes en idx
        getHeroe(idx: string) {
            return this.heroes[idx];

        }
        buscarHeroes (termino: string): Heroe[] {
            // tslint:disable-next-line:prefer-const
            let heroesArr: Heroe[] = [];
            termino = termino.toLocaleLowerCase();

            // tslint:disable-next-line:prefer-const
            for ( let heroe of this.heroes){

                // tslint:disable-next-line:prefer-const
                let nombre = heroe.nombre.toLowerCase();
                if (nombre.indexOf(termino) >= 0) {
                    heroesArr.push(heroe);
                }
            }
            return heroesArr;

        }
}

// tslint:disable-next-line:one-line
export interface Heroe{

    nombre: string;
    bio: string;
    img: string;
    aparicion: string;
    casa: string;
}
