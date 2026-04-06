export interface AddJob{
    enterpriseId: number;
    title: string;
    description: string;
}

export interface DeleteJob{
    enterpriseId: number;
    jobId: number;
}