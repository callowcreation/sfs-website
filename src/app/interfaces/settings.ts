export interface Settings extends Record<string, string | number | boolean | string[]> {
    'background-color': string;
    'border-color': string;
    'color': string;
    'auto-shoutouts': boolean;
    'enable-bits': boolean;
    'bits-tier': string;
    'pin-days': number;
    'badge-vip': boolean;
    'commands': string[];
}