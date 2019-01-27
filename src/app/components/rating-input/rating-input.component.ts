import { Component, forwardRef, HostBinding, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-rating-input',
  templateUrl: 'rating-input.component.html',
  styleUrls: ['rating-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingInputComponent),
      multi: true
    }
  ]
})
export class RatingInputComponent implements ControlValueAccessor {
  
  public stars: boolean[] = Array(5).fill(false);

  // Allow the input to be disabled.
  @Input() disabled = false;
  
  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }

  // Function to call when the rating changes. 
  // Component => Form Api.
  public onChange = (rating: number) => {};

  // Function to call when the input is touched (when a star is clicked).
  public onTouched = () => {};

  public get value(): number {
    return this.stars.reduce((total, starred) => {
      return total + (starred ? 1 : 0);
    }, 0);
  }

  public rate(rating: number): void {
    if (!this.disabled) {
      this.stars = this.stars.map((_, i) => i < rating);
      this.onChange(this.value);
    }
  }

  // Called by Angular to update the view (component).
  // Form Api => component (view).
  public writeValue(rating: number): void {
    this.stars = this.stars.map((_, i) => i < rating);
  } 

  // Allows Angular to register a function to call when the model (rating) changes.
  // Save the function as a property to call later here.
  // Called by component to update the model.
  public registerOnChange(fn: (rating: number) => void): void {
    this.onChange = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
