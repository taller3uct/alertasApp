import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService} from '../../servicios/heroes.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

// tslint:disable-next-line:class-name
export interface xalarmas {
              descripcion: string;
              lat: number;
              lon: number;
              tiempo: number;
              tipo: string;
      }

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
})
// tslint:disable-next-line:one-line

export class BuscadorComponent implements OnInit {
   alarmas: Observable<{}[]>;
   termino: String;
    heroes: any[] = [];
    constructor( private activatedRoute: ActivatedRoute,
      private _heroesService: HeroesService,
      db: AngularFireDatabase) {

        this.alarmas = db.list('alertas').valueChanges();
      }
  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
    this.termino = params['termino'];
    this.heroes = this._heroesService.buscarHeroes( params['termino']);
    console.log(this.heroes);
    // console.log('hola');
    });

    }

    // tslint:disable-next-line:one-line
}
