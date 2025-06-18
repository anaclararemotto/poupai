import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'mfe', loadComponent: () => loadRemoteModule( 'mfe', './Component').then((m) => m.HomeComponent)
    }
];
