/**
 * Walks a DOM tree up to the provided `stopElement`, or if falsy before.
 * @param element
 * @param stopElement
 */
export declare function walkUpTreeUntil(element: HTMLElement, shouldStop: (element: HTMLElement) => boolean): HTMLElement;
/**
 * Takes all children out from wrapped el and puts them directly inside
 * the parent el, at the wrapped el's position
 */
export declare function unwrap(parent: HTMLElement, wrapped: HTMLElement): void;
/**
 * Walks up DOM removing elements if they are empty until it finds
 * one that is not
 */
export declare function removeNestedEmptyEls(el: HTMLElement): void;
/**
 * IE11 doesn't support classList to SVGElements
 **/
export declare const containsClassName: (node: HTMLElement | SVGElement | null, className: string) => boolean;
export declare function closest(node: HTMLElement | null | undefined, s: string): HTMLElement | null;
/**
 * Replacement for Element.closest, until it becomes widely implemented
 * Returns the ancestor element of a particular type if exists or null
 */
export declare function closestElement(node: HTMLElement | null | undefined, s: string): HTMLElement | null;
export declare function parsePx(pxStr: string): number | undefined;
export declare type MapCallback<T, S> = (elem: S, idx: number, parent: Element) => T;
export declare function mapElem<T>(elem: Element, callback: MapCallback<T, Element>): Array<T>;
export declare function maphElem<T, U extends HTMLElement>(elem: U, callback: MapCallback<T, U>): Array<T>;
