function walk(time, direction) {
    let times = 0;
    let Time = time;
    if (direction === 'go')
        var course = to_serve_list.shift();
    return new Promise((resolve) => {
        var timer = setInterval(() => {

            let restTime = ((Time - (++times) * 100) / 1000).toFixed(1);
            if (restTime < 0) {
                clearInterval(timer);
                resolve(course);
            }
            // else {
            //     if (direction === 'go')
            //         // Waiterinstance.style.left = Waiterinstance.offsetLeft + ((600 - 128) / Time) * 100 + 'px';
            //     else if (direction === 'back') {
            //         // Waiterinstance.style.left = Waiterinstance.offsetLeft - ((600 - 128) / Time) * 100 + 'px';
            //     }
            // }

        }, 50);
    });
}