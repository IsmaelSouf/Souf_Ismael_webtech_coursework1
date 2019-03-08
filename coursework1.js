"use strict";
//Base64 encode and decode

function encodeBase(element)
{
    
	var plain_text = document.getElementsByTagName("textarea")[0].value.replace(/[^a-zA-Z]/g, " "); 
    //Encode a string in base-64
	var base64_text = btoa(plain_text); 
    //Get the element with the specified ID
	document.getElementById("message").value = base64_text;	
}

function decodeBase(element)
{
	var plain_text = document.getElementsByTagName("textarea")[0].value; 
    //Decode a base-64 encoded string
	var base64_text = atob(plain_text); 
    //Get the element with the specified ID
	document.getElementById("message").value = base64_text;
}

//Function to encode Morse
function encode() 
{
    
//Lowercase only, ignore unknown characters.
var plain_text = document.getElementById("message").value.toLowerCase().replace(/[^a-z]/g, "");
    
var alphabet = 
{  
   "0":"-----",   "1":".----",
   "2":"..---",   "3":"...--",
   "4":"....-",   "5":".....",
   "6":"-....",   "7":"--...",
   "8":"---..",   "9":"----.",
   "a":".-",   "b":"-...",
   "c":"-.-.",   "d":"-..",
   "e":".",   "f":"..-.",
   "g":"--.",   "h":"....",
   "i":"..",   "j":".---",
   "k":"-.-",   "l":".-..",
   "m":"--",   "n":"-.",
   "o":"---",   "p":".--.",
   "q":"--.-",   "r":".-.",
   "s":"...",   "t":"-",
   "u":"..-",   "v":"...-",
   "w":".--",   "x":"-..-",
   "y":"-.--",   "z":"--..",
   " ":"/",   "!":"-·-·--",
   ".":"·-·-·-",   ",":"--··--"
};

var morse_text = [];

// Transform the string object into an array and replace with morse word
plain_text.split(" ").map(function (word) 
{
    // Replace each character with a morse "letter"
    word.split("").map(function (letter) 
    {
        morse_text.push(alphabet[letter]);
    });
    morse_text.push("/ ");
});
    
// Convert the array back to string.
document.getElementById("message").value = morse_text.join(" ");
    
}

//Function to decode Morse
function decode()
{
    
var morse_text = document.getElementById("message").value;
var plain_text = [];
var morse_alphabet = 
{  
   "-----":"0",   ".----":"1",
   "..---":"2",   "...--":"3",
   "....-":"4",   ".....":"5",
   "-....":"6",   "--...":"7",
   "---..":"8",   "----.":"9",
   ".-":"a",   "-...":"b",
   "-.-.":"c",   "-..":"d",
   ".":"e",   "..-.":"f",
   "--.":"g",   "....":"h",
   "..":"i",   ".---":"j",
   "-.-":"k",   ".-..":"l",
   "--":"m",   "-.":"n",
   "---":"o",   ".--.":"p",
   "--.-":"q",   ".-.":"r",
   "...":"s",   "-":"t",
   "..-":"u",   "...-":"v",
   ".--":"w",   "-..-":"x",
   "-.--":"y",   "--..":"z",
   "/":" ",   "-·-·--":"!",
   "·-·-·-":".",   "--··--":","
};

morse_text.split("/").map(function (word) 
{
    word.split(" ").map(function(letter) 
    {
        plain_text.push(morse_alphabet[letter]);
    });
    plain_text.push(" ");
});
    
document.getElementById("message").value = plain_text.join("");
    
}

//Function to clear textarea
function eraseText() 
{ 
    document.getElementById("message").value = "";
}

//Upload or drag a file
var fileSelect = function(evt) {
    // FileList object
    var files = evt.target.files;
    //Retrieve the first File from the FileList object
    var file = files[0];

    if (files && file) 
    {
        
        var reader = new FileReader();
        
        //Execute immediately after the page has been loaded
        reader.onload = function(readerEvt) 
        {
            var binaryString = readerEvt.target.result;
            document.getElementById("message").value = btoa(binaryString);
        };

        reader.readAsBinaryString(file);
    }
};

//Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) 
{
    document.getElementById('filePicker').addEventListener('change', fileSelect, false);
} 
else 
{
    alert('The File APIs are not fully supported in this browser.');
}
