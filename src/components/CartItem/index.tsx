import {  CartItemData } from '@types';
import './style.css';

interface CartItemProps{ 
    item: CartItemData
}

export default function CartItem(props: CartItemProps) {
    return (
        <div className="container">
            <div className='imageContainer'>
                <img width={150} height={150} src={props.item.images} />
            </div>
            <div className='details'>
                <div className='productName'>
                    <label>{props.item.name}</label>
                </div>
                <div className='stock'>
                    <label>In stock</label>
                </div>
                <div className='description'>
                    <label>{props.item.description}</label>
                </div>
                <div className='quantityContainer'>
                    <label className='quantityLabel'>Quantity: </label>
                    <label className='quantityVal'> {props.item.quantity}</label>
                </div>
                <div className='quantityContainer'>
                    <label className='priceLabel'>Price: </label>
                    <label className='priceVal'> ₹ {props.item.unitTotal?.amount}.00</label>
                </div>
            </div>
            <div className='price'>
                <label className='priceLabel'>Total Item Price: </label>
                <label className='priceVal'>₹ {props.item.lineTotal?.amount}.00</label>
            </div>
        </div>
    )
}