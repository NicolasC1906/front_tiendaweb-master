import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../../../services/products.service';
import { CategoriesService } from '../../../services/categories.service';
import { Subject, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';


@Component({
  selector: 'app-info-producto',
  templateUrl: './info-producto.component.html',
  styleUrls: ['./info-producto.component.css']
})
export class InfoProductoComponent implements OnInit {
  subscriptions:Subscription[]=[];
  products:any = [];
  productname:any = [];
  recursosar:any = [];
  id:any;
  product:any = [];
  getproducts:any = [];

  constructor(
    private ProductsService: ProductsService,
    private ActivatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService,
    private router: Router) {
    this.id= this.ActivatedRoute.snapshot.paramMap.get('id')
   }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo(){
    //console.log(t his.id);
    this.subscriptions.push(
    this.ProductsService
    .getDataByID(this.id)
    .subscribe((r: any) => {
      this.products.push({
         "id":r.id,
        "NombreProducto":r.nombre,
        "IdCategoria":r.IdCategoria,
        "descripcion":r.descripcion,
        "price":r.valor,
        "cantidad":r.cantidad,
        "oferta":r.valorOferta,
        "Categoria":r.Categoria["nombre"],
        "idCategoria":r.Categoria["id"],
        "Recursos":r.Recursos[0]["url"],
        "IdTienda":r.IdTienda,
        "NombreTienda":r.NombreTienda,
      })
      console.log(this.products);
    }

    ));
  }

  addShoppingCart(producto, cantidad){

    let url = this.router.url;
    //console.log("url", url);

    let item = {

      product: producto,
      unit: cantidad,
      url: url
    }
    console.log("item", item);
    this.usuariosService.addShoppingCart(item);
  }
}

