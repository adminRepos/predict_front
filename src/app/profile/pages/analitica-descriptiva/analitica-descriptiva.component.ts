import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-analitica-descriptiva',
  templateUrl: './analitica-descriptiva.component.html',
  styleUrls: ['./analitica-descriptiva.component.css']
})
export class AnaliticaDescriptivaComponent implements OnInit {

  // danger_url = 'https://app.powerbi.com/view?r=eyJrIjoiYWMwYWZjZTEtMWY1ZS00YjM1LWE0MmQtNGMyNmRiODU4NTJlIiwidCI6IjUwNjQwNTg0LTJhNDAtNDIxNi1hODRiLTliM2VlMGYzZjZjZiIsImMiOjR9'
  danger_url = 'https://app.powerbi.com/view?r=eyJrIjoiYmUxOTg2YjEtZTFjMi00MzE4LTk3YmItZjkwZjcyOGRkNjJlIiwidCI6Ijc3ZjZhZGYxLWM3ZWQtNDg1Ni05MmZlLTYyOTI4M2M1MGNiYiIsImMiOjR9'
  URL:SafeUrl = ''

  constructor(private sanitizer: DomSanitizer) {
    this.URL = sanitizer.bypassSecurityTrustResourceUrl(this.danger_url)
  }

  ngOnInit(): void {
  }

}
