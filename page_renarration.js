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
    //using rawgit.com MaxCDN.. files directly linked to git repo 'webpage-transformation/master'
    linktag.href = "https://cdn.rawgit.com/sadhanareddy/bookmarklet/2b4fda52/css/page_renarration.css"; 
    document.getElementsByTagName('head')[0].appendChild(linktag);
    
    //injecting html code
    container.innerHTML = "<h4 id='annolet-header'>Page Renarration...!</h4>"+
    "<ul id='annolet-menu' >"+
        "<li id='disable-css' class='annolet-element'>No CSS</li>"+
        "<li id='zapper' class='annolet-element' >Zapper</li>"+
        "<li id='modify-content' class='annolet-element'>Modify Content</li>"+
        "<li id='highlight-text' class='annolet-element' >"+
            "<button>Highlighter</button>"+
        "</li>"+
        "<li id='phonetic-trans' class='annolet-element' >Phonetics</li>"+
        "<li id='trans-text' class='annolet-element' >Translate</li>"+
        "<li class='annolet-element'>"+
            "<select class='select-menu' >"+
                "<option id='theme-1' >Theme1</option>"+
                "<option id='theme-2' >Theme2</option>"+
                "<option id='theme-3' >Theme3</option>"+
            "</select>"+"<br>"+
            "<h6 style='color:orange;'>Switch CSS</h6>"+
        "</li>"+
        "<li class='annolet-element'>"+
            "<select class='select-menu' >"+
                "<option id='show-text' >Show Text</option>"+
                "<option id='show-links' >Show Links</option>"+
                "<option id='show-images' >Show Images</option>"+
            "</select>"+"<br>"+
            "<h6 style='color:orange;'>Webpage Stripper</h6>"+
        "</li>"+
        "<li class='annolet-element' id='lang-trans' >"+
            // "<div id='google_translate_element' ></div>"+
            "<h6 style='color:orange;'>Language</h6>"+
        "</li>"+
        "<li class='annolet-element'>"+
            "<select class='select-menu' >"+
                "<option id='increase-font' >Increase Font</option>"+
                "<option id='decrease-font' >Decrease Font</option>"+
            "</select>"+"<br>"+
            "<h6 style='color:orange;'>Visibility</h6>"+
        "</li>"+
    "</ul>";
}


// function to disable all links on the webpage.
function disableLinks(){
    // Disable all links
    var anchors = document.getElementsByTagName("a");
    for (var i = 0; i < anchors.length; i++) {
        anchors[i].onclick = function() {return(false);};
    }
}

//Function to disable the css of a web page.
function disableCss(){
    //alert("hello1");
    var styleSheets = document.styleSheets;
    for ( i=0; i<styleSheets.length; i++) {
    //alert("hello2");
        if(styleSheets[i].href == 'https://cdn.rawgit.com/sadhanareddy/bookmarklet/2b4fda52/css/page_renarration.css'){
           styleSheets[i].disabled = false;
           //alert("hello3");
        }
        else{
            styleSheets[i].disabled = true;
        }
   }
}


//Function to erase the content on a webpage.
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
    document.querySelector('#phonetic').addEventListener('click', function() {
    var xhr = new XMLHttpRequest();
        if (window.getSelection) 
        {
            textAPI = window.getSelection().toString();
        } 
        else if (document.selection && document.selection.type != "Control") {
            textAPI = document.selection.createRange().text;
        }
        alert(textAPI);
        xhr.open("POST",url,true);
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xhr.send(JSON.stringify({"sentence":textAPI}));
        xhr.onreadystatechange = function() {
            if (this.readyState==4 && this.status==200) {
                var res = this.responseText;
                alert(res);
                document.querySelector('#textarea').innerHTML = res;
            }
        }
    }, false);
}

// // Function to translate the selected text to an other language.
// function translateText(){
//     var url = "https://translate.yandex.net/api/v1.5/tr.json/translate",
//     keyAPI = "trnsl.1.1.20170315T015859Z.3e04bd9bd31f6f00.99aa35ddf89167a86f5a892014edf632e9cef14f";

