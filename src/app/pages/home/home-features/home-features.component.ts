import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Path } from '../../../config';
import { CategoriesService } from '../../../services/categories.service';

@Component({
  selector: 'app-home-features',
  templateUrl: './home-features.component.html',
  styleUrls: ['./home-features.component.css']
})
export class HomeFeaturesComponent implements OnInit {
  subscriptions:Subscription[]=[];
  categorias:any = [];
  categoriasname:any = [];
  recursosar:any = [];
  url:any;
  product:any = [];
  getcategorias:any = [];
  categories = new Array(20).fill(0);


  constructor(private CategoriesService: CategoriesService,) { }

  ngOnInit(): void {
    this.getInfo();

  }

  getInfo(){
    //console.log(this.id);
    this.subscriptions.push(
    this.CategoriesService
    .getData()
    .subscribe((r: any) => {
      let i
      for(i in r){
      this.getcategorias.push({
        "id":r[i].id,
        "nombre":r[i].nombre,
        "imagen":r[i].imagen,
      })
      console.log(this.getcategorias);
    }
  }
    ));
  }



}
