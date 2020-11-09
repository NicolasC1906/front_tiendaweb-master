import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api, Register, Login, GetuserData } from '../config';
import { UserModel } from '../models/users.model';
import { ProductsService } from '../services/products.service';
import { Sweetalert } from '../functions';
import Swal from 'sweetalert2';

import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private api:string = Api.url;
  private register:string = Register.url;
  private login:string = Login.url;
  private getuserData:string = GetuserData.url;

  constructor(private http:HttpClient,
              private productsService:ProductsService) { }
/*=============================================
  Registo de usuarios
=============================================*/
      registerAuth(user: UserModel){
  return this.http.post(`${this.register}`, user);
  }
/*=============================================
  Login de usuarios
=============================================*/
  loginAuth(user: UserModel){
    return this.http.post(`${this.login}`, user);
}
  getDataByID(id){

    return this.http.get(`${this.api}usuario/${id}`);
  }
  getOrdesByID(id){

    return this.http.get(`${this.api}compras/usuario/${id}`);
  }
  getPedidoByID(id){

    return this.http.get(`${this.api}pedido/${id}`);
  }

/*=============================================
  validar IdToken de usuarios
=============================================*/
  authActivate(){

  		return new Promise(resolve=>{

			/*=============================================
	  		Validamos que el token sea real
	  		=============================================*/

	  		if(localStorage.getItem("token")){

                let body = {

                    token: localStorage.getItem('token')
                }


					/*=============================================
	  				Validamos fecha de expiración
	  				=============================================*/

	  				if(localStorage.getItem("expiresIn")){

	  					let expiresIn = Number(localStorage.getItem("expiresIn"));

	  					let expiresDate = new Date();
	  					expiresDate.setTime(expiresIn);

	  					if(expiresDate > new Date()){

	  						resolve(true)

	  					}else{

	  						localStorage.removeItem('token');
        					localStorage.removeItem('expiresIn');
	  						resolve(false)
	  					}

	  				}else{

	  					localStorage.removeItem('token');
    					localStorage.removeItem('expiresIn');
	  					resolve(false)

	  				}


        }
      })
  }

    // tslint:disable-next-line: typedef
    addShoppingCart(item){

      if (item.product['cantidad'] === '0'){
        Swal.fire({
          title: 'Error!',
          text: 'No hay disponibilidad!',
          icon: 'error',
          confirmButtonText: 'OK',
        });

      }else{
      let product = {

        'NombreProducto':item.product['NombreProducto'],
        'Recursos': item.product['Recursos'],
        'Categoria': item.product['Categoria'],
        'NombreTienda':item.product['NombreTienda'],
        'price':item.product['price'],
        'oferta': item.product['oferta'],
        'id': item.product['id'],
        'cantidad': item.product['cantidad'],

      }
      if(localStorage.getItem("list")){

        let arrayList = JSON.parse(localStorage.getItem("list"));

        /*=============================================
        Preguntar si el producto se repite
        =============================================*/

        let count = 0;
        let index;

        for(const i in arrayList){

            // tslint:disable-next-line: triple-equals
            if(arrayList[i].product.NombreProducto == item.product.NombreProducto){

                count --
                index = i;

            }else{

                count ++
            }

        }

        /*=============================================
        Validamos si el producto se repite
        =============================================*/

        if(count === arrayList.length){

            arrayList.push(item);

        }else{

            arrayList[index].unit += item["unit"];

        }

        localStorage.setItem("list", JSON.stringify(arrayList));
        Swal.fire({
                    title: '',
                    text: 'Producto Agregado al carrito',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#7BCC70',
                  })

    }else{

        let arrayList = [];

        arrayList.push(item);

        localStorage.setItem("list", JSON.stringify(arrayList));

        Swal.fire({
                    title: '',
                    text: 'Producto Agregado al carrito',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#7BCC70',
                  })

    }


    }


  }
  logout(){
    Swal.fire({
      title: '¿Estas seguro que desea cerrar sesion?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Cerrar Sesion!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('rol');
        localStorage.removeItem('IdRol');
        localStorage.removeItem('expiresIn');
        localStorage.removeItem('token');
        localStorage.removeItem('userdata');
        localStorage.removeItem('idUser');
        window.location.href = '/tienda'
      }
    });
    ;
  }
       /*=============================================
       Lista de paises
       =============================================*/
       getCountries(){

        return this.http.get('./assets/json/countries.json');

      }



}
