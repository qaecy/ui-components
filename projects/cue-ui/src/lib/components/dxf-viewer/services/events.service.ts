import { Injectable, OnDestroy, WritableSignal, signal } from '@angular/core';
import { DxfViewer } from 'dxf-viewer';
import { DrawingClickEvent } from '../models';
import { Vector2 } from 'three';

@Injectable({
    providedIn: 'root'
})
export class EventsService implements OnDestroy{

    private _dxf?: DxfViewer;

    private _pressTime?: number;
    private _pressTimer: any;
    private _shortPressDuration = 300;
    private _longPressDuration = 1000;
    private _emittedLongPress = false;

    modelLoaded: WritableSignal<boolean> = signal(false);
    drawingClicked: WritableSignal<DrawingClickEvent|undefined> = signal(undefined);
    drawingLongClicked: WritableSignal<DrawingClickEvent|undefined> = signal(undefined);

    init(dxf: DxfViewer){
        dxf.Subscribe("loaded", () => this.modelLoaded.set(true));
        dxf.Subscribe("pointerdown", (ev) => {

            if(this._pressTime !== undefined) return;
            this._pressTime = new Date().getTime();

            this._pressTimer = setTimeout(() => {
                this._handleLongPress(ev);
                this._emittedLongPress = true;
                clearTimeout(this._pressTimer);
            }, this._longPressDuration);

        });
        dxf.Subscribe("pointerup", (ev) => {
            if(this._pressTime === undefined) return;
            clearTimeout(this._pressTimer);
            const pressDuration = this._pressTime - new Date().getTime();
            if (pressDuration < this._shortPressDuration && !this._emittedLongPress) {
                this._handleShortPress(ev);
            }
            this._reset();
        });
        dxf.Subscribe("viewChanged", (ev) => {
            // console.log(ev)
            // const zoom = dxf.GetCamera()
            // console.log(zoom)
            // Nothing useful emitted
            // Get zoom and offset possible?
            // Can be used to rearrange XYWH boxes?
        })
    }

    ngOnDestroy(): void {
        this._dxf?.Unsubscribe("loaded", () => {
            //
        });
        this._dxf?.Unsubscribe("pointerdown", () => {
            //
        });
        this._dxf?.Unsubscribe("viewChanged", () => {
            //
        });
    }

    private _handleShortPress(ev: any){
        this.drawingClicked.set(this._processKeyPress(ev));
    }

    private _handleLongPress(ev: any){
        this.drawingLongClicked.set(this._processKeyPress(ev));
    }

    private _reset(){
        this._pressTime = undefined;
        this._emittedLongPress = false;
    }

    private _processKeyPress(ev: any): DrawingClickEvent {
        const p = ev.detail.position;
        const origin = this._dxf?.GetOrigin() ?? new Vector2(0,0);
        return {
            ...ev.detail,
            origin,
            absolutePosition: {x: p.x+origin.x, y: p.y+origin.y}
        };
    }

}