import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product.model';
import {MatSnackBar}from '@angular/material/snack-bar'
import { Observable,EMPTY } from 'rxjs';
import {map, catchError} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
private baseUrl="http://localhost:3000/products"

  constructor(private snackBar : MatSnackBar,  private http: HttpClient) { }

  showinConsole(msg: string, isError:boolean=false){
  this.snackBar.open(msg,'X',{
    duration:3000,
    horizontalPosition:"right",
    verticalPosition:"top",
    panelClass:isError ? ['msg-error'] : ['msg-sucess']
  })
  }

  create(product: Product): Observable<Product>{
   return  this.http.post<Product>(this.baseUrl,product).pipe(
    map(obj => obj),
      catchError(e => this.errorHandler(e))
      );  
  }

  errorHandler(e:any): Observable<any>{
    this.showinConsole('Ocorreu um Erro',true)
    return EMPTY;
  }

  read(): Observable<Product[]>{
return this.http.get<Product[]>(this.baseUrl).pipe(
  map(obj => obj),
    catchError(e => this.errorHandler(e))
    );;
  }

  readById(id: string):Observable<Product>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      map(obj => obj),
        catchError(e => this.errorHandler(e))
        );;
  }

  update(product : Product):Observable<Product>{
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(url,product).pipe(
      map(obj => obj),
        catchError(e => this.errorHandler(e))
        );;
}

delete(id : number):Observable<Product> {
  const url = `${this.baseUrl}/${id}`;
  return this.http.delete<Product>(url).pipe(
    map(obj => obj),
      catchError(e => this.errorHandler(e))
      );
}
}