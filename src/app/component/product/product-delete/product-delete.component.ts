import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product;

  constructor(private productService:ProductServiceService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.readById(id).subscribe((product) => {
      this.product = product;
  })
}

  deleteProduct():void{
this.productService.delete(this.product.id).subscribe((product)=>{
  this.productService.showinConsole("Produto Deletado")
  this.product = product
  this.router.navigate(["/products"])
})
  }

  cancelar():void{
    this.router.navigate(["/products"])
  }

}
