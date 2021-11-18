import { useDispatch } from "react-redux";
import { setPage } from "../../store/actions/filters";

const Pagination = ({ length, currentPage }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
      <div
        onClick={() => {
          dispatch(setPage(currentPage - 1));
        }}
        className={`px-3 py-2 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200
        ${currentPage === 0 ? "opacity-10" : "opacity-100"}
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>
      {Array.from(new Array(length)).map((page, index) => (
        <div
          className={`px-3 py-2 rounded-lg cursor-pointer ${
            currentPage === index
              ? "bg-blue-400"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          key={index}
          onClick={() => {
            dispatch(setPage(index));
          }}
        >
          {index + 1}
        </div>
      ))}
      <div
        onClick={() => {
          dispatch(setPage(currentPage + 1));
        }}
        className={`px-3 py-2 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200
        ${currentPage === length - 1 ? "opacity-10" : "opacity-100"}
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
};

export default Pagination;
