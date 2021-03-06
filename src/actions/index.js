// Coloque aqui suas actions

export const GET_USER_EMAIL = 'GET_USER_EMAIL';

export const COINS_LOADING = 'COINS_LOADING';
export const COINS_SUCCESS = 'COINS_SUCCESS';
export const COINS_FAIL = 'COINS_FAIL';

export const SPENT_SUCCESS = 'SPENT_SUCCESS';

export const DELETE_ITEM = 'DELETE_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const REPLACE_ITEM = 'REPLACE_ITEM';

export const getUserEmail = (payload) => ({
  type: GET_USER_EMAIL,
  email: payload,
});

const coinsLoading = () => ({ type: COINS_LOADING });
const coinsSuccess = (coins) => ({
  type: COINS_SUCCESS,
  coins,
});
const coinsFail = (error) => ({
  type: COINS_FAIL,
  error,
});

const spentSuccess = (payload, exchangeRates) => ({
  type: SPENT_SUCCESS,
  spent: {
    ...payload,
    exchangeRates,
  },
});

export const deleteRow = (itemId) => ({
  type: DELETE_ITEM,
  itemId,
});

// Tip from Murilo Rainho
const fetchCoinAPI = async () => {
  const apiResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
  const apiJson = await apiResponse.json();
  delete apiJson.USDT;
  return apiJson;
};

export const getCoins = () => async (dispatch) => {
  dispatch(coinsLoading);
  try {
    const coinsLabel = await fetchCoinAPI();
    // Tip from Murilo Rainho
    dispatch(coinsSuccess(Object.keys(coinsLabel)));
  } catch (error) {
    dispatch(coinsFail(error));
  }
};

export const addSpent = (payload) => async (dispatch) => {
  dispatch(coinsLoading);
  try {
    const exchangeRates = await fetchCoinAPI();
    dispatch(spentSuccess(payload, exchangeRates));
  } catch (error) {
    dispatch(coinsFail(error));
  }
};

export const editItem = (payload) => ({
  type: EDIT_ITEM,
  selectedItem: payload,
  editItem: true,
});

export const replaceItem = (itemId, payload) => ({
  type: REPLACE_ITEM,
  itemId,
  updatedItem: payload,
});
