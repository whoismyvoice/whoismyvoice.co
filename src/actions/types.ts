import { Dispatch as ReduxDispatch } from 'redux';
import { Contribution, SectorContributions } from '../models/Contribution';
import { Record as Legislator } from '../models/Legislator';
import { Record as Official } from '../models/Official';

export enum ActionType {
  /** Action type used when address is provided. */
  RECEIVE_ADDRESS = 'RECEIVE_ADDRESS',
  /** Action type used when new contribution data is received. */
  RECEIVE_CONTRIBUTION_DATA = 'RECEIVE_CONTRIBUTION_DATA',
  /** Action type used when data for multiple contributions is received. */
  RECEIVE_CONTRIBUTIONS_BY_SECTOR_DATA = 'RECEIVE_CONTRIBUTIONS_BY_SECTOR_DATA',
  /** Action type used when data for multiple contributions is received. */
  RECEIVE_CONTRIBUTIONS_DATA = 'RECEIVE_CONTRIBUTIONS_DATA',
  /** Action type used when gps or location data is provided. */
  RECEIVE_GPS = 'RECEIVE_GPS',
  /** Action type used after officials are updated. */
  RECEIVE_OFFICIALS = 'RECEIVE_OFFICIALS',
  /** Action type used when receiving full list of legislators. */
  RECEIVE_OFFICIALS_ALL = 'RECEIVE_OFFICIALS_ALL',
  /** Action type used when receiving an error after requesting officials for address. */
  RECEIVE_OFFICIALS_ERROR = 'RECEIVE_OFFICIALS_ERROR',
  /** Action type dispatched when change pages of legislators. */
  RECEIVE_PAGE = 'RECEIVE_PAGE',
  /** Action type used when address is provided. */
  RECEIVE_ZIP_CODE = 'RECEIVE_ZIP_CODE',
  /** Action type used when invalid zip code is provided. */
  RECEIVE_ZIP_CODE_INVALID = 'RECEIVE_ZIP_CODE_INVALID',
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

export interface ContributionsDataAction {
  type: ActionType.RECEIVE_CONTRIBUTIONS_DATA;
  contributions: Array<Contribution>;
}

export interface ContributionsBySectorDataAction {
  type: ActionType.RECEIVE_CONTRIBUTIONS_BY_SECTOR_DATA;
  contributions: SectorContributions[];
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
  isParseError: boolean;
  message: string;
  messages: Array<string>;
}

export interface ZipCodeAction {
  type: ActionType.RECEIVE_ZIP_CODE;
  zipCode: string;
}

export interface ZipCodeInvalidAction {
  type: ActionType.RECEIVE_ZIP_CODE_INVALID;
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

export interface PageAction {
  type: ActionType.RECEIVE_PAGE;
  page: 1 | 2;
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
  | ContributionsDataAction
  | ContributionsBySectorDataAction
  | OfficialsAction
  | LegislatorsAction
  | OfficialsErrorAction
  | ZipCodeAction
  | ZipCodeInvalidAction
  | ResetAction
  | ToggleMenuAction
  | GpsAction
  | PageAction
  | OtherAction;

/**
 * Type for the redux dispatch function.
 */
export type Dispatch = ReduxDispatch<Action>;
