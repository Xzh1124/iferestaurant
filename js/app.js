var queue = document.querySelector('.queue');

var cookinfo = document.querySelector('.information .cook');
var waiterinfo = document.querySelector('.information .waiter');
var cashinfo = document.querySelector('.information .cash');
var addwaiter = document.querySelectorAll('button')[1]
var addcook = document.querySelectorAll('button')[0]
var removewaiter = document.querySelectorAll('button')[3]
var removecook = document.querySelectorAll('button')[2]
var cookposition = document.querySelector('.restaurant .cook');
var todolist = document.querySelector('.todolist')
var seat = document.querySelector('.restaurant .seat')
var toservelist = document.querySelector('.toservelist')

var ifeRestaurant = Factory('restaurant', {
    name: "饕餮食馆",
    cash: 100000,
    seats: 4,
    staff: []
});
let waiter = Factory('waiter', {
    name: "张三",
    salary: 6000
});
let waiter1 = Factory('waiter', {
    name: "张四",
    salary: 6000
});
let waiter2 = Factory('waiter', {
    name: "张五",
    salary: 6000
});
let cook = Factory('cook', {
    name: "李四",
    salary: 10000
});
let cook1 = Factory('cook', {
    name: "李五",
    salary: 10000
});
let cook2 = Factory('cook', {
    name: "李六",
    salary: 10000
});
// totalCash.innerHTML = ifeRestaurant.cash
ifeRestaurant.hireWaiter(waiter);
ifeRestaurant.hireWaiter(waiter1);
ifeRestaurant.hireWaiter(waiter2);
ifeRestaurant.hireCook(cook);
ifeRestaurant.hireCook(cook1);
ifeRestaurant.hireCook(cook2);
initseat()

ifeRestaurant.genenrateCus();

function initseat() {
    for (let i = 0; i < ifeRestaurant.cusEatList.length; i++) {
        let span = document.createElement('span');
        span.innerHTML = '座位';
        seat.appendChild(span)
    }

}

function seatfresh(index) {
    var seatitem = document.querySelectorAll('span')[index];

    var childs = seatitem.childNodes;
    for (var j = childs.length - 1; j >= 0; j--) {
        seatitem.removeChild(childs[j]);
    }


    // for (let i in ifeRestaurant.cusEatList) {
    //     if (ifeRestaurant.cusEatList[i] instanceof Object) {
    let img = document.createElement('img');
    img.src = './img/customer.png';
    seatitem.appendChild(img);
    let inf = document.createElement('div');
    inf.setAttribute('class', 'inf');


    let name = document.createElement('p')
    name.innerHTML = ifeRestaurant.cusEatList[index].name;
    inf.appendChild(name);


    // for (let j of ifeRestaurant.cusEatList[i].course) {
    //     let eating = document.createElement('p');
    //     eating.innerHTML = j.name;
    //     if (j.state === 'toserve') {
    //         eating.setAttribute('class', 'toserve')
    //     } else if (j.state === 'served') {
    //         eating.setAttribute('class', 'served')
    //     } else if (j.state === 'done') {
    //         eating.setAttribute('class', 'done')
    //     } else if (j.state === 'eating') {
    //         eating.setAttribute('class', 'eating');
    //     }
    //     inf.appendChild(eating);
    // }
    seatitem.appendChild(inf)
        //     }
        // }
}

function eatrefresh(index) {
    var seatitem = document.querySelectorAll('span')[index];
    var inf = seatitem.querySelector('.inf');
    var childs = inf.childNodes;
    for (var j = childs.length - 1; j >= 1; j--) {
        inf.removeChild(childs[j]);
    }
    for (let j of ifeRestaurant.cusEatList[index].course) {
        let eating = document.createElement('p');
        eating.innerHTML = j.name;
        if (j.state === 'toserve') {
            eating.setAttribute('class', 'toserve')
        } else if (j.state === 'served') {
            eating.setAttribute('class', 'served')
        } else if (j.state === 'done') {
            eating.setAttribute('class', 'done')
        } else if (j.state === 'eating') {
            eating.setAttribute('class', 'eating');
            clock(2 * timeEle, eating, j.name)
        }
        inf.appendChild(eating);
    }
}

