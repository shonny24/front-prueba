import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import swal from 'sweetalert2';
import { Router } from '@angular/router';



@Injectable()
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
    private router: Router) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Cliente[])
    );
  }

  create(cliente: Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        swal('Error al crear el cliente', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(serial: number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${serial}`).pipe(
      catchError(e =>{
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal('Error al editar el cliente', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.serial}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        swal('Error al editar el cliente', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
