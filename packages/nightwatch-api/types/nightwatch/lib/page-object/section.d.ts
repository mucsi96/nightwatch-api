import { Api } from 'nightwatch';

export default class Section {
  constructor(definition: object, options: object);
  api: Api;
  [key: string]: Api;
}