function clock(time, p, text) {
    let times = 0;
    var timer = setInterval(() => {
        let restTime = ((time - (++times) * 100) / 1000).toFixed(1);
        if (restTime < 0) {
            clearInterval(timer);
        } else {
            if (text)
                p.innerHTML = text + restTime.toString() + 's';
            else
                p.innerHTML = restTime.toString() + 's';
        }
    }, 100);
}

function cashrefresh() {
    cashinfo.innerHTML = '餐厅资金:' + ifeRestaurant.cash;
}

function cookinfrefresh() {
    var cook = [];
    for (let i of ifeRestaurant.cook) {
        cook.push(i.name)
    }
    var childs = cookposition.childNodes;
    for (var i = childs.length - 1; i >= 0; i--) {
        cookposition.removeChild(childs[i]);
    }
    var cookarr = cook.join(' ')
    cookinfo.innerHTML = '厨师:' + cookarr;
    for (var i = 0; i < ifeRestaurant.cook.length; i++) {
        var div = document.createElement('div');
        var img = document.createElement('img');
        var p = document.createElement('p');
        var time = document.createElement('p');
        time.setAttribute('class', 'time');
        var cook = ifeRestaurant.cook[i];
        img.src = './img/cook.png';
        // if (cook.current[0]) {
        //     p.innerHTML = cook.current[0];
        // } else {
        p.innerHTML = '正在做'
            // }
        time.innerHTML = '剩余时间'
        div.appendChild(img);
        div.appendChild(p);
        div.appendChild(time)
        cookposition.appendChild(div);

    }
}

function cookStateFresh(cook) {
    let index = -1;
    for (let i = 0; i < ifeRestaurant.cook.length; i++) {
        if (cook.name === ifeRestaurant.cook[i].name) {
            index = i
            break
        }
    }
    console.log(cook.current[0]);

    let cookInstance = cookposition.querySelectorAll('div')[index];
    let cooking = cookInstance.querySelectorAll('p')[0];
    let time = cookInstance.querySelectorAll('p')[1];
    cooking.innerHTML = cook.current[0];
    clock(cook.toDoList[0][1], time)
}


function todolistrefresh() {
    var childs = todolist.childNodes;
    for (var i = childs.length - 1; i >= 0; i--) {
        todolist.removeChild(childs[i]);
    }
    let ul = document.createElement('ul');
    let p = document.createElement('p');
    p.innerHTML = '待做列表：';
    todolist.appendChild(p);
    for (let i = 0; i < cook.toDoList.length; i++) {
        let li = document.createElement('li');
        li.innerHTML = cook.toDoList[i][0];
        ul.appendChild(li);
    }
    todolist.appendChild(ul);
}

function toservelistrefresh() {
    var childs = toservelist.childNodes;
    for (var i = childs.length - 1; i >= 0; i--) {
        toservelist.removeChild(childs[i]);
    }
    let ul = document.createElement('ul');
    let p = document.createElement('p');
    p.innerHTML = '待上列表：';
    toservelist.appendChild(p);
    for (let i = 0; i < to_serve_list.length; i++) {
        let li = document.createElement('li');
        li.innerHTML = to_serve_list[i].name;
        ul.appendChild(li);
    }
    toservelist.appendChild(ul);
}

function waiterfresh() {
    var waiter = [];
    for (let i of ifeRestaurant.waiter) {
        waiter.push(i.name)
    }

    var waiterarr = waiter.join(' ')
    waiterinfo.innerHTML = '服务员:' + waiterarr;
}
addcook.onclick = function() {
    let cook = Factory('cook', {
        name: initName(),
        salary: 6000
    });
    ifeRestaurant.hireCook(cook);
}
addwaiter.onclick = function() {
    let waiter = Factory('waiter', {
        name: initName(),
        salary: 6000
    });
    ifeRestaurant.hireWaiter(waiter);
}
removecook.onclick = function() {
    ifeRestaurant.fireCook();
}
removewaiter.onclick = function() {
    ifeRestaurant.fireWaiter();
}