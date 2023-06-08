import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

declare var require: any;
const tipoPeso: any = require('./data/tipopeso.json');
const categoriaGanado: any = require('./data/categoriaganado.json');
const tipoGanado: any = require('./data/tipoganado.json');
const estadoGanado: any = require('./data/estadoganado.json');
const articulos: any = require('./data/articulos.json');
const depositos: any = require('./data/depositos.json');
const razas: any = require('./data/razas.json');
const tiposMovimiento: any = require('./data/tipos_motivos.json');
const motivosMovimiento: any = require('./data/motivos_movimiento.json');


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private routes: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('username') != null) {

        //cargo datos y estructura del sistema
        //obtengo datos del usuairo
        localStorage.setItem("articulos", JSON.stringify(articulos)) 
        localStorage.setItem("categoriaGanado", JSON.stringify(categoriaGanado)) 
        localStorage.setItem("depositos", JSON.stringify(depositos)) 
        localStorage.setItem("estadoGanado", JSON.stringify(estadoGanado)) 
        localStorage.setItem("motivosMovimiento", JSON.stringify(motivosMovimiento)) 
        localStorage.setItem("tiposMovimiento", JSON.stringify(tiposMovimiento))         
        localStorage.setItem("tipoGanado", JSON.stringify(tipoGanado)) 
        localStorage.setItem("tipoPeso", JSON.stringify(tipoPeso)) 
        localStorage.setItem("razas", JSON.stringify(razas)) 
        
      return true;

    } else {
      
      this.routes.navigate(['/login']);
      return false;

    }
  }
}
