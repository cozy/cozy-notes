import { HTMLAttributes, ComponentClass } from 'react';
export interface MentionItemStyleProps {
    selected?: boolean;
}
export interface NameSectionStyleProps {
    restricted?: boolean;
}
export declare const RowStyle: ComponentClass<HTMLAttributes<{}>>;
export declare const AvatarStyle: ComponentClass<HTMLAttributes<{}>>;
export declare const NameSectionStyle: ComponentClass<HTMLAttributes<{}> & NameSectionStyleProps>;
export declare const MentionItemStyle: ComponentClass<HTMLAttributes<{}> & MentionItemStyleProps>;
export declare const CapitalizedStyle: ComponentClass<HTMLAttributes<{}>>;
