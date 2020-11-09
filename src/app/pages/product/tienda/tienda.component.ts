import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../../../services/products.service';
import { CategoriesService } from '../../../services/categories.service';
import { from, Subject, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  getCategorias:any = [];
  getproducts:any = [ ];

  constructor(
    private CategoriesService: CategoriesService,
    private ProductsService: ProductsService,
    private usuariosService: UsuariosService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCategories();
    this.getUrl();
  }

   /// Traer categorias Y subcategorias
   getCategories(){
    this.CategoriesService
    .getData()
    .subscribe((r: any) => {
      this.getCategorias = r;

        });
    console.log(this.getCategorias);
      }




   /// Traer Productos
   // tslint:disable-next-line: typedef
   getUrl(){
    this.ProductsService
    .getData()
    .subscribe(resp =>{
      let i;
      for(i in resp){
        this.getproducts.push({

          "NombreProducto":resp[i].nombre,
          "Recursos": resp[i].Recursos[0]["url"],
          "Categoria": resp[i].Categoria.nombre,
          "NombreTienda":resp[i].NombreTienda,
          "price":resp[i].valor,
          "oferta":resp[i].oferta,
          "id":resp[i].id,
          "cantidad":resp[i].cantidad,
        })
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
    console.log("item", item);
    this.usuariosService.addShoppingCart(item);
  }

}
