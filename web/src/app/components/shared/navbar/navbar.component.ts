import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  // tslint:disable-next-line:no-shadowed-variable
  constructor( private router: Router) { }

  ngOnInit() {
  }

  buscarHeroe( termino: string) {
    console.log(termino); // en vez de mostrar devuelvo
    this.router.navigate( ['/buscar', termino ]);

  }

}
