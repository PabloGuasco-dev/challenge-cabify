import React from 'react'

const Modal = ({ handleClose , selectedItem }) => {
  
  return (

    <>
      <div class="p-modal" id="modal">
        <section className="Modal" overlayClassName="Overlay">
          <body className='body-modal'>
            <button className='btn btn-success pull-right' onClick={handleClose}>X</button>
            <div className='modal-container'>
              <img className='article-image' src='../bonus/assets/tshirt.png' alt='article_image' ></img>
              <div className='article-name'><p>{ selectedItem.code }</p></div>
              <div className='article-price'><p>{ selectedItem.price + "€"}</p></div>
              <hr class="solid"></hr>
            </div>
          </body>
        </section>
      </div>
    </>
  )
}

export default Modal;
