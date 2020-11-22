type APIItem = {
    name: string
    url: string
}

export type FlavorTextEntry = {
    flavor_text: string
    language: APIItem
}

export type GenerationResponse = {
    id: number
    name: string
    versions: string[]
    pokemon: string[]
}

export type GenerationResource = {
    id: number
    main_region: APIItem
    moves: APIItem[]
    name: string
    names: {
        language: APIItem
        name: string
    }[]
    pokemon_species: APIItem[]
    types: APIItem[]
    version_groups: APIItem[]
}

export type SpeciesResponse = {
    id: number,
    name: string,
    color: string,
    evolution: string,
    description: string,
    isLegendary: boolean,
    isMythical: boolean
}

export type SpeciesResource = {
    base_happiness: number
    capture_rate: number
    color: APIItem
    egg_groups: APIItem[]
    evolution_chain: {
        url: string
    }
    evolves_from_species: APIItem
    flavor_text_entries: FlavorTextEntry[]
    form_descriptions: APIItem[]
    forms_switchable: boolean
    gender_rate: number
    genera: {
        genus: string
        language: APIItem
    }[]
    generation: APIItem
    growth_rate: APIItem
    habitat: APIItem
    has_gender_differences: boolean
    hatch_counter: number
    id: number
    is_baby: boolean
    is_legendary: boolean
    is_mythical: boolean
    name: string
    names: {
        language: APIItem
        name: string
    }[]
    order: number
    pal_park_encounters: {
        area: APIItem
        base_score: number
        rate: number
    }[]
    pokedex_numbers: {
        entry_number: number
        pokedex: APIItem
    }[]
    shape: APIItem
    varieties: {
        is_default: boolean
        pokemon: APIItem
    }[]
}