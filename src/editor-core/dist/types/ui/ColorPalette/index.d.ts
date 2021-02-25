import React from 'react';
import { PaletteColor } from './Palettes/type';
import { InjectedIntlProps } from 'react-intl';
export interface Props {
    palette: PaletteColor[];
    selectedColor: string | null;
    onClick: (value: string) => void;
    cols?: number;
    className?: string;
}
/**
 * For a given color pick the color from a list of colors with
 * the highest contrast
 *
 * @param color color string, suppports HEX, RGB, RGBA etc.
 * @return Highest contrast color in pool
 */
export declare function getContrastColor(color: string, pool: string[]): string;
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
