import { Component, OnInit } from '@angular/core';
import { RestaurantesService } from '../../services/restaurante.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { Restaurante } from '../../interfaces/restaurante.interface';
import { filter, switchMap, tap } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-nuevores',
  templateUrl: './nuevores.component.html',
  styles: ``
})
export class NuevoresComponent implements OnInit{
  //formulario reactivo
  public restauranteForm = new FormGroup({
    id: new FormControl<string>(''),
    nombre: new FormControl<string>(''),
    categoria: new FormControl<string>(''),
    tipologia: new FormControl<string>(''),
    localizacion: new FormControl<string>(''),
    descripcion: new FormControl<string>(''),
    infraestructura: new FormControl<string>(''),
    accesibilidad: new FormControl<string>(''),
    servicio: new FormControl<string>(''),
    costo: new FormControl<string>(''),
    contacto: new FormControl<string>(''),
    alt_img: new FormControl<string>(''),
  });
  constructor(
    private restaurantesService: RestaurantesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ){}

  get currentRestaurante():Restaurante{
    const restaurante = this.restauranteForm.value as Restaurante;
    return restaurante;
  }

  ngOnInit():void {

    if (!this.router.url.includes('editarres') ) return;

    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.restaurantesService.getRestauranteById( id) ),
    ).subscribe(restaurante =>{

      if ( !restaurante ) {
        return this.router.navigateByUrl('/');
      }
      this.restauranteForm.reset( restaurante );
      return;
    });

  }
  onSubmit():void {
    if ( this.restauranteForm.invalid ) return;
    if ( this.currentRestaurante.id) {
      this.restaurantesService.updateRestaurante( this.currentRestaurante )
      .subscribe( restaurante => {
        this.showSnackbar(`${ restaurante.nombre } updated`);
      } );
      return;
    }
    this.restaurantesService.addRestaurante( this.currentRestaurante )
    .subscribe( restaurante => {
      // TODO: mostrar snackbar y navegar a administrador/editar/hotel.id
      this.router.navigate(['/administrador/editarres', restaurante.id]);
      this.showSnackbar(`${ restaurante.nombre } created`);
    });

  }
  showSnackbar(message: string ):void{
    this.snackbar.open( message, 'done',{
      duration: 2500,
    })
  }
  onDeleteRestaurante(){
    if ( !this.currentRestaurante.id ) throw Error('Restaurante id es required')
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data:this.restauranteForm.value
      });

      dialogRef.afterClosed()
       .pipe(
        filter((result: boolean) => result),
        switchMap( () => this.restaurantesService.deleteRestauranteById( this.currentRestaurante.id)),
        tap( wasDeleted => console.log({ wasDeleted})),
       )
       .subscribe(result =>{
          this.router.navigate(['/restaurantes'])
       })
  }

}


