import {
  createContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

export const GridContext = createContext(null);

export const GridProvider = ({ children }) => {
  const [grid, setGrid] = useState(2);
  const [windowVal, setWindow] = useState({});
  const [totalGrids, setTotalGrids] = useState(4);

  useLayoutEffect(() => {
    window.onresize = () => {
      setWindow({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      });
    };

    setWindow({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    if (windowVal.innerWidth < 500) {
      setGrid(1);
      setTotalGrids(1);
    } else if (windowVal.innerWidth < 700) {
      setGrid(2);
      setTotalGrids(3);
    } else {
      setTotalGrids(4);
    }
  }, [windowVal]);

  const gridProvider = useMemo(
    () => ({
      grid,
      setGrid,
      windowVal,
      totalGrids,
      setTotalGrids,
    }),
    [grid, setGrid, windowVal, totalGrids, setTotalGrids]
  );

  return (
    <GridContext.Provider value={gridProvider}>{children}</GridContext.Provider>
  );
};
