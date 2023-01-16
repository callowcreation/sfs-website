import { Route } from "@angular/router";
import { MenuMetadata } from "./menu-metadata";

export interface MenuRoute extends Route {
    data: MenuMetadata
}
