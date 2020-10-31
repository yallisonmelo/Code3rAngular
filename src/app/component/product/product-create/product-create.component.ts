import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

propLegal="qualquer"
product : Product = {
  name:'',
  price:null
 }
  constructor(private productService:ProductServiceService, private router: Router) { }

  ngOnInit(): void {
  
  }

  salvar():void{
    this.productService.create(this.product).subscribe(()=>{
      this.productService.showinConsole("Produto Criado com Sucesso")
      this.router.navigate(["/products"])
    });
    
  }

  cancelar():void{
    this.router.navigate(["/products"])
  }
}
