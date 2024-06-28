import { List_Product_Images } from "./list_product_images";

export class List_Product {
    id: number;
    name: string;
    stock: number;
    price: number;
    updatedDate: Date;
    createdDate: Date;
    productImageFiles?: List_Product_Images[];
    imagePath: string;
}
