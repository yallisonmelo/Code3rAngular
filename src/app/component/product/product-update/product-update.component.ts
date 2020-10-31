import { Component, OnInit } from "@angular/core";
import { ProductServiceService } from "../product-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../product.model";

@Component({
  selector: "app-product-update",
  templateUrl: "./product-update.component.html",
  styleUrls: ["./product-update.component.css"],
})
export class ProductUpdateComponent implements OnInit {

  product: Product

  constructor(
    private productService: ProductServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.readById(id).subscribe((product) => {
      this.product = product;
    });
  }

  updateProduct(): void {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showinConsole("Produto Atualizado com Sucesso");
      this.router.navigate(["/products"]);
    });
  }

  cancelar(): void {
    this.router.navigate(["/products"]);
  }
}
