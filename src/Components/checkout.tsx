import React, { useEffect, useState } from 'react';
import { useGetData } from '../Hooks/useApiCall.js';
import Modal from './modal';

interface Item {
    code: string,
    name: string,
    quantity: number,
    price: number,
}

interface Checkout {
    foundArticle: boolean;
    /**
     * Scans a product adding it to the current cart.
     * @param code The product identifier
     * @returns itself to allow function chaining
     */
    scan(code: string): this;
    /**
     * Returns the value of all cart products with the discounts applied.
     */
    total(): number;
}

const CheckoutView = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [show, setShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState()

    let articles: any = {};

    //implementing extended interface
    class CheckoutCabify implements Checkout {
        foundArticle = false;

        scan(code: string): this {
            const repeatedItem = items.find(item => item.code === code)
            if (repeatedItem) {
                repeatedItem.quantity = repeatedItem.quantity + 1;
                repeatedItem.price = repeatedItem.price + articles[code].price;
                let newArr = [...items];
                newArr[items.indexOf(repeatedItem)] = repeatedItem;
                setItems(newArr);
                this.foundArticle = true;
            } else if (articles[code]) {
                const newItem: Item = {
                    code,
                    name: articles[code].name,
                    quantity: 1,
                    price: articles[code].price,
                }
                setItems([...items, newItem]);
                this.foundArticle = true;
            }
            return this;
        }
        total(): number {
            let sum = 0;
            for (let i = 0; i < items.length; i += 1) {
                if (items[i].code === 'MUG' && items[i].quantity > 1) {
                    sum += ~~(items[i].quantity / 2) * articles[items[i].code].price;
                    if ((items[i].quantity % 2) === 1) {
                        sum += articles[items[i].code].price;
                    }
                } else if (items[i].code === 'TSHIRT' && items[i].quantity > 2) {
                    sum += (items[i].quantity * articles[items[i].code].price) - ((items[i].quantity * articles[items[i].code].price) * 0.05);
                } else {
                    sum += items[i].quantity * articles[items[i].code].price;
                }
            }
            return sum;
        }
    }

    const checkoutCabify = new CheckoutCabify();

    articles = useGetData().data;

    useEffect(() => {
        setTotal(checkoutCabify.total);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);

    const addItem = (event) => {
        if (event.target.value !== "") {
            const foundArticle = checkoutCabify.scan(event.target.value).foundArticle;
            if (foundArticle) {
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
            <input onChange={(event) => addItem(event)} type="text" className="form-control"></input>
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
