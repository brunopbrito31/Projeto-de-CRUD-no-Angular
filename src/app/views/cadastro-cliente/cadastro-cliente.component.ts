import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Cep } from "src/app/models/cep";
import { Cliente } from "src/app/models/cliente";
import { CepService } from "src/app/shared/services/cep.service";
import { ClienteService } from "src/app/shared/services/cliente.service";

@Component({
  selector: "app-cadastro-cliente",
  templateUrl: "./cadastro-cliente.component.html",
  styleUrls: ["./cadastro-cliente.component.css"],
})
export class CadastroClienteComponent implements OnInit {
  [x: string]: any;
  cliente = {
  } as Cliente;

  cep: string = "0";
  endereco: string = "";
  bairro: string = "";
  localidade: string = "";
  uf: string = "";
  campodesativado = false;

  constructor(
    private cepService: CepService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {}

  getEndereco() {
    this.cepService.getCep(this.cep).subscribe((cep: Cep) => {
      this.cliente.endereco = cep.logradouro;
      this.cliente.bairro = cep.bairro;
      this.cliente.localidade = cep.localidade;
      this.cliente.uf = cep.uf;
      this.campodesativado = true;
    });
  }

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
    alert("Cadastro Completo!")
  }

  getClientes() {
    this.clienteService.getClientes().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
    });
  }

   // limpa o formulario
   cleanForm(form: NgForm) {
    this.getClientes();
    form.resetForm();
    this.cliente = {} as Cliente;
  }
}
