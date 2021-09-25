import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente';

import { ClienteService } from 'src/app/shared/services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[];
  cliente = {} as Cliente;

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.getClientes();
  }

  // defini se um cliente será criado ou atualizado
  saveCliente(form: NgForm) {
    if (this.cliente.Id !== undefined) {
      this.clienteService.updateCliente(this.cliente).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.clienteService.saveCliente(this.cliente).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os clientes
  getClientes() {
    this.clienteService.getClientes().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
    });
  }

  // deleta um cliente
  deleteCliente(cliente: Cliente) {
    this.clienteService.deleteCliente(cliente).subscribe(() => {
      this.getClientes();
    });
  }

  // copia o cliente para ser editado.
  editCliente(car: Cliente) {
    this.cliente = { ...car };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getClientes();
    form.resetForm();
    this.cliente = {} as Cliente;
  }

}
