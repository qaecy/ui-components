import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';
import { marked } from 'marked';
import { DynamicHooksComponent } from 'ngx-dynamic-hooks';
import { chatTags } from './chat-tags';
import { DocRefData } from './chat-components/inline-ref/inline-ref.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cue-in-chat-component',
  template: `<ngx-dynamic-hooks
    [parsers]="parsers"
    [content]="html()"
    [context]="processedContext()"
  ></ngx-dynamic-hooks>`,
  imports: [DynamicHooksComponent],
})
export class InChatComponent {
  
  md = input.required<string>();
  context = input.required<{ [key: string]: unknown }>();
  startPassive = input<boolean>(true);

  parsers = chatTags;
  html = signal<string>('');
  processedContext = computed(() => this._overrideContext(this.context()));

  hoveredRef = signal<string>(""); // documentId of highlighted

  onTextChange = effect(async () => {
    const txt = this.md();
    if (txt) {
      let html = await marked(txt);
      html = this._setPassiveMode(html, this.startPassive());
      if (this.startPassive() === false) {
        html = this._overrideRefOutput(html);
      }
      this.html.set(html);
    } else {
      this.html.set('');
    }
  });

  private _setPassiveMode(html: string, passive: boolean) {
    ['bim-viewer', 'map'].forEach((tag) => {
      html = html.replace(new RegExp(`<${tag}`, 'g'), `<${tag} [startPassive]="${passive}"`);
      html = html.replace(new RegExp(`&lt;${tag}`, 'g'), `&lt;${tag} [startPassive]="${passive}"`);
    });
    return html;
  }

  // Appends hover/clicked events + tooltip
  private _overrideRefOutput(html: string){
    const regex = /<ref\b[^>]*>.*?<\/ref>/g;
    const refs = html.match(regex);
    refs?.forEach(ref => {
      const indexM = ref.match(/\bi=["']?([^"'\s>]+)["']?/);
      if(indexM){
        const index = parseInt(indexM[1]);
        let addition = `(hovered)=context.qaecyRefHoverHandler($event) (clicked)=context.qaecyRefClickHandler($event)`
        if(this.context()["refs"] !== undefined) addition+= ` [data]="context.refs[${index}]"`;
        const newRef = ref.replace("<ref", `<ref ${addition}`);
        html = html.replace(ref, newRef);
      }
    });
    return html;
  }

  private _overrideContext(context: any) {
    if (context === undefined) return;
    // Always add handler for reference hover and click
    context['qaecyRefHoverHandler'] = (i: number | undefined) => {
        console.log("xx")
      const ref =
        i !== undefined ? this._getRefFromIndex(context, i) : undefined;
      const documentId = ref?.documentId ?? '';
      this.hoveredRef.set(documentId);
    };
    context['qaecyRefClickHandler'] = (i: number) => {
      const ref = this._getRefFromIndex(context, i);
      console.log('Clicked ref');
      console.log(ref);
    };
    return context;
  }

  private _getRefFromIndex(context: any, i: number): DocRefData|undefined{
    const refs = context["refs"];
    if(refs === undefined) return;
    return refs[i];
  }

}
