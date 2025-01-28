'use client';

import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CiShoppingCart } from "react-icons/ci";
import Image from "next/image";
import { useParams } from "next/navigation";
import { client, urlFor } from "@/sanity/lib/sanity";
import { useCart } from "@/components/CartContext";

type Tag = {
    _id: string;
    name: string;
};

type Category = {
    _id: string;
    title: string;
};

type ImageAsset = {
    _id: string;
    url: string;
};

type Product = {
    _id: string;
    name: string;
    description: string;
    category: Category;
    slug: {
        current: string;
    };
    price: number;
    quantity: number;
    discountPercentage?: number;
    priceWithoutDiscount?: number;
    rating?: number;
    ratingCount?: number;
    tags: Tag[];
    sizes: string[];
    image: {
        asset: ImageAsset;
    };
};

const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addItemToCart } = useCart();

    const handleAddToCart = (product: Product) => {
        if (quantity > product.quantity) {
            setError(`Cannot add more than available items to the cart`);
            return;
        }

        addItemToCart({
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            discountPercentage: product.discountPercentage,
            priceWithoutDiscount: product.priceWithoutDiscount,
            image: product.image
        });

        setProduct((prev) => {
            if (prev) {
                return { ...prev, quantity: prev.quantity - quantity };
            }
            return prev;
        });
        setQuantity(1);
    };

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                setError(null);

                const slug = params?.slug;
                console.log("Current slug:", slug);

                if (!slug) {
                    setError("No slug provided");
                    setLoading(false);
                    return;
                }

                const query = `*[_type == "product" && slug.current == $slug][0]{
          _id,
          name,
          description,
          category->{
            _id,
            title
          },
          slug,
          price,
          quantity,
          discountPercentage,
          priceWithoutDiscount,
          rating,
          ratingCount,
          tags[]->{
            _id,
            name
          },
          sizes,
          image
        }`;

                const data = await client.fetch(query, { slug });
                console.log("Fetched product data:", data);

                if (!data) {
                    setError("Product not found");
                } else {
                    setProduct(data);
                }
            } catch (error) {
                console.error("Error fetching product details:", error);
                setError("Failed to load product");
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [params]);

    const handleIncreaseQuantity = () => {
        if (product && quantity < product.quantity) {
            setQuantity(prev => prev + 1);
        }
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black"></div>
                    <p className="text-xl mt-4">Loading...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <p className="text-xl text-red-500">{error}</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <p className="text-xl">Product not found</p>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="intro p-6 lg:p-10">
                <h1 className="text-2xl">
                    Products / <span className="font-bold">{product.name}</span>
                </h1>
            </div>
            <div className="flex flex-col md:flex-row p-4 md:p-6 gap-6 md:gap-10 items-center justify-around">
                <div className="pro-image w-full md:w-[40%] rounded-lg overflow-hidden">
                    {product.image && (
                        <Image
                            src={urlFor(product.image).url()}
                            alt={product.name}
                            layout="responsive"
                            width={300}
                            height={300}
                            className="object-cover w-full h-full"
                            priority
                        />
                    )}
                </div>

                <div className="pro-details w-full md:w-[50%] h-auto rounded-lg shadow-lg p-6 space-y-6">
                    <Card className="w-full h-auto rounded-lg shadow-md">
                        <CardHeader>
                            <CardTitle className="text-2xl">{product.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="description flex flex-col gap-3">
                                <p className="text-gray-600">{product.description}</p>

                                <div className="price-info">
                                    <p className="text-2xl font-semibold text-green-600">
                                        ${product.price}
                                    </p>
                                    {product.discountPercentage && (
                                        <p className="text-sm text-gray-500 line-through">
                                            Original: ${product.priceWithoutDiscount}
                                        </p>
                                    )}
                                </div>

                                {product.category && (
                                    <p className="text-sm text-gray-500">
                                        Category: {product.category.title}
                                    </p>
                                )}

                                {product.rating && (
                                    <div className="rating text-sm text-yellow-500">
                                        Rating: {product.rating} ({product.ratingCount} reviews)
                                    </div>
                                )}
                            </div>

                            <div className="product-meta">
                                {product.sizes && (
                                    <p className="text-sm text-gray-500">
                                        Available Sizes: {product.sizes.join(", ")}
                                    </p>
                                )}
                                <p className="text-sm text-gray-500">
                                    In Stock: {product.quantity}
                                </p>
                            </div>

                            <div className="buttons flex flex-col gap-4 md:flex-row items-center justify-between mt-6">
                                <div className="plus-minus flex items-center gap-4">
                                    <button
                                        onClick={handleDecreaseQuantity}
                                        className="px-4 py-2 rounded-md border bg-neutral-100 text-lg hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
                                        disabled={quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-2 text-lg">{quantity}</span>
                                    <button
                                        onClick={handleIncreaseQuantity}
                                        className="px-4 py-2 rounded-md border bg-neutral-100 text-lg hover:-translate-y-1 transform transition duration-200 hover:shadow-md"
                                        disabled={quantity >= (product?.quantity || 0)}
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="px-6 py-3 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200 w-full md:w-auto"
                                >
                                    <CiShoppingCart className="mr-2 text-lg" />
                                    Add to Cart
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
