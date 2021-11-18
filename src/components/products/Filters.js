import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RESET_FILTERS } from "../../constants";
import {
  setCategory,
  setPriceRange,
  setRating,
  setStockAvailability,
} from "../../store/actions/filters";
import { GridContext } from "../../store/context/GridProvider";

const Filters = () => {
  const dispatch = useDispatch();

  const [avail, setAvail] = useState(1);
  const [rating, setRatingVal] = useState(1);

  const [price, setPrice] = useState({
    min: 200,
    max: 100000,
  });

  return (
    <div>
      <div className="max-w-xl mx-auto mb-6 px-4 py-2 bg-gray-100 rounded-lg flex flex-col md:flex-row items-center justify-between">
        <div>
          <PriceRange price={price} setPrice={setPrice} />
          <div className="flex w-full mt-2 gap-x-4">
            <div className="2/3">
              <StockAvailabitity avail={avail} setAvail={setAvail} />
            </div>
            <div className="1/3">
              <RatingRange rating={rating} setRatingVal={setRatingVal} />
            </div>
          </div>
        </div>
        <div className="flex md:flex-col items-end justify- gap-3 md:w-1/2">
          <button
            onClick={() => {
              console.log(avail, rating, price);
              dispatch(setStockAvailability(Number(avail)));
              dispatch(setRating(Number(rating)));
              dispatch(setPriceRange(Number(price.min), Number(price.max)));
            }}
            className="px-5 py-2 rounded-lg bg-blue-500 text-white font-light"
          >
            Apply filters
          </button>
          <button
            onClick={() => {
              setAvail(1);
              setRatingVal(1);
              setPrice({
                min: 200,
                max: 100000,
              });

              dispatch({ type: RESET_FILTERS });
            }}
            className="px-5 py-2 rounded-lg bg-red-500 text-white font-light"
          >
            Reset filters
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row justify-between sm:items-center">
        <CategoryNavigation />
        <GridLayoutSelector />
      </div>
    </div>
  );
};

export default Filters;

const GridLayoutSelector = () => {
  const { grid, setGrid, windowVal, totalGrids, setTotalGrids } =
    useContext(GridContext);

  return (
    <div>
      <label htmlFor="grid">Grids Per Row</label> <br />
      <select
        className="bg-gray-200 rounded-lg px-5 py-2"
        onChange={(e) => {
          setGrid(e.target.value);
        }}
        value={grid}
        name="grid"
        id="grid"
      >
        {Array.from(new Array(totalGrids)).map((_, index) => (
          <option key={index} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
    </div>
  );
};

const CategoryNavigation = () => {
  const navs = ["All", "Laptop", "Mobile", "Bulb"];
  const [selectedNav, setSelectedNav] = useState(navs[0]);
  const dispatch = useDispatch();

  return (
    <div className="flex gap-2  flex-wrap">
      {navs.map((nav) => (
        <div
          onClick={() => {
            setSelectedNav(nav);
            dispatch(setCategory(nav.toLowerCase()));
          }}
          className={`px-4 py-1 h-8 flex justify-center items-center rounded-full text-sm cursor-pointer
          ${
            selectedNav === nav
              ? "bg-gray-700 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }
          `}
          key={nav}
        >
          {nav}
        </div>
      ))}
    </div>
  );
};

const PriceRange = ({ price, setPrice }) => {
  return (
    <div className="flex gap-x-2 justify-start">
      <div className="w-1/2 md:w-4/12">
        <label htmlFor="min">Min</label>
        <br />
        <input
          value={price.min}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border-gray-400 px-5 py-1"
          type="number"
          id="min"
          name="min"
          min="200"
        />
      </div>
      <div className="w-1/2 md:w-4/12">
        <label htmlFor="max">Max</label>
        <br />
        <input
          value={price.max}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border-gray-400 px-5 py-1"
          type="number"
          id="max"
          name="max"
          min="500"
        />
      </div>
    </div>
  );
};

const StockAvailabitity = ({ avail, setAvail }) => {
  return (
    <div>
      <label>Stock Availability</label> <br />
      <span className="w-10 h-10 flex justify-center items-center rounded-lg bg-gray-200">
        {avail}
      </span>
      <input
        value={avail}
        onChange={(e) => {
          setAvail(e.target.value);
        }}
        type="range"
        min="1"
        max="24"
      />
      <br />
    </div>
  );
};

const RatingRange = ({ setRatingVal, rating }) => {
  return (
    <div>
      <label htmlFor="rating">Rating</label> <br />
      <select
        className="bg-gray-200 rounded-lg px-5 py-2"
        onChange={(e) => {
          setRatingVal(e.target.value);
        }}
        value={rating}
        name="rating"
        id="rating"
      >
        {Array.from(new Array(5)).map((_, index) => (
          <option key={index} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
    </div>
  );
};
