import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { OS } from 'src/app/models/os';
import { Tecnico } from 'src/app/models/tecnico';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-update',
  templateUrl: './os-update.component.html',
  styleUrls: ['./os-update.component.css']
})
export class OsUpdateComponent implements OnInit {

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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.os.id = this.route.snapshot.paramMap.get('id')   // Pegando as informaçoes da OS e passando para os campos
    this.listarTecnicos();
    this.listarClientes();
    this.findById();
  }

  findById():void {
    this.service.findById(this.os.id).subscribe(resposta => {
      this.os = resposta;
      this.converteDado();
    })
  }

  update(): void {
    this.service.create(this.os).subscribe(resposta => {
      this.service.message("Ordem de serviço atualizada com sucesso.");
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

  converteDado(): void {
    if(this.os.status == "ABERTO") {
      this.os.status = 0;
    } else if (this.os.status == "ANDAMENTO") {
      this.os.status = 1;
    } else {
      this.os.status = 2;
    }

    if(this.os.prioridade == "BAIXA") {
      this.os.prioridade = 0;
    } else if (this.os.prioridade == "MEDIA") {
      this.os.prioridade = 1;
    } else {
      this.os.prioridade = 2;
    }
  }
}
