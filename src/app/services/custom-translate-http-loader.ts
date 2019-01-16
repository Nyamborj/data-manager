import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class CustomTranslateHttpLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    public prefix: string = 'assets/i18n/',
    public suffix: string = '.json'
  ) {}

  public getTranslation(lang: string): Observable<Object> {
    return this.http.get(`${this.prefix}${lang}${this.suffix}`).pipe(
      catchError(e => {
        console.error(`Failed to download localization json file for locale ${lang}, defaulting to en-US.`);
        console.error(e.message);
        return this.http.get(`${this.prefix}en-US${this.suffix}`);
      })
    );
  }
}
