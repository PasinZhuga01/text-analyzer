import { Component, viewChild } from '@angular/core';

import { TextEditor } from './components/text-editor/text-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [TextEditor],
})
export class App {
  protected readonly _textEditor = viewChild.required<TextEditor>('textEditor');

  protected _replaceSelectionWithSynonym(synonym: string): void {
    this._textEditor().replaceSelected(synonym);
  }
}
