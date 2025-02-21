import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterModule], 
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() variant: 'primary' | 'danger' | 'info' | 'success' = 'primary';
  @Output() clicked = new EventEmitter<void>();
}