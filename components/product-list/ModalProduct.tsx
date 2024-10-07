import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Payment } from "./ProductTable";
import Image from "next/image";

type ModalProductProps = {
  id: Payment;
};

export function ModalProduct({ id }: ModalProductProps) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{id.title}</AlertDialogTitle>
        <AlertDialogDescription>
          <Image
            src={typeof id.styleImage === "string" ? id.styleImage : ""}
            alt="product photo"
            height={200}
            className="mx-auto"
            width={200}
          />
          <h1>Price : {id.amount}</h1>
          <h1>Brand : {id.brandName}</h1>
          <h1>Color : red</h1>
          <h1>Quantity: 100</h1>

          <h1>Category : </h1>
          {Array.isArray(id.categories)
            ? id.categories.join(", ")
            : typeof id.categories === "string" ||
                typeof id.categories === "number"
              ? id.categories
              : "Invalid data"}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
