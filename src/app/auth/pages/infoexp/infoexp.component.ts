import { Component, OnInit } from '@angular/core';
import { Experiencia } from '../../interfaces/experiencia.interface';
import { ExperienciasService } from '../../services/experiencias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-infoexp',
  templateUrl: './infoexp.component.html',
  styles: ``
})
export class InfoexpComponent implements OnInit{
  public experiencia?: Experiencia;
  constructor(
    private experienciasService:ExperienciasService,
    private activateRoute: ActivatedRoute,
    private router:Router,
  ){}
    ngOnInit(): void {
      this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.experienciasService.getExperienciaById(id) ),
      )
      .subscribe( experiencia => {
        if ( !experiencia) return this.router.navigate(['/auth/experiencias']);

        this.experiencia = experiencia;
        console.log(experiencia);
        return;
      })
  }
  goBack():void{
    this.router.navigateByUrl('auth/experiencias')
  }

}
