import { Challenge } from "../models/challengeModel";
import { getChallenges as getChallengesFromRepository, getOneChallenge as getOneChallengeFromRepository, addOneChallenge as addOneChallengeFromRepository, updateChallenge as updateChallengeFromRepository, deleteChallenge as deleteChallengeFromRepository } from "../repositories/challengeRepository";


export const getChallenges = async(): Promise<Challenge[]> => {
    try{
    const challenges = getChallengesFromRepository();
    return challenges;
    } catch(err) {
        const error = new Error("error in getChallenges");
        (error as any).status = 500;
        throw error;
    }
}

export const getOneChallenge = async(challengeId: string): Promise<Challenge> => {
    try{
    const challenge = getOneChallengeFromRepository(challengeId);
    return challenge;
    } catch(err) {
       throw err
    }
}

export const addOneChallenge = async(challenge: Challenge): Promise<void> => {
    try{
        return addOneChallengeFromRepository(challenge);
    } catch(err){
        throw err;
}
}

export const updateChallenge = async(challenge: Challenge): Promise<void> => {
    try{
        return updateChallengeFromRepository(challenge);
    } catch(err){
        throw err
    }
}

export const deleteChallenge = async(challengeId: string): Promise<void> => {
    try{
        return deleteChallengeFromRepository(challengeId);
    } catch(err){
        throw err
    }
}