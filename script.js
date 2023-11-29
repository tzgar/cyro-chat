const chatForm = document.getElementById("input-form");
const messageInput = document.getElementById("message-input");
const chatArea = document.getElementById("chat-area");
const container = document.getElementsByClassName;
// let username = prompt("masukkan username kamu");
username = "dev";
// event listener
chatForm.addEventListener("submit", event => {
    event.preventDefault();
    const message = messageInput.value.toLowerCase();
    appendMessage(message, true);

    setTimeout(() => {
        response(message);
    }, 1000);

    messageInput.value = "";
});

function response(message) {
    fetch(
        "https://raw.githubusercontent.com/tzgar/cyro-chat/master/corpus.json"
    )
        .then(response => response.json())
        .then(data => {
            const tokens = message.split(" ");
            let bestMatch = "";
            let bestScore = -1;

            for (const key in data) {
                const corpusTokens = key.toLowerCase().split(" ");
                let score = 0;

                for (const token of tokens) {
                    for (const corpusToken of corpusTokens) {
                        if (corpusToken.includes(token)) {
                            score++;
                            break;
                        }
                    }
                }

                if (score > bestScore) {
                    bestScore = score;
                    bestMatch = data[key];
                }
            }

            if (bestScore > 0) {
                appendMessage(bestMatch, false);
            } else {
                appendMessage("Maaf, aku tidak mengetahuinya", false);
            }
        })
        .catch(error => console.error(error));
}

function appendMessage(message, isSender) {
    // create element
    const textGroup = document.createElement("div");
    const messageElement = document.createElement("div");
    let imgElement = document.createElement("div");
    const senderElement = document.createElement("div");
    const textElement = document.createElement("p");

    // add classList
    senderElement.classList.add("head-mess");
    textGroup.classList.add("text-content");
    messageElement.classList.add("message");
    imgElement.classList.add("pp");
    imgElement.innerHTML =
        "<img src ='https://raw.githubusercontent.com/tzgar/cyro-chat/master/pp.jpeg' class='pp'>";
    if (isSender) {
        messageElement.classList.add("sender");
        senderElement.innerHTML = `<h3>${username}</h3>`;
        textElement.innerText = ` ${message}`;
        imgElement.innerHTML = "";
    }

    if (!isSender) {
        messageElement.classList.add("receiver");
        senderElement.innerHTML = "<h3>cyro</h3>";
        textElement.innerText = ` ${message}`;
    }

    // appending element;
    messageElement.appendChild(imgElement);
    textGroup.appendChild(senderElement);
    textGroup.appendChild(textElement);
    messageElement.appendChild(textGroup);
    chatArea.appendChild(messageElement);
    chatArea.scrollTop = chatArea.scrollHeight;
}

function clrChat() {
    chatArea.innerHTML = "";
}

var theInput = document.getElementById("favcolor");

theInput.addEventListener(
    "input",
    function () {
        var theColor = theInput.value;
        console.log(theColor);
        // Do something with `theColor` here.
    },
    false
);

// set color theme
function changecolor(el) {
  document.body.style.backgroundColor = el.value;
        }
            
