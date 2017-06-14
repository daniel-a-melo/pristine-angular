import { NgModule } from '@angular/core';


/**
 * The core module shall be imported only once (by AppModule) and
 * it shall not be lazy loaded
 *
 * It contains strictly services that should be singletons app wide
 */
@NgModule({
})
export class CoreModule { }
