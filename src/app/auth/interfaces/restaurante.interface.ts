export interface Restaurante {
  id:string;
  nombre:string;
  categoria:string;
  tipologia:string;
  localizacion:string;
  descripcion:string;
  infraestructura:string;
  accesibilidad:string;
  servicio:string;
  costo:string;
  contacto:string;
  alt_img?:string;
  selected?: boolean; // Propiedad opcional para manejar la selección
}
