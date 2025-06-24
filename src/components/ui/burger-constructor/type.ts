import { TConstructorIngredient, TOrder } from '@utils-types';

export type TBurgerConstructorUIProps = {
  price: number;
  orderRequest: boolean;
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
