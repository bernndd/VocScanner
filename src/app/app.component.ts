import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'VocScanner';

  isShowDiv = false;

  toggleDisplayDiv(){
    this.isShowDiv = !this.isShowDiv;
  }

  private trigger: Subject<void> = new Subject();

  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();

  captureImage  = '';

  ngOnInit() {}

  /*------------------------------------------
    --------------------------------------------
    triggerSnapshot()
    --------------------------------------------
    --------------------------------------------*/
  public triggerSnapshot(): void {
    this.trigger.next();
  }

  /*------------------------------------------
  --------------------------------------------
  handleImage()
  --------------------------------------------
  --------------------------------------------*/
  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.captureImage = webcamImage!.imageAsDataUrl;
    console.info('received webcam image', this.captureImage);
  }

  /*------------------------------------------
    --------------------------------------------
    triggerObservable()
    --------------------------------------------
    --------------------------------------------*/
  public get triggerObservable(): Observable<any> {

    return this.trigger.asObservable();
  }

  /*------------------------------------------
  --------------------------------------------
  nextWebcamObservable()
  --------------------------------------------
  --------------------------------------------*/
  public get nextWebcamObservable(): Observable<any> {

    return this.nextWebcam.asObservable();
  }

}
