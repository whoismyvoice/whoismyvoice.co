export interface Record {
  readonly name: string;
  readonly divisionId: string;
  readonly levels: string[];
  readonly roles: string[];
}

const STATE_DIVISION_REGEX = /^state:(\w{2})/;
const DISTRICT_DIVISION_REGEX = /^cd:(\d{1,2})/;

/**
 * Provides convenience functionality based on `offices` data from the Google
 * Civic Information API.
 */
export class Office implements Record {
  constructor(private data: Record) {}

  /**
   * Generate the identifier for the office from the state and district
   * information.
   * @returns a combination of `state` and `district` to represent the id if
   * neither exist fall back to `divisionId`.
   */
  get id(): string {
    const parts = [this.state, this.congressionalDistrict].filter(
      (part) => typeof part === 'string'
    );
    if (parts.length === 0) {
      return this.divisionId;
    } else {
      return parts.join('');
    }
  }

  /**
   * Parse the congressional district number from the `divisionId` padded to a
   * length of two.
   * @returns the congression district number if available.
   */
  get congressionalDistrict(): string | undefined {
    const parts = this.data.divisionId.split('/');
    const districtPart = parts.find((part) =>
      DISTRICT_DIVISION_REGEX.test(part)
    );
    if (typeof districtPart === 'undefined') {
      return undefined;
    }
    return districtPart.replace(DISTRICT_DIVISION_REGEX, '$1').padStart(2, '0');
  }

  /**
   * The `divisionId` from Google Civic Information API data.
   * @returns the divisionId.
   */
  get divisionId(): string {
    return this.data.divisionId;
  }

  /**
   * The `levels` from Google Civic Information API data.
   * @returns the levels.
   */
  get levels(): string[] {
    return this.data.levels;
  }

  /**
   * The `name` from Google Civic Information API data.
   * @returns the name.
   */
  get name(): string {
    return this.data.name;
  }

  /**
   * The `roles` from Google Civic Information API data.
   * @returns the roles.
   */
  get roles(): string[] {
    return this.data.roles;
  }

  /**
   * Parse the state code from the `divisionId`.
   * @returns the state code if available.
   */
  get state(): string | undefined {
    const parts = this.data.divisionId.split('/');
    const statePart = parts.find((part) => STATE_DIVISION_REGEX.test(part));
    return statePart?.replace(STATE_DIVISION_REGEX, '$1').toUpperCase();
  }
}
