import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, map,catchError } from 'rxjs/operators'
import { Observable ,of} from 'rxjs';
import { Router } from '@angular/router';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CargaMasivaService {


  public auth2:any

  constructor(private http: HttpClient,
    private router:Router, private ngZone:NgZone) {}

     



  

  crearUsuario(formData: any){

    // Creo usuario 
    // Creo Empresa
    // Creo Usuario por empresa
    // Principio solo estructura con La Maria Elena  
    return this.http.post(`${base_url}/accionmasiva`, formData)
      .pipe(
        tap((resp:any)=>{
          console.log(resp)
        })
      )


  }  
  

}
