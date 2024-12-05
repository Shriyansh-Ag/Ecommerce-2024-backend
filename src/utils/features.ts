import  mongoose  from "mongoose"
import { invalidatesCacheProps, OrderItemType } from "../types/types.js";
import { myCache } from "../app.js";
import { Product } from "../models/products.js";


export const connectDB =(uri:string)=>{

    mongoose.connect(uri,{
        dbName: "Ecommerce_24"
    }).then((c) => console.log(`Database connected to ${c.connection.host}`)).
    catch( e=>console.log(e));
}


export const invalidatesCache = async({product,order,admin}:invalidatesCacheProps) => {

    if(product){

        const productKeys: string[] = ["latest-product",
            "categories",
            "all-products"];
            //`product-${id}`

            const products = await Product.find({}).select("_id");

            products.forEach((i) =>{
                productKeys.push(`product-${i._id}`)
            })
        myCache.del(productKeys)
    }
    if(order){
    }
    if(admin){
    }

}

export const reduceStock = async (orderItems: OrderItemType[]) =>{
    for (let i = 0; i < orderItems.length; i++) {
        const order = orderItems[i];
        const product = await Product.findById(order.productId)
        if(!product) throw new Error("Product not found")
        product.stock -= order.quantity
        await product.save()
    }
};