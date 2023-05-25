const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const chatArea = document.getElementById("chat-area");
let username = prompt("masukkan username kamu");
// event listener
chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = messageInput.value.toLowerCase();
    appendMessage(message, true);

    setTimeout(() => {
        response(message);
    }, 1000);

    messageInput.value = "";
});

function response(message) {
    fetch("corpus.json")
        .then((response) => response.json())
        .then((data) => {
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
        .catch((error) => console.error(error));
}

function appendMessage(message, isSender) {
    const messageElement = document.createElement("div");
    const textGroup = document.createElement("div");
    const img = document.createElement("img");
    img.setAttribute("src", "pp.jpeg");
    const textElement = document.createElement("p");
    const senderElement = document.createElement("span");
    messageElement.classList.add("message");
    if (isSender) {
        messageElement.classList.add("sender");
        senderElement.innerText = username;
        textElement.innerText = ` ${message}`;
    }

    if (!isSender) {
        messageElement.classList.add("receiver");
        senderElement.innerText = "cyro";
        textElement.innerText = ` ${message}`;
        messageElement.appendChild(img);
    }

    // textElement.prepend(senderElement);
    textGroup.appendChild(senderElement);
    textGroup.appendChild(textElement);
    messageElement.appendChild(textGroup);
    chatArea.appendChild(messageElement);
    chatArea.scrollTop = chatArea.scrollHeight;
}

function clrChat() {
    chatArea.innerHTML = "";
}
