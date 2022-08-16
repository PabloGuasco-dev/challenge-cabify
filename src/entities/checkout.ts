import type Checkout from './ICheckout';

type Item  = {
    code: string,
    name: string,
    quantity: number,
    price: number,
}

class checkout implements Checkout {
    foundArticle: boolean = false;
    items: Item[] = [];
    articles: Object = {};

    constructor (articles: Object, items: Item[]) {
        this.articles = articles;
        this.items = items;
    }

    scan(code: string): this {
        const repeatedItem = this.items.find(item => item.code === code)
        if (repeatedItem) {
            repeatedItem.quantity = repeatedItem.quantity + 1;
            repeatedItem.price = repeatedItem.price + this.articles[code].price;
            let newArr = [...this.items];
            newArr[this.items.indexOf(repeatedItem)] = repeatedItem;
            this.items = [...newArr];
            this.foundArticle = true;
        } else if (this.articles[code]) {
            const newItem: Item = {
                code,
                name: this.articles[code].name,
                quantity: 1,
                price: this.articles[code].price,
            }
            this.items = [...this.items, newItem];
            this.foundArticle = true;
        }
        return this;
    }

    total(): number {
        let sum = 0;
        //TODO: import this logic from pricing-rules file
        for (let i = 0; i < this.items.length; i += 1) {
            // Buy two of them, get one free. (e.g: pay 10€ for 4 mugs)
            if (this.items[i].code === 'MUG' && this.items[i].quantity > 1) {
                sum += ~~(this.items[i].quantity / 2) * this.articles[this.items[i].code].price;
                if ((this.items[i].quantity % 2) === 1) {
                    sum += this.articles[this.items[i].code].price;
                }
            } // Buying 3 or more of this product, the price per unit is reduced by 5%
            else if (this.items[i].code === 'TSHIRT' && this.items[i].quantity > 2) {
                sum += (this.items[i].quantity * this.articles[this.items[i].code].price) - ((this.items[i].quantity * this.articles[this.items[i].code].price) * 0.05);
            } else {
                sum += this.items[i].quantity * this.articles[this.items[i].code].price;
            }
        }
        return sum;
    }
}

export default checkout;