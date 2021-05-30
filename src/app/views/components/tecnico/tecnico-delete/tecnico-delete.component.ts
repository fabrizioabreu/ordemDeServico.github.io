import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';


@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  id_tec = ''

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  constructor(
    private service : TecnicoService,
    private router : Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Pegando o ID da url
    this.id_tec = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  delete(): void {
    this.service.delete(this.id_tec).subscribe(resposeta => {
      this.router.navigate(['tecnicos'])
      this.service.message('Técnico DELETADO com sucesso!')
    }, err => {
      if(err.error.error.match('Técnico possui Ordem de servço, não pode ser deletado')){
        this.service.message(err.error.error)
      }
    })
  }

  findById(): void {
    this.service.findById(this.id_tec).subscribe(resposta => {
      this.tecnico = resposta;
    })
  }

  cancel():void {
    this.router.navigate(['tecnicos'])
  }

}
