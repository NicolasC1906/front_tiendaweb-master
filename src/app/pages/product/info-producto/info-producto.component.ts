import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../../../services/products.service';
import { CategoriesService } from '../../../services/categories.service';
import { Subject, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import { NgxSwiperConfig } from 'ngx-image-swiper';


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
  imagen:any = [];
  recursos:any = [];
  product:any = [];
  getproducts:any = [];
  getRecursos:Array<any> = [];

  images = [
    'https://firebasestorage.googleapis.com/v0/b/lamejorferia-32065.appspot.com/o/img%2Fproducto%20cleanblin-8.png?alt=media&token=d05f5bab-6a69-4b3c-8484-f688739fc1e0',
    'https://images.pexels.com/photos/2395264/pexels-photo-2395264.jpeg',
    'https://images.pexels.com/photos/2474014/pexels-photo-2474014.jpeg',
    'https://images.pexels.com/photos/2440296/pexels-photo-2440296.jpeg',
    'https://images.pexels.com/photos/2387869/pexels-photo-2387869.jpeg'
  ];

  swiperConfig: NgxSwiperConfig = {
    navigation: true,
    navigationPlacement: 'inside',
    pagination: true,
    paginationPlacement: 'outside'
  };

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
      this.recursos = r.Recursos
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
        "tags":r.tags,
        "porMayor":r.porMayor,
        "valorPorMayor":r.valorPorMayor,
        "caracteristicas":r.caracteristicas,
      })
      this.getImagen();

    }

    ));
  }

  getImagen(){

      let i;
      for(i in this.recursos){
        this.getRecursos.push({
          "url": this.recursos[i].url})
      }
      console.log(this.getRecursos)

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


  nav() {
    this.swiperConfig.navigation = !this.swiperConfig.navigation;
  }

  imgClicked(index: number) {
    console.log('imgClicked:', index);
  }
}

