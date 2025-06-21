import { TOrder } from '@utils-types';

export type TFeedInfoProps = {
  feed: {
    total: number;
    totalToday: number;
  };
  readyOrders: TOrder[];
  pendingOrders: TOrder[];
};

export type FeedInfoUIProps = {
  readyOrders: TOrder[];
  pendingOrders: TOrder[];
  feed: {
    total: number;
    totalToday: number;
  };
};

export type HalfColumnProps = {
  orders: TOrder[];
  title: string;
  textColor?: string;
};

export type TColumnProps = {
  title: string;
  content: number;
};
