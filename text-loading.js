const textEl = document.getElementById('text');
const text = `It's time to connect with nature`;
let index = 1;

writeText();

function writeText() {
    textEl.innerText = text.slice(0, index)
    index++

    // if(index > text.length) {
    //     index = 0
    // }

    setTimeout(writeText, 100)
}