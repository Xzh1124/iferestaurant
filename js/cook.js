var Cook = (function(config) {
    var instance = null;
    let toDoList = [];

    class Cooker extends Employee {
        constructor(config) {
            super(config.name, config.salary);
            this.toDoList = toDoList;
            this.state = 'wait';
            this.current = [];
        }
        cook = (time) => {
            let times = 0;
            let Time = time;

            let length = this.toDoList.length;
            let course = {
                name: this.current[0],
                seatIndex: []
            };
            for (let i = 0; i < length; i++) {
                if (this.toDoList[i][0] === this.current[0]) {
                    course.seatIndex.push(this.toDoList[i][2])
                    this.toDoList.splice(i, 1);
                    length--;
                    i--;
                }
            }
            todolistrefresh()

            return new Promise((resolve) => {
                var timer = setInterval(() => {
                    let restTime = ((Time - (++times) * 100) / 1000).toFixed(1);

                    if (restTime < 0)

                    {
                        clearInterval(timer);
                        to_serve_list.push(course);
                        resolve(this.current);
                        this.current = '';
                    }


                }, 100);
            });
        }

        Work = () => {
            console.log("厨师-" + this.name + "开始工作");

            if (this.toDoList.length > 0) {
                this.state = 'cooking';
                this.current = this.toDoList[0];
                cookStateFresh(this)

                this.cook(this.toDoList[0][1]).then((current) => {

                    console.log("厨师-" + this.name + "做好了【" + current + "】 " + new Date().getSeconds() + "");
                    toservelistrefresh()
                    for (let i in ifeRestaurant.waiter) {
                        if (ifeRestaurant.waiter[i].state === 'wait') {
                            ifeRestaurant.waiter[i].Work();
                            break;
                        }
                    }
                    this.state = 'wait';
                    todolistrefresh()
                        // cookinfrefresh()
                    this.Work();
                })
            }

        }

    }
    return function(config) {

        instance = new Cooker(config);

        return instance;
    }
})()