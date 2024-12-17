import { Challenge } from "../models/challengeModel";
import db from "../utils/db";

export const getChallenges = async (): Promise<Challenge[]> => {
    const result = await db.query("SELECT * FROM challenges;");
    const challenges: Challenge[] = result.rows;
    return challenges;
}


export const getOneChallenge = async(challengeId: string): Promise<Challenge> => {
    const result = await db.query("SELECT * FROM challenges WHERE id = $1;", [challengeId]);
    const challenge: Challenge = result.rows[0];
    return challenge
}