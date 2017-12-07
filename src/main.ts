import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { enableProdMode } from '@angular/core';
import { AppModule } from 'app/app.module';

import './app.bom';


function bootstrapAngular() {
    if (process.env.ENV === 'production') {
        enableProdMode();
    }

    platformBrowserDynamic().bootstrapModule(AppModule)
        .then(sucess => console.log('Pristine angular started sucessfully'))
        .catch(error => console.error(error));
}

// Angular must not be bootstrapped when running tests. First we wait until all scripts are loaded
// and executed (setTimeout) and then we check if jasmine has been loaded (only in dev mode)
setTimeout(() => !window['jasmine'] ? bootstrapAngular() : console.log('[TEST MODE]'), 0);




