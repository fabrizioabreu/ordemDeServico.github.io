import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  id_tec = ''

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  nome = new FormControl('', [Validators.minLength(5)])
  cpf = new FormControl('', [Validators.minLength(11)])
  telefone = new FormControl('', [Validators.minLength(10)])

  constructor(
    private service : ClienteService,
    private router : Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Pegando o ID da url
    this.id_tec = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  update():void {
    this.service.update(this.cliente).subscribe((resposta) => {
      this.router.navigate(['clientes'])
      this.service.message('Técnico atualizado com sucesso!')
    }, err => {
      if(err.error.error.match('já cadastrado')){
        this.service.message(err.error.error)
      } else if(err.error.errors[0].message === 'número do registro de contribuinte individual brasileiro (CPF) inválido'){
        this.service.message("CPF Inválido!")
      }
    })
  }

  findById(): void {
    this.service.findById(this.id_tec).subscribe(resposta => {
      this.cliente = resposta;
    })
  }

  cancel():void {
    this.router.navigate(['clientes'])
  }

  errorValidNome() {
    if(this.nome.invalid) {
      return 'O nome deve ter de 5 a 100 caracteres!';
    }
    return false;
  }

  errorValidCPF() {
    if(this.cpf.invalid) {
      return 'O CPF deve ter no mínimo 11 caracteres!';
    }
    return false;
  }

  errorValidTelefone() {
    if(this.telefone.invalid) {
      return 'O Telefone deve ter no mínimo 10 caracteres!';
    }
    return false;
  }
}

