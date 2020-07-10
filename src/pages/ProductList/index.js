import React, { useState, useEffect } from 'react';
import { FiShoppingCart, FiEdit2 } from 'react-icons/fi';
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
      quantity: 1,
      add: []
    }
    setSelectedItems([...selectedItems, productObject]);
  }

  function removeFromCart(product) {
    const filteredItems = selectedItems.filter(item => item.name !== product.name)
    setSelectedItems(filteredItems)
  }

  function handleOrder() {
    const orderText = selectedItems.toString();
    setOrder(orderText)
    console.log(orderText);
    setOrderURL(`https://api.whatsapp.com/send?phone=553194110059&text=Olá, gostaria de ${orderText}`)
  }
  
  function isSelected(product, product2){
    return product.name === product2.name;
  }
  function upQuantity(product){
   const newquantity = []
    selectedItems.map(element => {
      if(element.name === product.name)
      element.quantity++

      newquantity.push(element)
    });
    setSelectedItems(newquantity)
  }
  function downQuantity(product){
    const newquantity = []
     selectedItems.map(element => {
       if(element.name === product.name)
       if(element.quantity <= 1){
         return null
       }else{
         element.quantity--
       }
 
       newquantity.push(element)
     });
     setSelectedItems(newquantity)
   }

  return (
    <div>
      <button onClick={() => console.log(selectedItems)}>olá</button>
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
                {selectedItems.filter(item => isSelected(product, item)).length > 0 ? (
                  <div>
                    <button onClick={() => upQuantity(product)}>+</button>
                    <p>{selectedItems.filter(item => isSelected(product, item))[0].quantity}</p>
                    <button onClick={() => downQuantity(product)}> - </button>
                    <button onClick={() => removeFromCart(product)}>x</button>
                    <button><FiEdit2 size={10} color='#000'/></button>
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