import { PureComponent } from 'react';
import { Props, State } from './types';
/**
 * Wrapper around @atlaskit/droplist which uses Popup and Portal to render
 * dropdown-menu outside of "overflow: hidden" containers when needed.
 *
 * Also it controls popper's placement.
 */
export default class DropdownMenuWrapper extends PureComponent<Props, State> {
    state: State;
    private handleRef;
    private updatePopupPlacement;
    private handleClose;
    private renderItem;
    private renderDropdownMenu;
    render(): JSX.Element;
}
