type Item  = {
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


class CheckoutCabify implements Checkout {
    foundArticle: boolean = false;
    items: Item[] = [];
    articles: Object = {};
    setItems: Function = () => {};

    constructor (items:Item[], articles: Object, setItems: Function) {
        this.items = items;
        this.articles = articles;
        this.setItems = setItems;
    }

    scan(code: string): this {
        const repeatedItem = this.items.find(item => item.code === code)
        if (repeatedItem) {
            repeatedItem.quantity = repeatedItem.quantity + 1;
            repeatedItem.price = repeatedItem.price + this.articles[code].price;
            let newArr = [...this.items];
            newArr[this.items.indexOf(repeatedItem)] = repeatedItem;
            this.setItems(newArr);
            this.foundArticle = true;
        } else if (this.articles[code]) {
            const newItem: Item = {
                code,
                name: this.articles[code].name,
                quantity: 1,
                price: this.articles[code].price,
            }
            this.setItems([...this.items, newItem]);
            this.foundArticle = true;
        }
        return this;
    }
    total(): number {
        let sum = 0;
        for (let i = 0; i < this.items.length; i += 1) {
            if (this.items[i].code === 'MUG' && this.items[i].quantity > 1) {
                sum += ~~(this.items[i].quantity / 2) * this.articles[this.items[i].code].price;
                if ((this.items[i].quantity % 2) === 1) {
                    sum += this.articles[this.items[i].code].price;
                }
            } else if (this.items[i].code === 'TSHIRT' && this.items[i].quantity > 2) {
                sum += (this.items[i].quantity * this.articles[this.items[i].code].price) - ((this.items[i].quantity * articles[items[i].code].price) * 0.05);
            } else {
                sum += this.items[i].quantity * this.articles[this.items[i].code].price;
            }
        }
        return sum;
    }
}

export default CheckoutCabify;