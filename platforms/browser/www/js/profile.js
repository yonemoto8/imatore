document.addEventListener('deviceready', function() {
    let t = [];
    var url = "https://crebo.co.jp/crebo-demo/www/stub/profilestub.json";
    var key = $.cookie("prof_id");
    getjson(url).then((value) => {
        stub_prof = value;
    });
    setTimeout(function () {
        for(var x = 0,len = stub_prof.length; x < len; x++){
            if(stub_prof[x].userid === key){
                document.getElementById('disp_photo').src = stub_prof[x].photo;
                document.getElementById('td_name').innerHTML = stub_prof[x].username;
                document.getElementById('td_fee').innerHTML = stub_prof[x].fee;
                document.getElementById('td_parts').innerHTML = stub_prof[x].parts;
                document.getElementById('td_performance').innerHTML = stub_prof[x].performance;
            }
        }
        console.log(stub_prof[0].username);
        console.log(stub_prof[0].fee);
        console.log(stub_prof[0].parts);
        console.log(stub_prof[0].performance);
        /*
        document.getElementById('disp_photo').src = stub_prof[0].photo;
        document.getElementById('td_name').innerHTML = stub_prof[0].username;
        document.getElementById('td_fee').innerHTML = stub_prof[0].fee;
        document.getElementById('td_parts').innerHTML = stub_prof[0].parts;
        document.getElementById('td_performance').innerHTML = stub_prof[0].performance;
        */
    }, 80);
}, false);