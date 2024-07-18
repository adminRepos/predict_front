import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, OnDestroy {

  @Input() textLoading = '';

  constructor() {
    document.body.style.height = "100vh";
    document.body.style.overflowY = "hidden";
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    document.body.style.height = "auto";
    document.body.style.overflowY = "visible";
  }

}
