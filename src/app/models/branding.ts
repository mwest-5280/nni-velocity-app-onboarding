export interface Branding {
  brandNumber: string;
  lenderId: string;
  parameters: Params[];
}
export interface Params {
  version: string;
  displayName: string;
  defaultTheme: boolean;

}
