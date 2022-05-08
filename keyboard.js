let LANGUAGE = 'EN';

class Key {
    constructor(isSpecial, primary, secondary, primaryShift, secondaryShift, isWide, specialName) {
        if(typeof isWide == 'undefined') {
            isWide = isSpecial;
        }
        this._type = isSpecial ? 'special' : 'default';
        this._wide = isWide;
        this._primary = primary;
        this._secondary = secondary;
        this._primaryShift = primaryShift;
        this._secondaryShift = secondaryShift;
        this._specialName = specialName;
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
        else if(typeof this._specialName != 'undefined') {
            topLeft = this._specialName;
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
        let code = `<div class="${elemClass}">
            <div class="key-tl ${topLeftStyle}">${topLeft}</div>
            <div class="key-tr ${topRightStyle}">${topRight}</div>
            <div class="key-bl ${bottomLeftStyle}">${bottomLeft}</div>
            <div class="key-br ${bottomRightStyle}">${bottomRight}</div>
        </div>`;
        return code;
    }
}

const TEXTAREA = document.getElementById('textarea');

const initKeyboard = () => {
    let keys = [
        new Key(false, '`', 'ё', '~', 'Ё'),
        new Key(false, '1', '1', '!', '!'),
        new Key(false, '2', '2', '@', '"'),
        new Key(false, '3', '3', '#', '№'),
        new Key(false, '4', '4', '$', ';'),
        new Key(false, '5', '5', '%', '%'),
        new Key(false, '6', '6', '^', ':'),
        new Key(false, '7', '7', '&', '?'),
        new Key(false, '8', '8', '*', '*'),
        new Key(false, '9', '9', '(', '('),
        new Key(false, '0', '0', ')', ')'),
        new Key(false, '-', '-', '_', '_'),
        new Key(false, '=', '=', '+', '+'),
        new Key(true, 'Backspace', undefined, undefined, undefined, undefined, 'Backspace'),
        new Key(true, 'newline'),

        new Key(true, 'Tab', undefined, undefined, undefined, undefined, 'Tab'),
        new Key(false, 'q', 'й', 'Q', 'Й'),
        new Key(false, 'w', 'ц', 'W', 'Ц'),
        new Key(false, 'e', 'у', 'E', 'У'),
        new Key(false, 'r', 'к', 'R', 'К'),
        new Key(false, 't', 'е', 'T', 'Е'),
        new Key(false, 'y', 'н', 'Y', 'Н'),
        new Key(false, 'u', 'г', 'U', 'Г'),
        new Key(false, 'i', 'ш', 'I', 'Ш'),
        new Key(false, 'o', 'щ', 'O', 'Щ'),
        new Key(false, 'p', 'з', 'P', 'З'),
        new Key(false, '[', 'х', '{', 'Х'),
        new Key(false, ']', 'ъ', '}', 'Ъ'),
        new Key(true, 'Enter', undefined, undefined, undefined, undefined, 'Enter'),
        new Key(true, 'newline'),

        new Key(true, 'CapsLock', undefined, undefined, undefined, undefined, 'Caps Lock'),
        new Key(false, 'a', 'ф', 'A', 'Ф'),
        new Key(false, 's', 'ы', 'S', 'Ы'),
        new Key(false, 'd', 'в', 'D', 'В'),
        new Key(false, 'f', 'а', 'F', 'А'),
        new Key(false, 'g', 'п', 'G', 'П'),
        new Key(false, 'h', 'р', 'H', 'Р'),
        new Key(false, 'j', 'о', 'J', 'О'),
        new Key(false, 'k', 'л', 'K', 'Л'),
        new Key(false, 'l', 'д', 'L', 'Д'),
        new Key(false, ';', 'ж', ':', 'Ж'),
        new Key(false, '\'', 'э', '"', 'Э'),
        new Key(false, '\\', '\\', '|', '/'),
        new Key(true, 'newline'),

        new Key(true, 'LeftShift', undefined, undefined, undefined, undefined, 'Shift'),
        new Key(false, '\\', '\\', '|', '/'),
        new Key(false, 'z', 'я', 'Z', 'Я'),
        new Key(false, 'x', 'ч', 'X', 'Ч'),
        new Key(false, 'c', 'с', 'C', 'С'),
        new Key(false, 'v', 'м', 'V', 'М'),
        new Key(false, 'b', 'и', 'B', 'И'),
        new Key(false, 'n', 'т', 'N', 'Т'),
        new Key(false, 'm', 'ь', 'M', 'Ь'),
        new Key(false, ',', 'б', '<', 'Б'),
        new Key(false, '.', 'ю', '>', 'Ю'),
        new Key(false, '/', '.', '?', ','),
        new Key(true, 'RightShift', undefined, undefined, undefined, undefined, 'Shift'),
        new Key(true, 'newline'),

        new Key(true, 'LeftCtrl', undefined, undefined, undefined, undefined, specialName='Ctrl'),
        new Key(true, 'LeftSpecial'),
        new Key(true, 'LeftAlt', undefined, undefined, undefined, undefined, specialName='Alt'),
        new Key(true, 'Spacebar', undefined, undefined, undefined, undefined, specialName=''),
        new Key(true, 'RightAlt', undefined, undefined, undefined, undefined, specialName='Alt'),
        new Key(true, 'RightSpecial'),
        new Key(true, 'RightList'),
        new Key(true, 'RightCtrl', undefined, undefined, undefined, undefined, 'Ctrl'),
        new Key(true, 'newline'),

    ];

    for(key of keys) {
        TEXTAREA.innerHTML += key.getHTML();
    }

}

document.addEventListener('DOMContentLoaded', () => {
    initKeyboard();
});