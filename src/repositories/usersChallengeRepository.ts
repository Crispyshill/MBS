import { UsersChallenge } from "../models/usersChallengeModel";
import { throwDBErrors } from "../utils/repositoryUtils";
import db from "../utils/db";

export const getAllUsersChallenges = async (userId: string): Promise<UsersChallenge[]> => {
    try{
      const result = await db.query(
        "SELECT * FROM usersChallenges WHERE userId = $1;",
        [userId] // Use parameterized query to avoid SQL injection
      );
     
      const challenges: UsersChallenge[] = result.rows;
      return challenges;
    } catch(error) {
      throw throwDBErrors(error, "UsersChallenge"); // Rethrow the error for handling upstream
    }
    }


    export const updateUsersChallenge = async (usersChallenge: UsersChallenge): Promise<boolean> => {
        try{
        const result = await db.query(
          "UPDATE userschallenges SET iscompleted = $1, completedate = $2 WHERE id = $3", [usersChallenge.iscompleted, usersChallenge.completeddate, usersChallenge.externalid]
        );
        return result.rowCount !== null && result.rowCount > 0;
      } catch (error) {
        console.error("Error updating users challenge:", error);
        throw throwDBErrors(error, "UsersChallenge"); // Rethrow the error for handling upstream
      }
        
      }

      
      export const getOneUsersChallenge = async (usersChallengeId: string): Promise<UsersChallenge> => {
        try{
          const result = await db.query("SELECT * FROM userschallenges WHERE externalid = $1", [usersChallengeId]);
      
          if(result.rowCount == null || result.rowCount == 0){
            throw throwDBErrors({code: "00001"}, "UsersChallenge")
          }
          return result.rows[0];
        } catch (err){
          console.log("Error getting one user challenge");
          throw throwDBErrors(err, "UsersChallenge"); // Rethrow the error for handling upstream
        }
      
      }


      export const deleteUsersChallenge = async (usersChallengeId: string): Promise<boolean> => {
        try{
          const result = await db.query("DELETE FROM userschallenges WHERE externalid = $1", [usersChallengeId]);
          return result.rowCount !== null && result.rowCount > 0;
        } catch (error) {
          throw throwDBErrors(error, "UsersChallenge");
        }
      }
    

      export const createUsersChallenge = async (usersChallenge: UsersChallenge): Promise<boolean> => {
        try{
          const result = await db.query("INSERT INTO userschallenges (iscompleted, completeddate, userid, challengeid) VALUES ($1, $2, SELECT(id FROM users WHERE externalid = $3), SELECT(id FROM challenges WHERE externalid = $4))", [usersChallenge.iscompleted, usersChallenge.completeddate, usersChallenge.userid, usersChallenge.challengeid]);
          return result.rowCount !== null && result.rowCount > 0;
        } catch (error) {
          throw throwDBErrors(error, "UsersChallenge");
        }
      }