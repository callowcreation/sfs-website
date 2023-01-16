import { MenuName } from "../enums/menu-name";

export interface MenuMetadata {
    menu: boolean;
    name: MenuName;
    icon: string | null;
}