import { Product } from "./../product.model";
import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { map } from "rxjs/operators";
import { Observable, of as observableOf, merge } from "rxjs";
import { ProductServiceService } from "../product-service.service";

export class ProductRead2DataSource extends DataSource<Product> {
  data: Product[];
  paginator: MatPaginator;
  sort: MatSort;

  constructor(private productService: ProductServiceService) {
    super();
    productService.read().subscribe(x=>{
      this.data = x;
      this.data.length = x.length;
    });
  }

  connect(): Observable<Product[]> {
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange,
    ];

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
      })
    );
  }

  disconnect() {}

  private getPagedData(data: Product[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: Product[]) {
    if (!this.sort.active || this.sort.direction === "") {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === "asc";
      switch (this.sort.active) {
        case "name":
          return compare(a.name, b.name, isAsc);
        case "id":
          return compare(+a.id, +b.id, isAsc);
          case "price":
          return compare(+a.price, +b.price, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
