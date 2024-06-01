import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const url = "https://compact-codex-425018-n7.lm.r.appspot.com";
export const urlDev = "http://192.168.1.104:8080";

export const errorInput = (ref) => {
  if (ref && ref.current) {
    ref.current.setNativeProps({
      style: { borderColor: 'red' },
    });
  }
};

// Varsayılan başarı işleyicisi
const defaultHandleSuccess = (data) => {
  console.log('Data fetched successfully:', data);
};

// Varsayılan hata işleyicisi
const defaultHandleFail = (error) => {
  console.error('Error fetching data:', error);
};

export const ikraAxios = async ({
  url,
  method = 'GET',
  data = null,
  headers = {},
  onSuccess = defaultHandleSuccess,
  onError = defaultHandleFail,
  tokenRequired = true,
  setLoading = null,
}) => {
  if(setLoading) {
    setLoading(true)
  }
  if (tokenRequired) {
    const token = checkTokenExpiration()
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    else {
      navigateToLoginPage();
    }
  }
  try {
    const response = await axios({
      url,
      method,
      data,
      headers
    });
    onSuccess(response.data);  // Callback fonksiyonunu çağır
    return response.data;
  } catch (error) {
    onError(error);  // Callback fonksiyonunu çağır
    throw error;
  }
};

const checkTokenExpiration = async () => {
  const token = await AsyncStorage.getItem('jwtToken');
  const expireDate = await AsyncStorage.getItem('expireDate')
  if (expireDate) {
    const currentTime = Date.now() / 1000; // current time in seconds
    if (decodedToken.exp < currentTime) {
      navigateToLoginPage()
    } else {
      return token;
    }
  }
};

const navigateToLoginPage = () => {
  alert("Oturum süreniz doldu. Tekrar giriş yapınız.")
  console.log("navigating login page")
}