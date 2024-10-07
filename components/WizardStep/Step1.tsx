import Image from "next/image";
import React from "react";
import { Payment } from "../product-list/ProductTable";
import { AlertDialogCancel } from "../ui/alert-dialog";
import { Button } from "../ui/button";

interface Step1Props {
  id: Payment;
  goToStep: (stepNumber: number) => void;
  nextStep: () => void;
  previousStep: () => void;
}

export default function Step1({ id, nextStep, previousStep }: Step1Props) {
  return (
    <div>
      <Image
        src={typeof id.styleImage === "string" ? id.styleImage : ""}
        alt="product photo"
        height={200}
        className="mx-auto"
        width={200}
      />
      <h1 className="text-2xl text-black">{id.title}</h1>
      <h1>Price : {id.amount}</h1>
      <h1>Brand : {id.brandName}</h1>
      <h1>Color : red</h1>
      <h1>Quantity: 100</h1>

      <h1>Category : </h1>
      {Array.isArray(id.categories)
        ? id.categories.join(", ")
        : typeof id.categories === "string" || typeof id.categories === "number"
          ? id.categories
          : "Invalid data"}
      <button onClick={nextStep}>Next</button>
      <button onClick={previousStep}>pre</button>
      <div className="flex justify-between items-center  mt-10">
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <div className="flex justify-end items-center gap-2 ">
          <Button variant={"outline"} onClick={previousStep}>
            Previous
          </Button>
          <Button onClick={nextStep}>Next</Button>
        </div>
      </div>
    </div>
  );
}
