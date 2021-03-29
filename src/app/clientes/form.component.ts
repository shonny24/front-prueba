import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente()
  public titulo: string = "Crear Cliente"

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente()
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let serial = params['serial']
      if (serial) {
        this.clienteService.getCliente(serial).subscribe(cliente => {
          this.cliente = cliente;
          this.cliente.editar = true;
          
        })
      }
    })
  }

  create(): void {
    this.clienteService.create(this.cliente)
      .subscribe((response: any) => {
        console.log(response.cliente);
        this.router.navigate(['/clientes'])
        swal('Nuevo cliente', `Cliente ${response.cliente.nombres} creado con éxito!`, 'success')
      }
      );
  }

  update(): void {
    this.clienteService.update(this.cliente)
      .subscribe((response: any) => {
        this.router.navigate(['/clientes'])
        swal('Cliente Actualizado', `Cliente ${response.cliente.nombres} actualizado con éxito!`, 'success')
      }

      )
  }

}
