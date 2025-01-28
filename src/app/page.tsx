"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";
import { client, urlFor } from "@/sanity/lib/sanity";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SanityImageSource {
  _type: string;
  asset: { _ref: string; _type: string };
}

type Tag = {
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
  image: SanityImageSource; // Use the more specific SanityImageSource type here
  tags: Tag[];
  sizes: string[];
};


async function getTodays4(): Promise<Product[]> {
  const query = `*[_type == "product" && references(*[_type == "tags" && name == "Today"]._id)]{
  _id,
  name,
  slug,
  price,
  quantity,
  discountPercentage,
        priceWithoutDiscount,
  image{
    asset->{url}
  },
  tags[]->{name},
}[0...4]`;
  const todayProducts = await client.fetch(query);
  return todayProducts;
}
async function getThisMonth(): Promise<Product[]> {
  const query = `*[_type == "product" && references(*[_type == "tags" && name == "This Month"]._id)]{
  _id,
  name,
  slug,
  price,
  quantity,
  discountPercentage,
        priceWithoutDiscount,
  image{
    asset->{url}
  },
  tags[]->{name},
}[0...4]`;
  const getThisMonthProducts = await client.fetch(query);

  return getThisMonthProducts;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [getThisMonthProducts, setGetThisMonthProducts] = useState<Product[]>(
    []
  );

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getTodays4();
      const data2 = await getThisMonth();
      console.log("Fetched Products:", data);
      setProducts(data);
      setGetThisMonthProducts(data2);
    };

    fetchProducts();
  }, []);

  const categoryImages = [
    "/Category-Phone.png",
    "/Category-Phone (1).png",
    "/Category-Phone (2).png",
    "/Category-Phone (3).png",
    "/Category-Phone (4).png",
    "/Category-Phone (5).png",
  ];

  const [startCategoryIndex, setStartCategoryIndex] = useState(0);
  const [visibleCategories, setVisibleCategories] = useState(6);
  useEffect(() => {
    const updateVisibleCategories = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCategories(2);
      else if (width < 1024) setVisibleCategories(4);
      else setVisibleCategories(6);
    };

    updateVisibleCategories();
    window.addEventListener("resize", updateVisibleCategories);
    return () => window.removeEventListener("resize", updateVisibleCategories);
  }, []);

  const handlePrevCategory = () => {
    setStartCategoryIndex((prevIndex) =>
      prevIndex - visibleCategories < 0
        ? Math.max(0, categoryImages.length - visibleCategories)
        : prevIndex - visibleCategories
    );
  };

  const handleNextCategory = () => {
    setStartCategoryIndex((prevIndex) =>
      prevIndex + visibleCategories >= categoryImages.length
        ? 0
        : prevIndex + visibleCategories
    );
  };

  return (
    <div className=" w-full min-h-screen flex flex-col justify-between font-[family-name:var(--font-geist-sans)] mt-4">
      <div className="intro flex flex-col md:flex-row">
        {/* Right Container (Image) */}
        <div className="second w-full h-[400px] flex justify-center items-center md:w-[70%] order-1 md:order-2">
          <Image
            src={"/Frame 560.png"}
            alt="frame"
            width={400}
            height={400}
            className="w-[95%] md:w-[80%] h-auto"
          />
        </div>

        {/* Left Container (Links) */}
        <div className="select-container w-full h-[400px] border-b-2 md:border-r-2 border-[#b3aeae] text-wrap font-bold flex flex-col items-center justify-around px-4 md:px-8 md:w-[30%] order-2 md:order-1">
          <Link href={"/electronics"}>
            <h1 className="text-center sm:text-left md:text-left hover:underline underline-offset-4 decoration-[#b3aeae]">
              Electronics
            </h1>
          </Link>
          <Link href={"/jewelery"}>
            <h1 className="text-center sm:text-left md:text-left hover:underline underline-offset-4 decoration-[#b3aeae]">
              Jewelery
            </h1>
          </Link>
          <Link href={"/menClothing"}>
            <h1 className="text-center sm:text-left md:text-left hover:underline underline-offset-4 decoration-[#b3aeae]">
              Men&apos;s clothing
            </h1>
          </Link>
          <Link href={"/womenClothing"}>
            <h1 className="text-center sm:text-left md:text-left hover:underline underline-offset-4 decoration-[#b3aeae]">
              Women&apos;s clothing
            </h1>
          </Link>
          <Link href={"/electronics"}>
            <h1 className="text-center sm:text-left md:text-left hover:underline underline-offset-4 decoration-[#b3aeae]">
              Home & Lifestyle
            </h1>
          </Link>
          <Link href={"/jewelery"}>
            <h1 className="text-center sm:text-left md:text-left hover:underline underline-offset-4 decoration-[#b3aeae]">
              Sports & Outdoor
            </h1>
          </Link>
          <Link href={"/menClothing"}>
            <h1 className="text-center sm:text-left md:text-left hover:underline underline-offset-4 decoration-[#b3aeae]">
              Boy&apos;s & Toys
            </h1>
          </Link>
          <Link href={"/womenClothing"}>
            <h1 className="text-center sm:text-left md:text-left hover:underline underline-offset-4 decoration-[#b3aeae]">
              Health & Beauty
            </h1>
          </Link>
        </div>
      </div>


      <section className="w-full flex flex-col gap-5 mt-24 p-4 sm:px-10 md:px-36">
        {/* Intro Section */}
        <div className="intro">
          <div className="first flex items-center gap-4">
            <Image
              src={"/Category Rectangle.png"}
              width={40}
              height={60}
              alt="rec"
              className="w-[40px] h-[60px] sm:w-[50px] sm:h-[70px]"
            />
            <h1 className="text-[#db4543] font-bold text-2xl sm:text-3xl md:text-4xl">
              Today&apos;s
            </h1>
          </div>
        </div>

        {/* Flash Sales Section */}
        <div className="sales flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-10">
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-center sm:text-left">
            Flash Sales
          </h1>
          <Image
            src={"/Group 1000005937.png"}
            alt="time"
            width={300}
            height={300}
            className="w-[120px] sm:w-[200px] md:w-[300px]"
          />
        </div>

        {/* Products Grid Section */}
        <div className="z-50 py-4">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <Card
                key={product._id}
                className="w-full sm:w-[300px] h-auto bg-white shadow-lg rounded-lg overflow-hidden transition-all hover:scale-105"
              >
                <CardContent className="p-4">
                  <div className="w-full h-72 sm:h-64 lg:h-72 relative bg-white">
                    <Image
                      src={urlFor(product.image).url() || "/placeholder-image.jpg"}
                      alt={product.name}  // Use product.name or any relevant string for alt
                      fill
                    />

                    {product.discountPercentage && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
                        -{product.discountPercentage}%
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-center p-4">
                  <CardHeader className="mb-2">
                    <CardTitle className="text-center text-sm sm:text-lg font-semibold text-gray-800 line-clamp-2">
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
                    <Button className="w-full mt-4 bg-gray-100 text-gray-800 hover:bg-gray-200 gap-2">
                      <Link href={`/products/${product.slug.current}`}>
                        View Details {"-->"}
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* View All Products Button */}
        <div className="button mt-10 w-full flex items-center justify-center">
          <Link href={"/products"}>
            <button className="bg-[#db4543] px-6 py-3 text-white text-lg sm:text-xl md:text-2xl rounded-md">
              View All Products
            </button>
          </Link>
        </div>

        {/* Divider Line */}
        <div className="line w-full border-[1.5px] border-[#b3aeae] mt-10"></div>
      </section>



      <section className="w-full flex flex-col gap-5 mt-24 p-4 sm:px-10 md:px-20 lg:px-36">
        {/* Intro Section */}
        <div className="intro">
          <div className="first flex items-center gap-4">
            <Image
              src={"/Category Rectangle.png"}
              width={30}
              height={40}
              alt="rec"
              className="md:w-[40px] md:h-[50px] sm:w-[30px] sm:h-[40px]"
            />
            <h1 className="text-[#db4543] font-bold text-2xl sm:text-3xl md:text-4xl">
              Categories
            </h1>
          </div>
        </div>

        {/* Browse By Category Section */}
        <div className="sales w-full flex items-center justify-between gap-4 flex-col sm:flex-row">
          <div className="first text-lg sm:text-2xl md:text-3xl font-bold flex items-center gap-10">
            <h1 className="mt-5 text-center sm:text-left">Browse By Category</h1>
          </div>

          {/* Buttons for Carousel */}
          <div className="second flex gap-4 justify-center sm:justify-start">
            <Button onClick={handlePrevCategory} variant={"ghost"}>
              <Image
                src={"/Fill With Left Arrow.png"}
                alt="left"
                width={30}
                height={30}
                className="sm:w-[40px] sm:h-[40px]"
              />
            </Button>
            <Button onClick={handleNextCategory} variant={"ghost"}>
              <Image
                src={"/Fill with Right Arrow.png"}
                alt="right"
                width={30}
                height={30}
                className="sm:w-[40px] sm:h-[40px]"
              />
            </Button>
          </div>
        </div>

        {/* Category Images Section */}
        <div className="products w-full flex overflow-x-auto gap-4">
          {categoryImages
            .slice(startCategoryIndex, startCategoryIndex + visibleCategories)
            .map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[170px] h-[145px] sm:w-[200px] sm:h-[170px] lg:w-[250px] lg:h-[200px] flex justify-center items-center hover:bg-[#db4543] transition-all"
              >
                <Image
                  src={image}
                  alt={`Category ${index}`}
                  width={170}
                  height={145}
                  className="object-contain w-full h-full"
                />
              </div>
            ))}
        </div>
      </section>

      <section className="w-full flex flex-col gap-5 mt-24 p-4 sm:px-10 md:px-20 lg:px-36">
        {/* Intro Section */}
        <div className="intro">
          <div className="first flex items-center gap-4">
            <Image
              src={"/Category Rectangle.png"}
              width={20}
              height={30}
              alt="rec"
              className="md:w-[30px] md:h-[40px] sm:w-[25px] sm:h-[35px]"
            />
            <h1 className="text-[#db4543] font-bold text-xl sm:text-2xl md:text-3xl">
              This Month
            </h1>
          </div>
        </div>

        {/* Best Selling Products Section */}
        <div className="sales w-full flex items-center justify-between gap-4 flex-col sm:flex-row">
          <div className="first text-md sm:text-2xl md:text-3xl font-bold flex items-center gap-32">
            <h1 className="mt-5">Best Selling Products</h1>
          </div>
          <div className="second flex justify-center sm:justify-start">
            <Link href={"/products"}>
              <Button
                variant={"ghost"}
                className="bg-[#db4543] text-white font-bold py-2 px-4"
              >
                View All Products
              </Button>
            </Link>
          </div>
        </div>

        {/* Product Grid Section */}
        <div className="z-50 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-32">
            {getThisMonthProducts.map((product) => (
              <Card
                key={product._id}
                className="w-full sm:w-[272px] lg:w-[272px] h-[625px] bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <CardContent className="relative p-4">
                  <div className="w-full h-96 sm:h-[250px] lg:h-[300px] bg-white relative">
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

                {/* Card Footer Section */}
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
                      <Button className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200 gap-2 py-2 px-4">
                        <Link href={`/products/${product.slug.current}`}>
                          View Details {"-->"}
                        </Link>
                      </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>


      <section className=" w-full mt-24 p-4 md:px-36 ">
        <Image src={"/Frame 600.png"} height={500} width={1170} alt="" />
      </section>
      <section className="hidden w-full lg:flex lg:flex-col gap-5 mt-24 p-4 md:px-36 ">
        <div className="intro">
          <div className="first flex items-center gap-4">
            <Image
              src={"/Category Rectangle.png"}
              width={20}
              height={30}
              alt="rec"
            />
            <h1 className=" text-[#db4543] font-bold">Our Products</h1>
          </div>
        </div>
        <div className="sales w-full flex items-center justify-between gap-4">
          <div className="first text-md md:text-3xl font-bold flex items-center gap-10">
            <h1 className=" mt-5">Explore Our Products</h1>
          </div>
          <div className="second flex">
            <Button variant={"ghost"}>
              <Image
                src={"/Fill With Left Arrow.png"}
                alt="left"
                width={40}
                height={40}
              />
            </Button>
            <Button variant={"ghost"}>
              <Image
                src={"/Fill with Right Arrow.png"}
                alt="right"
                width={40}
                height={40}
              />
            </Button>
          </div>
        </div>
        <div className="z-50 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-32">
            {products.map((product) => (
              <Card
                key={product._id}
                className="w-[272px] h-[442px] bg-white shadow-lg rounded-lg overflow-hidden"
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
                    <div className="w-full flex flex-col  gap-3 text-sm mt-4">
                      {/* <Button className="w-[272px] flex items-center justify-center gap-2" onClick={() => handleAddToCart(product)}>
                        <FaCartPlus />
                        Add To Cart
                      </Button> */}
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
        <div className=" z-50 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-32">
            {getThisMonthProducts.map((product) => (
              <Card
                key={product._id}
                className="w-[272px] h-[442px] bg-white shadow-lg rounded-lg overflow-hidden"
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
                    <div className="w-full flex flex-col  gap-3 text-sm mt-4">
                      {/* <Button className="w-[272px] flex items-center justify-center gap-2" onClick={() => handleAddToCart(product)}>
                        <FaCartPlus />
                        Add To Cart
                      </Button> */}
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
      </section>
      <section className=" hidden w-full lg:flex lg:flex-col gap-5 mt-24 p-4 md:px-36 ">
        <div className="intro">
          <div className="first flex items-center gap-4">
            <Image
              src={"/Category Rectangle.png"}
              width={20}
              height={30}
              alt="rec"
            />
            <h1 className=" text-[#db4543] font-bold">Featured</h1>
          </div>
        </div>
        <div className="sales w-full flex items-center justify-between gap-4">
          <div className="first text-md md:text-3xl font-bold flex items-center gap-10">
            <h1 className=" mt-5">New Arrival</h1>
          </div>
        </div>
        <div className="container hidden lg:flex gap-4">
          <Image src={"/Frame 684.png"} width={570} height={600} alt="" />
          <Image src={"/Frame 738.png"} width={570} height={600} alt="" />
        </div>
      </section>
      <section className=" w-full flex items-center justify-center mt-24 p-4 md:px-36">
        <Image src={"/Frame 702.png"} width={943} height={161} alt="" />
      </section>
    </div>
  );
}
