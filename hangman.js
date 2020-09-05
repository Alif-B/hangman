

let alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

let Movies = ["Die Hard", "Home Alone", "The Dark Knight", "The Matrix", "Forrest Gump",
    "Inception", "Avengers End Game", "Lord of the rings", "Harry Potter", "Annabelle"]
let MoviesHint = ["Videos/DieHard.gif", "Videos/homealone.gif", "Videos/darkknight.gif", "Videos/matrix.gif",
    "Videos/forrestgump.gif", "Videos/inception.gif", "Videos/avengers.gif", "Videos/lotr.gif",
    "Videos/harrypotter.gif", "Videos/annabelle.gif"]

let Songs = ["Watch me whip", "Who let the dogs out", "Baby", "Firework", "Thriller",           // Choices of words
    "Anaconda", "Gangnam Style", "Despacito", "Never gonna give you up"]
let SongsHint = ["Videos/wmw.gif", "Videos/wltdo.gif", "Videos/baby.gif", "Videos/firework.gif",
    "Videos/thriller.gif", "Videos/anacoda.gif", "Videos/gangnam.gif", "Videos/despacito.gif",
    "Videos/nggyu.gif"]

let Other = ["Alligator", "Home Alone", "Cocacola", "Committee", "Laptop", "Security",
    "Chemicals", "Websites", "Hangman", "Random Number Generator"]
let OtherHint = ["Videos/alligator.gif", "Videos/homealone.gif", "Videos/cocacola", "Videos/committee.gif",
    "Videos/laptop.gif", "Videos/security.gif", "Videos/websites.gif", "Videos/hangman.gif", "Videos/rng.gif"]

let the_word;
let the_hint;
let the_spaces = [];
let letter_butts = [];
let width = (window.innerWidth);
let score = 7;
let main_score = 0;
let catagory;
let hints;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    width = width / 2.61;
}



function the_game_page() {
    document.getElementById("body").innerHTML = "<p id='theWord'> </p>";
    document.getElementById("body").innerHTML +=
        "<p id='score' class='regButtons'> Score: 0 </p>" +
        "<img id='strikes' src='Images/Strike7.png' width='600' height='400'>" +
        "<button class='regButtons' id='change' type='button'> Change Topic </button>" +
        "<button class='regButtons' id='hint' type='button'> Hint </button>" +
        "<div id='LetterDiv' align='center' />"
    document.getElementById("hint").style.left = "77vw";
    document.getElementById("hint").onclick = function () {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            document.getElementById("body").style.backgroundImage = "url(" + the_hint + "), url('Images/phonebg2.jpg'";
        }
        else {
            document.getElementById("body").style.backgroundImage = "url(" + the_hint + "), url('Images/Background.jpeg'";
        }
    }
    document.getElementById("change").onclick = function () {
        score = 7;
        front_end();
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            document.getElementById("body").style.backgroundImage = "url('Images/phonebg2.jpg')";
        }
        else {
            document.getElementById("body").style.backgroundImage = "url('Images/Background.jpeg')";
        }
    }
}

function Letters(name) {                             // The Button Constructor
    this.butt = document.createElement("input")
    this.butt.type = "button";

    if (width > 600) {
        this.butt.style.height = '35px';
        this.butt.style.width = '35px';
    }
    else {
        this.butt.style.height = '140px';
        this.butt.style.width = '140px';
    }
    this.butt.style.marginLeft = "10px";
    this.butt.style.marginRight = "10px";           // Managing spacing and size of the letters
    this.butt.style.marginTop = "10px";
    this.butt.style.textAlign = "center";
    this.butt.style.border = "none";

    this.butt.value = name;                         // Changing the CSS of the alphabets
    this.butt.setAttribute("class", "alphabets")


    this.butt.setAttribute("id", name)
    this.butt.onclick = function () { clicked(name); }

    document.getElementById("LetterDiv").appendChild(this.butt);
}

function show_button() {
    for (let i = 0; i < alphabets.length; i++) {
        let butts = new Letters(alphabets[i]);
        letter_butts.push(butts)

        let letter_div = document.getElementById("LetterDiv").style;
        letter_div.left = "50%";
        if (width > 600) { letter_div.width = (width * 0.5) + "px"; letter_div.marginLeft = (width * -0.25) + "px"; }
        else { letter_div.width = width - 100; letter_div.marginLeft = "-50%"; }
        letter_div.position = "absolute";
        letter_div.bottom = "2vh";
    }
}

function clicked(ID) {
    let the_butt = document.getElementById(ID);
    the_butt.style.opacity = 0.2;
    the_butt.onclick = function () { };
    let right_guess = false;
    let counter = 0;                                // change the onclick of the letter if it's pressed already

    for (let i = 0; i < the_spaces.length; i++) {
        if (the_spaces[i] == "_") {
            if (ID == the_word.charAt(i).toUpperCase()) {
                the_spaces[i] = the_word.charAt(i);
                right_guess = true;
                main_score++;
            }
        }
    }

    document.getElementById("theWord").innerHTML = the_spaces.join(" ");

    if (!right_guess) {
        score--;
        document.getElementById("strikes").src = "Images/Strike" + score + ".png";
        main_score--;
    }
    if (score == 0) {
        document.getElementById("LetterDiv").innerHTML = "You're Garbage";
        document.getElementById("LetterDiv").style.fontSize = "50px";
        document.getElementById("LetterDiv").style.bottom = "10vh";
        document.getElementById("LetterDiv").style.color = "white";
        document.getElementById("LetterDiv").style.fontfamily = "Ariel";
    }

    document.getElementById("score").innerHTML = "Score: " + main_score;


    for (let i = 0; i < the_spaces.length; i++) {
        if (the_spaces[i] == "_") {
            counter++;
        }
    }
    if (counter == 0) {
        name = prompt("Enter your Name")
        document.getElementById("LetterDiv").innerHTML = name + ", your score is " + score;
        document.getElementById("LetterDiv").style.fontSize = "50px";
        document.getElementById("LetterDiv").style.color = "white";
        document.getElementById("LetterDiv").style.fontfamily = "Ariel";
    }

    console.log(main_score)
}


function number_of_letters() {
    the_spaces = []
    the_word_tag = document.getElementById("theWord");
    let random = Math.floor(Math.random() * 10)
    the_word = catagory[random];
    the_hint = hints[random];


    for (let i = 0; i < the_word.length; i++) {
        if (the_word.charAt(i) == " ") {
            the_spaces.push("&nbsp;");
        }
        else {
            the_spaces.push("_");
        }
    }
    the_word_tag.innerHTML = the_spaces.join(" ");
    the_word_tag.style.color = "white";
}

function front_end() {
    document.getElementById("body").innerHTML = "<p class='p'> Pick A Category </p>";
    document.getElementById("body").innerHTML += "<button class='homeButtons' id='movies'> Movies </button>";
    document.getElementById("body").innerHTML += "<button class='homeButtons' id='songs'> Songs </button>";
    document.getElementById("body").innerHTML += "<button class='homeButtons' id='other'> Random </button>";


    document.getElementById("movies").style.top = "40vh";
    document.getElementById("songs").style.top = "50vh";
    document.getElementById("other").style.top = "60vh";

    document.getElementById("movies").onclick = function () { catagory = Movies; hints = MoviesHint; the_game_page(); show_button(); number_of_letters() };
    document.getElementById("songs").onclick = function () { catagory = Songs; hints = SongsHint; the_game_page(); show_button(); number_of_letters() };
    document.getElementById("other").onclick = function () { catagory = Other; hints = OtherHint; the_game_page(); show_button(); number_of_letters() };
}

front_end();