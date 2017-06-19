// Function to create a annolet container 
function annoletContainer(){
    //appending a div(annolet container) to body element of a webpage.
    var body = document.getElementsByTagName('body')[0];
    container = document.createElement('div');
    container.id = 'annolet-container';
    body.appendChild(container);
    
    //appending a CSS stylesheet to head element of a webpage, which is used to stylize the annolet container.
    var linktag = document.createElement('link');
    linktag.rel = "stylesheet";
    linktag.type = "text/css";
    linktag.href = "https://cdn.rawgit.com/sadhanareddy/page-renarration-bookmarklet/b06e6cf7/css/page_renarration.css"; 
    document.getElementsByTagName('head')[0].appendChild(linktag);

    //appending jquery to head element of a webpage
    var script_tag = document.createElement('script');
    script_tag.type = "text/javascript";
    script_tag.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"; 
    document.getElementsByTagName('head')[0].appendChild(script_tag);

    //Function to put the html code inside an annolet container
    getText()
}


function getText(){
    var url = 'https://cdn.rawgit.com/sadhanareddy/page-renarration-bookmarklet/bb28d876/page_renarration.txt';
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send(null);
    xhr.onreadystatechange = function() {
        if (this.readyState==4 && this.status==200) {
            container.innerHTML = this.responseText;          
        }
    }
}

// Function to disable all links on a webpage.
function disableLinks(){
    // Disable all links
    var anchors = document.getElementsByTagName("a");
    for (var i = 0; i < anchors.length; i++) {
        anchors[i].onclick = function() {return(false);};
    }
}

// Function to disable the css of a web page.
function disableCss(){
    var styleSheets = document.styleSheets;
    for ( var i=0; i<styleSheets.length; i++) {
        if(styleSheets[i].href == 'https://cdn.rawgit.com/sadhanareddy/page-renarration-bookmarklet/b06e6cf7/css/page_renarration.css'){
           styleSheets[i].disabled = false;
        }
        else{
            styleSheets[i].disabled = true;
        }
    }
}

//Function to erase the unwanted content on a webpage.
function  Zapper(){
    alert("Remove the content by clicking anywhere on the document");
    $("body").click(function(event){
        console.log(event.target);
        targetElem= event.target;
        if(targetElem.id == "annolet-container"||targetElem.id =="zapper"||targetElem.id =="annolet-header"||targetElem.id =="annolet-menu"||targetElem.className == "annolet-element"){
            targetElem.style.visibility="visible";
        }
        else{
            targetElem.style.visibility="hidden";
        }
    });

}

// Function to modify the content on a web page.
function modifyContent() {
    // sets attributes to all the elements in the web page.
    document.getElementsByTagName('body')[0].setAttribute('contenteditable', true);
    document.getElementsByTagName('body')[0].setAttribute('title', 'Edit Content');
}

// Function to highlight selected text on a web page.
function highlightContent(){
    // var mytext = selectHTML();
    // $('span').css({"background-color":"yellow"});
    var userSelection = window.getSelection();
    for(var i = 0; i < userSelection.rangeCount; i++) {
        highlightRange(userSelection.getRangeAt(i));
    }
}

function highlightRange(range) {
    var newNode = document.createElement("span");
    newNode.setAttribute(
       "style",
       "background-color: yellow; display: inline;"
    );
    range.surroundContents(newNode);
}

// Function to translate the selected text to phonetics.
function phoneticsTrans(){
    var url = "//localhost:5000/phonetic-trans"
    var xhr = new XMLHttpRequest();
    if (window.getSelection) 
    {
        var selected_text= window.getSelection().toString();
    } 
    else if (document.selection && document.selection.type != "Control") {
        var selected_text = document.selection.createRange().text;
    }
    xhr.open("POST",url,true);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.send(JSON.stringify({"sentence":selected_text}));
    xhr.onreadystatechange = function() {
        if (this.readyState==4 && this.status==200) {
            var res = this.responseText;
            var selection = window.getSelection();
            var parent = $(selection.focusNode.parentElement);
            var oldHtml = parent.html();
            var newHtml = oldHtml.replace(selected_text, "<span class='highlight' style='color:green'>"+res+"</span>");
            parent.html( newHtml );
        }
    }
}

