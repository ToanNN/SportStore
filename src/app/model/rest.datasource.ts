import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from './product.model';
import { Order } from './order.model';
const PROTOCOL: string = 'http';
const PORT: number = 3500;
@Injectable()
export class RestDataSource {
  baseUrl: string;
  auth_token: any;
  constructor(private http: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'products');
  }

  saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl + 'orders', order);
  }

  authenticate(user: string, password: string): Observable<boolean> {
    return this.http
      .post(this.baseUrl + 'login', {
        name: user,
        password: password,
      })
      .pipe(
        map((resObj: Object) => {
          const res = resObj as Response;
          this.auth_token = res.success ? res.token : '';
          return res.success;
        })
      );
  }
}

interface Response {
  success: boolean;
  token: string;
}
