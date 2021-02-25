import { Schema } from 'prosemirror-model';
import { MarkConfig, NodeConfig } from '../types/pm-config';
export declare function createSchema(editorConfig: {
    marks: MarkConfig[];
    nodes: NodeConfig[];
}): Schema<string, string>;
