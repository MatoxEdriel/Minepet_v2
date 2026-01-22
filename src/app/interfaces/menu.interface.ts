
export interface MenuItem {
    label: string;
    icon: string;
    path?: string;
    roles?: string[];
    children?: MenuItem[];
}

export interface MenuSection {
    title: string;
    items: MenuItem[];
}