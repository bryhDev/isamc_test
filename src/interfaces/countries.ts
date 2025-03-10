export interface City {
  id: number;
  name: string;
  stateId: number;
}

export interface State {
  id: number;
  name: string;
  countryId: number;
  cities: City[];
}

export interface Country {
  id: number;
  name: string;
  phoneCode: number;
  states: State[];
}
