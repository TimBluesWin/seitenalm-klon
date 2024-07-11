/**Warum Server-Side Rendering?
- Bessere Leistungen: Der Server zeigt komplett gerendertes HTML an, bevor er die JS herunterladen.
- Bessere SEO: Einfachere Indexierung und Crawling der Applikation.
*/

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
