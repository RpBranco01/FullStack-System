export interface Task {
    _id: string;
    name: string;
    priority: string; //TODO: should be a enum?
    progress: number;
    start_date: string;
    finish_date: string;
    user_id: string;
    users_id: string[];
    project_id: string;
}