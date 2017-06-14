import {platformBrowser} from '@angular/platform-browser';
import {AppModuleNgFactory} from '../aot/src/app/app.module.ngfactory';

import { enableProdMode } from '@angular/core';


import 'rxjs.bom';
import '../assets/css/styles.css';

if (process.env.ENV === 'production') {
    console.log('PROD MODE');
    enableProdMode();
}

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory)
    .then(sucess => console.log('Pristine angular started sucessfully [AOT mode]'))
    .catch(error => console.error(error));
