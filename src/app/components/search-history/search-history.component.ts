import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent {
  @Input() history: string[] = [];
  @Output() select = new EventEmitter<string>();

  pick(city: string): void {
    this.select.emit(city);
  }
}
