import { HttpClient } from "@angular/common/http";
import { delay, take, tap } from "rxjs";

export class Crudservice<T> {
    constructor(protected http: HttpClient, private API_URL: string) {}

    list() {
        return this.http.get<T[]>(this.API_URL)
        .pipe(
          delay(2000),
          tap(console.log) //o pipe vai debuggar
        );
      }
    
      loadById(id: number) {
        return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
      }
    
      private create(record: T){
        console.log('3');
        return this.http.post(this.API_URL, record).pipe(take(1));
      }
    
      private update(record: any){
        return this.http.put(`${this.API_URL}/${record.id}`, record).pipe(take(1));
      }
    
      save(record: any){
        if(record.id){
          return this.update(record);
        }
        return this.create(record);
      }
    
      remove(id: any){
        return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
      }
}