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
/// Traer Productos
getUrl(){
  this.salesService
  .getData()
  .subscribe(resp =>{
    let i;
    for(i in resp){
      this.getproducts.push({

        "NombreProducto":resp[i].nombre,
        "Recursos": resp[i].Recursos[0]["url"],
        "Categoria": resp[i].Categoria.nombre,
        "NombreTienda":resp[i].Tiendas.nombre,
        "price":resp[i].valor,
        "oferta":resp[i].oferta,
        "id":resp[i].id,
        "descripcion":resp[i].descripcion,
      })
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
