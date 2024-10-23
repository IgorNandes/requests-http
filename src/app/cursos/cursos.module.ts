import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { CursosListaComponent } from './cursos-lista/cursos-lista.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CursosFormComponent } from './cursos-form/cursos-form.component';

@NgModule({
  declarations: [CursosListaComponent, CursosFormComponent],
  imports: [
    CommonModule,
    CursosRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class CursosModule { }
