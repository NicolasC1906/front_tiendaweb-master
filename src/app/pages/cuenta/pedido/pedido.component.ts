import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { UsuariosService } from '../../../services/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MglTimelineModule } from 'angular-mgl-timeline';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: []
})
export class PedidoComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger = new Subject();
  users:any = [];
  subscriptions:Subscription[]=[];
  id:any;
  fecha:any = [];
  alternate: boolean = true;
  toggle: boolean = true;
  color: boolean = false;
  size: number = 40;
  expandEnabled: boolean = true;
  contentAnimation: boolean = true;
  dotAnimation: boolean = true;
  side = 'left';
  constructor( private usuariosService: UsuariosService,
    private ActivatedRoute: ActivatedRoute,) {
      this.id= this.ActivatedRoute.snapshot.paramMap.get('idUser')
     }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }


            ngOnInit(): void {
              this.dtOptions = {
                pagingType: 'full_numbers',
                processing:true
              };
              this.getOrdesInfo();
            }
            getOrdesInfo(){
              console.log(this.id)
              //console.log(this.id);
              this.subscriptions.push(
              this.usuariosService
              .getOrdesByID(this.id)
              .subscribe((r: any) => {


              for(const i in r){
                if(r[i].estadoEnvio === null){
                  this.fecha = "Procesando"
                }else{
                  this.fecha = r[i].estadoEnvio
                }
                this.users.push({
                  "id":r[i].id,
                  "ValorTotal":r[i].valorTotal,
                  "estadoEnvio":this.fecha,
                  "fecha": r[i].createdAt
                })
              }
                //console.log(this.users);
          }
    ));

  }

}

