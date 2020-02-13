import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../_models/Evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
    baseURL = 'http://localhost:5000/api/evento';
    tokenHeader: HttpHeaders;
constructor(private http: HttpClient) {
  this.tokenHeader = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('token')}`});
 }

  getAllEvento(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseURL, {headers: this.tokenHeader});
  }

  getEventoByTema(tema: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseURL}/getByTema/${tema}`);
  }

  getEventoById(id: number): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseURL}/${id}`);
  }

  postEvento(evento: Evento) {
    return this.http.post(this.baseURL, evento , {headers: this.tokenHeader});
  }

  postUpload(file: File, name: string) {
    const fileToUpload = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, name);

    return this.http.post(`${this.baseURL}/upload`, formData, {headers: this.tokenHeader});
  }

  putEvento(evento: Evento) {
    return this.http.put(`${this.baseURL}/${evento.id}`, evento);
  }

  deleteEvento(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
