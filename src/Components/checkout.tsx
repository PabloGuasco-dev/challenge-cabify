import React, { useEffect, useState } from 'react';
import { useGetData } from '../hooks/useApiCall.tsx';
import Modal from './modal.tsx';
import checkout from '../entities/checkout.ts'

type Item  = {
    code: string,
    name: string,
    quantity: number,
    price: number,
}

const CheckoutView = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [show, setShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState()

    let articles: Object = {};
    let co:checkout = undefined;
    
    articles = useGetData().data;
    
    if(articles && !co) {
        co = new checkout(articles, items);
    }

    useEffect(() => {
        if(articles && co) {
            setTotal(co.total());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);

    const addItem = (event) => {
        if (event.target.value !== "") {
            const { foundArticle, items } = co.scan(event.target.value);
            if (foundArticle) {
                setItems([...items]);
                setTimeout(() => {
                    event.target.value = "";
                }, 200)
            }
        }
    }

    const reset = () => {
        setItems([]);
        setTotal(0);
    }

    const handleClose = () => {setShow(false)};
    const handleShow = (item) => {
        setSelectedItem(item);
        setShow(true);        
    }

    return (
        <><div className="form-group">
            <label>Insert Code:</label>
            <input placeholder="For example: MUG, TSHIRT, CAP..." onChange={(event) => addItem(event)} type="text" className="form-control"></input>
            <div className="container-table">
                <table className="table">
                    <thead>
                        <tr className='listItem'>
                            <th>Code</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items && items.map((item) => <tr className='listItem' onClick={() => handleShow(item)} key={item.code}>
                            <td>{item.code}</td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>...</td>
                        </tr>)}
                    </tbody>
                </table>
                <label>Total: {total}</label>
            </div>
            <button type="button" className="btn btn-primary" onClick={reset}>Reset</button>
        </div>{ show && <Modal handleClose={ handleClose } selectedItem={ selectedItem }>
                        </Modal>}</>
    )
}

export default CheckoutView;
