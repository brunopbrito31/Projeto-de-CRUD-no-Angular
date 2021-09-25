import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cep } from 'src/app/models/cep';
import { Cliente } from 'src/app/models/cliente';
import { CepService } from 'src/app/shared/services/cep.service';
import { ClienteService } from 'src/app/shared/services/cliente.service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {
  [x: string]: any;

  cep:string = ""
  endereco:string = ""
  bairro:string = ""
  localidade:string = ""
  uf:string = ""
  campodesativado = false;
  cliente: Cliente;


  constructor(private cepService: CepService,
    private clienteService: ClienteService) { }

  ngOnInit(): void {
  }

  getEndereco(cep: string) {
    alert(cep)
    this.cepService.getCep(cep).subscribe((cep: Cep) => {
      this.endereco = cep.logradouro;
      this.bairro = cep.bairro;
      this.localidade = cep.localidade;
      this.uf = cep.uf
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
  }

}
