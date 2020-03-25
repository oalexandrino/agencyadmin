import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, DoCheck } from '@angular/core';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent implements OnInit{

  internaLoading;
  internalClass = '';

  constructor() { }

  ngOnInit(): void {
  }

  get loading(): any {
    return this.internaLoading;
  }

  @Input()
  set loading(val: any) {
    this.internaLoading = val;
  }

  get cssClass(): any {
    return this.internalClass;
  }

  @Input()
  set cssClass(val: any) {
    this.internalClass = val;
  }

}
