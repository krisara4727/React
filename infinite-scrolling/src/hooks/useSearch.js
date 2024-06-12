import { useEffect, useRef, useState } from "react";
import { getImagesUrl } from "../components/apis";
import { apiKey } from "../constants.js";
import axios from "axios";

function useSearch(query, pageNumber) {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [data, setData] = useState([]);
  const firstRendering = useRef(true);
  const getData = () => {
    setLoading(true);
    setData([]);
    axios({
      method: "GET",
      url: getImagesUrl,
      params: {
        api_key: apiKey,
        q: query,
        limit: 20,
        offset: 50 * pageNumber,
      },
    })
      .then((res) => {
        setLoading(false);
        setData(
          (prevData) =>
            (prevData = [...new Set([...prevData, ...res.data.data])])
        );
        if (res.data.data.length > 0) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
        console.log(res.data.data);
      })
      .catch((er) => {
        setLoading(false);
        console.log(er);
      });
  };
  useEffect(() => {
    console.log(pageNumber);
    if (firstRendering.current || pageNumber != 0) {
      getData();
      firstRendering.current = false;
    }
  }, [pageNumber]);

  return { loading, data, hasMore, getData };
}
export default useSearch;
