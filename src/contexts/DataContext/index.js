import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

function compareDates (eventA, eventB){
  if(eventA.date > eventB.date){
    return 1;
  }
  if(eventA.date < eventB.date){
    return -1;
  }
  return 0;
}

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
  loadLast: async () => {
    const json = await fetch("/events.json");
    const dataSet = await json.json();
    const lastEvent = dataSet.events.sort(compareDates).pop();
    return lastEvent;
  }
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [last, setLast] = useState(null)
  const getData = useCallback(async () => {
    try {
      setData(await api.loadData());
      setLast(await api.loadLast());
    } catch (err) {
      setError(err);
    }
  }, []);
  useEffect(() => {
    if (data) return;
    getData();
  });
  
  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
