import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService} from '../../servicios/heroes.service';
import { MapaComponent } from '../mapa/mapa.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
  agm-map {
    height: 300px;
  }
`],
/*template: `
<div class="card-columns animated fadeIn">
<div class="card" *ngFor="let alarma of (alarmas | async)?.reverse()">
    <!-- <img class="card-img-top" src="" alt="Card image cap"> -->
    <agm-map [latitude]="alarma.lat" [longitude]="alarma.lon" [zoom]="16" [scrollwheel]="false" [mapDraggable]="false">
        <agm-marker [latitude]="alarma.lat" [longitude]="alarma.lon"></agm-marker>
      </agm-map>
    <div class="card-body">
      <h4 class="card-title">{{alarma.tipo}}</h4>
      <p class="card-text">{{alarma.descripcion}}</p>
    </div>
  </div>
</div>
` */
})
export class HeroeComponent {
  alarmas: Observable<any[]>;

  heroe: any[] = [];
  lat = 51.678418;
  lng = 7.809007;

  constructor( private activatedRoute: ActivatedRoute,
               private _heroesService: HeroesService,
               db: AngularFireDatabase) {

                this.alarmas = db.list('alertas').valueChanges();

    this.activatedRoute.params.subscribe( params => {
      console.log( params['id'] );
      this.heroe = this._heroesService.getHeroe( params['id']);
      console.log(this.heroe);
    });
  }
}
