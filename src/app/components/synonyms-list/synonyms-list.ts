import { Component, inject, output, signal } from '@angular/core';

import { SynonymsListState } from './synonyms-list.types';

import { SynonymsService } from '../../services/synonyms-service';

@Component({
  selector: 'app-synonyms-list',
  imports: [],
  templateUrl: './synonyms-list.html',
  styleUrl: './synonyms-list.css',
})
export class SynonymsList {
  public readonly selected = output<string>();

  protected readonly _state = signal<SynonymsListState>({ status: 'idle' });

  private readonly _synonymsService = inject(SynonymsService);

  public async loadSynonyms(text: string): Promise<void> {
    if (this._state().status === 'loading') {
      return;
    }

    this._state.set({ status: 'loading' });

    try {
      this._state.set({ status: 'ready', items: await this._synonymsService.getSynonyms(text) });
    } catch (error) {
      this._state.set({ status: 'error', message: error instanceof Error ? error.message : 'Unknown error' });
    }
  }
}
