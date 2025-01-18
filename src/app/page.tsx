'use client';

import Footer from "./Components/Footer";
import Gallery from "./Components/Gallery";
import HeroSection from "./Components/HeroSection";
import Navbar from "./Components/Navbar";
import Products from "./Components/Products";
import Range from "./Components/Range";
import RoomSlider from "./Components/RoomSlider";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allproducts } from "@/sanity/lib/queries";
import Image from "next/image";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

export default async function Home() {
  // Fetch products from Sanity
  const products: Product[] = await sanityFetch({ query: allproducts });

  return (
    <div>
      <Navbar />
      <HeroSection />
      <Range />
      <div className="px-8 py-16">
        <h1 className="text-3xl font-bold text-center mb-8">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              className="border p-4 rounded-lg shadow-sm flex flex-col items-center"
              key={product._id}
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                className="w-60"
                height={500}
                width={500}
              />
              <h2 className="text-xl font-bold text-center mt-4">{product.name}</h2>
              <p className="text-center mt-2">{product.description}</p>
              <p className="text-center mt-4 text-lg font-semibold">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
      <RoomSlider />
      <Gallery />
      <Footer />
    </div>
  );
}
