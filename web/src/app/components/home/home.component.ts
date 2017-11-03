import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  long: number;
  lati: number;
  location = {};
  constructor() { }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lati = position.coords.latitude;
        this.long = position.coords.longitude;
        console.log(position.coords);
        console.log(this.lati);
        console.log(this.long);

      });
  }
}

getLati() {
  return this.lati;
}

getLong() {
  return this.long;


}
}
