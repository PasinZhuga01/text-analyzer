import { Component, signal, viewChild } from '@angular/core';

import { TextEditor } from './components/text-editor/text-editor';
import { SynonymsList } from "./components/synonyms-list/synonyms-list";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [TextEditor, SynonymsList],
})
export class App {
  protected readonly _isSelectionMissing = signal(false);

  protected readonly _textEditor = viewChild.required<TextEditor>('textEditor');
  protected readonly _synonymsList = viewChild.required<SynonymsList>('synonymsList');

  protected _loadSynonyms(): void {
    const selectedValue = this._textEditor().getSelectedValue();

    if (selectedValue === null) {
      return this._isSelectionMissing.set(true);
    }

    this._synonymsList().loadSynonyms(selectedValue);
  }

  protected _replaceSelectionWithSynonym(synonym: string): void {
    this._textEditor().replaceSelected(synonym);
  }
}
