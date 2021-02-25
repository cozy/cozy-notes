import { JSONDocNode } from '@atlaskit/editor-json-transformer';
import { ProviderFactory } from '@atlaskit/editor-common';
/**
 * Sanitises a document where some content should not be in the document (e.g. mention names).
 *
 * It is expected that these names we be resolved separately (e.g. when rendering
 * a node view).
 */
export declare function sanitizeNodeForPrivacy(json: JSONDocNode, providerFactory?: ProviderFactory): JSONDocNode;
