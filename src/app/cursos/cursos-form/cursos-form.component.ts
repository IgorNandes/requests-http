import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosService } from '../cursos.service';
import { AlertModalService } from '../../shared/alert-modal.service';
import { ActivatedRoute } from '@angular/router';
import { delay, map, switchMap } from 'rxjs';
import { Location } from '@angular/common';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrl: './cursos-form.component.scss',
  preserveWhitespaces: true,
})
export class CursosFormComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    //private service: CursosService,
    private service: Cursos2Service,
    private modal: AlertModalService,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  ngOnInit() {
    // this.route.params
    // .pipe(
    //   map((params: any) => params['id']), //extrair o id da rota
    //   switchMap((id: any) => this.service.loadById(id)) //retorna um novo observable
    // )
    // .subscribe((curso: any) => this.updateForm(curso));
    const curso = this.route.snapshot.data['curso']; // foi resolvido pelo resolve
    // const hexadecimalNumber = "0x12345678";

    // curso.id = parseInt(hexadecimalNumber,16);

    if(curso.id === null){
      this.form = this.fb.group({
        //id: [curso.id],
        nome: [
          curso.nome,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(250),
          ],
        ],
      });
    }else{
      console.log("oioi")
      this.form = this.fb.group({
        id: [curso.id],
        nome: [
          curso.nome,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(250),
          ],
        ],
      });
    }
  }

  // updateForm(curso: any) {
  //   this.form.patchValue({
  //      id: curso.id,
  //      nome: curso.nome,
  //   });
  // }

  onSubmit() {
    this.submitted = true;
    console.log('1');
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');

      let msgSuccess = 'Curso criado com sucesso!';
      let msgError = 'Erro ao criar curso, tente novamente!';

      if (this.form.value.id) {
        msgSuccess = 'Curso alterado com sucesso!';
        msgError = 'Erro ao alterar o curso, tente novamente!';
      }

      this.service.save(this.form.value).subscribe({
        next: (value) => {
          this.modal.showAlertSuccess(msgSuccess),
          this.location.back();
        },
        error: (error) => this.modal.showAlertDanger(msgError),
        complete: () => console.log('complete')
      });

    //   if (this.form.value.id) {
    //     //update
    //     this.service.save(this.form.value).subscribe({
    //       next: (value) =>
    //         this.modal.showAlertSuccess('Curso alterado com sucesso!'),
    //       error: (error) =>
    //         this.modal.showAlertDanger('Erro ao alterar o curso!'),
    //       complete: () => console.log('complete'),
    //     });
    //   } else {
    //     //create
    //     console.log('2');
    //     this.service.save(this.form.value).subscribe({
    //       next: (value) =>
    //         this.modal.showAlertSuccess('Curso criado com sucesso!'),
    //       error: (error) =>
    //         this.modal.showAlertDanger('Erro ao criar o curso!'),
    //       complete: () => console.log('complete'),
    //     });
    //     this.location.back();
    //   }
    }
  }
  onCancel() {
    this.submitted = false;
    this.form.reset();
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }
}
