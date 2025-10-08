import type { Metadata } from "next";
import "@/assets/styles/globals.css";
import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";

export const metadata: Metadata = {
  title: "Home",
};

const Homepage = async () => {
  const latestProducts = await getLatestProducts();

  return (
    <div className="my-10">
      <ProductList data={latestProducts} title="Newest Arrivals" limit={4} />
    </div>
  );
};

export default Homepage;
