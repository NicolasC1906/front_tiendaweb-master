import { Component, OnInit } from '@angular/core';

import { NgForm, FormGroup, FormBuilder, FormControl, Validator, Validators } from '@angular/forms';

import { from } from 'rxjs';
import { Router } from '@angular/router';
import { UserModel } from '../../models/users.model';
import { UsuariosService } from '../../services/usuarios.service';
import { Subscription } from 'rxjs/internal/Subscription';
import Swal from 'sweetalert2';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  user: UserModel;
  id:string = null;
  users:any = [];
  subscriptions:Subscription[]=[];
  countries:any=null;
  dialCode:string = null;
  shoppingCart:any[] = [];
  render:boolean = true;
  totalShoppingCart:number = 0;
  total:string= `<h5><strong class="totalHeader"><div class="spinner-border"></div></strong></h5>`;
  dtOptions: DataTables.Settings = {};
  renderShopping: boolean = true;
  form: FormGroup;
  productos:any = [];
  telefono:any = [];
  comprador:any = [];
  identificacion:any = [];
  direccion:any = [];
  preferencia:any = [];
  preferencias:any;
  urlMP:any;


  constructor(private router:Router,
              private usuariosService:UsuariosService,
              private formBuilder:FormBuilder,
              private salesService: SalesService) {
    this.user = new UserModel();
    this.buildForm();
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      processing: true
    };
    this.getInfo();
    /*==========================================
      Validar si el existe usuario autenticado
    ==========================================*/
    if(localStorage.getItem("id")){
      this.id = localStorage.getItem("id")
      this.getInfo();
    }else{
      localStorage.removeItem("expiresIn")
      localStorage.removeItem("id")
      localStorage.removeItem("token")
      window.location.href = '/login'
    }
    /*==========================================
      Traer lista del carrito de compras
    ==========================================*/
    if(localStorage.getItem("list")){
      let list = JSON.parse(localStorage.getItem("list"));
      if(list.length == 0){
        this.router.navigateByUrl("/cart");
        return;
      }
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
        }

    }else{
      this.router.navigateByUrl("/cart");
      return;
    }
  }

          getInfo(){
            //console.log(this.id);
            this.subscriptions.push(
            this.usuariosService
            .getDataByID(this.id)
            .subscribe((r: any) => {
                    this.user.nombre = r.nombre;
                    this.user.apellido = r.apellido;
                    this.user.correo = r.correo;
                    this.user.direccion = r.direccion;
                    this.user.telefono = r.telefono;
                    this.user.createdAt = r.createdAt
            }));
          }
  onSubmit(f: NgForm) {};
      /*=============================================
      Sumar valores
      =============================================*/
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

                  totalPrice += Number($(quantity[i]).html()) * shipping_price
            }
                      $(".totalHeader").html(`$${totalPrice}`)

          },totalProducts.length * 500)
        }
      }

        /*=============================================
              Formulario
        =============================================*/
        private buildForm() {
            this.form = this.formBuilder.group({
              company: ['',  [Validators.required]],
              pais: ['', [Validators.required]],
              add1: ['', [Validators.required]],
              dni: ['', [Validators.required]],
              typeid: ['', [Validators.required]],
              message: ['', [Validators.required, Validators.maxLength(200)]],
              city: ['', [Validators.required]],
              zip: ['', [Validators.required]],
              telefono: ['', [Validators.required]],
              cupon: ['', [Validators.required]],
            });
        }
        save(event: Event) {
          event.preventDefault();
          const value = this.form.value;
          console.log(value);
          console.log(this.user)

          this.identificacion.push({
            'tipo': 'CC',
            'numero': value.dni

          });
          this.telefono.push({
            'codigoArea':"",
            'numero':value.telefono
          })
          this.direccion.push({
            'direccion': value.add1,
            'codigoPostal': value.zip
          });

          this.comprador.push({
            'nombre': this.user.nombre,
            'apellido': this.user.apellido,
            'correo': this.user.correo,
            'fechaCreacion':this.user.createdAt,
            'telefono': this.telefono[0],
            'identificacion': this.identificacion[0],
            'direccion': this.direccion[0],

          });
          let list = JSON.parse(localStorage.getItem("list"));
          if(list.length == 0){
            this.router.navigateByUrl("/cart");
            return;
          }
          /*=============================================
            Recorremos el arreglo del listado
            =============================================*/
            let load = 0;
            for (const i in list){
              load++;
                  this.productos.push({
                  'id': list[i].product['id'],
                  'cantidad':list[i].unit,

              });
            }

            this.preferencia.push({
              'idTienda': 64,
              'esMovil' : true,
              'productos': this.productos,
              'comprador': this.comprador[0],
            });
            console.log(this.preferencia[0])


            this.salesService
            .preference(this.preferencia[0])
            .subscribe((r: any) => {

              this.urlMP = r.init_point;
              console.log(this.urlMP);
              let timerInterval

              Swal.fire({
                title: 'Excelente',
                html: 'Redirigiendo a Mercado Pago',
                timer: 2000,
                timerProgressBar: true,
                willOpen: () => {
                  Swal.showLoading()
                  timerInterval = setInterval(() => {

                  }, 100)
                },
                onClose: () => {
                  window.open(this.urlMP);
                }
              }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                  console.log(this.urlMP);
                  // localStorage.removeItem('list');
                }
              })


            })//no borrar





        }


}

