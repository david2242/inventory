import {enableProdMode} from "@angular/core";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {LOCALE_ID} from "@angular/core";
import {registerLocaleData} from "@angular/common";
import localeHu from "@angular/common/locales/hu"

registerLocaleData(localeHu, "hu");

import {AppModule} from "./app/app.module";
import {environment} from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [{provide: LOCALE_ID, useValue: "hu-HU"}]
})
  .catch(err => console.error(err));
