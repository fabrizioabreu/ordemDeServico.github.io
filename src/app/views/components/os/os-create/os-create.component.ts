import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { OS } from 'src/app/models/os';
import { Tecnico } from 'src/app/models/tecnico';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-create',
  templateUrl: './os-create.component.html',
  styleUrls: ['./os-create.component.css']
})
export class OsCreateComponent implements OnInit {
  
  os: OS = {
    prioridade: '',
    observacoes: '',
    status: '',
    tecnico: '',
    cliente: ''
  }

  tecnicos: Tecnico[] = []
  clientes: Cliente[] = []

  constructor(
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private service: OsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listarTecnicos();
    this.listarClientes();
  }

  create(): void {
    this.service.create(this.os).subscribe(resposta => {
      this.service.message("Ordem de serviço criada com sucesso.");
      this.router.navigate(['os'])
    }, err => {
      console.log(err)
      if(err.error.error.match('Erro na validação dos campos!')){
        this.service.message(err.error.errors[0].message)
      }
    })
  }

  cancel(): void {
    this.router.navigate(['os'])
  }

  listarTecnicos():void {
    this.tecnicoService.findAll().subscribe(resposeta => {
      this.tecnicos = resposeta;
    })
  }

  listarClientes():void {
    this.clienteService.findAll().subscribe(resposeta => {
      this.clientes = resposeta;
    })
  }
}
