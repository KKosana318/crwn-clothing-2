import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CustomButton from '../custom-button/custom-button.component';

import './product-card.styles.scss'

const ProductCard = ({product}) => {
    const {name, imageUrl, price} = product
    const  {addToCart} = useContext(CartContext)

    return (
      <div className="product-card-container">
        <img src={imageUrl} alt={`${name}`} />
        <div className="footer">
          <span className="name">{name}</span>
          <span className="price">{price}</span>
        </div>
        <CustomButton onClick={() => addToCart(product)} buttonType="inverted">Add to cart</CustomButton>
      </div>
    );
}

export default ProductCard
