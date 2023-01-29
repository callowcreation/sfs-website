export interface Appearance {
    'background-color': string;
    'border-color': string;
    'color': string;
}

export interface Behaviour {
    'auto-shoutouts': boolean;
    'badge-vip': boolean;
    'commands': string[];
}

export interface Bits {
    'enable-bits': boolean;
    'bits-tier': string;
    'pin-days': number;
}