import { User } from "./user";

export interface Team {
    _id: string;
    name: string;
    users_id: string[];
    project_id: string;
}