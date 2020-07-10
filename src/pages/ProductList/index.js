import React, { useState, useEffect } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import AllProducts from '../../services/products'

import './styles.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [btn, setBtn] = useState(false);
  // eslint-disable-next-line
  const [order, setOrder] = useState('');
  const [orderURL, setOrderURL] = useState('');

  useEffect(() => {
    setProducts(AllProducts)
  }, [products])

  useEffect(() => {
    if (selectedItems.length !== 0) {
      setBtn(true)
    } else {
      setBtn(false)
    }
  }, [selectedItems])

  function addToCart(product) {
    const productObject = {
      name: product.name,
      quantity: 1
    }
    setSelectedItems([...selectedItems, productObject]);
    console.log(selectedItems);
  }

  function removeFromCart(product) {
    const filteredItems = selectedItems.filter(item => item !== product.name)
    setSelectedItems(filteredItems)
  }

  function handleOrder() {
    const orderText = selectedItems.toString();
    setOrder(orderText)
    console.log(orderText);
    setOrderURL(`https://api.whatsapp.com/send?phone=553194110059&text=Olá, gostaria de ${orderText}`)
  }
  
  function isSelected(product, product2){
    return product.name === product2;
  }

  return (
    <div>
      <div className="products">
        <ul>
          {products.map((product, id) => (
            <>
              <li key={product.id} className="product-item">
                <img src={require('../../assets/headerlogo4.png')} alt="Foto do produto" />
                <p className="productInfo">
                  {product.info}
                </p>
                <strong className="productName">
                  {product.name}
                </strong>
                <p className="productPrice">{product.price}</p>
                {console.log(selectedItems.filter(item => item.name === 'oi')) ? (
                  <div>
                    <button>+</button>
                    <p>1</p>
                    <button> - </button>
                    <button onClick={() => removeFromCart(product)}>x</button>
                  </div>
                ) : (
                    <button onClick={() => addToCart(product)}>adicionar ao carrinho</button>
                  )}
              </li>
              {/* {products.map(product => {
              const i = 0;
              if(products.length < i + 1)
                if(products[i+1].type !== product.type)
                  return <span>{products[i+1].type}</span>
            })} */}
            </>
          ))}
        </ul>


      </div>
      <>
        {btn === true ?
          <div className="cartBtnContainer">
            <a href={orderURL}>
              <button className="cartBtn" onClick={handleOrder}>
                <FiShoppingCart size={15} color="#FFF" className="cartIcon" strokeWidth={3} />
            Finalizar Compra
          </button>
            </a>
          </div>
          : null}
      </>
    </div>
  )
}

export default ProductList;