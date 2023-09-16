const RGB_CHANGE_INDEX = 0x10;
const FONT_TRANSITION_COLOR = 255.0*3.0/2.0;

let counter = 0;
let color = 0x000000;

//Converts an integer to a plain hexdecimal string, i.e. 157->9D. Probably doesn't work with negatives.
integer_to_ascii_hex = function(hex) {
    if(hex <= 0) {
        return "0";
    }
    let mask = 0b1111;
    let string = "";
    let value = '';
    let shift = 0;
    while(((mask & hex) > 0) || (hex > mask)) {
        value = (hex & mask) >> shift;
        switch(value) {
            case 10:
                value = 'A';
            break;
            case 11:
                value = 'B';
            break;
            case 12:
                value = 'C';
            break;
            case 13:
                value = 'D';
            break;
            case 14:
                value = 'E';
            break;
            case 15:
                value = 'F';
            break;
            default:
                //Value is one digit so it is fine
            break;
        }
        string = value + string;
        shift += 4;
        mask = 0b1111 << shift;
    }
    return string;
}

//Converts an integer representing a hexdecimal color to a string like "#FB0192"
//Limited to 6 digits in output, so it cuts out excess digits to the right
integer_to_color_string = function(int_color) {
    let plain_str = integer_to_ascii_hex(int_color);
    if(plain_str.length > 6) {
        plain_str = plain_str.substring(0, 6);
    }
    while(plain_str.length < 6) {
        plain_str = "0" + plain_str;
    }
    return "#" + plain_str;
}

//Changes the RGB value specified by RGB ('R', 'G', or 'B') of color by change
arithmetic_change_color = function(colorToChange, change, RGB) {
    let shift = 0;
    let mask = 0x000000;
    switch(RGB) {
        case 'R':
            shift = 16;
            mask = 0xFF0000;
        break;
        case 'G':
            shift = 8;
            mask = 0x00FF00;
        break;
        default:
        case 'B':
            shift = 0;
            mask = 0x0000FF;
        break;
    }
    let value = (colorToChange & mask) >> shift;
    let newValue = value + change;
    if(newValue < 0) newValue = 0;
    if(newValue > 0xFF) newValue = 0xFF;
    return color - (value << shift) + (newValue << shift);
}

//Returns the value of the color, scaled from 0 (black) to 765 (white)
integer_color_value = function(int_color) {
    return (int_color & 0x0000FF) + ((int_color & 0x00FF00) >> 8) + ((int_color & 0xFF0000) >> 16);
}

updateView = function() {
    document.querySelector("#favoriteNumber").innerHTML = `${counter}`;
    let colorBox = document.querySelector("#favoriteColorBox");
    colorBox.style.backgroundColor = integer_to_color_string(color);
    colorBox.innerHTML = integer_to_color_string(color);

    document.querySelector("#moreBlueButton").style.backgroundColor = integer_to_color_string(arithmetic_change_color(color, RGB_CHANGE_INDEX, 'B'));
    document.querySelector("#lessBlueButton").style.backgroundColor = integer_to_color_string(arithmetic_change_color(color, -RGB_CHANGE_INDEX, 'B'));
    document.querySelector("#moreGreenButton").style.backgroundColor = integer_to_color_string(arithmetic_change_color(color, RGB_CHANGE_INDEX, 'G'));
    document.querySelector("#lessGreenButton").style.backgroundColor = integer_to_color_string(arithmetic_change_color(color, -RGB_CHANGE_INDEX, 'G'));
    document.querySelector("#moreRedButton").style.backgroundColor = integer_to_color_string(arithmetic_change_color(color, RGB_CHANGE_INDEX, 'R'));
    document.querySelector("#lessRedButton").style.backgroundColor = integer_to_color_string(arithmetic_change_color(color, -RGB_CHANGE_INDEX, 'R'));

    let item = document.querySelector("#moreBlueButton");
    item.style.color = integer_color_value(color) > FONT_TRANSITION_COLOR ? "black" : "white";
    item = document.querySelector("#lessBlueButton");
    item.style.color = integer_color_value(color) > FONT_TRANSITION_COLOR ? "black" : "white";
    item = document.querySelector("#moreRedButton");
    item.style.color = integer_color_value(color) > FONT_TRANSITION_COLOR ? "black" : "white";
    item = document.querySelector("#lessRedButton");
    item.style.color = integer_color_value(color) > FONT_TRANSITION_COLOR ? "black" : "white";
    item = document.querySelector("#moreGreenButton");
    item.style.color = integer_color_value(color) > FONT_TRANSITION_COLOR ? "black" : "white";
    item = document.querySelector("#lessGreenButton");
    item.style.color = integer_color_value(color) > FONT_TRANSITION_COLOR ? "black" : "white";
    item = document.querySelector("#favoriteColorBox");
    item.style.color = integer_color_value(color) > FONT_TRANSITION_COLOR ? "black" : "white";
}

main = function() {
    console.log("Ready");
    document.querySelector("#decrementButton").addEventListener("click", (event) => {
        console.log("decrement button");
        counter -= 1;
        updateView();
    });
    document.querySelector("#incrementButton").addEventListener("click", (event) => {
        console.log("increment button");
        counter += 1;
        updateView();
    });
    document.querySelector("#resetButton").addEventListener("click", (event) => {
        console.log("reset button");
        counter = 0;
        updateView();
    });
    document.querySelector("#redButton").addEventListener("click", (event) => {
        console.log("red button");
        color = 0x800000;
        updateView();
    });
    document.querySelector("#blueButton").addEventListener("click", (event) => {
        console.log("blue button");
        color = 0x000080;
        updateView();
    });
    document.querySelector("#greenButton").addEventListener("click", (event) => {
        console.log("green button");
        color = 0x008000;
        updateView();
    });
    document.querySelector("#grayButton").addEventListener("click", (event) => {
        console.log("gray button");
        color = 0x808080;
        updateView();
    });
    document.querySelector("#moreRedButton").addEventListener("click", (event) => {
        color = arithmetic_change_color(color, RGB_CHANGE_INDEX, 'R');
        updateView();
    });
    document.querySelector("#lessRedButton").addEventListener("click", (event) => {
        color = arithmetic_change_color(color, -RGB_CHANGE_INDEX, 'R');
        updateView();
    });
    document.querySelector("#moreGreenButton").addEventListener("click", (event) => {
        color = arithmetic_change_color(color, RGB_CHANGE_INDEX, 'G');
        updateView();
    });
    document.querySelector("#lessGreenButton").addEventListener("click", (event) => {
        color = arithmetic_change_color(color, -RGB_CHANGE_INDEX, 'G');
        updateView();
    });
    document.querySelector("#moreBlueButton").addEventListener("click", (event) => {
        color = arithmetic_change_color(color, RGB_CHANGE_INDEX, 'B');
        updateView();
    });
    document.querySelector("#lessBlueButton").addEventListener("click", (event) => {
        color = arithmetic_change_color(color, -RGB_CHANGE_INDEX, 'B');
        updateView();
    });
    updateView();
}

main();