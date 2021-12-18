import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { StaticDataSource } from "./static.datasource";

@Injectable()
export class ProductRepository {
    private products: Product[] = [];
    private categories: string[] = [];
    constructor(private dataSource: StaticDataSource) {
        dataSource.getProducts().subscribe(x => {
            this.products = x;
            this.categories = x.map(p => p.category || "")
                .filter((c, index, arr) => arr.indexOf(c) == index).sort();
        });
    }
    getProducts(category: string =""): Product[] {
        return this.products.filter(x => category == "" || category == x.category);
    }

    getProduct(id: number): Product | undefined {
        return this.products.find(x => x.id == id);
    }

    getCategories(): string[] {
        return this.categories;
    }
}