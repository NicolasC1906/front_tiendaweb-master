import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { SearchComponent } from './pages/search/search.component';
import { TiendaComponent } from './pages/product/tienda/tienda.component';
import { InfoProductoComponent } from './pages/product/info-producto/info-producto.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { CuentaComponent } from './pages/cuenta/cuenta.component';
import { FeriaComponent } from './pages/feria/feria.component';
import { RelampagoComponent } from './pages/relampago/relampago.component';
import { TiendasComponent } from './pages/tiendas/tiendas.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { MyShoppingComponent } from './pages/cuenta/my-shopping/my-shopping.component';
import { PedidoComponent } from './pages/cuenta/pedido/pedido.component';
import { AuthGuard } from './guards/auth.guard';
import { RejectedComponent } from './pages/rejected/rejected.component';
import { FeriasComponent } from './pages/ferias/ferias.component';


const routes: Routes = [
    {path: '', component: HomeComponent },
    {path: 'products', component: ProductsComponent },
    {path: 'product', component: ProductComponent },
    {path: 'search', component: SearchComponent },
    {path: 'tienda', component: TiendaComponent },
    {path: 'infoProducto/:id', component: InfoProductoComponent },
    {path: 'login', component: LoginComponent },
    {path: 'registro', component: RegistroComponent },
    {path: 'cuenta/:idUser', component: CuentaComponent },
    {path: 'feria', component: FeriaComponent },
    {path: 'relampago', component: RelampagoComponent },
    {path: 'tiendas', component: TiendasComponent },
    {path: 'cart', component: CartComponent },
    {path: 'checkout', component: CheckoutComponent ,canActivate: [AuthGuard]},
    {path: 'shopping', component: MyShoppingComponent },
    {path: 'pedido/:id', component: PedidoComponent },
    {path: 'rechazado', component: RejectedComponent },
    {path: 'ferias', component: FeriasComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
