import './style.css';
import { useProfiles } from '../../hooks/useProfiles';
import CartItem from '../../components/CartItem';
import { useParams } from 'react-router-dom';
import { CartItemData } from '@types';

export default function CartPage() {
  const params = useParams<{cartId:string}>();
  const {cart, loading, error, refetch} = useProfiles(params.cartId);
  console.log('aa ',cart?.items);
  return (
    <div id="container">
      <h1> Shopping Cart </h1>
      <div>
          {
          loading?
          <div id="loader"></div>
          :
          error ? 
          <div className="error">{error.message}</div>
          :
          <div className='cartContainer'>
            {
              cart?.items.map((item:CartItemData) => {
                return (
                  <CartItem item={item} key={item.id}/>
                ) 
              })
            }
          </div>
          }
        </div>
    </div>
  );
}
