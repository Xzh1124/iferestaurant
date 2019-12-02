class Restaurant {
    constructor(config) {
        this.name = config.name;
        this.cash = config.cash;
        this.seats = config.seats;
        this.staff = config.staff;
        this.cusEatList = ['空座', '空座', '空座', '空座']
        this.waitQueue = [];
        this.first = true;
        this.timer = null;
        this.cook = [];
        this.waiter = [];
    }
    refreshQueue() {


        var childs = queue.childNodes;
        for (var i = childs.length - 1; i >= 0; i--) {
            queue.removeChild(childs[i]);
        }

        for (let i = 0; i < this.waitQueue.length; i++) {
            var img = document.createElement('img');

            img.src = './img/customer.png';

            queue.appendChild(img)

        }
    }
    stepIn() {
        console.log('开始啦');
        // let img = document.createElement('img');
        // img.src = './img/customer.png';
        // customer.insertBefore(img, customer.childNodes[0]);
        // if (this.waitQueue.length > 0) {
        //     let length = this.restSeat.length
        //     for (let i = 0; i < length && this.waitQueue.length > 0; i++) {

        //         setTimeout(() => {
        // this.waitQueue[0].Seat();

        // this.cusEatList.push(this.waitQueue[0])

        this.waitQueue[0].state = 1;
        this.waitQueue[0].index = this.restSeat.shift();

        this.cusEatList[this.waitQueue[0].index] = this.waitQueue[0];
        this.waitQueue.shift();
        console.log("客人入座，呼叫服务员 " + new Date().getSeconds() + "");
        //   Waiter().callByCus(this);
        //                 }, 0)
        //             }
        // /
        //         } else {
        //             console.log('没有客人了');
        //             return;
        //         }
    }
    hireCook(employee) {
        let len = this.cook.push(employee);
        employee.id = 1000 + len;
        cookinfrefresh();
        employee.Work();
    }
    hireWaiter(employee) {
        let len = this.waiter.push(employee);
        employee.id = 1000 + len;
        waiterfresh();
        employee.Work();
    }
    fireCook(employee) {
        this.cook.pop()
        cookinfrefresh()
    }
    fireWaiter(employee) {
        this.waiter.pop()
        waiterfresh();
    }
    fire(employee) {
        for (let i = 0; i < this.staff.length; i++) {
            if (this.staff[i] === employee) {
                this.staff.splice(i, 1);
                return;
            }
        }
        console.log('职员' + employee.name + '不在职员列表中');
    }

    // Addcus(customer) {
    //     this.cusList.push(customer)
    // }
    // funPushQueue(cus) {
    //     var index = this.cusEatList.indexOf("空座");
    //     if (index != -1) {
    //         // 如果店铺有空位，则直接入座
    //         this.cusEatList[index] = cus;
    //         cus.seatindex = index;
    //         // cus.waitDishes();
    //     } else {
    //         // 店外排队
    //         if (this.waitQueue.length < 10) {
    //             this.waitQueue.push(cus);
    //         } else {
    //             // delete person;
    //         }
    //     }
    //     console.log(this.cusEatList);
    //     console.log(this.waitQueue);


    // }
    funPushQueue = (cus) => {
        var index = this.cusEatList.indexOf("空座");
        if (index != -1) {
            // 如果店铺有空位，则直接入座
            this.cusEatList[index] = cus;
            cus.seatindex = index;
            cus.Seat();
        } else {
            // 店外排队
            if (this.waitQueue.length < 10) {
                this.waitQueue.push(cus);
            } else {
                // delete person;
            }
        }
        // console.log(this.cusEatList);
        // console.log(this.waitQueue);
    }
    funCustomerComming = () => {
            clearTimeout(this.timer);
            var cus = new Customer();
            this.funPushQueue(cus);
            this.refreshQueue()
            this.timer = setTimeout(this.funCustomerComming,
                Math.floor(Math.random() * 5 + 1) * 1000)

        }
        // funCustomerComming() {                this 指向问题
        //     var cus = new Customer();
        //     console.log(this);

    //     this.funPushQueue(cus);
    // }


    genenrateCus() {
        this.timer = setTimeout(this.funCustomerComming,
            Math.floor(Math.random() * 5 + 1) * 1000)
    }
    finish = (seatindex) => {
        this.cusEatList[seatindex] = '空座';
        if (this.waitQueue.length > 0) {
            this.cusEatList[seatindex] = this.waitQueue[0];
            this.waitQueue.shift();
            this.cusEatList[seatindex].seatindex = seatindex;
            this.cusEatList[seatindex].Seat();

        }

    }
}