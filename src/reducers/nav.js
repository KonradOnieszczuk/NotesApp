import { NAV_RESPONSIVE, NAV_ACTIVATE, ROUTE_CHANGED } from '../actions/nav';

const initialState = {
  responsive: 'multiple',
  active: true,
  items: [
    { path: '/', label: 'Notes' },
    { path: '/calendar', label: 'Calendar' },
    { path: '/archive', label: 'Archive' },
  ],
};

export default function nav(state = initialState, action) {
  switch (action.type) {
    case NAV_RESPONSIVE:
      if (action.responsive === 'single' && state.active) {
        return { ...state, responsive: action.responsive, active: false };
      }
      if (action.responsive === 'multiple') {
        return { ...state, responsive: action.responsive, active: true };
      }

      return { ...state, responsive: action.responsive };
    case NAV_ACTIVATE:
      return { ...state, active: action.active };

    case ROUTE_CHANGED:
      if (state.responsive === 'single' && state.active) {
        return { ...state, active: false };
      }

      return state;
    default:
      return state;
  }
}
