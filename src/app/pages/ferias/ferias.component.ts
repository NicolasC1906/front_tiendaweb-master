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
import { timer } from 'rxjs';

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
  tiendas:any = [];
  id: any;
  _second = 1000;
  _minute = this._second * 60;
  _hour = this._minute * 60;
  _day = this._hour * 24;
  end: any;
  now: any;
  day: any;
  hours: any;
  minutes: any;
  seconds: any;
  source = timer(0, 1000);
  clock: any;
video:any = [];
  constructor(
    private CategoriesService: CategoriesService,
    private ProductsService: ProductsService,
    private salesService: SalesService,
    private usuariosService: UsuariosService,
    private tiendasService: TiendasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getActiva();
    this.getTienda();
    this.getproductsferia();
  }
  getActiva(){
    this.subscriptions.push(
    this.tiendasService
    .getFeriaActiva()
    .subscribe((r: any) => {
      this.id = r.id
      console.log(r.activa)
      if(r.activa == true){
        this.tiendas = r.tiendas
      this.getFerias.push({
        "nombre":r.nombre,
        "fechaInicio":r.fechaInicio,
        "fechaFin":r.fechaFin,
        "descripcion":r.descripcion,

      })
      this.getproductsferia()

      for(let i of this.tiendas){
        console.log(this.tiendas)
        if(this.tiendas[i].video === !null){
          console.log(this.tiendas.video)
          this.video.push({
            'url': this.tiendas.video,
            'id': this.tiendas.id
          })
        }else if(this.tiendas[i].video == !undefined){
          console.log(this.tiendas.video)
          this.video.push({
            'url': this.tiendas.video,
            'id': this.tiendas.id
          })

        }


      }

      }else{
        console.log("ponga aqui una variable con true y false y en el html oculta todo l ode historias y eso con el que da false y con el true un mensaje de no hay feria en estos momentos")
      }


    }

    ));
  }
  getproductsferia(){
    this.subscriptions.push(
      this.ProductsService
      .getDataFeriaID(this.id)
      .subscribe((r:any)=>{
        let i;
        for(i in r){
          this.getproducts.push({

            "NombreProducto":r[i].nombre,
            "Recursos": r[i].Recursos[0]["url"],
            "price":r[i].valor,
            "oferta":r[i].oferta,
            "valorOferta":r[i].valorOferta,
            "cantidad":r[i].cantidad,
            "descripcion":r[i].descripcion,
            "valorFeria":r[i].valorFeria,
          })
          console.log("Soy productos feria",this.getproducts);
        }
      }

      ));
    }
  showDate(){
    let distance = this.end - this.now;
    this.day = Math.floor(distance / this._day);
    this.hours = Math.floor((distance % this._day) / this._hour);
    this.minutes = Math.floor((distance % this._hour) / this._minute);
    this.seconds = Math.floor((distance % this._minute) / this._second);
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
        //console.log(this.getTiendas);
      }

    }
   );
  }



  storie(){
    let timerInterval
    Swal.fire({
      html:
        `<body>
          <video  width="1080" height="470" autoplay>
            <source src="https://firebasestorage.googleapis.com/v0/b/lamejorferia-32065.appspot.com/o/stories%2FWhatsApp%20Video%202020-11-01%20at%2010.05.45%20AM.mp4?alt=media&token=c1d3f1b6-bba5-4ffe-8b63-003227c837c0">
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
      timer:30000,
      confirmButtonText:'Ver Productos',
      timerProgressBar: true,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      width:1920,
      heightAuto:true
    })



  }


}
