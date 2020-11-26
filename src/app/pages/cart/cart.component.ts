import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';
import { from, Subject, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


declare var JQuery:any;
declare var $:any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: []
})
export class CartComponent implements  OnInit, OnDestroy  {
    shoppingCart:any[] = [];
    totalShoppingCart:number = 0;
    render:boolean = true;
    total:string= `<h5><strong class="totalHeader"><div class="spinner-border"></div></strong></h5>`;

    dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger = new Subject();
    popoverMessage:string = 'Are you sure to remove it?';
    renderShopping: boolean = true;

  constructor(
              private categoriesService: CategoriesService,
              private productsService: ProductsService,
              private usuariosService: UsuariosService,
              private router:Router) { }

  ngOnInit(): void {
    /*=============================================
  	Agregamos opciones a DataTable
  	=============================================*/
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
      /*=============================================
      Tomamos la data del Carrito de Compras del LocalStorage
      =============================================*/

      if(localStorage.getItem('list')){

        let list = JSON.parse(localStorage.getItem('list'));
        this.totalShoppingCart = list.length;
        console.log("CartComponent -> ngOnInit -> list", list)
        /*=============================================
        Recorremos el arreglo del listado
        =============================================*/ 
        let load = 0;
        for (const i in list){
          load++;
              this.shoppingCart.push({
              NombreProducto:list[i].product['NombreProducto'],
              Recursos:list[i].product['Recursos'],
              Categoria:list[i].product['Categoria'],
              NombreTienda:list[i].product['NombreTienda'],
              price:list[i].product['price'],
              oferta:list[i].product['oferta'],
              id:list[i].product['id'],
              cantidad:list[i].product['cantidad'],
              unit:list[i].unit,
          });
          //console.log('shoppingCart', this.shoppingCart)
          if(load == list.length){

            this.dtTrigger.next();
          }
        }
      }
  }
    callbackShopping(){
        if(this.renderShopping){
          this.renderShopping = false;
          /*=============================================
          Sumar valores para valores totales
          =============================================*/
          let totalProducts = $(".Pfroducts");
          setTimeout(function(){
          let price = $(".pShoppingHeader");
          let quantity = $(".qShoppingHeader");
          let subTotalPrice = $(".subTotalPrice");
          let shipping = 0;
          let totalPrice = 0;

          for(let i = 0; i < price.length; i++){
              /*=============================================
                Sumar precio final
                =============================================*/
                let shipping_price = Number($(price[i]).html()) + Number(shipping);
                /*=============================================
                  Multiplicar cantidad por precio con envío
                  =============================================*/
				          let subTotal =Number($(price[i]).html()) * Number($(quantity[i]).html());
                  /*=============================================
                  Mostramos subtotales de cada producto
                  =============================================*/
                  $(subTotalPrice[i]).html(`$${subTotal.toFixed(2)}`)

                totalPrice += Number($(quantity[i]).html() * shipping_price)


          }

         $(".totalHeader").html(`$${totalPrice}`)

        },totalProducts.length * 500)
        }
    }

    removeProduct(product){

      if(localStorage.getItem("list")){

              let shoppingCart = JSON.parse(localStorage.getItem("list"));

              shoppingCart.forEach((list, index)=>{

                if(list.product['NombreProducto'] == product){
                  shoppingCart.splice(index, 1);

                }
              });
            //console.log("shoppingCart", shoppingCart);
            /*=============================================
            Actualizamos en LocalStorage la lista del carrito de compras
            =============================================*/
            localStorage.setItem("list", JSON.stringify(shoppingCart));
            let self = this;
              Swal.fire({
                         title: '¿Estas seguro que desea eliminar producto?',
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                          confirmButtonText: 'Si, eliminar!',
                          cancelButtonText: 'Cancelar',
                      }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });

      }
    }
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
}

