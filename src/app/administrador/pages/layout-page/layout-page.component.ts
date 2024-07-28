import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css',
})

export class LayoutPageComponent {
openDialog(arg0: string,arg1: string) {
throw new Error('Method not implemented.');
}
  public sidebarItem=[
    {label:'Agencias', icon:'label', url:'./listage'},
    {label:'Listado', icon:'label', url:'./listado'},
    {label:'Paquetes/Itinerarios', icon:'label', url:'./listpaq'},
    {label:'Añadir Agencia', icon:'add', url:'./nuevoage'},
    // {label:'Buscar Agencia', icon:'search', url:'./buscarAge'},
    {label:'Añadir Paquete', icon:'add', url:'./nuevopaq'},
    // {label:'Buscar Paquete', icon:'search', url:'./buscarpaq'},
    {label:'Añadir Itinerario', icon:'add', url:'./nuevoiti'},
    // {label:'Buscar Itinerario', icon:'search', url:'./buscariti'},
    {label:'Añadir Hoteles', icon:'add', url:'./nuevo'},
    // {label:'Buscar Hoteles', icon:'search', url:'./buscar'},
    {label:'Añadir Restaurante', icon:'add', url:'./nuevores'},
    // {label:'Buscar Restaurantes', icon:'search', url:'./buscarres'},
    {label:'Añadir Experiencia', icon:'add', url:'./nuevoexp'},
    // {label:'Buscar Experiencia', icon:'search', url:'./buscarexp'},
  ]
}

