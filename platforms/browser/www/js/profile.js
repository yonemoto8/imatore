document.addEventListener('deviceready', function() {
    let t = [];
    var url = "https://crebo.co.jp/crebo-demo/www/stub/profilestub.json";
    //var key = "123456";
    getjson(url).then((value) => {
        t = value;
    });
    setTimeout(function () {
        console.log(t[0].username);
        console.log(t[0].fee);
        console.log(t[0].parts);
        console.log(t[0].performance);

        document.getElementById('td_name').innerHTML = t[0].username;
        document.getElementById('td_fee').innerHTML = t[0].fee;
        document.getElementById('td_parts').innerHTML = t[0].parts;
        document.getElementById('td_performance').innerHTML = t[0].performance;
    }, 2000);
}, false);