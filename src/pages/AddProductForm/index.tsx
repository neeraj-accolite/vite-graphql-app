import { useState,useEffect } from 'react';
import './style.css';
import {getOrderDetails, Order, OrderDetail} from '@acc/api';
import { useAddItem } from '../../hooks/useAddItem';

interface AddProductFormProps {
    cartId?: string;
    onCartUpdated: ()=>{}
}

export default function AddProductForm(props: AddProductFormProps) {
    console.warn('inside form');
    const [isLoading, setLoading] = useState<boolean>(true);
    const [orders, setOrders] = useState<OrderDetail | null>(null);
    const {addItemToCart, data, loading: itemLoading, error } = useAddItem();

    useEffect(()=>{
        setTimeout(async ()=>{
          //set time out added to get the loading effects 
          const orderData = await getOrderDetails(2);
          setOrders(orderData);
          setLoading(false);
        },100);  
      },[]);

    const onAddBtnClicked = (product: Order)=> {
        addItemToCart({
            variables: {
                input: {
                    cartId:props.cartId,
                    id:product.id,
                    name: `${product.title} - Cart Item` ,
                    description: `This is the description for ${product.title} | Full BlackGreen Soul® Jupiter Pro | Office Chair | High Back Mesh Ergonomic Home Office Desk Chair  `,
                    price: parseInt(``+product.price),
                    images : product.thumbnail,
                    quantity: product.quantity
                }
              }
        });
        location.href = '#';
        props.onCartUpdated();
    }

    return (
        <div id="add-cart-item" className='modal'>
            <div className='content'>
                <div>
                    <h2>Add Item in the Cart</h2>
                    <a href='#' className='close'>&times;</a>
                </div>
                <div>
                {
                    isLoading?
                    <div id="loader" style={{marginTop:'30px', marginBottom:'30px'}}></div>
                    :
                    orders?.products && 
                    orders.products.map(order=>{
                    return(
                        <div style={{marginTop:'30px'}} key={order.id}>
                            <div className='users' >
                                <div id="detailSection">
                                    <img src={order?.thumbnail} width={80} height={80} />
                                </div>
                                <div>
                                    <div id="detailSection">
                                        <label id="fieldOrder">Product:
                                        </label>
                                        <label id="valueOrder">
                                        {order?.title}
                                        </label>
                                      </div>
                                    <div id="detailSection">
                                        <label id="fieldOrder">Quantity:</label> 
                                        <label id="valueOrder">{order?.quantity}</label>
                                    </div>
                                    <div id="detailSection">
                                        <label id="fieldOrder">Price:</label> 
                                        <label id="valueOrder">{order?.price}</label>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={()=>onAddBtnClicked(order)}>Add Item to The Cart</button>
                                </div>
                            </div> 
                        </div>
                    )
                    })
                }
                </div>
            </div>
        </div>
    )
}