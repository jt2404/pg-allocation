import axios from 'axios'

export const fetchPgList = async (updatePg, setLoading, pgSearchValue) => {
    setLoading(true)
  try {
    const pgdata = await axios.get(
      `http://localhost:8000/getpg/${pgSearchValue}`,
      {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      }
    );
    updatePg(pgdata?.data);
    setLoading(false);
  } catch (error) {
    if (error?.response?.data?.result === "Please provide a valid token") {
      localStorage.removeItem("user");
    }
    setLoading(false);
  }
};
