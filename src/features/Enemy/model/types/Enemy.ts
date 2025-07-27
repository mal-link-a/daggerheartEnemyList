export interface Enemy {
    name: string;
    description: string;
    motives_tactics: string;
    stress: number;
    tag: string;
    tier: number;
    threshold1: number;
    threshold2: number;
    hp: number;
    weapon: string;
    dmg_type: string;
    atk: number;
    atk_roll: string;
    difficulty: number;
    distance: string;
    experience: string;
    features: Features[];
}

export interface Features {
    name: string;
    tag: string;
    description: string;
}

export type Enemies = Enemy[];
