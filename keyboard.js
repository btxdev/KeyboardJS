class Key {
    constructor(isSpecial, primary, secondary, primaryShift, secondaryShift, isWide) {
        if(typeof isWide == 'undefined') {
            isWide = isSpecial;
        }
        this._type = isSpecial ? 'special' : 'default';
        this._wide = isWide;
        this._primary = primary;
        this._secondary = secondary;
        this._primaryShift = primaryShift;
        this._secondaryShift = secondaryShift;
    }
}

const TEXTAREA = document.getElementById('textarea');

const initKeyboard = () => {
    let keys = [
        Key(false, '`', 'secondary', '~', 'secondaryShift'),
        Key(false, '1', 'secondary', '!', 'secondaryShift'),
        Key(false, '2', 'secondary', '@', 'secondaryShift'),
        Key(false, '3', 'secondary', '#', 'secondaryShift'),
        Key(false, '4', 'secondary', '$', 'secondaryShift'),
        Key(false, '5', 'secondary', '%', 'secondaryShift'),
        Key(false, '6', 'secondary', '^', 'secondaryShift'),
        Key(false, '7', 'secondary', '&', 'secondaryShift'),
        Key(false, '8', 'secondary', '*', 'secondaryShift'),
        Key(false, '9', 'secondary', '(', 'secondaryShift'),
        Key(false, '0', 'secondary', ')', 'secondaryShift'),
        Key(false, '-', 'secondary', '_', 'secondaryShift'),
        Key(false, '=', 'secondary', '+', 'secondaryShift'),
        Key(true, 'Backspace'),

        Key(true, 'Tab'),
        Key(false, 'q', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, 'w', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, 'e', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, 'r', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, 't', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, 'y', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, 'u', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, 'i', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, 'o', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, 'p', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, '[', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, ']', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(true, 'Enter'),

        Key(true, 'CapsLock'),
        Key(false, 'a', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, 's', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, 'd', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, 'f', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, 'g', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, 'h', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, 'j', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, 'k', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, 'l', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, ';', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, '\'', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, '\\', 'secondary', 'primaryShift', 'secondaryShift'),

        Key(true, 'LeftShift'),
        Key(false, '\\', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, 'z', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, 'x', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, 'c', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, 'v', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, 'b', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, 'n', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, 'm', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, ',', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, '.', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(false, '/', 'secondary', 'primaryShift', 'secondaryShift'),
        Key(true, 'RightShift'),

        Key(true, 'LeftCtrl'),
        Key(true, 'LeftSpecial'),
        Key(true, 'LeftAlt'),
        Key(true, 'Spacebar'),
        Key(true, 'RightAlt'),
        Key(true, 'RightSpecial'),
        Key(true, 'RightList'),
        Key(true, 'RightCtrl'),
    ];

    for(key of keys) {
        TEXTAREA.innerHTML += key.getHTML();
    }
}