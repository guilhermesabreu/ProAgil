import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../_services/Evento.service';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})

export class EventosComponent implements OnInit {
  eventosFiltrados: Evento[];
  eventos: Evento[];
  evento: Evento;
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  _filtroLista: string;
  registerForm: FormGroup;
  modoSalvar = 'post';

  constructor(
    private eventoService: EventoService
  , private modalService: BsModalService
  , private fb: FormBuilder) { }

  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtraEventos(this.filtroLista) : this.eventos;
  }

  editarEvento(evento: Evento, template: any) {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.evento = evento;
    this.registerForm.patchValue(evento);
  }

  novoEvento(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  ngOnInit() {
    this.validation();
    this.getEventos();
  }

  filtraEventos(filtraPor: string): Evento[] {
    filtraPor = filtraPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtraPor) !== -1
      );
    }

    alternarImagem() {
      this.mostrarImagem = !this.mostrarImagem;
    }

    validation() {
      this.registerForm = this.fb.group({
         tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
         local: ['', Validators.required],
         dataEvento: ['', Validators.required],
         imagemURL: ['', Validators.required],
         qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
         telefone: ['', Validators.required],
         email: ['', [Validators.required, Validators.email]]
      });
    }

    salvarAlteracoes(template: any) {
      if (this.registerForm.valid) {
        if (this.modoSalvar === 'post') {
          this.evento = Object.assign({}, this.registerForm.value);
          this.eventoService.postEvento(this.evento).subscribe(
               (novoEvento: Evento) => {
                 template.hide();
                 this.getEventos();
               }, error => {
                 console.log(error);
               }
          );
        } else if(this.modoSalvar === 'put') {
          this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
          this.eventoService.putEvento(this.evento).subscribe(
               () => {
                 template.hide();
                 this.getEventos();
               }, error => {
                 console.log(error);
               }
          );
        }
      }
    }

    getEventos() {
      this.eventoService.getAllEvento().subscribe((_eventos: Evento[]) => {
        this.eventos = _eventos;
        this.eventosFiltrados = this.eventos;
        console.log(_eventos);
      }, error => {
        console.log(error);
      });
    }
  }