"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaCartPlus } from "react-icons/fa6";
import { client, urlFor } from "@/sanity/lib/sanity";
import { useState, useEffect } from "react";
import Link from "next/link";
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

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getData();
      console.log("Fetched Products:", data);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full min-h-screen p-4 sm:p-10 lg:p-20 flex flex-col gap-10">
      <div className="intro flex items-center justify-between mb-6">
        <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl">Wishlist(4)</h1>
        <Button variant={"outline"}>Move All To Bag</Button>
      </div>

      <div className="py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.splice(0, 4).map((product) => (
            <Card
              key={product._id}
              className="w-full h-auto bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <CardContent className="relative p-4">
                <div className="w-full h-48 sm:h-64 lg:h-72 bg-gray-200 relative">
                  <Image
                    src={urlFor(product.image).url() || "/placeholder-image.jpg"}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                  {product.discountPercentage && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded-md">
                      -{product.discountPercentage}%
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col p-4">
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

      <div className="second w-full flex flex-col gap-16 mt-24">
        <div className="intro mb-6">
          <div className="first flex items-center gap-4">
            <Image
              src={"/Category Rectangle.png"}
              width={20}
              height={30}
              alt="rec"
            />
            <h1 className="text-[#db4543] font-bold text-xl sm:text-2xl lg:text-3xl">
              Today&apos;s
              Offers
            </h1>
          </div>
        </div>
        <div className="py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.splice(0, 4).map((product) => (
              <Card
                key={product._id}
                className="w-full h-auto bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <CardContent className="relative p-4">
                  <div className="w-full h-48 sm:h-64 lg:h-72 bg-gray-200 relative">
                    <Image
                      src={urlFor(product.image).url() || "/placeholder-image.jpg"}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                    />
                    {product.discountPercentage && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded-md">
                        -{product.discountPercentage}%
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col p-4">
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
                      <Button className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200 gap-2">
                        <FaCartPlus />
                        Add To Cart
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
    </div>
  );
}
