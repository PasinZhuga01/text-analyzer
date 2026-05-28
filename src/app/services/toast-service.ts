import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public readonly isVisible: Signal<boolean>;
  public readonly text: Signal<string>;

  private readonly _isVisible = signal(false);
  private readonly _text = signal('');

  public constructor() {
    this.isVisible = this._isVisible.asReadonly();
    this.text = this._text.asReadonly();
  }

  public show(text: string): void {
    this._text.set(text);
    this._isVisible.set(true);
  }

  public hide(): void {
    this._isVisible.set(false);
  }
}
