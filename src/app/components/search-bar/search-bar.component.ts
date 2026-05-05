import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @Input() suggestions: string[] = [];
  @Output() search = new EventEmitter<string>();

  searchControl = new FormControl('');
  filteredSuggestions: string[] = [];
  showSuggestions = false;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(value => {
      const q = value?.trim().toLowerCase() ?? '';
      if (q.length > 0) {
        this.filteredSuggestions = this.suggestions.filter(s =>
          s.toLowerCase().startsWith(q)
        );
        this.showSuggestions = this.filteredSuggestions.length > 0;
      } else {
        this.showSuggestions = false;
      }
    });
  }

  onSubmit(): void {
    const city = this.searchControl.value?.trim();
    if (city) {
      this.search.emit(city);
      this.showSuggestions = false;
    }
  }

  selectSuggestion(city: string): void {
    this.searchControl.setValue(city);
    this.search.emit(city);
    this.showSuggestions = false;
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') this.onSubmit();
    if (event.key === 'Escape') this.showSuggestions = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
