export class User {
  constructor(
    private _token: string,
    private _expirationDate: Date,
    public name: string,
    public username: string,
    public image: string,
  ) {}

  get token() {
    if (!this._expirationDate || new Date() > this._expirationDate) {
      return undefined;
    }
    return this._token;
  }
}
