import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/users.model';
import { NgForm } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { Sweetalert } from '../../functions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserModel;
  token: any;
  expires: any;
  idUser: any;
  constructor( private usuariosService: UsuariosService ) {
    this.user = new UserModel();

  }

  ngOnInit(): void {

     // Disable form submissions if there are invalid fields
     (function() {
      'use strict';
      window.addEventListener('load', function() {
        // Get the forms we want to add validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    })();

  }

  onSubmit(f: NgForm ){
    if(f.invalid){
      return;
    }

    this.user.IdRol =  3;
    this.usuariosService.loginAuth(this.user)



    .subscribe((r: any)=>{
      this.idUser = r.usuario["id"];
      localStorage.setItem("id",r.usuario["id"])
      localStorage.setItem("token", r.token);
      localStorage.setItem("expiresIn", r.expiresIn);
      this.token = r.token;
      this.expires = r.expiresIn;
      console.log(r.usuario["id"]);

      /*==============================================
                Dirigir a cuenta
      /*==============================================*/
      window.location.href = '/tienda';

    })
    //console.log(this.user);
  }




}
