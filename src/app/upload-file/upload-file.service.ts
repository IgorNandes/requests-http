import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observeNotification } from 'rxjs/internal/Notification';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }
  
  upload(files: Set<File>, url: string) {

    const formData = new FormData();
    files.forEach(file => formData.append('file', file, file.name));
    // const request = new HttpRequest('POST', url, formData);
    // return this.HttpClient.request(request); //equivalente a request

     return this.http.post(url, formData, {
      observe: 'events',
      reportProgress: true
  }); 
  }

  download(url: string) {
    return this.http.get(url, {
      responseType: 'blob' as 'json' //blob = tipo de arquivo que vai ser baixado
    }); 
  }

  handleFile(res: any, fileName: string) {
    const file = new Blob([res], {
      type: res.type // 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    // IE
    if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
      (window.navigator as any).msSaveOrOpenBlob(file);
      return;
    }

    const blob = window.URL.createObjectURL(file); // 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,'

    const link = document.createElement('a'); // <a href="data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,"></a>
    link.href = blob;
    link.download = fileName;

    // link.click();
    link.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    }));

    setTimeout(() => { // firefox
      window.URL.revokeObjectURL(blob);
      link.remove();
    }, 100);
  }
}
