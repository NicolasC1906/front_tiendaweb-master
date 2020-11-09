import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Path } from '../../config';

import { CategoriesService } from '../../services/categories.service';
import { SubCategoriesService } from '../../services/sub-categories.service';
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute } from '@angular/router';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	path:String = Path.url;
	categories:Object = null;
	arrayTitleList:Array<any> = [];
	render:Boolean = true;
  idUser:any;
  Loguio:boolean;
  inicio:boolean;
  iniciar:boolean;
  perfil:boolean;
  users:any = [];
  subscriptions:Subscription[]=[];
  id:any;
  nombre: any;
  apellido: any;
  constructor(private categoriesService: CategoriesService,
    private subCategoriesService: SubCategoriesService,
    private usuariosService: UsuariosService,
    private ActivatedRoute: ActivatedRoute,) { }

	ngOnInit(): void {

    if(localStorage.getItem('token')){
      this.iniciar = false;
      this.perfil = true;

    }else{
      this.iniciar = true;
      this.perfil = false;
    }

    this.idUser = localStorage.getItem('id');
		/*=============================================
		Tomamos la data de las categorías
		=============================================*/

		this.categoriesService.getData()
		.subscribe(resp => {

			this.categories = resp;

			/*=============================================
			Recorremos la colección de categorías para tomar la lista de títulos
			=============================================*/

			let i;

			for(i in resp){

				/*=============================================
				Separamos la lista de títulos en índices de un array
				=============================================*/

				this.arrayTitleList.push(JSON.parse(resp[i].title_list));

			}

    })

    this.getInfo();

	}

	/*=============================================
	Función que nos avisa cuando finaliza el renderizado de Angular
	=============================================*/

	callback(){

		if(this.render){

			this.render = false;
			let arraySubCategories = [];

			/*=============================================
			Hacemos un recorrido por la lista de títulos
			=============================================*/

			this.arrayTitleList.forEach(titleList =>{

				/*=============================================
				Separar individualmente los títulos
				=============================================*/

				for(let i = 0; i < titleList.length; i++){

					/*=============================================
					Tomamos la colección de las sub-categorías filtrando con la lista de títulos
					=============================================*/

					this.subCategoriesService.getFilterData("title_list", titleList[i])
					.subscribe(resp =>{

						arraySubCategories.push(resp);

						/*=============================================
						Hacemos un recorrido por la colección general de subcategorias
						=============================================*/

						let f;
						let g;
						let arrayTitleName = [];

						for(f in arraySubCategories){

							/*=============================================
							Hacemos un recorrido por la colección particular de subcategorias
							=============================================*/

							for(g in arraySubCategories[f]){

								/*=============================================
								Creamos un nuevo array de objetos clasificando cada subcategoría con la respectiva lista de título a la que pertenece
								=============================================*/

								arrayTitleName.push({

									"titleList": arraySubCategories[f][g].title_list,
									"subcategory": arraySubCategories[f][g].name,
									"url": arraySubCategories[f][g].url,

								})

							}

						}

						/*=============================================
						Recorremos el array de objetos nuevo para buscar coincidencias con las listas de título
						=============================================*/

						for(f in arrayTitleName){

							if(titleList[i] == arrayTitleName[f].titleList){

								/*=============================================
								Imprimir el nombre de subcategoría debajo de el listado correspondiente
								=============================================*/

								$(`[titleList='${titleList[i]}']`).append(

									`<li>
										<a href="products/${arrayTitleName[f].url}">${arrayTitleName[f].subcategory}</a>
									</li>`

								)

							}

						}

					})

				}

			})
		}

  }
  getInfo(){
this.id = localStorage.getItem("id")
this.subscriptions.push(
    this.usuariosService
    .getDataByID(this.id)
    .subscribe((r: any) => {
      this.users.push({
        "id":r.id,
        "nombre":r.nombre,
        "apellido":r.apellido,
        "correo":r.correo,
        "dni":r.dni,
        "telefono":r.telefono,
        "direccion":r.direccion,
        "rol":r.Rol["nombre"],
      })
      this.nombre = r.nombre
      this.apellido = r.apellido
      console.log(this.nombre);
    }

    ));
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
        localStorage.removeItem('id');

        window.location.href = '/tienda'
      }
    });
    ;
  }


}
