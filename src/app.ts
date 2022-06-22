import { Router, RouterConfiguration } from 'aurelia-router';
import { inject, PLATFORM } from 'aurelia-framework';
import { WebAPI } from './data/web-api';

@inject(WebAPI)
export class App {
  router: Router;

  constructor(public api: WebAPI) { }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Contacts';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      { route: '', moduleId: PLATFORM.moduleName('elements/no-selection/no-selection'), title: 'Select' },
      { route: 'contacts/:id', moduleId: PLATFORM.moduleName('elements/contact-detail/contact-detail'), name: 'contacts' }
    ]);

    this.router = router;
  }
}
