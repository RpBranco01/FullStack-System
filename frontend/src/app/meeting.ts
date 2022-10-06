export interface Meeting {
    _id: string;
    begin: Date;
    end: Date;
    duration: number;
    users_id: string[];
    available_dates: Date[];
}