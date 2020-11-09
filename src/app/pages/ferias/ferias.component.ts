import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TiendasService } from '../../services/tiendas.service';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ferias',
  templateUrl: './ferias.component.html',
  styleUrls: ['./ferias.component.css']
})
export class FeriasComponent implements OnInit {
  subscriptions:Subscription[]=[];
  products:any = [];
  productname:any = [];
  recursosar:any = [];
  url:any;
  product:any = [];
  getFerias:any = [];

  constructor(private tiendasService: TiendasService) { }

  ngOnInit(): void {
    this.getUrl();
  }

  getUrl(){
    console.log("entro");
    this.tiendasService
    .getFerias()
    .subscribe(resp =>{
      let i;
      for(i in resp){
        this.getFerias.push({
          "id":resp[i].id,
          "nombre":resp[i].nombre,
          "fechaInicio":resp[i].fechaInicio,
          "fechaFin":resp[i].fechaFin,
          "descripcion":resp[i].descripcion,
        })
        console.log(this.getFerias);
      }

    }
   );
  }

}
