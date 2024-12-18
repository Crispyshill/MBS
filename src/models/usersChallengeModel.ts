import { Challenge } from "./challengeModel";

export interface UsersChallenge {
    externalid: string;
    userid: string;
    challengeid: string;
    iscompleted: boolean; // If the user completed the challenge
    completeddate: string;
    challenge: Challenge;
}