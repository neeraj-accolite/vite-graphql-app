import './style.css';
import { useCart } from '../../hooks/useCart';
import CartItemComponent from '../../components/CartItem';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import AddProductForm from '../AddProductForm';

export default function CartPage() {
  const params = useParams<{ cartId: string }>();
  const { cart, loading, error, refetch } = useCart(params.cartId);
  const [showAddProductForm, setShowAddProductForm] = useState<boolean>(false);

  const onAddItem = () => {
    setShowAddProductForm(true);
  }

  const syncCart = () => {
    refetch();
  }

  const onCartUpdated = () => {
    // refetch();
  }

  return (
    <div id="container">
      <div className='headingCart'>
        <h1> Shopping Cart </h1>
        <div className='cartSummaryContainer'>
          {
            (cart?.items?.length || 0) > 0 &&
            <label className='cartLength'>
              Total Items In Cart : <b>{cart?.items?.length}</b>
            </label>
          }
          {
            (cart?.grandTotal?.amount || 0) > 0 &&
            <div className='totalAmountContainer'>
              <label className='totalAmountLabel'>
                Total Cart Amount: <b>{cart?.grandTotal?.formatted}</b>
              </label>
            </div>
          }
        </div>
        <div className='addBtnCart'>
          <a href='#add-cart-item' className='addItemBtn' onClick={onAddItem}>⨁ Add more item to the cart</a>
          <button className='syncCartButton' onClick={syncCart}>Sync Cart</button>
        </div>
      </div>
      <div>
        {
          loading ?
            <div id="loader"></div>
            :
            error ?
              <div className="error">{error.message}</div>
              :
              <div className='cartContainer'>
                {
                  cart?.items?.map((item) => {
                    return (
                      <CartItemComponent item={item} key={item.id} />
                    )
                  })
                }
              </div>
        }
      </div>
      {showAddProductForm && <AddProductForm cartId={params.cartId} onCartUpdated={onCartUpdated} />}
    </div>
  );
}
