let LANGUAGE = 'EN';
let CAPSLOCK = false;
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

        let [topLeft, topRight, bottomLeft, bottomRight] = ['', '', '', ''];

        let [topLeftStyle, topRightStyle, bottomLeftStyle, bottomRightStyle] = ['key-normal', 'key-normal', 'key-normal', 'key-normal'];

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
        let capsState = (this._code == 'CapsLock') && CAPSLOCK;
        let caps = capsState ? 'keydown' : '';
        let html = `<div class="${elemClass} ${caps}" id="${elemId}">
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
        new Key(false, '`', '??', '~', '??', false, 'Backquote'),
        new Key(false, '1', '1', '!', '!', false, 'Digit1'),
        new Key(false, '2', '2', '@', '"', false, 'Digit2'),
        new Key(false, '3', '3', '#', '???', false, 'Digit3'),
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
        new Key(false, 'q', '??', 'Q', '??', false, 'KeyQ'),
        new Key(false, 'w', '??', 'W', '??', false, 'KeyW'),
        new Key(false, 'e', '??', 'E', '??', false, 'KeyE'),
        new Key(false, 'r', '??', 'R', '??', false, 'KeyR'),
        new Key(false, 't', '??', 'T', '??', false, 'KeyT'),
        new Key(false, 'y', '??', 'Y', '??', false, 'KeyY'),
        new Key(false, 'u', '??', 'U', '??', false, 'KeyU'),
        new Key(false, 'i', '??', 'I', '??', false, 'KeyI'),
        new Key(false, 'o', '??', 'O', '??', false, 'KeyO'),
        new Key(false, 'p', '??', 'P', '??', false, 'KeyP'),
        new Key(false, '[', '??', '{', '??', false, 'BracketLeft'),
        new Key(false, ']', '??', '}', '??', false, 'BracketRight'),
        new Key(true, 'Enter', undefined, undefined, undefined, undefined, 'Enter'),
        new Key(true, 'newline'),

        new Key(true, 'Caps Lock', undefined, undefined, undefined, undefined, 'CapsLock'),
        new Key(false, 'a', '??', 'A', '??', false, 'KeyA'),
        new Key(false, 's', '??', 'S', '??', false, 'KeyS'),
        new Key(false, 'd', '??', 'D', '??', false, 'KeyD'),
        new Key(false, 'f', '??', 'F', '??', false, 'KeyF'),
        new Key(false, 'g', '??', 'G', '??', false, 'KeyG'),
        new Key(false, 'h', '??', 'H', '??', false, 'KeyH'),
        new Key(false, 'j', '??', 'J', '??', false, 'KeyJ'),
        new Key(false, 'k', '??', 'K', '??', false, 'KeyK'),
        new Key(false, 'l', '??', 'L', '??', false, 'KeyL'),
        new Key(false, ';', '??', ':', '??', false, 'Semicolon'),
        new Key(false, '\'', '??', '"', '??', false, 'Quote'),
        new Key(false, '\\', '\\', '|', '/', false, 'Backslash'),
        new Key(true, 'newline'),

        new Key(true, 'Shift', undefined, undefined, undefined, undefined, 'ShiftLeft'),
        new Key(false, '\\', '\\', '|', '/', false, 'IntlBackslash'),
        new Key(false, 'z', '??', 'Z', '??', false, 'KeyZ'),
        new Key(false, 'x', '??', 'X', '??', false, 'KeyX'),
        new Key(false, 'c', '??', 'C', '??', false, 'KeyC'),
        new Key(false, 'v', '??', 'V', '??', false, 'KeyV'),
        new Key(false, 'b', '??', 'B', '??', false, 'KeyB'),
        new Key(false, 'n', '??', 'N', '??', false, 'KeyN'),
        new Key(false, 'm', '??', 'M', '??', false, 'KeyM'),
        new Key(false, ',', '??', '<', '??', false, 'Key,'),
        new Key(false, '.', '??', '>', '??', false, 'KeyPeriod'),
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
            // caps lock block
            if(key.code == 'CapsLock') pressed = CAPSLOCK;
            // mark
            key.press(pressed);
            return key;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initKeyboard();
    renderKeyboard();
});

const keyDown = (event) => {

    // change color of key div and get key instance
    let keyInstance = markKey(event.code, true);

    PRESSED_KEYS[event.code] = true;

    // change language if expected letter != real letter
    let realLetter = event.key;
    let hasShift = PRESSED_KEYS.hasOwnProperty('ShiftLeft') || PRESSED_KEYS.hasOwnProperty('ShiftRight');
    CAPSLOCK = event.getModifierState('CapsLock');
    let shift = hasShift ^ CAPSLOCK;
    let expectedLetter = getExpectedLetterByInstance(keyInstance, LANGUAGE, shift);

    // change language of keyboard, reset key
    let previousLanguage = LANGUAGE;
    if(!keyInstance.isSpecial && typeof expectedLetter != 'undefined' && (expectedLetter != realLetter)) {
        LANGUAGE = LANGUAGE == 'RU' ? 'EN' : 'RU';
    }
    let languageChanged = previousLanguage != LANGUAGE;
    if(languageChanged) {
        expectedLetter = getExpectedLetterByInstance(keyInstance, LANGUAGE, shift);
        renderKeyboard();
    }

    if(realLetter == ' ') {
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

}

const keyUp = (event) => {

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

}

document.addEventListener('keydown', (event) => {
    keyDown(event);
});

document.addEventListener('keyup', (event) => {
    keyUp(event);
});