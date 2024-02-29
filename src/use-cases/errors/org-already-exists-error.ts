export class OrgAlreadyExistsError extends Error {
  constructor() {
    super('Organization with same email already registered.')
  }
}
