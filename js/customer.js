  class Customer {
      constructor() {
          this.name = initName();
          this.course = [];
          this.toEatNum = 0;
          this.toEatList = [];
          this.toServeNum = 0;
          this.state = ''; //state 0 排队  1 等待点餐 2 吃
          this.seatindex = -1;
          this.eating = ''
      }

      Seat = () => {
          this.state = 'waittoorder';
          seatfresh(this.seatindex)
          console.log("客人入座，开始点菜 " + new Date().getSeconds() + "");
          for (let i in ifeRestaurant.waiter) {
              if (ifeRestaurant.waiter[i].state === 'wait') {
                  ifeRestaurant.waiter[i].callByCus(this);
                  break;
              }
          }


      }
      oneEat = (time) => {
          this.eating = this.toEatList[0];
          let times = 0;
          let Time = time;
          return new Promise((resolve) => {
              var timer = setInterval(() => {
                  let restTime = ((Time - (++times) * 100) / 1000).toFixed(1);
                  if (restTime < 0) {
                      clearInterval(timer);
                      resolve();
                  }
                  //        else
                  //           cusState.innerHTML = '吃菜剩余:' + restTime + 's';
              }, 100);
          });
      }
      OrderCourse = (cus) => {
          //点菜
          let list = [];
          this.course = menuList.Select(cus);
          //   console.log(this.course);
          this.toServeNum = this.course.length;
          for (var i in this.course) {
              list.push(this.course[i].name);
              ifeRestaurant.cash += this.course[i].price - this.course[i].cost;

          }
          cashrefresh()
          list = list.join(',');
          //   //   totalCash.innerHTML = ifeRestaurant.cash;
          console.log("客人【" + cus.name + "】【" + cus.seatindex + "】点了【" + list + "】" + new Date().getSeconds() + "");
          eatrefresh(this.seatindex)

          //   console.log(list);
          //   console.log(cook.toDoList);
          return this.course;
      }
      sub = (i) => {
          this.toEatNum = this.toEatNum - 1;
          this.course[i].state = 'done';
          console.log(this.name + '减了   ' + this.toEatNum);


      }
      Eat = () => {
          let course = {};
          for (let i of this.course) {
              if (i.name === this.toEatList[0]) {
                  i.state = 'eating';
                  course = i;
                  break;
              }
          }
          eatrefresh(this.seatindex)
          this.oneEat(2 * timeEle).then(() => {
              //   a.innerHTML = '已吃完';
              console.log("【" + this.name + "】吃了【" + this.toEatList[0] + "】");
              //   for (let i of this.course) {
              //       if (i.name === this.toEatList[0]) {
              //           i.state = 'done'
              //       }
              //   }
              course.state = 'done'
              eatrefresh(this.seatindex)
              this.toEatList.shift();
              //   console.log(this.toServeNum);
              //   console.log(this.course);
              //   this.course.shift();
              if (this.toEatList.length > 0) {
                  this.Eat();

              } else
                  this.state = 'waittoeat';
              if (this.toEatList.length === 0 && this.toServeNum === 0) {
                  console.log("" + this.name + "用餐完毕，离开 " + new Date().getSeconds() + "");
                  ifeRestaurant.finish(this.seatindex);
                  return
              }
          })



      }
  }