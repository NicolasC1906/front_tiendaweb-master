import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SalesService } from '../../../services/sales.service';
import { Subject, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
@Component({
  selector: 'app-home-ofertas',
  templateUrl: './home-ofertas.component.html',
  styleUrls: ['./home-ofertas.component.css']
})
export class HomeOfertasComponent implements OnInit {
  subscriptions:Subscription[]=[];
  products:any = [];
  productname:any = [];
  recursosar:any = [];
  url:any;
  product:any = [];
  getofertas:any = [];

  constructor(private SalesService: SalesService,
    private usuariosService: UsuariosService,
    private router: Router) { }

  ngOnInit(): void {
    this.getOferts();
  }

  getOferts(){
    this.SalesService
    .getData()
    .subscribe(resp =>{
      let i;
      for(i in resp){
        this.getofertas.push({

          "NombreProducto":resp[i].nombre,
          "Recursos": resp[i].Recursos[0]["url"],
          "Categoria": resp[i].Categoria.nombre,
          "NombreTienda":resp[i].NombreTienda,
          "price":resp[i].valor,
          "oferta":resp[i].oferta,
          "valorOferta":resp[i].valorOferta,
        })
        //console.log(this.getofertas);
      }
    }
   );
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
