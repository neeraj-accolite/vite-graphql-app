import './style.css';
import { useProfiles } from '../../hooks/useProfiles';
import CartItem from '../../components/CartItem';
import { useParams } from 'react-router-dom';
import { CartItemData } from '@types';
import { useState } from 'react';
import AddProductForm from '../AddProductForm';

export default function CartPage() {
  const params = useParams<{cartId:string}>();
  const {cart, loading, error, refetch} = useProfiles(params.cartId);
  const [showAddProductForm, setShowAddProductForm] = useState<boolean>(false);

  const onAddItem = ()=> {
    setShowAddProductForm(true);
  }

  const onCartUpdated = ()=>{
    refetch();
  }

  return (
    <div id="container">
      <div className='headingCart'>
        <h1> Shopping Cart </h1>
        <div className='cartSummaryContainer'>
          {
            cart?.items?.length>0 && 
              <label className='cartLength'>
                Total Items In Cart : <b>{cart?.items?.length}</b>
              </label>
          }
        </div>
        <div className='addBtnCart'>
          <a href='#add-cart-item' className='addItemBtn' onClick={onAddItem}>⨁ Add more item to the cart</a>
        </div>
      </div>
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
        {showAddProductForm && <AddProductForm  cartId={params.cartId} onCartUpdated={onCartUpdated}/>}
    </div>
  );
}
