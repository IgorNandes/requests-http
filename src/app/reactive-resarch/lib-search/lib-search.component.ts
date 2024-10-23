import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrl: './lib-search.component.scss'
})
export class LibSearchComponent implements OnInit {

  queryField = new FormControl();
  total?: number;
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  results$?: Observable<any>;
  readonly FIELDS = 'name,description,version,homepage';

  constructor(private http : HttpClient) { }

  ngOnInit() {
    this.results$ = this.queryField.valueChanges //mudando o valor do input
    .pipe(
      map(value => value.trim()), //removendo espaços para nao fazer chamadas
      filter(value => value.length > 1), //filtra se o valor tem mais de 1 caractere
      debounceTime(200), //espera 200ms para a proxima chamada, tempo de escrita
      distinctUntilChanged(), //busca só quando o valor mudar
      // tap(value => console.log(value)),
      switchMap(value => this.http.get(this.SEARCH_URL, {
        params: {
          search: value,
          fields: this.FIELDS
        }
      })),
      tap((res: any) => this.total = res.total),
      map((res: any) => res.results)
    );
  }

  onSearch() {
    console.log(this.queryField.value);

    this.results$ = this.http.get(this.SEARCH_URL, {
      params: {
        search: this.queryField.value,
        fields: this.FIELDS
      }
    })
    .pipe(
      tap((res: any) => this.total = res.total),
      map((res: any) => res.results)
    );
  }

}
