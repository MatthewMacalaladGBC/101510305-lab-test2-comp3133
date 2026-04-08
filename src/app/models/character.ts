export interface Wand {
    wood: string;
    core: string;
    length: number | null;
}

// Null all fields that might not have values
export interface Character {
    id: string;
    name: string;
    species: string | null;
    house: string | null;
    wizard: boolean;
    ancestry: string | null;
    wand: Wand | null;
    actor: string | null;
    image: string | null;
}