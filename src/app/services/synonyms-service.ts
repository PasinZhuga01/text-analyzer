import { firstValueFrom } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SynonymsService {
  private readonly _http = inject(HttpClient);

  public async getSynonyms(text: string, limit: number = 10): Promise<string[]> {
    return (
      await firstValueFrom(
        this._http.get<Array<{ word: string }>>('https://api.datamuse.com/words', {
          params: { ['rel_syn']: text, max: limit },
        }),
      )
    ).map(({ word }) => word);
  }
}
