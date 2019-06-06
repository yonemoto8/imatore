var button = document.getElementById("a_marker");
button.addEventListener("click", function() {

    var element = document.getElementById("mark_list");
    var date = element.value;
    var coordinate = date.split("_");
    
    setCookie("marker",coordinate);

    document.location = "index.html";
});

var button = document.getElementById("d_marker");
button.addEventListener("click", function() {

    removeCookie("marker");

    console.log($.cookie("marker"));
});

