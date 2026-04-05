export interface Enterprise{
    email: string;
    name: string;
}

export interface Job{
    enterpriseId: number;
    title: string;
    description: string;
}