export const NAV_RESPONSIVE = 'NAV_RESPONSIVE';
export const NAV_ACTIVATE = 'NAV_ACTIVATE';
export const ROUTE_CHANGED = 'ROUTE_CHANGED';

export function navResponsive(responsive) {
  return {
    type: NAV_RESPONSIVE,
    responsive,
  };
}

export function navActivate(active) {
  return {
    type: NAV_ACTIVATE,
    active,
  };
}

export function routeChanged(location) {
  return {
    type: ROUTE_CHANGED,
    location,
  };
}
