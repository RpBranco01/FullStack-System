import { Task } from "./task";


export interface Project {
    _id: string;
    name: string;
    acronym: string;
    start: Date;
    end: Date;
    tasks_id: string[],
    team_id: string;
}