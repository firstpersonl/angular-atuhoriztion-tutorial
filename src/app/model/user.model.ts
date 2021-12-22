import { ROLE } from "../utils/biz-constant";

export interface User {
    username: string;
    address: string;
    token: string;
    roles: ROLE[];
}