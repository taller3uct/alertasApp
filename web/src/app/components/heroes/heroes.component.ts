import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { HeroesService, Heroe } from '../../servicios/heroes.service';
// importar la ruta

import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

    heroes: Heroe[]= [];
    alarmas: Observable<any[]>;

  constructor( private _heroesService: HeroesService,
               private router: Router,
               db: AngularFireDatabase) {

                this.alarmas = db.list('alertas').valueChanges();
  //  console.log('constructor');

  }

  ngOnInit() {

     this.heroes = this._heroesService.getHeroes();

    // console.log(this.heroes);
  }

    verHeroe(idx: number) {
      // cargo la ruta de navegacion de los heroes con idx que es el ide del arreglo
      this.router.navigate(['/heroe', idx]);
    }
}

