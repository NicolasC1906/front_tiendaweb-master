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

@Component({
  selector: 'app-feria',
  templateUrl: './feria.component.html',
  styleUrls: ['./feria.component.css']
})
export class FeriaComponent implements OnInit {
  getCategorias:any = [];
  getproducts:any = [ ];
  subscriptions:Subscription[]=[];
  products:any = [];
  productname:any = [];
  recursosar:any = [];
  url:any;
  product:any = [];
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
