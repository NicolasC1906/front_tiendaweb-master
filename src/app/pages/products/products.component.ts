import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../../services/products.service';
import { Subject, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  subscriptions:Subscription[]=[];
  products:any = [];
  productname:any = [];
  recursosar:any = [];
  url:any;
  product:any = [];
  getproducts:any = [];
  price:any;
  recursos:any;
  banderaoffer:boolean;
  bandera:boolean;
  namebandera:any;
  constructor(private ProductsService: ProductsService,
              private usuariosService: UsuariosService,
              private router: Router) { }
  ngOnInit(): void {
    this.getUrl();
  }

  getProducts(){
    this.subscriptions.push(
    this.ProductsService.getData().subscribe((r) =>{
    this.products=r;
    console.log(r);
      })
    );
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
