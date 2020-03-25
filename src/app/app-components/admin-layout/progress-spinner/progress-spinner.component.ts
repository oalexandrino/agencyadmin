import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, DoCheck } from '@angular/core';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent implements OnInit, OnChanges {

  private internaLoading: boolean;
  private internalShowMessage: boolean;
  private internalMessage = 'Please provide data';
  private internalTimeoutInterval = 1000;
  cssClass = '';

  constructor() { }

  ngOnInit(): void {
  }

  get timeoutInterval(): any {
    return this.internalTimeoutInterval;
  }

  @Input()
  set timeoutInterval(val: any) {
    this.internalTimeoutInterval = val;
  }

  get message(): any {
    return this.internalMessage;
  }

  @Input()
  set message(val: any) {
    this.internalMessage = val;
  }

  get showMessage(): any {
    return this.internalShowMessage;
  }

  @Input()
  set showMessage(val: any) {
    this.internalShowMessage = val;
  }

  get loading(): any {
    return this.internaLoading;
  }

  @Input()
  set loading(val: any) {
    this.internaLoading = val;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.loading) {
      if (this.loading) {
        this.cssClass = 'overlay';
      } else {
        this.cssClass = '';
      }
    }
  }

  resetStatus(parentComponent: any) {
    setTimeout(() => {
      parentComponent.showMessage = false;
      parentComponent.loading = false;
    }, parentComponent.timeoutInterval);
  }
}
