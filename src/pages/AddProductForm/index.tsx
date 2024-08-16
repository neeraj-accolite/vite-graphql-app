import { useState, useEffect } from 'react';
import './style.css';
import { getOrderDetails, Order, OrderDetail } from '@acc/api';
import { useAddItem } from '../../hooks/useAddItem';

interface AddProductFormProps {
    cartId?: string;
}

export default function AddProductForm(props: AddProductFormProps) {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [orders, setOrders] = useState<OrderDetail | null>(null);

    const onItemAddedToCart = () => {
        location.href = '#';
    }

    const { addItemToCart } = useAddItem(onItemAddedToCart);

    useEffect(() => {
        setTimeout(async () => {
            //set time out added to get the loading effects 
            const orderData = await getOrderDetails(2);
            setOrders(orderData);
            setLoading(false);
        }, 100);
    }, []);

    const onAddBtnClicked = (product: Order) => {
        addItemToCart(product, props.cartId);
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
                        isLoading ?
                            <div id="loader" style={{ marginTop: '30px', marginBottom: '30px' }}></div>
                            :
                            <div className='scrollBarForm'>
                                {
                                    orders?.products &&
                                    orders.products.map(order => {
                                        return (
                                            <div key={order.id}>
                                                <div className='users'>
                                                    <div id="detailSection">
                                                        <img src={order?.thumbnail} width={80} height={80} />
                                                    </div>
                                                    <div style={{ flex: 1 }}>
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
                                                        <button className='addToCartBtn' onClick={() => onAddBtnClicked(order)}>⨁ Add Item</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}