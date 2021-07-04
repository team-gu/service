/* eslint-disable no-unused-vars */
import { FlattenSimpleInterpolation } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      black: string;
      white: string;
      gray: string;
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
      n20m: FlattenSimpleInterpolation;
      n18b: FlattenSimpleInterpolation;
      n16m: FlattenSimpleInterpolation;
      n16r: FlattenSimpleInterpolation;
      n14b: FlattenSimpleInterpolation;
      n14m: FlattenSimpleInterpolation;
      n14r: FlattenSimpleInterpolation;
      n12b: FlattenSimpleInterpolation;
      n12m: FlattenSimpleInterpolation;
      ellipse: (wrap?: string) => FlattenSimpleInterpolation;
    };
    input: any;
  }
}
