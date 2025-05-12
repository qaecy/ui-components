import { EventEmitter } from "tsee";

export class KeyPressHandler{

    private static _instance: KeyPressHandler;
    private _pressTimer: any;
    private _shortPressDuration = 300;
    private _longPressDuration = 1000;
    private _pressTime?: number;
    private _emittedLongPress = false;

    events = new EventEmitter<{
        longPressedEsc: () => void;
        shortPressedEsc: () => void;
        longPressedKey: (key: string) => void;
        shortPressedKey: (key: string) => void;
        holdingKey: (key: string) => void;
        releasedKey: (key: string) => void;
    }>();

    private constructor() {
        document.addEventListener("keydown", (ev: KeyboardEvent) => {

            if(this._pressTime !== undefined) return;

            this._pressTime = new Date().getTime();

            this._pressTimer = setTimeout(() => {
                this._handleLongPress(ev.key);
                this._emittedLongPress = true;
                clearTimeout(this._pressTimer);
            }, this._longPressDuration);

            this.events.emit("holdingKey", ev.key);

        });

        document.addEventListener("keyup", (ev) => {
            if(this._pressTime === undefined) return;
            clearTimeout(this._pressTimer);
            const pressDuration = this._pressTime - new Date().getTime();
            if (pressDuration < this._shortPressDuration && !this._emittedLongPress) {
                this._handleShortPress(ev.key);
            }
            this._reset();
            this.events.emit("releasedKey", ev.key);
        });
    }

    static getInstance() {
        if (this._instance) {
        return this._instance;
        }
        this._instance = new KeyPressHandler();
        return this._instance;
    }

    private _handleShortPress(key: string){
        if(key === 'Escape'){
            this.events.emit("shortPressedEsc");
        }
        this.events.emit("shortPressedKey", key);
    }

    private _handleLongPress(key: string){
        if(key === 'Escape'){
            this.events.emit("longPressedEsc");
        }
        this.events.emit("longPressedKey", key);
    }

    private _reset(){
        this._pressTime = undefined;
        this._emittedLongPress = false;
    }

}