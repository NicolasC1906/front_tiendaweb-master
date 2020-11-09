import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/header/header.component';
import { FooterComponent } from './modules/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { SearchComponent } from './pages/search/search.component';
import { HomeFeaturesComponent } from './pages/home/home-features/home-features.component';
import { HomeOfertasComponent } from './pages/home/home-ofertas/home-ofertas.component';
import { TiendaComponent } from './pages/product/tienda/tienda.component';
import { InfoProductoComponent } from './pages/product/info-producto/info-producto.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { CuentaComponent } from './pages/cuenta/cuenta.component';
import { FeriaComponent } from './pages/feria/feria.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RelampagoComponent } from './pages/relampago/relampago.component';
import { TiendasComponent } from './pages/tiendas/tiendas.component';
import { CartComponent } from './pages/cart/cart.component';
import { DataTablesModule } from 'angular-datatables';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { MyShoppingComponent } from './pages/cuenta/my-shopping/my-shopping.component';
import { PerfilComponent } from './pages/cuenta/perfil/perfil.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MglTimelineModule } from 'angular-mgl-timeline';
import { PedidoComponent } from './pages/cuenta/pedido/pedido.component';
import { RejectedComponent } from './pages/rejected/rejected.component';
import { PlayerVideoModule } from 'angular-storyshare-player';
import { FeriasComponent } from './pages/ferias/ferias.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    ProductComponent,
    SearchComponent,
    HomeFeaturesComponent,
    HomeOfertasComponent,
    TiendaComponent,
    InfoProductoComponent,
    LoginComponent,
    RegistroComponent,
    CuentaComponent,
    FeriaComponent,
    RelampagoComponent,
    TiendasComponent,
    CartComponent,
    CheckoutComponent,
    MyShoppingComponent,
    PerfilComponent,
    PedidoComponent,
    RejectedComponent,
    FeriasComponent,
  ],
  imports: [
    PlayerVideoModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    DataTablesModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MglTimelineModule
  ],
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
