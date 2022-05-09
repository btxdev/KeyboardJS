let LANGUAGE = 'RU';
const TEXTAREA = document.getElementById('textarea');
const KEYBOARD = document.getElementById('keyboard');
let KEYS;
let PRESSED_KEYS = {};

class Key {
    constructor(isSpecial, primary, secondary, primaryShift, secondaryShift, isWide, code) {
        if(typeof isWide == 'undefined') {
            isWide = isSpecial;
        }
        this._type = isSpecial ? 'special' : 'default';
        this._wide = isWide;
        this._primary = primary;
        this._secondary = secondary;
        this._primaryShift = primaryShift;
        this._secondaryShift = secondaryShift;
        this._code = code;
        this._id = 'KeyId_' + this._type + '_' + code;
    }
    format(str) {
        return typeof str == 'undefined' ? '' : String(str);
    }
    markAs(lang) {
        if(LANGUAGE == lang) {
            return 'key-normal';
        }
        else {
            return 'key-gray';
        }
    }
    getHTML() {

        // endline element
        if(this._type == 'special' && this._primary == 'newline') {
            return `<div class="fix"></div>`;
        }

        let primary = this.format(this._primary);
        let secondary = this.format(this._secondary);
        let primaryShift = this.format(this._primaryShift);
        let secondaryShift = this.format(this._secondaryShift);

        let topLeft = '';
        let topRight = '';
        let bottomLeft = '';
        let bottomRight = '';

        let topLeftStyle = 'key-normal';
        let topRightStyle = 'key-normal';
        let bottomLeftStyle = 'key-normal';
        let bottomRightStyle = 'key-normal';

        // is digits
        if(primary == secondary) {
            topLeft = primaryShift;
            bottomLeft = primary;
            // skip similar
            if(primaryShift != secondaryShift) {
                topRight = secondaryShift;
            }

            // styles
            topLeftStyle = this.markAs('EN');
            topRightStyle = this.markAs('RU');
        }

        // is special button
        else if(this._type == 'special') {
            topLeft = primary;
        }

        // is letters
        else if(primary.toUpperCase() == primaryShift) {
            topLeft = primaryShift;
            bottomRight = secondaryShift;

            // styles
            topLeftStyle = this.markAs('EN');
            bottomRightStyle = this.markAs('RU');
        }

        // other keys
        else {
            topLeft = primaryShift;
            bottomLeft = primary;
            bottomRight = secondary;
            // skip similar
            if(secondary.toUpperCase() != secondaryShift) {
                topRight = secondaryShift;
            }

            // styles
            topLeftStyle = this.markAs('EN');
            topRightStyle = this.markAs('RU');
            bottomLeftStyle = this.markAs('EN');
            bottomRightStyle = this.markAs('RU');
        }

        let elemClass = this._wide ? 'widekey' : 'key';
        let elemId = this._id;
        let html = `<div class="${elemClass}" id="${elemId}">
            <div class="key-tl ${topLeftStyle}">${topLeft}</div>
            <div class="key-tr ${topRightStyle}">${topRight}</div>
            <div class="key-bl ${bottomLeftStyle}">${bottomLeft}</div>
            <div class="key-br ${bottomRightStyle}">${bottomRight}</div>
        </div>`;
        return html;
    }
    press(pressed) {
        let elem = document.getElementById(this._id);
        if(pressed) {
            elem.classList.remove('keyup');
            elem.classList.add('keydown');
        }
        else {
            elem.classList.remove('keydown');
            elem.classList.add('keyup');
            
        }
    }
    get code() {
        return this._code;
    }
    get isSpecial() {
        return this._type == 'special';
    }
}

const renderKeyboard = () => {
    let html = '';
    for(key of KEYS) {
        html += key.getHTML();
    }
    KEYBOARD.innerHTML = html;
}

