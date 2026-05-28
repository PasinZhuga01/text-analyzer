import { Component, inject, viewChild } from '@angular/core';

import { SynonymsList } from './components/synonyms-list/synonyms-list';
import { TextEditor } from './components/text-editor/text-editor';
import { Toast } from './components/toast/toast';
import { ToastService } from './services/toast-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [TextEditor, SynonymsList, Toast],
})
export class App {
  protected readonly _textEditor = viewChild.required<TextEditor>('textEditor');
  protected readonly _synonymsList = viewChild.required<SynonymsList>('synonymsList');

  private readonly _toastService = inject(ToastService);

  protected _loadSynonyms(): void {
    const selectedValue = this._textEditor().getSelectedValue();

    if (selectedValue === null) {
      return this._toastService.show('Фрагмент не було виділено');
    }

    this._synonymsList().loadSynonyms(selectedValue);
  }

  protected _replaceSelectionWithSynonym(synonym: string): void {
    this._textEditor().replaceSelected(synonym);
  }
}
