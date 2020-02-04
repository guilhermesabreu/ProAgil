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

  titulo = 'Eventos';
  eventosFiltrados: Evento[];
  eventos: Evento[];
  evento: Evento;
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  _filtroLista: string;
  registerForm: FormGroup;
  modoSalvar = 'post';
  bodyDeletarEvento = '';
  file: File;
  dataAtual: string;
  fileNameToUpdate: string;

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
    this.evento = Object.assign({}, evento);
    this.fileNameToUpdate = evento.imagemURL.toString();
    this.evento.imagemURL = '';
    this.registerForm.patchValue(this.evento);
  }

  novoEvento(template: any) {
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  excluirEvento(evento: Evento, template: any) {
    this.openModal(template);
    this.evento = evento;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.id}`;
  }

  confirmeDelete(template: any) {
    this.eventoService.deleteEvento(this.evento.id).subscribe(
      () => {
        template.hide();
        this.getEventos();
      }, error => {
        console.log(error);
      }
    );
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

    onFileChange(event) {
      const reader = new FileReader();

      if (event.target.files && event.target.files.length) {
        this.file = event.target.files;
        console.log(this.file);
      }
    }

    uploadImagem() {
      if (this.modoSalvar === 'post') {
        const nomeArquivo = this.evento.imagemURL.split('\\', 3);
        this.evento.imagemURL = nomeArquivo[2];
        this.eventoService.postUpload(this.file, nomeArquivo[2])
        .subscribe(
            () => {
              this.dataAtual = new Date().getMilliseconds().toString();
              this.getEventos();
            }
        );
      }
      else {
        this.evento.imagemURL = this.fileNameToUpdate;
        this.eventoService.postUpload(this.file, this.fileNameToUpdate)
        .subscribe(
            () => {
              this.dataAtual = new Date().getMilliseconds().toString();
              this.getEventos();
            }
        );
      }
    }

    salvarAlteracoes(template: any) {
      if (this.registerForm.valid) {
        if (this.modoSalvar === 'post') {
          this.evento = Object.assign({}, this.registerForm.value);
          
          this.uploadImagem();
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

          this.uploadImagem();
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