const initKeyboard = () => {
    KEYS = [
        new Key(false, '`', 'ё', '~', 'Ё', false, 'Backquote'),
        new Key(false, '1', '1', '!', '!', false, 'Digit1'),
        new Key(false, '2', '2', '@', '"', false, 'Digit2'),
        new Key(false, '3', '3', '#', '№', false, 'Digit3'),
        new Key(false, '4', '4', '$', ';', false, 'Digit4'),
        new Key(false, '5', '5', '%', '%', false, 'Digit5'),
        new Key(false, '6', '6', '^', ':', false, 'Digit6'),
        new Key(false, '7', '7', '&', '?', false, 'Digit7'),
        new Key(false, '8', '8', '*', '*', false, 'Digit8'),
        new Key(false, '9', '9', '(', '(', false, 'Digit9'),
        new Key(false, '0', '0', ')', ')', false, 'Digit0'),
        new Key(false, '-', '-', '_', '_', false, 'Minus'),
        new Key(false, '=', '=', '+', '+', false, 'Equal'),
        new Key(true, 'Backspace', undefined, undefined, undefined, undefined, 'Backspace'),
        new Key(true, 'newline'),

        new Key(true, 'Tab', undefined, undefined, undefined, undefined, 'Tab'),
        new Key(false, 'q', 'й', 'Q', 'Й', false, 'KeyQ'),
        new Key(false, 'w', 'ц', 'W', 'Ц', false, 'KeyW'),
        new Key(false, 'e', 'у', 'E', 'У', false, 'KeyE'),
        new Key(false, 'r', 'к', 'R', 'К', false, 'KeyR'),
        new Key(false, 't', 'е', 'T', 'Е', false, 'KeyT'),
        new Key(false, 'y', 'н', 'Y', 'Н', false, 'KeyY'),
        new Key(false, 'u', 'г', 'U', 'Г', false, 'KeyU'),
        new Key(false, 'i', 'ш', 'I', 'Ш', false, 'KeyI'),
        new Key(false, 'o', 'щ', 'O', 'Щ', false, 'KeyO'),
        new Key(false, 'p', 'з', 'P', 'З', false, 'KeyP'),
        new Key(false, '[', 'х', '{', 'Х', false, 'BracketLeft'),
        new Key(false, ']', 'ъ', '}', 'Ъ', false, 'BracketRight'),
        new Key(true, 'Enter', undefined, undefined, undefined, undefined, 'Enter'),
        new Key(true, 'newline'),

        new Key(true, 'Caps Lock', undefined, undefined, undefined, undefined, 'CapsLock'),
        new Key(false, 'a', 'ф', 'A', 'Ф', false, 'KeyA'),
        new Key(false, 's', 'ы', 'S', 'Ы', false, 'KeyS'),
        new Key(false, 'd', 'в', 'D', 'В', false, 'KeyD'),
        new Key(false, 'f', 'а', 'F', 'А', false, 'KeyF'),
        new Key(false, 'g', 'п', 'G', 'П', false, 'KeyG'),
        new Key(false, 'h', 'р', 'H', 'Р', false, 'KeyH'),
        new Key(false, 'j', 'о', 'J', 'О', false, 'KeyJ'),
        new Key(false, 'k', 'л', 'K', 'Л', false, 'KeyK'),
        new Key(false, 'l', 'д', 'L', 'Д', false, 'KeyL'),
        new Key(false, ';', 'ж', ':', 'Ж', false, 'Semicolon'),
        new Key(false, '\'', 'э', '"', 'Э', false, 'Quote'),
        new Key(false, '\\', '\\', '|', '/', false, 'Backslash'),
        new Key(true, 'newline'),

        new Key(true, 'Shift', undefined, undefined, undefined, undefined, 'ShiftLeft'),
        new Key(false, '\\', '\\', '|', '/', false, 'IntlBackslash'),
        new Key(false, 'z', 'я', 'Z', 'Я', false, 'KeyZ'),
        new Key(false, 'x', 'ч', 'X', 'Ч', false, 'KeyX'),
        new Key(false, 'c', 'с', 'C', 'С', false, 'KeyC'),
        new Key(false, 'v', 'м', 'V', 'М', false, 'KeyV'),
        new Key(false, 'b', 'и', 'B', 'И', false, 'KeyB'),
        new Key(false, 'n', 'т', 'N', 'Т', false, 'KeyN'),
        new Key(false, 'm', 'ь', 'M', 'Ь', false, 'KeyM'),
        new Key(false, ',', 'б', '<', 'Б', false, 'Key,'),
        new Key(false, '.', 'ю', '>', 'Ю', false, 'KeyPeriod'),
        new Key(false, '/', '.', '?', ',', false, 'KeySlash'),
        new Key(true, 'Shift', undefined, undefined, undefined, undefined, 'ShiftRight'),
        new Key(true, 'newline'),

        new Key(true, 'Ctr', undefined, undefined, undefined, undefined, 'ControlLeft'),
        new Key(true, '[]', undefined, undefined, undefined, undefined, 'MetaLeft'),
        new Key(true, 'Alt', undefined, undefined, undefined, undefined, 'AltLeft'),
        new Key(true, ' ', undefined, undefined, undefined, undefined, 'Space'),
        new Key(true, 'Alt', undefined, undefined, undefined, undefined, 'AltRight'),
        new Key(true, '[]', undefined, undefined, undefined, undefined, 'MetaRight'),
        new Key(true, '[--]', undefined, undefined, undefined, undefined, 'ContextMenu'),
        new Key(true, 'Ctrl', undefined, undefined, undefined, undefined, 'ControlRight'),
        new Key(true, 'newline'),
    ];
}

