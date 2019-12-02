var Waiter = (function(config) {
    var instance = null;
    class Waiter extends Employee {
        constructor(config) {
            super(config.name, config.salary);
            this.state = 'wait';
        }

        order(time) {
            let times = 0;
            let Time = time;
            return new Promise((resolve) => {
                var timer = setInterval(() => {
                    let restTime = ((Time - (++times) * 100) / 1000).toFixed(1);


                    if (restTime < 0) {
                        clearInterval(timer);
                        resolve();
                    }
                    // else
                    //     cusState.innerHTML = '点菜剩余:' + restTime + 's';
                }, 100);
            });
        }

        Work = (course, cus) => {
            if (course instanceof Array) {
                //若是数组，则是记录点菜
                walk(0.5 * timeEle, 'back').then(() => {
                    console.log("服务员-" + this.name + "将订单交给厨师 " + new Date().getSeconds() + "");
                    todolistrefresh();
                    for (var i in course) {
                        var arrCooking = [course[i].name, course[i].time, cus.seatindex];
                        cook.toDoList.push(arrCooking);
                    }
                    for (let i in ifeRestaurant.cook) {
                        if (ifeRestaurant.cook[i].state === 'wait') {
                            ifeRestaurant.cook[i].Work();
                        }
                    }
                    this.state = 'wait';
                    for (let i of ifeRestaurant.cusEatList) {
                        if (i.state === 'waittoorder') {
                            this.callByCus(i);
                            break;
                        }
                    }

                    // Cook().getOrder(course);
                })
            } else {
                // 若不是，则是上菜
                if (to_serve_list.length != 0) {
                    walk(0.5 * timeEle, 'go').then((course) => {
                        for (let i of course.seatIndex) {
                            for (let j in ifeRestaurant.cusEatList[i].course) {
                                if (ifeRestaurant.cusEatList[i].course[j].name === course.name) {
                                    ifeRestaurant.cusEatList[i].course[j].state = 'served';
                                    // ifeRestaurant.cusEatList[i].toEatNum++;
                                    ifeRestaurant.cusEatList[i].toEatList.push(course.name);
                                    console.log("服务员-" + this.name + "给第" + i + "桌上了" + course.name + "");
                                    ifeRestaurant.cusEatList[i].toServeNum--;
                                    break;
                                }
                            }

                            if (ifeRestaurant.cusEatList[i].state === 'waittoeat') {
                                console.log("【" + ifeRestaurant.cusEatList[i].name + "】开吃");
                                ifeRestaurant.cusEatList[i].state = 'eating';
                                ifeRestaurant.cusEatList[i].Eat();
                            }

                        }
                        // to_serve_list.shift();
                        for (let i of ifeRestaurant.cusEatList) {
                            if (i.state === 'waittoorder') {
                                this.callByCus(i);
                                return;
                            }
                        }

                        if (cook.state === 'cooking') {
                            walk(0.5 * timeEle, 'back').then(() => {
                                this.state = 'wait'
                                console.log("服务员回到了厨师旁 " + new Date().getSeconds() + "");
                            })
                        } else if (to_serve_list.length > 0) {
                            this.state = 'work';
                            this.Work();
                        } else {
                            this.state = 'wait'
                        }
                    })
                }

            }
        }
        callByCus = (cus) => {
            this.state = 'work';
            console.log("服务员-" + this.name + "被客人呼叫，开始点菜 " + new Date().getSeconds() + "");
            cus.state = 'waittoeat';
            this.order(3 * timeEle).then(() => {
                let course = cus.OrderCourse(cus);
                this.Work(course, cus);
                // console.log(list);
                // this.oneWork(list);
            })
        }
        callByCook(course) {
            this.state = 'work';
            console.log("服务员-" + this.name + "取到了【" + course.name + "】 " + new Date().getSeconds() + "");
            this.oneWork(course);
        }
    }
    return function(config) {
        instance = new Waiter(config);

        return instance;
    }
})()