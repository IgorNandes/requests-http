import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, ResolveFn } from '@angular/router';
import { delay, Observable, of } from 'rxjs';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso';

// type CursoEditOrNewTypes = {
//   id: number|null;
//   nome: string|null;
// }

export const CursoResolverGuard:ResolveFn<Curso> | Observable<Curso> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

    if (route.params && route.params['id']) {
      const curso = inject(CursosService).loadById(route.params['id']);
      return (curso);
    }

    return of({
      id: null,
      nome: null
    });
  };
