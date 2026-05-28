import { Component, computed, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-editor',
  imports: [FormsModule],
  templateUrl: './text-editor.html',
  styleUrl: './text-editor.css',
})
export class TextEditor {
  protected readonly _value = signal('');
  protected readonly _isCopied = signal(false);

  protected readonly _symbolsCount = computed(() => this._value().length);
  protected readonly _wordsCount = computed(() => this._value().trim().split(/\s+/).filter(Boolean).length);

  private readonly _textarea = viewChild.required<ElementRef<HTMLTextAreaElement>>('textarea');

  public getSelectedValue(): string | null {
    const { selectionStart, selectionEnd } = this._textarea().nativeElement;
    const value = this._value().slice(selectionStart, selectionEnd);

    return value.trim().length > 0 ? value : null;
  }

  public replaceSelected(value: string): void {
    const textarea = this._textarea().nativeElement;
    const { selectionStart, selectionEnd } = textarea;

    const oldValue = this._value();
    const newValue = `${oldValue.slice(0, selectionStart)}${value}${oldValue.slice(selectionEnd)}`;

    this._value.set(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(selectionStart, selectionStart + value.length);
    });
  }

  protected async _copyValueToClipboard(): Promise<void> {
    await navigator.clipboard.writeText(this._value());
    this._isCopied.set(true);
  }
}