const getKeyboardLanguage = (code) => {
    const enChars = ['abcdefghijklmnopqrstuvwxyz'];
    const ruChars = ['абвгдеёжзийклмнопрстуфхцчшщьъыюя'];
    //let char = 
}

const getExpectedLetterByInstance = (instance, lang, shift) => {
    if(lang == 'EN') {
        if(shift) return instance._primaryShift;
        else return instance._primary;
    }
    else {
        if(shift) return instance._secondaryShift;
        else return instance._secondary;
    }
}

const getExpectedLetterByCode = (code, lang, shift) => {
    for(key of KEYS) {
        if(key.code == code) return getExpectedLetterByInstance(instance, lang, shift);
    }
}

const markKey = (code, pressed) => {
    for(key of KEYS) {
        if(key.code == code) {
            key.press(pressed);
            return key;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initKeyboard();
    renderKeyboard();
});

document.addEventListener('keydown', (event) => {

    // change color of key div and get key instance
    let keyInstance = markKey(event.code, true);

    PRESSED_KEYS[event.code] = true;

    // change language if expected letter != real letter
    let realLetter = event.key;
    let hasShift = PRESSED_KEYS.hasOwnProperty('ShiftLeft') || PRESSED_KEYS.hasOwnProperty('ShiftRight');
    let hasCaps = event.getModifierState('CapsLock');
    let shift = hasShift ^ hasCaps;
    let expectedLetter = getExpectedLetterByInstance(keyInstance, LANGUAGE, shift);

    // change language of keyboard, reset key
    let previousLanguage = LANGUAGE;
    if(typeof expectedLetter != 'undefined' && (expectedLetter != realLetter)) {
        LANGUAGE = LANGUAGE == 'RU' ? 'EN' : 'RU';
    }
    let languageChanged = previousLanguage != LANGUAGE;
    if(languageChanged) {
        expectedLetter = getExpectedLetterByInstance(keyInstance, LANGUAGE, shift);
        renderKeyboard();
    }

    if(realLetter == 'Space') {
        TEXTAREA.innerHTML += ' ';
    }
    else if(realLetter == 'Enter') {
        TEXTAREA.innerHTML += '<br>';
    }
    else if(realLetter == 'Backspace') {
        let text = TEXTAREA.innerHTML;
        text = text.substring(0, text.length - 1);
        TEXTAREA.innerHTML = text;
    }
    else if(keyInstance.isSpecial) {
        // pass
    }
    else if(typeof expectedLetter != 'undefined') {
        TEXTAREA.innerHTML += expectedLetter;
    }

});

document.addEventListener('keyup', (event) => {
    // change language
    let hasShift = PRESSED_KEYS.hasOwnProperty('ShiftLeft') || PRESSED_KEYS.hasOwnProperty('ShiftRight');
    let hasAlt = PRESSED_KEYS.hasOwnProperty('AltLeft') || PRESSED_KEYS.hasOwnProperty('AltRight');
    let previousLanguage = LANGUAGE;
    if(hasAlt && hasShift) {
        LANGUAGE = LANGUAGE == 'RU' ? 'EN' : 'RU';
    }
    let languageChanged = previousLanguage != LANGUAGE;
    if(languageChanged) renderKeyboard();

    // print current language
    document.getElementById('language').innerHTML = 'Lang: ' + LANGUAGE;

    // change color of key div
    markKey(event.code, false);

    delete PRESSED_KEYS[event.code];
});