// Function to translate the selected text to an other language.
function translateText(selected_lang){
    var url = "https://translate.yandex.net/api/v1.5/tr.json/translate",
    keyAPI = "trnsl.1.1.20170315T015859Z.3e04bd9bd31f6f00.99aa35ddf89167a86f5a892014edf632e9cef14f";
    var xhr = new XMLHttpRequest();
    if (window.getSelection) {
        var selected_text = window.getSelection().toString();
    } 
    else if (document.selection && document.selection.type != "Control") {
        var selected_text = document.selection.createRange().text;
    }
    data = "key="+keyAPI+"&text="+selected_text+"&lang="+selected_lang;
    xhr.open("POST",url,true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send(data);
    xhr.onreadystatechange = function() {
        if (this.readyState==4 && this.status==200) {
            var res = this.responseText;
            var json = JSON.parse(res);
            if(json.code == 200) {
                var changed_text = json.text[0];
                var selection = window.getSelection();
                var parent = $(selection.focusNode.parentElement);
                var oldHtml = parent.html();
                var newHtml = oldHtml.replace(selected_text, "<span class='highlight' style='color:green'>"+changed_text+"</span>");
                parent.html( newHtml );
            }
            else {
                alert("select text");
            }
        }
    }
}

// Creates alternate stylesheets to switch the themes on a web page.
function alternateStylesheets(selected_theme){
    //appending a CSS alternate stylesheets to head element of a webpage.
    var i= 0;
    var style_sheets = 3; 
    var css_themes =['https://cdn.rawgit.com/sadhanareddy/page-renarration-bookmarklet/2b16f6d9/css/switch1.css',
    'https://cdn.rawgit.com/sadhanareddy/page-renarration-bookmarklet/2b16f6d9/css/switch2.css',
    'https://cdn.rawgit.com/sadhanareddy/page-renarration-bookmarklet/2b16f6d9/css/switch3.css'];
    var link_title =['switch1', 'switch2', 'switch3'];

    for(i=0; i<style_sheets; i++){
        var linktag = document.createElement('link');
        linktag.rel  = 'alternate stylesheet';
        linktag.type = 'text/css';
        linktag.href = css_themes[i];
        linktag.title= link_title[i];
        head  = document.getElementsByTagName('head')[0];
        head.appendChild(linktag);
    }
    switchStyle(selected_theme)
}

function switchStyle(css_title)
{   
   var i;
   var linktag = document.getElementsByTagName("link");
   for (i = 0; i < linktag.length; i++ ) {
        if ((linktag[i].rel.indexOf( "stylesheet" ) != -1) &&linktag[i].title) {
            linktag[i].disabled = true ;
            if (linktag[i].title == css_title) {
                linktag[i].disabled = false ;
            }
        }
   }
}

/* Function to display the selected content on the web page and rest of the content is made hidden. */  
function showContent(selected_content){
    var all = document.getElementsByTagName("*");
    if(selected_content == 'show-links'){
        for (var i=0, max=all.length; i < max; i++) {
            var href_attribute = all[i].hasAttribute("href");
            var src_attribute = all[i].hasAttribute("src");
            if(href_attribute == false && src_attribute == false){
                all[i].style.visibility = 'hidden';
            }
            else if(href_attribute == true || src_attribute == true){
                all[i].style.visibility = 'visible';
            }
        }
    }
    else if(selected_content == 'show-text') {
        for (var i=0, max=all.length; i < max; i++) {
            if(all[i].innerHTML){
                all[i].style.visibility = 'visible';
            }
            else{
                all[i].style.visibility = 'hidden';
            }
        }
    }
    else if(selected_content == 'show-images') {
        for (var i=0, max=all.length; i < max; i++) {
            var src_attribute = all[i].hasAttribute("src");
            if(src_attribute == false){
                all[i].style.visibility = 'hidden';
            }
            else if(src_attribute == true){
                all[i].style.visibility = 'visible';
            }
        }
    }

    //get the menu bar id 
    document.getElementById('annolet-container').style.visibility='visible';
    var children = document.getElementById('annolet-container').children;
    //This will make all children elements of div visible. 
    for(var i = 0; i < children.length; i++){
        children[i].style.visibility = 'visible';
    }
}

// Function to increase/decrease the font size of the content.
function changeFontsize(){
    var fontSize = parseInt($('body').css('font-size'),10);
    $('#increase-font').on('click',function(){
        fontSize+=0.5;
        $('body').css('font-size',fontSize+'px');
    })
    $('#decrease-font').on('click',function(){
        fontSize-=0.5;
        $('body').css('font-size',fontSize+'px');
    })
}

//Function to translate the whole web page into a selected language using google Translator API.
// function langTrans(){
//     //appending a script tag to head of webpage
//     var script = document.createElement('script');
//     script.type = "text/javascript";
//     script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//     document.getElementsByTagName('head')[0].appendChild(script);

//     //Create a language translation dropdown div and append in annolet menu bar.
//     div = document.createElement('div');
//     div.id = 'google_translate_element';
//     document.getElementsByTagName('body')[0].appendChild(div);
// }

// function googleTranslateElementInit() {
//    new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
// }

currencyConversion("INR", "USD", "1")
function currencyConversion(from_cur, to_cur, amount){
    var url = "//localhost:5000/currency-conversion"
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.send(JSON.stringify({"from_cur":from_cur, "to_cur":to_cur, "amount": amount}));
    xhr.onreadystatechange = function() {
        if (this.readyState==4 && this.status==200) {
            var res = this.responseText;
            alert(res);
            console.log(typeof res);
            currency_data = JSON.parse(res);
            console.log(typeof currency_data);
            console.log(currency_data["results"]);
            cur_value =currency_data["results"];
            console.log(cur_value[from_cur+"_"+to_cur]["val"]);
            // var selection = window.getSelection();
            // var parent = $(selection.focusNode.parentElement);
            // var oldHtml = parent.html();
            // var newHtml = oldHtml.replace(selected_text, "<span class='highlight' style='color:green'>"+res+"</span>");
            // parent.html( newHtml );
        }
    }
}

// Function to add click events to the annolet elements.
function addClickevents(){
    document.getElementById('disable-css').addEventListener('click', function() {
        disableCss()
    }, false);
    document.getElementById('zapper').addEventListener('click', function() {
        Zapper()
    }, false);
    document.getElementById('modify-content').addEventListener('click', function() {
        modifyContent()
    }, false);
    document.getElementById('highlighter-btn').addEventListener('click', function() {
        highlightContent()
    }, false);
    document.getElementById('phonetics-btn').addEventListener('click', function() {
        phoneticsTrans()
    }, false);
    document.getElementById('select-lang').addEventListener('change', function() {
        translateText(this.value)
    }, false);
    document.getElementById('select-theme').addEventListener('change', function() {
        alternateStylesheets(this.value)
    }, false);
    document.getElementById('select-content').addEventListener('change', function() {
        showContent(this.value)
    }, false);
    // document.getElementById('select-content').addEventListener('change', function() {
    //     showContent(this.value)
    // }, false);
}

window.onload = function() {
    annoletContainer()
    disableLinks()
    addClickevents()
    changeFontsize()
    //langTrans()
};
        