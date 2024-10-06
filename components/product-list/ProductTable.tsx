"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ProductPagination } from "./ProductPagination";
import Image, { StaticImageData } from "next/image";

const AllData: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    brandName: "success",
    title: "ken99@yahoo.com",
    styleImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBks98xcOTXXIYF3z87erbFfZ2RE4mWK5myQ&s",
    categories: [21, 57, 71, 79, 87],
  },
  {
    id: "3u1reuv4",
    amount: 242,
    brandName: "success",
    title: "Abe45@gmail.com",
    styleImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBks98xcOTXXIYF3z87erbFfZ2RE4mWK5myQ&s",
    categories: [21, 57, 71, 79, 87],
  },
  {
    id: "derv1ws0",
    amount: 837,
    brandName: "processing",
    title: "Monserrat44@gmail.com",
    styleImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBks98xcOTXXIYF3z87erbFfZ2RE4mWK5myQ&s",
    categories: [21, 57, 71, 79, 87],
  },
  {
    id: "5kma53ae",
    amount: 874,
    brandName: "success",
    title: "Silas22@gmail.com",
    styleImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBks98xcOTXXIYF3z87erbFfZ2RE4mWK5myQ&s",
    categories: [21, 57, 71, 79, 87],
  },
  {
    id: "bhqecj4p",
    amount: 721,
    brandName: "failed",
    title: "carmella@hotmail.com",
    styleImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBks98xcOTXXIYF3z87erbFfZ2RE4mWK5myQ&s",
    categories: [21, 57, 71, 79, 87],
  },
];

export type Payment = {
  id: string;
  amount: number;
  brandName: string;
  title: string;
} & Record<
  string,
  string | number | boolean | number[] | string[] | StaticImageData
>;

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "styleImage",
    header: "Image",
    cell: ({ row }) => (
      <div className="capitalize">
        {" "}
        <Image
          alt="photo"
          src={row.getValue("styleImage")}
          width={80}
          height={80}
          className="object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-center "
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "brandName",
    header: "brandName",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("brandName")}</div>
    ),
  },
  {
    accessorKey: "categories",
    header: "categories",
    cell: ({ row }) => {
      const categoriesArray = row.getValue("categories") as number[];
      return <div className="capitalize">{categoriesArray.length}</div>;
    },
  },

  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];

export function ProductTable() {
  const [originalData] = React.useState(AllData); // Keep the original data separate
  const [data, setData] = React.useState(AllData); // Store the filtered data
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [currentPage, setCurrentPage] = React.useState(1);

  const itemsPerPage = 2;

  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage]);

  const table = useReactTable({
    data: paginatedData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const [brandName, setBrandName] = React.useState("All Brands");

  const uniqueBrandNames = [
    "All Brands",
    ...Array.from(new Set(AllData.map((item) => item.brandName.toLowerCase()))),
  ];

  const brandChanged = (brand: string) => {
    setBrandName(brand);
    if (brand === "All Brands") {
      setData(originalData); // Reset to original data
    } else {
      const currentData = originalData.filter(
        (singleData) => singleData.brandName.toLowerCase() === brand
      );
      setData(currentData);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter titles..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="ml-auto">
              Brand Name <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {uniqueBrandNames.map((brand, id) => (
              <DropdownMenuCheckboxItem
                key={id}
                className="cursor-pointer"
                checked={brand === brandName}
                onCheckedChange={() => brandChanged(brand)}
              >
                {brand}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <ProductPagination
        next={() => setCurrentPage(currentPage + 1)}
        previous={() => setCurrentPage(currentPage - 1)}
        page={Math.ceil(data.length / itemsPerPage)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
