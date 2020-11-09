import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { UsuariosService } from '../../../services/usuarios.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MglTimelineModule } from 'angular-mgl-timeline';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-shopping',
  templateUrl: './my-shopping.component.html',
  styleUrls: []
})
export class MyShoppingComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger = new Subject();
  users:any = [];
  pedidos:any = [];
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
    private ActivatedRoute: ActivatedRoute,
    private router: Router,) {
      this.id= this.ActivatedRoute.snapshot.paramMap.get('idUser')
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
    }



    ));
  }

  viewpedido(id){
    this.subscriptions.push(
      this.usuariosService
      .getPedidoByID(id)
      .subscribe((r: any) => {


        let pedido
        if(r.estadoEnvio === null && r.estado === 'approved'){

          // this.pedidos.push({
          //   "fechaCreado":r.createdAt,
          //   "estado":r.estado,
          //   "valorTotal":r.valorTotal,
          //   "idPago":r.idPago,
          //   "fechapago": r.DetallesPago[0].fecha_aprobado,
          //   // "nombreTienda": r.Tienda[0].nombre,
          //   "transportadora": r.EstadosEnvio[2].transportadora,
          //   "fechaEnviado": r.EstadosEnvio[2].createdAt,
          //   "numeroGuia": r.EstadosEnvio[2].numeroGuia,
          //   "fotoGuia": r.EstadosEnvio[2].fotoGuia,
          //   "comentarios": r.EstadosEnvio[2].comentarios,
          //   "idMp": r.DetallesPago[0].idMp,
          //   "monto_total_pagado": r.DetallesPago[0].monto_total_pagado,
          //   "detalle_estado": r.DetallesPago[0].detalle_estado,

          // })
          pedido = "Procesando"
          Swal.fire({
            title:"Pedido #" + id,
            width: '1000px',
            html: `
            <div class="containerTimeLine">
              <div class="timeline">
                <ul>
                <li>
                <div class="timeline-content">
                  <h3 class="date">${r.DetallesPago[0].fecha_aprobado}</h3>
                  <h1>Procesado</h1>
                  <dl>
                      <dt>Información General</dt>
                          <dd>Estado: ${r.estado}</dd>
                          <dd>Total: ${r.valorTotal}</dd>
                          <dd>Referencia de Pago: ${r.idPago}</dd>
                      <dt>Información Pago</dt>
                          <dd>Referencia Mercado Pago: ${r.DetallesPago[0].idMp}</dd>
                          <dd>Monto: ${r.DetallesPago[0].monto_total_pagado}</dd>
                          <dd>Estado: ${r.DetallesPago[0].detalle_estado}</dd>
                  </dl>
                </div>
              </li>
                </ul>
              </div>
            </div>
            `,
        });
        }else if(r.estadoEnvio === 'Enviado'){
          this.pedidos.push({
            "fechaCreado":r.createdAt,
            "estado":r.estado,
            "valorTotal":r.valorTotal,
            "idPago":r.idPago,
            "fechapago": r.DetallesPago[0].fecha_aprobado,
            // "nombreTienda": r.Tienda[0].nombre,
            "transportadora": r.EstadosEnvio[2].transportadora,
            "fechaEnviado": r.EstadosEnvio[2].createdAt,
            "numeroGuia": r.EstadosEnvio[2].numeroGuia,
            "fotoGuia": r.EstadosEnvio[2].fotoGuia,
            "comentarios": r.EstadosEnvio[2].comentarios,
            "idMp": r.DetallesPago[0].idMp,
            "monto_total_pagado": r.DetallesPago[0].monto_total_pagado,
            "detalle_estado": r.DetallesPago[0].detalle_estado,


          })
          pedido = "Enviado"
          Swal.fire({
            title:"Pedido #" + id,
            width: '1000px',
            html: `
            <div class="containerTimeLine">
              <div class="timeline">
                <ul>
                  <li>
                    <div class="timeline-content">
                      <h3 class="date">${r.EstadosEnvio[2].createdAt} </h3>
                      <h1>${pedido}</h1>
                      <dl>
                          <dt>Información Envio</dt>
                              <dd>transportadora: ${r.EstadosEnvio[2].transportadora}</dd>
                              <dd>Numero de Guia: ${r.EstadosEnvio[2].numeroGuia}</dd>
                              <dd>Comentarios: ${r.EstadosEnvio[2].comentarios}</dd>
                      </dl>
                    </div>
                    <div>
                    <a class="primary-btn checkout-btn" href="${r.EstadosEnvio[2].fotoGuia}" target="_blank">Ver Guia</a>
                  </div>

                  </li>
                  <li>
                    <div class="timeline-content">
                      <h3 class="date">${r.DetallesPago[0].fecha_aprobado}</h3>
                      <h1>Procesado</h1>
                      <dl>
                          <dt>Información General</dt>
                              <dd>Estado: ${r.estado}</dd>
                              <dd>Total: ${r.valorTotal}</dd>
                              <dd>Referencia de Pago: ${r.idPago}</dd>
                          <dt>Información Pago</dt>
                              <dd>Referencia Mercado Pago: ${r.DetallesPago[0].idMp}</dd>
                              <dd>Monto: ${r.DetallesPago[0].monto_total_pagado}</dd>
                              <dd>Estado: ${r.DetallesPago[0].detalle_estado}</dd>
                      </dl>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            `,
        });

        }else if(r.estadoEnvio === 'Recibido'){
          pedido = "Finalizado"
          this.pedidos.push({
            "estado":r.estado,
            "valorTotal":r.valorTotal,
            "uuid":r.uuid,
            "idPago":r.idPago,

          })

        }else if(r.estado === "pending"){
          Swal.fire({
            title:"Pedido #" + id + " Cancelado",
            text: "Pedido cancelado sin datos de pago confirmado",
            icon: 'warning',
          });

        }
        console.log("Esto es R",r);



        console.log(this.pedidos);
      }

      ));


  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}

