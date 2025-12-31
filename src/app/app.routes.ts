import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'signup',
        loadComponent: () => import('./components/signup/signup.component').then(m => m.SignupComponent)
    },
    {
        path: 'rxjs',
        loadComponent: () => import('./components/rxjs/rxjs.component').then(m => m.RxjsComponent),
        children: [
            { path: '', loadComponent: () => import('./components/rxjs/list/list.component').then(m => m.ListComponent) },
            { path: 'from-event', loadComponent: () => import('./components/rxjs/from-event/from-event.component').then(m => m.FromEventComponent) },
            { path: 'interval', loadComponent: () => import('./components/rxjs/interval/interval.component').then(m => m.IntervalComponent) },
            { path: 'of-from', loadComponent: () => import('./components/rxjs/of-from/of-from.component').then(m => m.OfFromComponent) },
            { path: 'to-array', loadComponent: () => import('./components/rxjs/to-array/to-array.component').then(m => m.ToArrayComponent) },
            { path: 'cust-obs', loadComponent: () => import('./components/rxjs/custom-observable/custom-observable.component').then(m => m.CustomObservableComponent) },
        ],
        canActivate: [authGuard]
    },
    {
        path: 'terms',
        loadComponent: () => import('./components/terms/terms.component').then(m => m.TermsComponent),
        canActivate: [authGuard]
    },
    {
        path: 'privacy',
        loadComponent: () => import('./components/privacy/privacy.component').then(m => m.PrivacyComponent),
        canActivate: [authGuard]
    },
    {
        path: 'active-users',
        loadComponent: () => import('./components/active-users/active-users.component').then(m => m.ActiveUsersComponent),
        canActivate: [authGuard]
    },
    {
        path: 'signal',
        loadComponent: () => import('./components/signal/signal.component').then(m => m.SignalComponent),
        canActivate: [authGuard]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];
