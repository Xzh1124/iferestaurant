var Factory = function(type, config) {
    switch (type) {
        case 'restaurant':
            return new Restaurant(config);
        case 'cook':
            return new Cook(config);
        case 'waiter':
            return new Waiter(config);
            // case this.CUSTOMER:
            //     return new Customer(config);
            // case this.DISH:
            //     return new Dish(config);
            // default:
            //     throw new Error('Unknown object type.');
    }
}