var customList = (function() {
    var custom = [];
    var customInsSeat = []
    return {
        list: custom,
        first: true,
        customInsSeat: customInsSeat,
        joinIn: function(customer) {
            custom.push(customer);
        },
        stepIn: function() {
            console.log('开始啦');

            // let img = document.createElement('img');
            // img.src = './img/customer.png';
            // customer.insertBefore(img, customer.childNodes[0]);
            if (custom.length > 0) {
                setTimeout(() => {})
                custom[0].Seat();


            } else {
                console.log('没有客人了');
                return;
            }
        },
        finish: function() {
            custom.shift();
            if (this.list.length > 0) {
                console.log('下一位');

                this.list[0].Seat();
            } else {
                console.log('没有客人了');
            }


        },

        generate(time) {
            var timer = setInterval(() => {

                let num = Math.floor(Math.random() * 4) + 1;
                // console.log('num=' + num);

                // num = 10 - this.list.length;
                if (this.list.length + num > 10) {
                    num = 10 - this.list.length;
                    console.log(32154321);
                }
                for (let i = 0; i < num; i++) {
                    this.list.push(new Customer());
                }
                if (this.first) {
                    let length = ifeRestaurant.restSeats.length
                        // for (let i = 0; i < ifeRestaurant.restSeats.length; i++) {
                        //     console.log('123456')
                        //     customList.stepIn();
                        // }
                    console.log(321);
                    while (length > 0) {
                        // setTimeout(() => {
                        //     console.log('123456')
                        customList.stepIn();
                        length--
                        // }, 0)

                    }
                    this.first = false
                }
            }, time)
        }
    }



})()