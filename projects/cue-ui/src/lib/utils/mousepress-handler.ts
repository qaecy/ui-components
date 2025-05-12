import { KeyPressHandler } from "./keypress-handler";
import { EventEmitter } from "tsee";

export class MousePressHandler{

    private static _instance: MousePressHandler;
    private _pressTimer: any;
    private _shortPressDuration = 200;
    private _pressTime?: number;
    private _emittedLongPress = false;
    private _holdingControl = false;
    private _keyPressHandler = KeyPressHandler.getInstance();

    events = new EventEmitter<{
        longPressedRight: (ev: MouseEvent) => void;
        shortPressedRight: (ev: MouseEvent) => void;
        longPressedLeft: (ev: MouseEvent) => void;
        shortPressedLeft: (ev: MouseEvent) => void;
    }>();

    private constructor() {

        this._keyPressHandler.events.addListener("holdingKey", (key) => {
            this._holdingControl = key === "Control";
        });

        this._keyPressHandler.events.addListener("releasedKey", (key) => {
            if(key === "Control") this._holdingControl = false;
        });

        document.addEventListener("mousedown", (ev: MouseEvent) => {

            if(this._pressTime !== undefined) return;

            this._pressTime = new Date().getTime();

            this._pressTimer = setTimeout(() => {
                this._handlePress(ev, "long");
                this._emittedLongPress = true;
                clearTimeout(this._pressTimer);
            }, this._shortPressDuration);

        });

        document.addEventListener("mouseup", (ev: MouseEvent) => {
            if(this._pressTime === undefined) return;
            clearTimeout(this._pressTimer);
            const pressDuration = this._pressTime - new Date().getTime();
            if (pressDuration < this._shortPressDuration && !this._emittedLongPress) {
                this._handlePress(ev, "short");
            }
            this._reset();
        });
    }

    static getInstance() {
        if (this._instance) {
        return this._instance;
        }
        this._instance = new MousePressHandler();
        return this._instance;
    }

    private _handlePress(ev: MouseEvent, longShort: "long"|"short"){
        if(ev.button === 0 && !this._holdingControl){
            this.events.emit(`${longShort}PressedLeft`, ev);
        }
        // Mac ctrl click
        if(ev.button === 0 && this._holdingControl){
            this.events.emit(`${longShort}PressedRight`, ev);
        }
        if(ev.button === 2){
            this.events.emit(`${longShort}PressedRight`, ev);
        }
    }

    private _reset(){
        this._pressTime = undefined;
        this._emittedLongPress = false;
    }

}