import { IngredientDetails } from '../../components';
import styles from './ingredient-details-page.module.css';

export const IngredientDetailsPage = () => (
  <div className={styles.wrap}>
    <h2 className='text text_type_main-large'>Детали ингредиента</h2>
    <IngredientDetails />
  </div>
);
