import axios from "axios";

const asterAxios = (dispatch, query, variable = {}, loadhook = '') => {
  loadhook && dispatch({ type: loadhook, value: false });
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.REACT_APP_GQL_ENDPOINT, JSON.stringify({
        query: query,
        variables: variable
      }), { headers: { 'Authorization': localStorage.getItem('jwt'), 'Content-Type': 'application/json' } })
      .then(res => {
        if (res && res.data && res.data.data && Object.keys(res.data.data).length === 1) {
          const objKey = Object.keys(res.data.data)[0];
          if (res.data.data[objKey] == null) throw Error("GQL returned null value");
          if (res.data.data[objKey] === false) throw Error("GQL returned false value");

          resolve(res.data.data[objKey]);
        } else {
          throw Error("There is error in return value");
        }
      })
      .catch((err) => {
        console.log('[Api Error]', err);
        reject(err);
      })
      .finally(() => {
        loadhook && dispatch({ type: loadhook, value: true });
      });
  });
};

export default asterAxios;