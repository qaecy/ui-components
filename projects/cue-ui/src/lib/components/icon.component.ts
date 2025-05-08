import { Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

// export const supportedIcons = ["filter", "home"];

const materialIconMap = new Map<Icon, string>([
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
    @else {
        icon not implemented
    }`
})

export class IconComponent {
    icon = input<Icon>("home");
    inline = input(false);

    matIcon = computed(() => materialIconMap.get(this.icon()))
}