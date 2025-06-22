import { setCookie, getCookie } from './cookie';
import { TIngredient, TOrder, TUser } from './types';

export const BASE_URL =
  process.env.BURGER_API_URL || 'https://norma.nomoreparties.space/api';

const checkResponse = <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

const checkSuccess = <T extends { success: boolean }>(res: T): Promise<T> => {
  if (res && res.success) {
    return Promise.resolve(res);
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

const request = <T extends { success: boolean }>(
  endpoint: string,
  options?: RequestInit
): Promise<T> =>
  fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse<T>)
    .then(checkSuccess);

type TServerResponse<T> = {
  success: boolean;
} & T;

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

export const refreshToken = (): Promise<TRefreshResponse> =>
  request<TRefreshResponse>('/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  });

export const fetchWithRefresh = async <T extends { success: boolean }>(
  endpoint: string,
  options: RequestInit
) => {
  try {
    return await request<T>(endpoint, options);
  } catch (err) {
    if ((err as { message: string }).message === 'jwt expired') {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      if (options.headers) {
        (options.headers as { [key: string]: string }).authorization =
          refreshData.accessToken;
      }
      return await request<T>(endpoint, options);
    } else {
      return Promise.reject(err);
    }
  }
};

type TIngredientsResponse = TServerResponse<{
  data: TIngredient[];
}>;

type TFeedsResponse = TServerResponse<{
  orders: TOrder[];
  total: number;
  totalToday: number;
}>;

export const getIngredientsApi = () =>
  request<TIngredientsResponse>('/ingredients').then((res) => res.data);

export const getFeedsApi = () => request<TFeedsResponse>('/orders/all');

export const getOrdersApi = () =>
  fetchWithRefresh<TServerResponse<{ orders: TOrder[] }>>(`/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken')
    } as HeadersInit
  }).then((res) => res.orders);

type TNewOrderResponse = TServerResponse<{
  order: TOrder;
  name: string;
}>;

export const orderBurgerApi = (data: string[]) =>
  fetchWithRefresh<TNewOrderResponse>(`/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken')
    } as HeadersInit,
    body: JSON.stringify({
      ingredients: data
    })
  });

type TOrderResponse = TServerResponse<{
  orders: TOrder[];
}>;

export const getOrderByNumberApi = (number: number) =>
  request<TOrderResponse>(`/orders/${number}`);

export type TRegisterData = {
  email: string;
  name: string;
  password: string;
};

type TAuthResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;

export const registerUserApi = (data: TRegisterData) =>
  request<TAuthResponse>('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });

export type TLoginData = {
  email: string;
  password: string;
};

export const loginUserApi = (data: TLoginData) =>
  request<TAuthResponse>('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });

export const forgotPasswordApi = (data: { email: string }) =>
  request<TServerResponse<{}>>('/password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });

export const resetPasswordApi = (data: { password: string; token: string }) =>
  request<TServerResponse<{}>>('/password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });

type TUserResponse = TServerResponse<{ user: TUser }>;

export const getUserApi = () =>
  fetchWithRefresh<TUserResponse>('/auth/user', {
    headers: {
      authorization: getCookie('accessToken')
    } as HeadersInit
  });

export const updateUserApi = (user: Partial<TRegisterData>) =>
  fetchWithRefresh<TUserResponse>('/auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken')
    } as HeadersInit,
    body: JSON.stringify(user)
  });

export const logoutApi = () =>
  request<TServerResponse<{}>>('/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  });
