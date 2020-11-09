import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TiendasService } from '../../services/tiendas.service';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css'],
  providers: [NgbRatingConfig]
})
export class TiendasComponent implements OnInit {

  subscriptions:Subscription[]=[];
  products:any = [];
  productname:any = [];
  recursosar:any = [];
  url:any;
  product:any = [];
  getTiendas:any = [];
  currentRate = 8;

  constructor(private tiendasService: TiendasService,config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.getUrl();
  }

  getUrl(){
    this.tiendasService
    .getData()
    .subscribe(resp =>{
      let i;
      for(i in resp){
        this.getTiendas.push({

          "nombre":resp[i].nombre,
          "direccion": resp[i].direccion,
          "descripcion":resp[i].descripcion,
          "calificacion":resp[i].calificacion,
        })
        console.log(this.getTiendas);
      }

    }
   );
  }

}
