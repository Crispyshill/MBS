import { Challenge } from "../models/challengeModel";
import db from "../utils/db";
import { throwDBErrors } from "../utils/repositoryUtils";

export const getChallenges = async (): Promise<Challenge[]> => {
    try{
    const result = await db.query("SELECT externalId, name, description, points, startdate, enddate FROM challenges;");
    const challenges: Challenge[] = result.rows;
    return challenges;
    } catch(error) {
        throw throwDBErrors(error);
    }
}


export const getOneChallenge = async(challengeId: string): Promise<Challenge> => {
    try{
    const result = await db.query("SELECT externalId, name, description, points, startdate, enddate FROM challenges WHERE externalId = $1;", [challengeId]);
    const challenge: Challenge = result.rows[0];
    return challenge
    } catch(err) {
        throw throwDBErrors(err);
    }
}

export const addOneChallenge = async(challenge: Challenge): Promise<void> => {
    try {
        // Execute the database query
        const result = await db.query(
          `INSERT INTO challenges (name, description, points, startdate, enddate) 
           VALUES ($1, $2, $3, $4, $5)`,
          [challenge.name, challenge.description, challenge.points, challenge.startdate, challenge.enddate]
        );
    
        // Optional: Log success if needed
        console.log(`Challenge "${challenge.name}" added successfully.`);
      } catch (error: any) {
        // Handle specific errors
        throw throwDBErrors(error);
      }
}

export const updateChallenge = async(challenge: Challenge): Promise<void> => {
    try{
    const result = await db.query("UPDATE challenges SET name = $1, description = $2, points = $3, startdate = $4, enddadte = $5", [challenge.name, challenge.description, challenge.points, challenge.startdate, challenge.enddate]);
    }
    catch(error) {
        throw throwDBErrors(error);
    }
}

export const deleteChallenge = async(challengeId: string): Promise<void> => {
    try{
    const result = await db.query("DELETE FROM challenges WHERE externalId = $1", [challengeId]);
    } catch(error) {
        throw throwDBErrors(error);
    }
}

