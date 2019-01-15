window.onload = function () {
    main();
};

function main(){
// event handlers
    $("#c").click(function (event) {
        changeDropDown("C");
        $("#listOfOptions")[0].style.display = "block";
        $("#dropDownPrac")[0].style.display = "block";
    });
    $("#java").click(function (event) {
        changeDropDown("Java");
        $("#listOfOptions")[0].style.display = "block";
        $("#dropDownPrac")[0].style.display = "block";
    });
}

function getLangFromImage(item) {
    return item.target.parentElement.innerText;
}

function changeDropDown(text) {
    console.log(text);
    $("#dropDownLangText")[0].innerText = text;
}