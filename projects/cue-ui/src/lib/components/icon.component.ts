import { Component, computed, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { svgIcons } from './icons-svg';

// export const supportedIcons = ["filter", "home"];

const materialIconMap = new Map<Icon, string>([
    ["arrow_back", "arrow_back"],
    ["file", "insert_drive_file"],
    ["filter", "filter_alt"],
    ["filter_off", "filter_alt_off"],
    ["home", "home"],
    ["rocket", "rocket_launch"],
    ["search", "search"],
    ["send", "send"],
    ["warning", "warning"]
]);
export const supportedIcons: string[] = Array.from(materialIconMap.keys()); // For now only material icons but can be extended with own
export type Icon = (typeof supportedIcons)[number];

@Component({
    selector: 'cue-icon',
    imports: [MatIconModule],
    template: `
    @if(matIcon(); as icon){
        <mat-icon class="material-icons-outlined" [fontIcon]="icon" [inline]="inline()"></mat-icon>
    }
    @else if(svgIcon()){
        <mat-icon class="material-icons-outlined" [svgIcon]="svgIcon()" [inline]="inline()"></mat-icon>
    }
    @else {
        icon not implemented
    }`
})

export class IconComponent {

    private _iconRegistry = inject(MatIconRegistry);
    private _sanitizer = inject(DomSanitizer);

    icon = input<Icon>("home");
    inline = input(false);

    matIcon = computed(() => materialIconMap.get(this.icon()));
    svgIcon = computed(() => {
        const svgBase64 = svgIcons[this.icon()];
        if(svgBase64 !== undefined){
            const svg = atob(svgBase64);
            this._iconRegistry.addSvgIconLiteral(this.icon(), this._sanitizer.bypassSecurityTrustHtml(svg));
            return this.icon();
        }
        return "";
    });
}