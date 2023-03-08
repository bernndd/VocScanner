import {Component} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {WebcamImage} from 'ngx-webcam';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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

}
