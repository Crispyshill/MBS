import { Challenge } from "../models/challengeModel";
import db from "../utils/db";
import { throwDBErrors } from "../utils/repositoryUtils";
import { DateTime } from "luxon";

export const getChallenges = async (): Promise<Challenge[]> => {
    try{
    const result = await db.query("SELECT externalId, name, description, points, startdate, enddate FROM challenges;");
    if(null == result.rowCount || result.rowCount < 1){
        throw throwDBErrors({"code": "00002"}, "Challenge");
    }
    const challenges: Challenge[] = result.rows;
    return challenges;
    } catch(error) {
        throw throwDBErrors(error, "Challenge");
    }
}


export const getOneChallenge = async(challengeId: string): Promise<Challenge> => {
    try{
    const result = await db.query("SELECT externalId, name, description, points, startdate, enddate FROM challenges WHERE externalId = $1;", [challengeId]);
    if(null == result.rowCount || result.rowCount < 1){
        throw throwDBErrors({"code": "00001"}, "Challenge");
    }
    const challenge: Challenge = result.rows[0];
    return challenge
    } catch(err) {
        throw throwDBErrors(err, "Challenge");
    }
}

export const addOneChallenge = async (challenge: Challenge): Promise<boolean> => {
    try {
      const startDateUTC = DateTime.utc().toISO();
  
      const result = await db.query(
        `INSERT INTO challenges (name, description, points, startdate) 
         VALUES ($1, $2, $3, $4)`,
        [challenge.name, challenge.description, challenge.points, startDateUTC]
      );
  
      return result.rowCount != null && result.rowCount > 0;
    } catch (error: any) {
      throw throwDBErrors(error, "Challenge");
    }
  };

export const updateChallenge = async(challenge: Challenge): Promise<Boolean> => {
    try{
    const result = await db.query("UPDATE challenges SET name = $1, description = $2, points = $3, startdate = $4, enddate = $5 WHERE externalid = $6", [challenge.name, challenge.description, challenge.points, challenge.startdate, challenge.enddate, challenge.externalid]);
    return result.rowCount != null && result.rowCount > 0
    }
    catch(error) {
        throw throwDBErrors(error, "Challenge");
    }
}

export const deleteChallenge = async(challengeId: string): Promise<Boolean> => {
    try{
    const result = await db.query("DELETE FROM challenges WHERE externalId = $1", [challengeId]);
    return result.rowCount != null && result.rowCount > 0

    } catch(error) {
        throw throwDBErrors(error, "Challenge");
    }
}

