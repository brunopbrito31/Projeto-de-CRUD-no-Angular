import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cep } from 'src/app/models/cep';
import { Cliente } from 'src/app/models/cliente';
import { CepService } from 'src/app/shared/services/cep.service';

import { ClienteService } from 'src/app/shared/services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[];
  cliente = {} as Cliente;

  cep: string = "0";
  endereco: string = "";
  bairro: string = "";
  localidade: string = "";
  uf: string = "";
  campodesativado = false;

  mos = true;



  constructor(private clienteService: ClienteService, private cepService: CepService) {}

  ngOnInit() {
    this.getClientes();
  }

  getEndereco() {
    this.cepService.getCep(this.cep).subscribe((cep: Cep) => {
      this.cliente.endereco = cep.logradouro;
      this.cliente.bairro = cep.bairro;
      this.cliente.localidade = cep.localidade;
      this.cliente.uf = cep.uf;
      this.campodesativado = true;
    });
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
  editCliente(cliente: Cliente) {
    this.cliente = { ...cliente };
    this.mos = false;
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getClientes();
    form.resetForm();
    this.cliente = {} as Cliente;
    this.mos = true;
  }

}
