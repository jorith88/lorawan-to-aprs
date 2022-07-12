import { DevicePayload } from "./DevicePayload";

export interface Dc {
    balance: number;
    nonce: number;
}

export interface Decoded {
    payload: DevicePayload;
    status: string;
}

export interface Hotspot {
    channel: number;
    frequency: number;
    hold_time: number;
    id: string;
    lat: number;
    long: number;
    name: string;
    reported_at: number;
    rssi: number;
    snr: number;
    spreading: string;
    status: string;
}

export interface Metadata {
    adr_allowed: boolean;
    cf_list_enabled: boolean;
    multi_buy: number;
    organization_id: string;
    preferred_hotspots: any[];
    rx_delay: number;
    rx_delay_actual: number;
    rx_delay_state: string;
}

export interface HeliumMessage {
    app_eui: string;
    dc: Dc;
    decoded: Decoded;
    dev_eui: string;
    devaddr: string;
    fcnt: number;
    hotspots: Hotspot[];
    id: string;
    metadata: Metadata;
    name: string;
    payload: string;
    payload_size: number;
    port: number;
    raw_packet: string;
    replay: boolean;
    reported_at: number;
    type: string;
    uuid: string;
}
