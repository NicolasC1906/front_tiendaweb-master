import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../../../services/products.service';
import { CategoriesService } from '../../../services/categories.service';
import { Subject, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  users:any = [];
  subscriptions:Subscription[]=[];
  id:any;

  constructor(private usuariosService: UsuariosService,
    private ActivatedRoute: ActivatedRoute,) {
      this.id= this.ActivatedRoute.snapshot.paramMap.get('idUser')
     }

     ngOnInit(): void {
      this.getInfo();

      //console.log("this.usuariosService.authActivate()", this.usuariosService.authActivate());

    }

    getInfo(){
      //console.log(this.id);
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
        //console.log(this.users);
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
