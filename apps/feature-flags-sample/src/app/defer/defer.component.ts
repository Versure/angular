import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureFlagsFacade } from "@recode/feature-flags";
import { Observable } from "rxjs";

@Component({
  selector: 'recode-defer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './defer.component.html',
  styleUrl: './defer.component.scss',
})
export class DeferComponent implements OnInit{
  private readonly facade = inject(FeatureFlagsFacade);

  protected isEnabled$!: Observable<boolean>;

  ngOnInit(): void {
    this.isEnabled$ = this.facade.featureFlagEnabled('customer');
  }

  protected featureFlagEnabled(featureFlag: string): Observable<boolean> {
    return this.facade.featureFlagEnabled(featureFlag);
  }
}
