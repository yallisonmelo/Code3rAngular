import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  products: Product[];
  constructor(private productService:ProductServiceService) { }

  ngOnInit(): void {
   this.productService.read().subscribe(products =>{
     this.products = products
   });
  }

}
