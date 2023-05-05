export interface Repository {
    id: number,
    name: string,
    description: string,
    owner: {
        id: number,
        avatarUrl: string,
        name: string
    }
}