import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
  styles: [`
  agm-map {
    height: 50px;
  }
`],
template: `
<agm-map [latitude]="lat" [longitude]="lng"></agm-map>
`
})

export class MapaComponent  {

    constructor() { }
    lat = -38.7382793;
    lng = -72.6013784;
    zoom = 16;
  }
