import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, DoCheck } from '@angular/core';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent implements OnInit, OnChanges{

  private internaLoading;
  cssClass = '';

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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.internaLoading) {
      this.cssClass = 'overlay';
    } else {
      this.cssClass = '';
    }
  }
}
