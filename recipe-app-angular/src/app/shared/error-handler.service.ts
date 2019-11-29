import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  errorSubject: Subject<any> = new Subject<any>();

  errorOccured(message: string) {
    this.errorSubject.next(message);
  }

  clearError() {
    this.errorSubject.next('');
  }

  constructor() { }
}
