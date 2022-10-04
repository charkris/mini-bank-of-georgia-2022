export class Account {
  constructor(
    private accountKey: number,
    public accountName: string,
    public clientFirstName: string,
    public clientLastName: string,
    public amount: number,
  ) {
  }
}
