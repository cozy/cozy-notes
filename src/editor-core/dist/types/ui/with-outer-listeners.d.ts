import { ComponentClass, StatelessComponent } from 'react';
declare type SimpleEventHandler<T> = (event: T) => void;
export interface WithOutsideClickProps {
    handleClickOutside?: SimpleEventHandler<MouseEvent>;
    handleEscapeKeydown?: SimpleEventHandler<KeyboardEvent>;
    handleEnterKeydown?: SimpleEventHandler<KeyboardEvent>;
}
export default function withOuterListeners<P>(Component: ComponentClass<P> | StatelessComponent<P>): ComponentClass<P & WithOutsideClickProps>;
export {};
