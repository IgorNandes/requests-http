import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveResarchRoutingModule } from './reactive-resarch-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LibSearchComponent } from './lib-search/lib-search.component';


@NgModule({
  declarations: [LibSearchComponent],
  imports: [
    CommonModule,
    ReactiveResarchRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ReactiveResarchModule { }
