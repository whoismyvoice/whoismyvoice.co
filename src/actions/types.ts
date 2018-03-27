import { Record as Official } from '../models/Official';
import { Record as Legislator } from '../models/Legislator';

export enum ActionType {
  /** Action type used when address is provided. */
  RECEIVE_ADDRESS = 'RECEIVE_ADDRESS',
  /** Action type used when new contribution data is received. */
  RECEIVE_CONTRIBUTION_DATA = 'RECEIVE_CONTRIBUTION_DATA',
  /** Action type used when gps or location data is provided. */
  RECEIVE_GPS = 'RECEIVE_GPS',
  /** Action type used after officials are updated. */
  RECEIVE_OFFICIALS = 'RECEIVE_OFFICIALS',
  /** Action type used when receiving full list of legislators. */
  RECEIVE_OFFICIALS_ALL = 'RECEIVE_OFFICIALS_ALL',
  /** Action type used when receiving an error after requesting officials for address. */
  RECEIVE_OFFICIALS_ERROR = 'RECEIVE_OFFICIALS_ERROR',
  /** Action type used when address is provided. */
  RECEIVE_ZIP_CODE = 'RECEIVE_ZIP_CODE',
  /** Action type to reset current state. */
  RESET_CURRENT = 'RESET_CURRENT',
  /** Action to toggle the menu. */
  TOGGLE_MENU = 'TOGGLE_MENU',
  /** Catch all action type */
  OTHER = '__any_other_action__',
}

export interface AddressAction {
  type: ActionType.RECEIVE_ADDRESS;
  address: string;
}

export interface ContributionDataAction {
  type: ActionType.RECEIVE_CONTRIBUTION_DATA;
  amount: number;
  legislatorId: string;
  organization: string;
}

export interface OfficialsAction {
  type: ActionType.RECEIVE_OFFICIALS;
  officials: Array<Official>;
}

export interface LegislatorsAction {
  type: ActionType.RECEIVE_OFFICIALS_ALL;
  officials: Array<Legislator>;
}

export interface OfficialsErrorAction {
  type: ActionType.RECEIVE_OFFICIALS_ERROR;
  code: number;
  isGlobal: boolean;
  message: string;
  messages: Array<string>;
}

export interface ZipCodeAction {
  type: ActionType.RECEIVE_ZIP_CODE;
  zipCode: string;
}

export interface ResetAction {
  type: ActionType.RESET_CURRENT;
}

export interface ToggleMenuAction {
  type: ActionType.TOGGLE_MENU;
}

export interface OtherAction {
  type: ActionType.OTHER;
}

export interface GpsAction {
  type: ActionType.RECEIVE_GPS;
  latitude: string;
  longitude: string;
}

/**
 * Record type for an Action.
 */
export type Action =
  | AddressAction
  | ContributionDataAction
  | OfficialsAction
  | LegislatorsAction
  | OfficialsErrorAction
  | ZipCodeAction
  | ResetAction
  | ToggleMenuAction
  | GpsAction
  | OtherAction;

/**
 * Type for the redux dispatch function.
 */
export type Dispatch = (action: Action | Promise<Action>) => void;
