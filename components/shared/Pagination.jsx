import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";

export default function Pagination({ params, setParams, dataLength }) {
  const itemsPerPage = +params.limit;
  const totalPages = Math.ceil(dataLength / itemsPerPage);
  console.log(dataLength);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setParams((prevParams) => ({
        ...prevParams,
        page: newPage,
      }));
    }
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      const buttonClass =
        +params.page === i
          ? "text-sm font-medium shadow-sm border border-border bg-white text-primary rounded-md min-w-[42px]"
          : "text-sm font-medium border border-border hover:bg-secondary rounded-md min-w-[42px]";

      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={buttonClass}
        >
          {i}
        </button>,
      );
    }
    return pageNumbers;
  };

  return (
    <div className="mt-5 flex justify-center gap-2">
      <Button
        size="icon"
        onClick={() => handlePageChange(+params.page - 1)}
        disabled={+params.page === 1}
      >
        <ChevronLeftIcon className="h-4 w-4 text-white" />
      </Button>
      {generatePageNumbers()}
      <Button
        size="icon"
        onClick={() => handlePageChange(+params.page + 1)}
        disabled={+params.page === totalPages}
      >
        <ChevronRightIcon className="h-4 w-4 text-white" />
      </Button>
    </div>
  );
}
