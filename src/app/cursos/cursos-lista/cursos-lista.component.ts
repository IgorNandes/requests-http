import { AlertModalService } from './../../shared/alert-modal.service';
import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso';
import { catchError, EMPTY, Observable, Subject, switchMap, take } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrl: './cursos-lista.component.scss',
  preserveWhitespaces: true,
})

export class CursosListaComponent implements OnInit {
    //bsModalRef?: BsModalRef;
  deleteModalRef?: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;

  cursos$: Observable<Curso[]> = new Observable<Curso[]>();
  error$ = new Subject<boolean>();

  
  cursoSelecionado?: Curso;



  constructor(
    //private service: CursosService,
    private service: Cursos2Service,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    // this.service.list()
    // .subscribe(dados => this.cursos = dados);
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.service.list().pipe(
      catchError((error) => {
        console.log(error);
        // this.error$.next(true);
        this.handleError();
        return [];
      })
    );

    // this.service.list().subscribe(
    //   dados => {
    //     console.log(dados);
    //   },
    //   error => console.error(error),
    //   () => console.log('Observable completo!')
    // );
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar cursos!');
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar cursos!';
  }

  onEdit(id: number) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }
  
  onDelete(curso: any) {
    this.cursoSelecionado = curso;
    //this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover esse curso?')
    result$.asObservable().pipe(
      take(1),
      switchMap(result => result ? this.service.remove(curso.id) : EMPTY)) // switchMap para retornar apenas um observable
      .subscribe({next: (value) => {
        this.onRefresh()
      },
      error: (error) => {
        this.alertService.showAlertDanger('Erro ao remover curso!')
      }
    });
  }

  OnConfirmDelete() {
    this.service.remove(this.cursoSelecionado?.id).subscribe({
      next: (value) => {
        this.onRefresh(),
        this.deleteModalRef?.hide();
      },
      error: (error) => {
        this.alertService.showAlertDanger('Erro ao remover curso!'),
        this.deleteModalRef?.hide();
      }
      }
    );
  }

  OnDeclineDelete() {
    this.deleteModalRef?.hide();
  }
}
