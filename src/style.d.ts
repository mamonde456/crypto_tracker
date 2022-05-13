import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    accentColor: string;
    btnBgColor: string;
    btnBorderColor: string;
    tabBorder: string;
    overViewBg: string;
    tabAccentBg: string;
    priceTabBg: string;
  }
}
