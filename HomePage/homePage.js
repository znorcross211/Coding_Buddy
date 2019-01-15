function main() {

    // event handlers
    $("#c").click(function (event) {
        if (event.target.tagName == "IMG") {
            changeDropDown(getLangFromImage(event));
        } else {
            changeDropDown(event.target.textContent);
        }
    });
    $("#java").click(function (event) {
        if (event.target.tagName == "IMG") {
            changeDropDown(getLangFromImage(event));
        } else {
            changeDropDown(event.target.textContent);
        }
    });
}

function hideUnhideElement(element) {
    if (element.style.display == "none") {
        element.style.display = "block";
    } else if (element.style.display == "block") {
        element.style.display = "none";
    }
    else{
        element.style.display = "none";
    }
    console.log(element.style.display)
}


function getLangFromImage(item) {
    return item.target.parentElement.innerText;
}

function changeDropDown(text) {
    console.log(text);
    $("#dropDownLangText")[0].innerText = text;
}

function startupHide(){
   // console.log($("#listOfOptions"));
    hideUnhideElement($("#listOfOptions")[0]);
    hideUnhideElement($("#dropDownDivCont")[0]);
}

window.onload = function () {
    startupHide();
    main();
};