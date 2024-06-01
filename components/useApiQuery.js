// useApiQuery.js
import { useState } from 'react';
import axios from 'axios';

// Varsayılan başarı işleyicisi
const defaultHandleSuccess = (data) => {
  console.log('Data fetched successfully:', data);
};

// Varsayılan hata işleyicisi
const defaultHandleFail = (error) => {
  console.error('Error fetching data:', error);
};

const useApiQuery = ({
  url,
  method = 'GET',
  data = null,
  headers = {},
  onSuccess = defaultHandleSuccess,
  onError = defaultHandleFail
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        url,
        method,
        data,
        headers
      });
      setLoading(false);
      onSuccess(response.data);  // Callback fonksiyonunu çağır
      return response.data;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      onError(error);  // Callback fonksiyonunu çağır
      throw error;
    }
  };

  return { loading, error, fetchData };
};

export default useApiQuery;
