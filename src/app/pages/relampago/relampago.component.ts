import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../../services/products.service';
import { SalesService } from '../../services/sales.service';
import { CategoriesService } from '../../services/categories.service';
import { from, Subject, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-relampago',
  templateUrl: './relampago.component.html',
  styleUrls: ['./relampago.component.css']
})
export class RelampagoComponent implements OnInit {

  getCategorias:any = [];
  getproducts:any = [ ];
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
  subscriptions:Subscription[]=[];
  products:any = [];
  productname:any = [];
  recursosar:any = [];
  url:any;
  product:any = [];
  price:any;
  banderaoffer:boolean;
  bandera:boolean;
  namebandera:any;
  recursos:any;

  constructor(
    private CategoriesService: CategoriesService,
    private ProductsService: ProductsService,
    private salesService: SalesService,
    private usuariosService: UsuariosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUrl();
    this.clock = this.source.subscribe(t => {
      this.now = new Date();
      this.end = new Date('01/01/' + (this.now.getFullYear() + 1) +' 00:00');
      this.showDate();
    });
  }
  getproductrecurso() {
    this.subscriptions.push(
      this.ProductsService
      .getData()
      .subscribe((r: any) => {
        this.products = r;
        for (let product of this.products ){
          this.productname = product.nombre;
          this.recursosar = product.Categoria;
          console.log(this.recursosar);
        }
      })
    );
  }
  /// Traer Productos
  getUrl(){
    this.ProductsService
    .getData()
    .subscribe(resp =>{
      let i;
      for(i in resp){
        if(resp[i].feria === true){
          this.price = resp[i].valorFeria
          this.bandera = true;
          this.banderaoffer= true;
          this.namebandera = "En Feria"

        }else if(resp[i].oferta === true){
          this.price = resp[i].valorOferta
          this.bandera = true;
          this.banderaoffer= false;
          this.namebandera = "Oferta"

        }else{
          this.price = resp[i].valor
          this.bandera = false;
          this.banderaoffer= false;
          this.namebandera = "productonormal"


        }
        // recursos
        if(resp[i].Recursos == 0){
          console.log("entro")
          this.recursos = 'assets/img/front/nofoto.png';

        }else{
          this.recursos = resp[i].Recursos[0]["url"]

        }
        this.getproducts.push({

          "NombreProducto":resp[i].nombre,
          "Recursos": this.recursos,
          "Categoria": resp[i].Categoria.nombre,
          "NombreTienda":resp[i].NombreTienda,
          "bandera":this.bandera,
          "banderaoffer":this.banderaoffer,
          "namebandera":this.namebandera,
          "price":this.price,
          "oferta":resp[i].oferta,
          "id":resp[i].id,
        })
        console.log(this.getproducts)
      }

    }
   );
  }
showDate(){
  let distance = this.end - this.now;
  this.day = Math.floor(distance / this._day);
  this.hours = Math.floor((distance % this._day) / this._hour);
  this.minutes = Math.floor((distance % this._hour) / this._minute);
  this.seconds = Math.floor((distance % this._minute) / this._second);
}
addShoppingCart(producto, cantidad){

  let url = this.router.url;
  //console.log("url", url);

  let item = {

    product: producto,
    unit: cantidad,
    url: url
  }
  //console.log("item", item);
  this.usuariosService.addShoppingCart(item);
}
}
