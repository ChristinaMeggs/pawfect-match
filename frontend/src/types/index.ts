export type Species = 'dog' | 'cat' | 'rabbit' | 'bird';
export type AdoptionStatus = 'available' | 'pending' | 'adopted';

export interface Pet {
    id: string;
    name: string;
    species: Species;
    age: number;
    breed: string;
    description: string;
    imageUrl: string;
    status: AdoptionStatus;
    isFavourited: boolean;
}

export interface FilterState {
    species: Species | 'all';
    maxAge: number | null;
    availableOnly: boolean;
}