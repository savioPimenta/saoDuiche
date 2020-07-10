import React, { useState, useEffect } from 'react';
import { FiShoppingCart, FiEdit2 } from 'react-icons/fi';
import AllProducts from '../../services/products'
import AllAdditional from '../../services/additional'


import './styles.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [additional, setAdditional] = useState([]);
  const [btnAdditional, setBtnAdditional] = useState(false)
  const [selectedItems, setSelectedItems] = useState([]);
  const [btn, setBtn] = useState(false);
  // eslint-disable-next-line
  const [order, setOrder] = useState('');
  const [orderURL, setOrderURL] = useState('');

  useEffect(() => {
    setProducts(AllProducts)
    setAdditional(AllAdditional)
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
      quantity: 1,
      name: product.name,
      add: []
    }
    setSelectedItems([...selectedItems, productObject]);
  }

  function removeFromCart(product) {
    const filteredItems = selectedItems.filter(item => item.name !== product.name)
    setSelectedItems(filteredItems)
  }

  function handleOrder() {
    let orderText = ''
    selectedItems.map((product, i) => {
      orderText += `${product.quantity} `
      orderText += product.name
      if(product.add.length > 0){
        orderText += ' com: '
        product.add.map((add, i) => {
          if(i + 1 === product.add.length){
            orderText += add
          }else{
            orderText += `${add}, `
          }
        })
      }
      if(i+1 === selectedItems.length){
        orderText += '.'
      }else{
        orderText += ', '
      }
      return orderText
    })
    console.log(orderText);
    setOrder(orderText)
    setOrderURL(`https://api.whatsapp.com/send?phone=553798116650&text=Olá, gostaria de ${orderText}`)
  }

  function isSelected(product, product2) {
    return product.name === product2.name;
  }
  function upQuantity(product) {
    const newquantity = []
    selectedItems.map(element => {
      if (element.name === product.name)
        element.quantity++

      newquantity.push(element)
    });
    setSelectedItems(newquantity)
  }
  function addAdditional(product, additional) {
    const newAdditional = []
    selectedItems.map(element => {
      if (element.name === product.name)
        element.add.push(additional.name)

      newAdditional.push(element)
    });
    setSelectedItems(newAdditional)
  }
  function downQuantity(product) {
    const newquantity = []
    selectedItems.map(element => {
      if (element.name === product.name)
        if (element.quantity <= 1) {
          return null
        } else {
          element.quantity--
        }

      newquantity.push(element)
    });
    setSelectedItems(newquantity)
  }
  function setAdditionalArea() {
    setBtnAdditional(true)
  }
  function removeAdditionalArea() {
    setBtnAdditional(false)
  }

  return (
    <div>
      <div className="products">
        <ul>
          {products.map((product, id) => (
            <>
              <li key={product.id} className="product-item">
                <>
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
                      {product.type === 'Sanduíches Tradiconais' ||
                        product.type === 'Sanduíches Especiais' ||
                        product.type === 'Turma da Picanha' ||
                        product.type === 'Turma do Greladão' 
                    ?
                        <button onClick={setAdditionalArea}><FiEdit2 size={10} color='#000' /></button>
                        : null}

                    </div>
                  ) : (
                      <button onClick={() => addToCart(product)}>adicionar ao carrinho</button>
                    )}
                  {product.type === 'Sanduíches Tradiconais' && btnAdditional ||
                        product.type === 'Sanduíches Especiais' && btnAdditional||
                        product.type === 'Turma da Picanha' && btnAdditional||
                        product.type === 'Turma do Greladão' && btnAdditional
                         ? (
                    <div>
                      {AllAdditional.map(additional => (
                        <button
                          onClick={() => addAdditional(product, additional)}>
                          {additional.name}
                          {additional.price}
                        </button>
                      ))}
                      <button onClick={removeAdditionalArea}>confirmar</button>
                    </div>
                  ) : null}
                </>
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