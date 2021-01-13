const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: "",
    capsLock: false,
    shift: false,
    lang: "en",
    cursorPosition: 0,
    recording: false,
    sound: true,
    symbols: {
      1: { lowerEng: "1", upperEng: "!", lowerRus: "1", upperRus: "!" },
      2: { lowerEng: "2", upperEng: "@", lowerRus: "2", upperRus: '"' },
      3: { lowerEng: "3", upperEng: "#", lowerRus: "3", upperRus: "№" },
      4: { lowerEng: "4", upperEng: "$", lowerRus: "4", upperRus: ";" },
      5: { lowerEng: "5", upperEng: "%", lowerRus: "5", upperRus: "%" },
      6: { lowerEng: "6", upperEng: "^", lowerRus: "6", upperRus: ":" },
      7: { lowerEng: "7", upperEng: "&", lowerRus: "7", upperRus: "?" },
      8: { lowerEng: "8", upperEng: "*", lowerRus: "8", upperRus: "*" },
      9: { lowerEng: "9", upperEng: "(", lowerRus: "9", upperRus: "(" },
      0: { lowerEng: "0", upperEng: ")", lowerRus: "0", upperRus: ")" },
      "-": { lowerEng: "-", upperEng: "_", lowerRus: "-", upperRus: "_" },
      "=": { lowerEng: "=", upperEng: "+", lowerRus: "=", upperRus: "+" },
      q: { lowerEng: "q", upperEng: "Q", lowerRus: "й", upperRus: "Й" },
      w: { lowerEng: "w", upperEng: "W", lowerRus: "ц", upperRus: "Ц" },
      e: { lowerEng: "e", upperEng: "E", lowerRus: "у", upperRus: "У" },
      r: { lowerEng: "r", upperEng: "R", lowerRus: "к", upperRus: "К" },
      t: { lowerEng: "t", upperEng: "T", lowerRus: "е", upperRus: "Е" },
      y: { lowerEng: "y", upperEng: "Y", lowerRus: "н", upperRus: "Н" },
      u: { lowerEng: "u", upperEng: "U", lowerRus: "г", upperRus: "Г" },
      i: { lowerEng: "i", upperEng: "I", lowerRus: "ш", upperRus: "Ш" },
      o: { lowerEng: "o", upperEng: "O", lowerRus: "щ", upperRus: "Щ" },
      p: { lowerEng: "p", upperEng: "P", lowerRus: "з", upperRus: "З" },
      "[": { lowerEng: "[", upperEng: "{", lowerRus: "х", upperRus: "Х" },
      "]": { lowerEng: "]", upperEng: "}", lowerRus: "ъ", upperRus: "Ъ" },
      a: { lowerEng: "a", upperEng: "A", lowerRus: "ф", upperRus: "Ф" },
      s: { lowerEng: "s", upperEng: "S", lowerRus: "ы", upperRus: "Ы" },
      d: { lowerEng: "d", upperEng: "D", lowerRus: "в", upperRus: "В" },
      f: { lowerEng: "f", upperEng: "F", lowerRus: "а", upperRus: "А" },
      g: { lowerEng: "g", upperEng: "G", lowerRus: "п", upperRus: "П" },
      h: { lowerEng: "h", upperEng: "H", lowerRus: "р", upperRus: "Р" },
      j: { lowerEng: "j", upperEng: "J", lowerRus: "о", upperRus: "О" },
      k: { lowerEng: "k", upperEng: "K", lowerRus: "л", upperRus: "Л" },
      l: { lowerEng: "l", upperEng: "L", lowerRus: "д", upperRus: "Д" },
      ";": { lowerEng: ";", upperEng: ":", lowerRus: "ж", upperRus: "Ж" },
      "'": { lowerEng: "'", upperEng: '"', lowerRus: "э", upperRus: "Э" },
      z: { lowerEng: "z", upperEng: "Z", lowerRus: "я", upperRus: "Я" },
      x: { lowerEng: "x", upperEng: "X", lowerRus: "ч", upperRus: "Ч" },
      c: { lowerEng: "c", upperEng: "C", lowerRus: "с", upperRus: "С" },
      v: { lowerEng: "v", upperEng: "V", lowerRus: "м", upperRus: "М" },
      b: { lowerEng: "b", upperEng: "B", lowerRus: "и", upperRus: "И" },
      n: { lowerEng: "n", upperEng: "N", lowerRus: "т", upperRus: "Т" },
      m: { lowerEng: "m", upperEng: "M", lowerRus: "ь", upperRus: "Ь" },
      ",": { lowerEng: ",", upperEng: "<", lowerRus: "б", upperRus: "Б" },
      ".": { lowerEng: ".", upperEng: ">", lowerRus: "ю", upperRus: "Ю" },
      "/": { lowerEng: "/", upperEng: "?", lowerRus: ".", upperRus: "," },
      "\\": { lowerEng: "\\", upperEng: "|", lowerRus: "\\", upperRus: "/" },
    }
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      element.addEventListener("focus", () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });
    });

    const keyCodes = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8, 9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13, 16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 220, 1000, 1001, 1002, 1003, 32, 37, 39]
    document.querySelector('.use-keyboard-input').addEventListener('keydown', btn => {
      if (keyCodes.includes(btn.keyCode)) {
        this.elements.keys[keyCodes.indexOf(btn.keyCode)].classList.add('keyboard__key-active')
        if (btn.keyCode === 9) {
          this.typeAtPos("\t", this.properties.cursorPosition)
          this._triggerEvent("oninput")
          setTimeout(() => {
            this.setCursorPosition(this.properties.cursorPosition)
            this.elements.keys[13].classList.remove('keyboard__key-active')
          }, 10)
        } else if (btn.keyCode === 20) {
          this._toggleCapsLock();
          this.elements.keys[26].classList.toggle("keyboard__key--active", this.properties.capsLock);
          this.setCursorPosition(this.properties.cursorPosition)
        } else if (btn.keyCode === 16) {
          this._toggleShift();
          this.elements.keys[39].classList.toggle("keyboard__key--active", this.properties.shift);
          this.setCursorPosition(this.properties.cursorPosition)
        } else if (btn.keyCode === 37 || btn.keyCode === 39) {
          console.log(this.properties.cursorPosition)
          if (btn.keyCode === 37 && this.properties.cursorPosition > 0) this.properties.cursorPosition--
          if (btn.keyCode === 39 && this.properties.cursorPosition < document.querySelector('.use-keyboard-input').value.length) this.properties.cursorPosition++

          console.log(this.properties.cursorPosition)
        }
        else {
          this.properties.cursorPosition++
        }
        this.properties.value = document.querySelector('.use-keyboard-input').value
        console.log(this.properties.cursorPosition)
      }
    })
    document.querySelector('.use-keyboard-input').addEventListener('keyup', btn => {
      if (keyCodes.includes(btn.keyCode)) this.elements.keys[keyCodes.indexOf(btn.keyCode)].classList.remove('keyboard__key-active')
    })

    this.setCursorPosition(0)
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
      "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
      "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "\\",
      "done", "sound", "voice", "lang", "space", "left", "right"
    ];

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach(key => {
      const keyElement = document.createElement("button");
      const insertLineBreak = ["backspace", "]", "enter", "\\"].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            if (this.properties.sound) document.getElementById('audio-backspace').play()
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this._triggerEvent("oninput");
            if (this.properties.cursorPosition > 0) this.properties.cursorPosition--
            this.setCursorPosition(this.properties.cursorPosition)
          });

          break;

        case "tab":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            if (this.properties.sound) this.properties.lang === 'en' ? document.getElementById('audio-en').play() : document.getElementById('audio-ru').play()
            this.typeAtPos("\t", this.properties.cursorPosition)
            this._triggerEvent("oninput")
            this.setCursorPosition(this.properties.cursorPosition)
          });

          break;

        case "caps":
          keyElement.textContent = key.toLowerCase();
          keyElement.classList.add("keyboard__key--activatable");

          keyElement.addEventListener("click", () => {
            if (this.properties.sound) document.getElementById('audio-caps').play()
            this._toggleCapsLock();
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
            this.setCursorPosition(this.properties.cursorPosition)
          });

          break;

        case "shift":
          keyElement.textContent = key.toLowerCase();
          keyElement.classList.add("keyboard__key--activatable");
          if (key === "shift") keyElement.classList.add("keyboard__key--wide")

          keyElement.addEventListener("click", () => {
            if (this.properties.sound) document.getElementById('audio-shift').play()
            this._toggleShift();
            keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
            this.setCursorPosition(this.properties.cursorPosition)
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            if (this.properties.sound) document.getElementById('audio-enter').play()
            this.typeAtPos("\n", this.properties.cursorPosition)
            this._triggerEvent("oninput");
            this.properties.cursorPosition++
            this.setCursorPosition(this.properties.cursorPosition)
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            if (this.properties.sound) this.properties.lang === 'en' ? document.getElementById('audio-en').play() : document.getElementById('audio-ru').play()
            this.typeAtPos(" ", this.properties.cursorPosition)
            this._triggerEvent("oninput");
            this.setCursorPosition(this.properties.cursorPosition)
          });

          break;

        case "voice":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("mic");

          let tryRec = (e) => {
            let transcript
            transcript = Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');
            if (e.results[0].isFinal) {
              console.log(transcript)
              this.typeAtPos(` ${transcript}`, this.properties.cursorPosition)
              this._triggerEvent("oninput")
              this.setCursorPosition(this.properties.cursorPosition)
            }
          }

          keyElement.addEventListener("click", () => {
            if (this.properties.sound) this.properties.lang === 'en' ? document.getElementById('audio-en').play() : document.getElementById('audio-ru').play()
            if (!this.properties.recording) {
              this.properties.recording = true
              rec.interimResults = true;
              this.properties.lang === 'en' ? rec.lang = 'en-US' : rec.lang = 'ru'
              rec.interimResults = true
              rec.start();
              rec.addEventListener('end', rec.start)
              rec.addEventListener('result', tryRec)

            } else {
              this.properties.recording = false
              rec.abort()
              rec.removeEventListener('end', rec.start)
              rec.removeEventListener('result', tryRec)
            }
            keyElement.classList.toggle("keyboard__key--active", this.properties.recording)
            this.setCursorPosition(this.properties.cursorPosition)
          });

          break;

        case "lang":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.textContent = this.properties.lang;

          keyElement.addEventListener("click", () => {
            if (this.properties.sound) this.properties.lang === 'en' ? document.getElementById('audio-en').play() : document.getElementById('audio-ru').play()
            this._toggleLang();
            keyElement.textContent = this.properties.lang
            this.setCursorPosition(this.properties.cursorPosition)
          });

          break;

        case "sound":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("headset");
          keyElement.classList.toggle("keyboard__key--active", this.properties.sound)

          keyElement.addEventListener("click", () => {
            if (this.properties.sound) this.properties.lang === 'en' ? document.getElementById('audio-en').play() : document.getElementById('audio-ru').play()
            this.properties.sound = !this.properties.sound
            keyElement.classList.toggle("keyboard__key--active", this.properties.sound)
            this.setCursorPosition(this.properties.cursorPosition)
          });

          break;

        case "left":
          keyElement.classList.add("keyboard__key--full-wide");
          keyElement.innerHTML = createIconHTML("keyboard_arrow_left");

          keyElement.addEventListener("click", () => {
            if (this.properties.sound) this.properties.lang === 'en' ? document.getElementById('audio-en').play() : document.getElementById('audio-ru').play()
            if (this.properties.cursorPosition > 0) this.properties.cursorPosition--
            this.setCursorPosition(this.properties.cursorPosition)
          });

          break;

        case "right":
          keyElement.classList.add("keyboard__key--full-wide");
          keyElement.innerHTML = createIconHTML("keyboard_arrow_right");

          keyElement.addEventListener("click", () => {
            if (this.properties.sound) this.properties.lang === 'en' ? document.getElementById('audio-en').play() : document.getElementById('audio-ru').play()
            if (this.properties.cursorPosition < this.properties.value.length) this.properties.cursorPosition++
            this.setCursorPosition(this.properties.cursorPosition)
          });

          break;

        case "done":

          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            if (this.properties.sound) this.properties.lang === 'en' ? document.getElementById('audio-en').play() : document.getElementById('audio-ru').play()
            this.close();
            this._triggerEvent("onclose");
          });

          break;

        default:
          keyElement.textContent = this.properties.symbols[key.toLowerCase()].lowerEng

          keyElement.addEventListener("click", () => {
            if (this.properties.sound) this.properties.lang === 'en' ? document.getElementById('audio-en').play() : document.getElementById('audio-ru').play()
            this.typeAtPos(keyElement.textContent, this.properties.cursorPosition)
            this._triggerEvent("oninput");
            this.setCursorPosition(this.properties.cursorPosition)
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  typeAtPos(text, pos = 0) {
    let left = this.properties.value.substr(0, pos)
    let right = this.properties.value.substr(pos, this.properties.value.length)
    this.properties.value = left + text + right
    this.properties.cursorPosition += text.length
  },

  setCursorPosition(pos) {
    document.querySelector('.use-keyboard-input').focus()
    document.querySelector('.use-keyboard-input').selectionStart = pos
    document.querySelector('.use-keyboard-input').selectionEnd = pos
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        if (key.textContent.length === 1 && ((key.textContent.toLowerCase() >= 'a' && key.textContent.toLowerCase() <= 'z') || (key.textContent.toLowerCase() >= 'а' && key.textContent.toLowerCase() <= 'я'))) {
          key.textContent = ((this.properties.shift && !this.properties.capsLock) || (!this.properties.shift && this.properties.capsLock)) ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        }
      }
    }
  },

  _toggleShift() {
    this.properties.shift = !this.properties.shift;

    let idx = 0
    let handledZero = false
    this.elements.keys.forEach(button => {
      if (button.textContent.length === 1) {
        if (idx < 48) {
          if (idx === 9 && !handledZero) {
            this.properties.shift ? button.textContent = ')' : button.textContent = '0'
            handledZero = true
            idx--
          }
          else {
            if (this.properties.lang === 'en') !this.properties.shift ? button.textContent = this.properties.symbols[Object.keys(this.properties.symbols)[idx+1]].lowerEng : button.textContent = this.properties.symbols[Object.keys(this.properties.symbols)[idx+1]].upperEng
            else !this.properties.shift ? button.textContent = this.properties.symbols[Object.keys(this.properties.symbols)[idx+1]].lowerRus : button.textContent = this.properties.symbols[Object.keys(this.properties.symbols)[idx+1]].upperRus
          }
        }
        idx++
      }
    })
    if (this.properties.capsLock) {
      this.properties.capsLock = false
      this._toggleCapsLock()
    }
  },

  _toggleLang() {
    this.properties.lang === 'en' ? this.properties.lang = 'ru' : this.properties.lang = 'en'
    let idx = 0
    let handledZero = false
    this.elements.keys.forEach(button => {
      if (button.textContent.length === 1) {
        if (idx < 48) {
          if (idx === 9 && !handledZero) {
            this.properties.shift ? button.textContent = ')' : button.textContent = '0'
            handledZero = true
            idx--
          }
          else {
            if (this.properties.lang === 'en') !this.properties.shift ? button.textContent = this.properties.symbols[Object.keys(this.properties.symbols)[idx+1]].lowerEng : button.textContent = this.properties.symbols[Object.keys(this.properties.symbols)[idx+1]].upperEng
            else !this.properties.shift ? button.textContent = this.properties.symbols[Object.keys(this.properties.symbols)[idx+1]].lowerRus : button.textContent = this.properties.symbols[Object.keys(this.properties.symbols)[idx+1]].upperRus
          }
        } else {

        }
        idx++
      }
    })
    if (this.properties.capsLock) {
      this.properties.capsLock = false
      this._toggleCapsLock()
    }
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  }
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const rec = new SpeechRecognition();

document.querySelector('.use-keyboard-input').addEventListener('blur', () => Keyboard.properties.value = document.querySelector('.use-keyboard-input').value)
