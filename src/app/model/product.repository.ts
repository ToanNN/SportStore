import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class ProductRepository {
    private products: Product[] = [];
    private categories: string[] = [];
    constructor(private dataSource: RestDataSource) {
        dataSource.getProducts().subscribe((x) => {
            this.products = x;
            this.categories = x
                .map((p) => p.category || '')
                .filter((c, index, arr) => arr.indexOf(c) == index)
                .sort();
        });
    }
    getProducts(category: string = ''): Product[] {
        return this.products.filter(
            (x) => category == '' || category == x.category
        );
    }

    getProduct(id: number): Product | undefined {
        return this.products.find((x) => x.id == id);
    }

    getCategories(): string[] {
        return this.categories;
    }

    saveProduct(product: Product) {
        if (product.id == null || product.id == 0) {
            this.dataSource
                .saveProduct(product)
                .subscribe((p) => this.products.push(p));
        } else {
            this.dataSource.updateProduct(product).subscribe((p) => {
                let updatedProductIndex = this.products.findIndex((x) => x.id == p.id);
                this.products.splice(updatedProductIndex, 1, p);
            });
        }
    }
    deleteProduct(id: number) {
        this.dataSource.deleteProduct(id).subscribe((p) => {
            this.products.splice(
                this.products.findIndex((p) => p.id == id),
                1
            );
        });
    }
}
