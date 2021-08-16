/* eslint-disable no-unused-vars */
import { FlattenSimpleInterpolation } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      black: string;
      white: string;
      gray: string;
      daangn: string;
      microBlue: string;
      lightBlue: string;
    };
    layout: {
      pageMaxWidth: string;
      pageContentWidth: string;
      pcHeaderHeight: string;
      mobileHeaderHeight: string;
    };
    flexCol: (
      justifyContent?: string,
      alignItems?: string,
    ) => FlattenSimpleInterpolation;
    flexRow: (
      justifyContent?: string,
      alignItems?: string,
    ) => FlattenSimpleInterpolation;
    font: {
      n36m: FlattenSimpleInterpolation;
      n26b: FlattenSimpleInterpolation;
      n24b: FlattenSimpleInterpolation;
      n24m: FlattenSimpleInterpolation;
      n22b: FlattenSimpleInterpolation;
      n22m: FlattenSimpleInterpolation;
      n20b: FlattenSimpleInterpolation;
      n20m: FlattenSimpleInterpolation;
      n18b: FlattenSimpleInterpolation;
      n18m: FlattenSimpleInterpolation;
      n16b: FlattenSimpleInterpolation;
      n16m: FlattenSimpleInterpolation;
      n16r: FlattenSimpleInterpolation;
      n14b: FlattenSimpleInterpolation;
      n14m: FlattenSimpleInterpolation;
      n14r: FlattenSimpleInterpolation;
      n12b: FlattenSimpleInterpolation;
      n12m: FlattenSimpleInterpolation;
      n10m: FlattenSimpleInterpolation;
      ellipse: (wrap?: string) => FlattenSimpleInterpolation;
    };
  }
}