//     document.querySelector('#lang_translate').addEventListener('click', function() {
//     var xhr = new XMLHttpRequest();
//     // textAPI = document.querySelector('#source').value,
//     var textAPI = "";
//     if (window.getSelection) {
//         textAPI = window.getSelection().toString();
//     } 
//     else if (document.selection && document.selection.type != "Control") {
//         textAPI = document.selection.createRange().text;
//     }
//     alert(textAPI);
//     langAPI = document.querySelector('#lang').value
//     alert(langAPI)
//     data = "key="+keyAPI+"&text="+textAPI+"&lang="+langAPI;
//     alert(data)

//     xhr.open("POST",url,true);
//     xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//     xhr.send(data);
//     xhr.onreadystatechange = function() {
//             if (this.readyState==4 && this.status==200) {
//                 var res = this.responseText;
//                 alert(res);
//                 var json = JSON.parse(res);
//                 if(json.code == 200) {
//                      document.querySelector('#textarea').innerHTML = json.text[0];
//                      alert("selected");
//                 }
//                 else {
//                     alert("select text");
//                 }
//             }
//     }
//     }, false);
// }

// Creates alternate stylesheets to switch the themes on a web page.
function alternateStylesheets(){
    //appending a CSS alternate stylesheets to head element of a webpage.
    var i= 0;
    var style_sheets = 3; 
    var css_themes =['https://cdn.rawgit.com/sadhanareddy/bookmarklet/bdf740b5/css/switch1.css',
    'https://cdn.rawgit.com/sadhanareddy/bookmarklet/bdf740b5/css/switch2.css',
    'https://cdn.rawgit.com/sadhanareddy/bookmarklet/bdf740b5/css/switch3.css'];
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

/* Function loops through all the elements in a web page and displays elements which has text content
and rest of the content is made hidden. */  
function showText() {
    var all = document.getElementsByTagName("*");
    for (var i=0, max=all.length; i < max; i++) {
        if(all[i].innerHTML){
            all[i].style.visibility = 'visible';
        }
        else{
            all[i].style.visibility = 'hidden';
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

/*Function loops through all the elements in a web page and displays elements which has links
and rest of the content is made hidden. */  
function showLinks() {
    var all = document.getElementsByTagName("*");
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

    //get the menu bar id 
    document.getElementById('annolet-container').style.visibility='visible';
    var children = document.getElementById('annolet-container').children;
    //This will make all children elements of div visible. 
    for(var i = 0; i < children.length; i++){
        children[i].style.visibility = 'visible';
    }
}

/* Function loops through all the elements in a web page and displays image elements 
and rest of the content is made hidden. */  
function showImages() {
    var all = document.getElementsByTagName("*");
    for (var i=0, max=all.length; i < max; i++) {
        var src_attribute = all[i].hasAttribute("src");
        if(src_attribute == false){
            all[i].style.visibility = 'hidden';
        }
        else if(src_attribute == true){
            all[i].style.visibility = 'visible';
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

// // injecting google translate api src into head element of a webpage.
// (function langTrans(){
//     //appending a script tag to head of webpage
//     var script = document.createElement('script');
//     script.type = "text/javascript";
//     script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//     document.getElementsByTagName('head')[0].appendChild(script);

//     //Create a language translation dropdown div and append in annolet menu bar.
//     div = document.createElement('div');
//     div.id = 'google_translate_element';
//     document.getElementById('lang-trans').appendChild(div);
// }());

// function googleTranslateElementInit() {
//    new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
// }

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
    document.getElementById('highlight-text').addEventListener('click', function() {
        highlightContent()
    }, false);
    document.getElementById('phonetic-trans').addEventListener('click', function() {
        phoneticsTrans()
    }, false);
    // document.getElementById('trans-text').addEventListener('click', function() {
    //     translateText()
    // }, false);
    document.getElementById('theme-1').addEventListener('click', function() {
        switchStyle('switch1')
    }, false);
    document.getElementById('theme-2').addEventListener('click', function() {
        switchStyle('switch2')
    }, false);
    document.getElementById('theme-3').addEventListener('click', function() {
        switchStyle('switch3')
    }, false);
    document.getElementById('show-text').addEventListener('click', function() {
        showText()
    }, false);
    document.getElementById('show-links').addEventListener('click', function() {
        showLinks()
    }, false);
    document.getElementById('show-images').addEventListener('click', function() {
        showImages()
    }, false);
    // document.getElementById('lang-trans').addEventListener('click', function() {
    //     langTrans()
    // }, false);
}


window.onload = function() {
    annoletContainer()
    disableLinks()
    addClickevents()
    alternateStylesheets()
    changeFontsize()
};

