import { Injectable } from '@angular/core';
import { Curso } from './curso';
import { HttpClient } from '@angular/common/http';
import { Crudservice } from './guards/crud-service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Cursos2Service extends Crudservice<Curso> {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}cursos`);
   }
}
