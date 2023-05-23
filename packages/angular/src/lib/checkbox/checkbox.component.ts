import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fue-checkbox',
  standalone: true,
  imports: [CommonModule],
  template: `<p>checkbox works!</p>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {}
