import React from 'react'

const Modal = ({ handleClose , selectedItem }) => {
  
  return (

    <>
      <div className="p-modal" id="modal">
        <section className="Modal">
          <body className='body-modal'>
            <button className='btn btn-success pull-right' onClick={handleClose}>X</button>
            <div className='modal-container'>
              <img className='article-image' src='../bonus/assets/tshirt.png' alt='article_image' ></img>
              <div className='article-name'><p>{ selectedItem.code }</p></div>
              <div className='article-price'><p>{ selectedItem.price + "€"}</p></div>
              <div className='article-detail'><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                In sodales semper elit sit amet interdum. Praesent volutpat 
                sed elit vel consectetur. Nulla tempus tincidunt ex, 
                sit amet semper ipsum imperdiet varius. In rutrum aliquam nisl, 
                sagittis faucibus felis bibendum id.</p></div>
            </div>
          </body>
        </section>
      </div>
    </>
  )
}

export default Modal;
