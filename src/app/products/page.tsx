"use client";
import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { client, urlFor } from "@/sanity/lib/sanity";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import Image from "next/image";

type Tag = {
    _id: string;
    name: string;
};

type Product = {
    _id: string;
    name: string;
    slug: {
        current: string;
    };
    price: number;
    quantity: number;
    discountPercentage?: number;
    priceWithoutDiscount?: number;
    image: {
        asset: {
            url: string;
        };
    };
    tags: Tag[];
    sizes: string[];
};

async function getData(): Promise<Product[]> {
    const query = `*[_type == "product"]{
        _id,
        name,
        slug,
        price,
        quantity,
        discountPercentage,
        priceWithoutDiscount,
        image,
        tags[]->{
          name
        },
        sizes
      }`;

    const products = await client.fetch(query);
    return products;
}

export default function Page() {
    const [products, setProducts] = useState<Product[]>([]);
    const { addItemToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getData();
            console.log("Fetched Products:", data);
            setProducts(data);
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product: Product) => {
        addItemToCart({
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity: 1,
            discountPercentage: product.discountPercentage,
            priceWithoutDiscount: product.priceWithoutDiscount,
            image: product.image,
        });
    };

    return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="intro p-6 lg:p-10">
                <h1>
                    All <span className="font-bold">Products</span>
                </h1>
            </div>
            <div className="px-6 lg:px-20 z-50 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <Card
                            key={product._id}
                            className="w-[272px] h-[460px] bg-white shadow-lg rounded-lg overflow-hidden"
                        >
                            <CardContent className="relative p-4">
                                <div className="w-full h-48 bg-gray-200 relative">
                                    <Image
                                        src={urlFor(product.image).url() || "/placeholder-image.jpg"}
                                        alt={product.name}
                                        fill
                                    />
                                    {product.discountPercentage && (
                                        <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded-md">
                                            -{product.discountPercentage}%
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col">
                                <CardHeader className="mb-2">
                                    <CardTitle className="text-sm font-semibold text-gray-800 line-clamp-2">
                                        {product.name}
                                    </CardTitle>
                                </CardHeader>
                                <div className="flex flex-col items-center">
                                    <p className="text-lg font-bold text-gray-900">
                                        ${product.price}
                                        {product.discountPercentage && (
                                            <span className="text-sm text-red-600 line-through ml-2">
                                                ${product.priceWithoutDiscount}
                                            </span>
                                        )}
                                    </p>
                                    <div className="w-full flex flex-col gap-3 text-sm mt-4">
                                        <Button
                                            className="w-full bg-slate-600 text-white hover:bg-slate-700 gap-2"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            Add to Cart
                                        </Button>
                                        <Button className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200 gap-2">
                                            <Link href={`/products/${product.slug.current}`}>
                                                View Details {"-->"}
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
