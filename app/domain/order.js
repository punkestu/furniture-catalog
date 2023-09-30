const {Model, Models} = require("./model");

class Order extends Model{
    productID;
    qty;
    state;
    clientID;

    constructor({ID, productID, qty, state, clientID}) {
        super(ID);
        this.productID = productID;
        this.qty = qty;
        this.state = state;
        this.clientID = clientID;
    }

    async Product(productRepo){
        return (await productRepo.Load({ID: this.productID})).First();
    }

    async Cost(productRepo) {
        return (await this.Product(productRepo)).price * this.qty;
    }
}

class Orders extends Models{
    constructor(orders) {
        super(orders);
    }
    TotalCost(productRepo) {
        return this.Data().reduce(async (total, order)=>{
            return total + (await order.Cost());
        });
    }
}

module.exports = {
    Order, Orders
}