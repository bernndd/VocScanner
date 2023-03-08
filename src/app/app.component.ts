import {Component} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {WebcamImage} from 'ngx-webcam';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) { }
  title = 'VocScanner';

  onFileSelected(event: Event):void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];
      console.log(file);
    }
  }

  private trigger = new Subject<void>();

  public webcamImage!: WebcamImage;
  private nextWebcam = new Subject<any>();

  captureImage = '';

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.captureImage = webcamImage!.imageAsDataUrl;
    console.info('received webcam image', this.captureImage);
  }

  public get triggerObservable(): Observable<any> {

    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<any> {

    return this.nextWebcam.asObservable();
  }
  public sendImageToServer(): void {
    const formData = new FormData();
    formData.append('image', this.captureImage); // Fügen Sie das aufgenommene oder hochgeladene Bild zur FormData hinzu
    this.http.post('http://localhost:8080/api/upload', formData).subscribe(response => {
      console.log('Image uploaded successfully!', response);
    }, error => {
      console.error('Error uploading image:', error);
    });

  }


}
