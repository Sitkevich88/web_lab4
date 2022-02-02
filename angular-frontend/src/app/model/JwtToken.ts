export class JwtToken{
  private _jwt: string;

  constructor(jwt: string) {
    this._jwt = jwt;
  }

  get jwt(): string {
    return this._jwt;
  }

  set jwt(value: string) {
    this._jwt = value;
  }
}
