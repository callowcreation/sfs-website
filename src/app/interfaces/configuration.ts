import { BitsTier } from "../enums/bits-tier";

export interface Configuration {
    backgroundColor: string;
    color: string;
    borderColor: string;

    autoShoutouts: boolean;

    enableBits: boolean;
    bitsTier: BitsTier;
    pinDays: number;
}
