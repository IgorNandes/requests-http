import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const appRoutes: Routes = [

    { path: '', pathMatch: 'full', redirectTo: 'busca-reativa' },
    { 
        path: 'cursos',
     loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule) 
    },
    { 
        path: 'upload',
        loadChildren: () => import('./upload-file/upload-file.module').then(m => m.UploadFileModule)
    },
    { 
        path: 'busca-reativa',
        loadChildren: () => import('./reactive-resarch/reactive-resarch.module').then(m => m.ReactiveResarchModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
