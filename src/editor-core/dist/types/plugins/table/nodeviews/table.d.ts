import { Node as PmNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { EventDispatcher } from '../../../event-dispatcher';
import { ForwardRef, getPosHandler, getPosHandlerNode } from '../../../nodeviews';
import ReactNodeView from '../../../nodeviews/ReactNodeView';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { Props, TableOptions } from './types';
export default class TableView extends ReactNodeView<Props> {
    private table;
    getPos: getPosHandlerNode;
    constructor(props: Props);
    getContentDOM(): {
        dom: Node;
        contentDOM?: Node | null | undefined;
    };
    setDomAttrs(node: PmNode): void;
    render(props: Props, forwardRef: ForwardRef): JSX.Element;
    ignoreMutation(): boolean;
}
export declare const createTableView: (node: PmNode, view: EditorView, getPos: getPosHandler, portalProviderAPI: PortalProviderAPI, eventDispatcher: EventDispatcher, options: TableOptions) => NodeView;
