import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

interface SideBarElemet{
  name: string,
  url: string,
  imgUrl: string
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  sideElements: SideBarElemet[] = [
    {
      name: 'Carga y limpieza de datos',
      url: '/profile/carga',
      imgUrl: '/assets/carga-icon.svg'
    },
    {
      name: 'Analítica descriptiva',
      url: '/profile/descriptiva',
      imgUrl: '/assets/descriptiva-icon.svg'
    },
    {
      name: 'Analítica diagnóstica',
      url: '/profile/diagnostica',
      imgUrl: '/assets/diagnostica-icon.svg'
    },
    {
      name: 'Analítica predictiva',
      url: '/profile/predictiva',
      imgUrl: '/assets/predictiva-icon.svg'
    },
    {
      name: 'Módulo práctico',
      url: '/profile/practico',
      imgUrl: '/assets/practico-icon.svg'
    },
  ]

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('UD_Token')
    this.router.navigateByUrl('/login')
  }

}
