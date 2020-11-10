import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../../services/products.service';
import { SalesService } from '../../services/sales.service';
import { CategoriesService } from '../../services/categories.service';
import { from, Subject, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TiendasService } from '../../services/tiendas.service';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';
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
  getCategorias:any = [];
  getproducts:any = [ ];
  getTiendas:any = [];
  currentRate = 8;

  constructor(
    private CategoriesService: CategoriesService,
    private ProductsService: ProductsService,
    private salesService: SalesService,
    private usuariosService: UsuariosService,
    private tiendasService: TiendasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUrl();
    this.getTienda();
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

  getTienda(){
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

  storie(){
    let timerInterval
    Swal.fire({
      html:
    `<body>
    <video width="320" height="240" autoplay>
    <source src="https://lamejorferia.000webhostapp.com/Naturaleza_%20windows%207%20v%C3%ADdeo%20de%20muestra..mp4">
    Your browser does not support the video tag.
  </video>
        </body>`,
        background: 'rgba(0,0,23,0.4)',
        backdrop: `
                    rgba(0,0,46, 78, 255)
                    left top
                    no-repeat
                  `,
      showConfirmButton:true,
      timer: 2000,
      confirmButtonText:'Ver Productos',
      timerProgressBar: true,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      width:720,
    })



  }


}
