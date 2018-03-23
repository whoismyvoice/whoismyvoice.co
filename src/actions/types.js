// @flow

/** Action type used when address is provided. */
export const RECEIVE_ADDRESS = 'RECEIVE_ADDRESS';
/** Action type used when new contribution data is received. */
export const RECEIVE_CONTRIBUTION_DATA = 'RECEIVE_CONTRIBUTION_DATA';
/** Action type used when gps or location data is provided. */
export const RECEIVE_GPS = 'RECEIVE_GPS';
/** Action type used after officials are updated. */
export const RECEIVE_OFFICIALS = 'RECEIVE_OFFICIALS';
/** Action type used when receiving full list of legislators. */
export const RECEIVE_OFFICIALS_ALL = 'RECEIVE_OFFICIALS_ALL';
/** Action type used when receiving an error after requesting officials for address. */
export const RECEIVE_OFFICIALS_ERROR = 'RECEIVE_OFFICIALS_ERROR';
/** Action type used when address is provided. */
export const RECEIVE_ZIP_CODE = 'RECEIVE_ZIP_CODE';
/** Action type to reset current state. */
export const RESET_CURRENT = 'RESET_CURRENT';
/** Action to toggle the menu. */
export const TOGGLE_MENU = 'TOGGLE_MENU';

/**
 * Record type for an Action.
 */
export type Action = {
  type: string,
  [key: string]: any,
};
