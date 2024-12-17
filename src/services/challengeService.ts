import { Challenge } from "../models/challengeModel";
import { getChallenges, getOneChallenge } from "../repositories/challengeRepository";
import db from "../utils/db";
import { ensureResourceExists } from "../validation/authValidation";

export const getAllChallenges = async(): Promise<Challenge[]> => {
    const challenges = getChallenges();
    return challenges;
}

export const getChallenge = async(challengeId: string): Promise<Challenge> => {
    const challenge = getOneChallenge(challengeId);
    return challenge;
}