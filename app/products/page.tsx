import React from "react";

import { ProductTable } from "@/components/product-list/ProductTable";

export default function page() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold">Product List</h1>
      <ProductTable />
    </div>
  );
}
