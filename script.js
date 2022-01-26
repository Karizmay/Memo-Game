let openCards = [];
let sumOpenCards;
let setTimeoutId;
let catalog = "animals";

createMemo ();

//Если пользователь кликнул на карточку
document.getElementById("container").addEventListener("click", showCard);

//Если пользователь кликнул меню
document.getElementsByTagName("header")[0].addEventListener("click", changeActiveElements);

//Если пользователь выиграл и кликнул рестарт
document.getElementById("restart").addEventListener("click", restart);

//Создать карточки с картинками
function createMemo () {
    let card, img;
    let container = document.getElementById ("container");
    let numbers = createArray ();
    sumOpenCards = 0;

    for (let i = 0; i < numbers.length; i++) {
        //создаем карточку
        card = document.createElement ("div");
        card.classList.add ("card");
        card.style.width = calcCardSize () + "px";
        card.style.height = calcCardSize () + "px";
        container.appendChild(card);

        // создаем картинку
        img = document.createElement ("img");
        img.src = "images/" + catalog + "/" + numbers [i] + ".jpg";
        card.classList.add (numbers [i]);
        img.classList.add ("turn");
        card.appendChild (img);

        //создаем картинку с фоном
        img = document.createElement("img");
        img.classList.add(numbers[i]);
        img.src = "images/" + catalog + "/" + "back.png";
        img.alt = "Перевернутая карточка";
        img.title = "Переверни карточку";
        card.appendChild(img);
    }
}

//Создать массив случайных чисел
function createArray () {
    array = [];
    let number = document.getElementsByClassName("right-menu active")[0].id;
    for (let i = 0; i < number/2; i++) {
        let r = Math.floor(Math.random() * 16)+1;
        if (array.includes(r)) {
            i--;
        }
        else {
            array.push(r);
        }
    }
    array = array.concat(array);
    array = shuffle(array);
    return array;
}

//Перемешать массив
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
        let t = array[i]; array[i] = array[j]; array[j] = t;
    }
    return array;
}

//Изменение настроек игры
function changeActiveElements (e) {
    console.log(e.target);
    if (e.target.tagName === "IMG") {
        el = e.target.parentNode;
    }
    else if (e.target.tagName === "DIV") {
        el = e.target;
    }
    else {
        el = e.target.parentNode;
    }
    if (el.tagName !== "DIV") return;
    if (el.classList.contains("active")) return;

    if (el.classList.contains("left-menu")) {
        document.getElementsByClassName("left-menu active")[0].classList.remove("active");
        catalog = el.id;
    }
    else
    {
        document.getElementsByClassName("right-menu active")[0].classList.remove("active");
    }
    el.classList.add("active");
    removeAllChilds (document.getElementById("container"));
    createMemo();
}

//Открыть карточку
function showCard (e) {
    if (openCards.length === 2) closeCards();
    if (e.target.id === "container") return;
    let card = e.target.parentNode;
    if (!card.classList.contains("turn"))
    {
        card.classList.add("turn");
        openCards.push (card);
        if (openCards.length === 2)
        {
            setTimeoutId = setTimeout(closeCards, 1500);
        }
    }
}

//Закрыть карточки
function closeCards () {
    if (openCards [0].classList [1] !== openCards [1].classList [1])
    {
        openCards.forEach(el => el.classList.remove("turn"));
    }
    else {
        sumOpenCards = sumOpenCards + 2;
        if (sumOpenCards == document.getElementsByClassName("right-menu active")[0].id) {
            showWin ();
        }
    }
    openCards = [];
    clearTimeout(setTimeoutId);
}

//Удалить все дочерние элементы
function removeAllChilds (el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

//Начать новую игру
function  restart () {
    removeAllChilds(document.getElementById("container"));
    createMemo();
    hideWin ();
}

//Рассчитать оптимальный размер карточек
function calcCardSize() {
    document.getElementById("container").style.width = "100%";
    let width = document.getElementById("container").clientWidth;
    let height = document.getElementById("container").clientHeight;
    let quadro = Math.floor(Math.sqrt((width*height)/document.getElementsByClassName("right-menu active")[0].id));
    let countW = Math.floor(width/quadro);
    let countH = Math.floor(height/quadro);
    while (countH*countW < document.getElementsByClassName("right-menu active")[0].id) {
        quadro--;
        countW = Math.floor(width/quadro);
        countH = Math.floor(height/quadro);
    }
    if (quadro>300) quadro = 300;
    width =  countW*quadro;
    document.getElementById("container").style.width =  width+"px";
    quadro = Math.floor(quadro-12);
    return quadro;
}

//Показать окно победы
function showWin () {
    document.getElementById("win").classList.remove("hide");
    document.getElementsByTagName("HEADER")[0].classList.add("disabled");
    document.getElementById("container").classList.add("disabled");
}

//Скрыть окно победы
function hideWin () {
    document.getElementById("win").classList.add("hide");
    document.getElementsByTagName("HEADER")[0].classList.remove("disabled");
    document.getElementById("container").classList.remove("disabled");
}
