import { Component } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { filterResponse, uploadProgress } from '../../shared/rxjs-operators';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss'
})
export class UploadFileComponent {

  files: Set<File> = new Set(); //evita arquivos duplicados

  progress: number = 0;
  constructor(private service: UploadFileService) {

  }

  ngOnInit() {
  }

  onFileChange(event:any) {
      const selectedFiles = <FileList>event.srcElement.files;
      const customFileElement = document.getElementById('customFile');

      // if (customFileElement) {
      //   customFileElement.innerHTML = selectedFiles[0].name;
      // }

      const fileNames = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        fileNames.push(selectedFiles[i].name);
        this.files.add(selectedFiles[i]);
      }

      if (customFileElement) {
        customFileElement.innerHTML = fileNames.join(', ');
        this.progress = 0;
      }
  }

  onUploadFile() {
    if(this.files && this.files.size > 0) {
      this.service.upload(this.files, environment.BASE_URL + '/upload')
      .pipe(
        uploadProgress(progress => {
          console.log(progress);
          this.progress = progress;
        }),
        filterResponse()
      )
      .subscribe(response => console.log('Upload Concluído'));
      // .subscribe((event: HttpEvent<Object>)=>{
        //HttpEventType
      //   console.log(event);
      //   if(event.type == HttpEventType.Response){
      //     console.log("response concluido")
      //   }
      //   else if(event.type == HttpEventType.UploadProgress){
      //     const percentDone = Math.round((100 * event.loaded) / (event.total ?? 0));
      //     console.log('Progresso', percentDone); 
      //     this.progress = percentDone;
      //   }
      // } );
    }
  }

  onDownloadExcel() {
    this.service.download(environment.BASE_URL + '/downloadExcel')
    .subscribe((res:any) => (res: any) => {
      this.service.handleFile(res, 'report.xlsx');
    });
    }

  onDownloadPDF() {
    this.service.download(environment.BASE_URL + '/downloadPDF')
    .subscribe((res:any) => (res: any) => {
      this.service.handleFile(res, 'report.pdf');
    });
  }

}
