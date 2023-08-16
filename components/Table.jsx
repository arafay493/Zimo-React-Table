import React, { useMemo } from "react";
// import { faker } from "@faker-js/faker";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import MOCK_DATA from "./MOCK_DATA.json";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { format } from "date-fns";
const Table = () => {
  // const randomName = faker.person.fullName();
  // console.log(randomName);

  const data = useMemo(() => MOCK_DATA, []);
  const COLUMNS = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "ORDER ID",
      accessorKey: "order_id",
    },
    {
      header: "TYPE",
      accessorKey: "type",
    },
    {
      header: "LISTING ID",
      accessorKey: "listing_id",
    },
    {
      header: "TICKET ENTRIES",
      accessorKey: "ticket_entries",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-2">
            <span className="pr-[45px]">{row.original.ticket_entries}</span>
          </div>
        );
      },
    },
    {
      header: "DATE",
      accessorKey: "date",
      cell: (info) => format(new Date(info.getValue()), "dd/MM/yyyy"),
    },
    {
      header: "PAYMENT METHOD",
      accessorKey: "payment_method",
      cell: ({ row }) => {
        let source =
          row.original.payment === "Visa"
            ? "/assets/visa.png"
            : row.original.payment === "Paypal"
            ? "/assets/paypal.png"
            : row.original.payment === "Mastercard"
            ? "/assets/master.png"
            : row.original.payment === "Googlepay"
            ? "/assets/gpay.png"
            : row.original.payment === "American Express"
            ? "/assets/american_express.png"
            : "/assets/ipay.png";
        return (
          <div className="flex items-center gap-2">
            <div className="w-[44px] flex justify-end">
              <img src={source} alt={row.original.payment} className="h-auto" />
            </div>{" "}
            <span className="">{row.original.cvc}</span>
          </div>
        );
      },
    },
    {
      header: "STATUS",
      accessorKey: "status",
    },
    {
      header: "PAYMENT AMOUNT",
      accessorKey: "payment_amount",
      cell: ({ row }) => {
        return (
          <div className="flex items-center ml-[18px]">
            <span className="min-w-[80px]">{row.original.payment_amount}</span>{" "}
            <span className="">GBP</span>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data,
    columns: COLUMNS,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const length = table.getPageCount();
  const Pagination = Array.from({ length }, (_, index) => index + 1);

  const limit = table.getPageCount() - 5;
  let pageIndex = table.getState().pagination.pageIndex;
  let displayPagination;
  if (pageIndex < table.getPageCount() - 5) {
    displayPagination = pageIndex + 5;
  } else {
    displayPagination = table.getPageCount();
  }

  let selected_buttons;
  if (pageIndex <= limit) {
    selected_buttons = Pagination.slice(pageIndex, displayPagination).map(
      (item, index) => (
        <button
          key={index}
          className={pageIndex + 1 === item ? "pagination_active" : ""}
          onClick={() => table.setPageIndex(item - 1)}
        >
          {item}
        </button>
      )
    );
  } else {
    selected_buttons = Pagination.slice(limit, displayPagination).map(
      (item, index) => (
        <button
          key={index}
          className={pageIndex + 1 === item ? "pagination_active" : ""}
          onClick={() => table.setPageIndex(item - 1)}
        >
          {item}
        </button>
      )
    );
  }
  return (
    <div className="flex flex-col tracking-[2px] relative z-50">
      <div className="flex-1 p-[50px] 2xl:p-[100px]">
        <div className="mb-5">
          <h2 className="text-[25px] text-[#BE9F56] mb-2">Purchase History</h2>
          <p className="text-[18px]">
            In the purchase history section, you can review and manage all your
            ZIMO orders.
          </p>
        </div>
        <div className="overflow-auto">
          <table className="mt-4 w-full">
            <thead className="border-b-[1.5px] border-black">
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <th
                          key={header.id}
                          className="py-3 text-sm cursor-pointer select-none"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <span className="flex items-center gap-2">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {
                              <span className="text-black">
                                {header.column.getIsSorted() === "desc" ? (
                                  <AiFillCaretDown />
                                ) : header.column.getIsSorted() === "asc" ? (
                                  <AiFillCaretUp />
                                ) : null}
                              </span>
                            }
                          </span>
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="text-start text-sm  min-w-[170px] py-[20px]"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="text-md flex justify-end gap-6 me-[30px] 2xl:me-[100px] mb-[40px] select-none">
        {table.getCanPreviousPage() && (
          <button
            disabled={!table.getCanPreviousPage()}
            className="transition-all ease-in-out duration-300 hover:text-[#BE9F56]"
            onClick={() => table.previousPage()}
          >
            <MdArrowBackIos />
          </button>
        )}
        {selected_buttons}
        {!(pageIndex + 1 > limit) && (
          <button
            disabled={!table.getCanNextPage()}
            className="transition-all ease-in-out duration-300 hover:text-[#BE9F56]"
            onClick={() => table.nextPage()}
          >
            <MdArrowForwardIos />
          </button>
        )}
      </div>
    </div>
  );
};

export default Table;
