import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Layer } from '../../models';
import { DXFViewerSettings } from '../../dxf-viewer.settings';
import { DraggableCard } from '../../../draggable-card.component';

@Component({
    imports: [CommonModule, MatIconModule, MatButtonModule, DragDropModule, DraggableCard],
    selector: 'lib-layers',
    templateUrl: 'layers.component.html',
    styleUrls: ['layers.component.scss']
})

export class LayersComponent {

    @Input() settings = new DXFViewerSettings();
    @Input() layers: Layer[] = [];

    allLayersOn = true;

    toggleVisibility(){
        this.settings.visibility.ui.showLayerPanel = !this.settings.visibility.ui.showLayerPanel;
    }

    toggleLayer(layer: Layer){
        layer.toggleCheck();
        if(this.allLayersOn) this.allLayersOn = false;
    }

    toggleAll(){
        // Toggle all off
        if(this.allLayersOn){
            this.layers.forEach(l => {
                if(l.checked) l.toggleCheck();
            });
            this.allLayersOn = false;
        }else{
            this.layers.forEach(l => {
                if(!l.checked) l.toggleCheck();
            });
            this.allLayersOn = true;
        }
    }

}