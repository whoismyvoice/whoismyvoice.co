import { track } from 'mixpanel-browser';

type TrackArguments = Parameters<typeof track>;
/** Argugment Arrays for calls to `mixpanel.track` when `About` mounts */
export const ABOUT_ROUTE: TrackArguments = ['NAVIGATE', { route: 'About' }];
/** Argugment Arrays for calls to `mixpanel.track` when `Home` mounts */
export const HOME_ROUTE: TrackArguments = ['NAVIGATE', { route: 'Home' }];
/** Argugment Arrays for calls to `mixpanel.track` when `Sources` mounts */
export const SOURCES_ROUTE: TrackArguments = ['NAVIGATE', { route: 'Sources' }];
