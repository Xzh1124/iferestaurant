let menuList = (function() {
    let menulist = [new Course({
            name: "炭烤母猪蹄",
            price: 60,
            cost: 30,
            time: 2.6 * timeEle,
            state: "toserve"
        }),
        new Course({
            name: "麻辣鱼鳞",
            price: 20,
            cost: 2,
            time: 2 * timeEle,
            state: "toserve"

        }),
        new Course({
            name: "酥炸小黄瓜",
            price: 14,
            cost: 5,
            time: 5 * timeEle,
            state: "toserve"

        }),
        new Course({
            name: "红烧胖大海",
            price: 30,
            cost: 14,
            time: 2.5 * timeEle,
            state: "toserve"

        }),
        new Course({
            name: "酒酿萝卜皮",
            price: 18,
            cost: 6,
            time: 3 * timeEle,
            state: "toserve"

        }),
        new Course({
            name: "清蒸黄花鱼",
            price: 50,
            cost: 25,
            time: 2 * timeEle,
            state: "toserve"

        }),
        new Course({
            name: "泔水蛋花汤",
            price: 20,
            cost: 4,
            time: 3 * timeEle,
            state: "toserve"

        }),
        new Course({
            name: "冰糖肥肠",
            price: 30,
            cost: 15,
            time: 3.5 * timeEle,
            state: "toserve"

        })
    ];
    return {
        menulist: menulist,
        Select: function(cus) {
            let num = Math.floor(Math.random() * menulist.length) + 1;
            var lists = [];
            var index = [];
            for (var i = 0; i < num; i++) {
                var r = Math.floor(Math.random() * menulist.length);
                if (index.indexOf(r) != -1) {
                    i--;
                    continue;
                }
                index.push(r);
            }
            for (var i = 0; i < index.length; i++) {
                lists.push(new Course(menulist[index[i]]))
            }
            return lists;
        }
    }
})()