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
            { path: 'map', loadComponent: () => import('./components/rxjs/map/map.component').then(m => m.MapComponent) },
            { path: 'filter', loadComponent: () => import('./components/rxjs/filter/filter.component').then(m => m.FilterComponent) },
            { path: 'pluck', loadComponent: () => import('./components/rxjs/pluck/pluck.component').then(m => m.PluckComponent) },
            { path: 'take', loadComponent: () => import('./components/rxjs/take/take.component').then(m => m.TakeComponent) },
            { path: 'debounce-time', loadComponent: () => import('./components/rxjs/debounce-time/debounce-time.component').then(m => m.DebounceTimeComponent) },
            { path: 'tap', loadComponent: () => import('./components/rxjs/tap/tap.component').then(m => m.TapComponent) },
            { path: 'retry', loadComponent: () => import('./components/rxjs/retry/retry.component').then(m => m.RetryComponent) }

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
