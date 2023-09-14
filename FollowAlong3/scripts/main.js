let counter = 0;

updateView = function() {
    document.querySelector("#counterText").innerHTML = `Count = ${counter}`;
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
}

main();