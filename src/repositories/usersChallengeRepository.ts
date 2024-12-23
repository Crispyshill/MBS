import { UsersChallenge } from "../models/usersChallengeModel";
import { throwDBErrors } from "../utils/repositoryUtils";
import db from "../utils/db";

export const getAllUsersChallenges = async (userId: string): Promise<UsersChallenge[]> => {
    try{
      const result = await db.query(
        "SELECT u.externalid as userid, c.externalid as challengeid, iscompleted, completeddate, uc.externalid FROM usersChallenges uc JOIN users u on u.id = uc.userid JOIN challenges c on uc.challengeid = c.id  WHERE userId = (SELECT id FROM users WHERE externalid = $1);",
        [userId] // Use parameterized query to avoid SQL injection
      );
     
      const challenges: UsersChallenge[] = result.rows;
      console.log(userId)
      return challenges;
    } catch(error) {
      console.error(error)
      throw throwDBErrors(error, "UsersChallenge"); // Rethrow the error for handling upstream
    }
    }


    export const updateUsersChallenge = async (usersChallenge: UsersChallenge): Promise<boolean> => {
        try{
        const result = await db.query(
          "UPDATE userschallenges SET iscompleted = $1, completeddate = $2 WHERE externalid = $3", [usersChallenge.iscompleted, usersChallenge.completeddate, usersChallenge.externalid]
        );
        return result.rowCount !== null && result.rowCount > 0;
      } catch (error) {
        console.error("Error updating users challenge:", error);
        throw throwDBErrors(error, "UsersChallenge"); // Rethrow the error for handling upstream
      }
        
      }

      
      export const getOneUsersChallenge = async (usersChallengeId: string): Promise<UsersChallenge> => {
        try{
          const result = await db.query("SELECT u.externalid as userid, c.externalid as challengeid, iscompleted, completeddate, uc.externalid FROM usersChallenges uc JOIN users u on u.id = uc.userid JOIN challenges c on uc.challengeid = c.id  WHERE uc.externalid = $1", [usersChallengeId]);
      
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
          const result = await db.query(
            `INSERT INTO userschallenges (iscompleted, userid, challengeid)
             VALUES (
               $1, 
               (SELECT id FROM users WHERE externalid = $2), 
               (SELECT id FROM challenges WHERE externalid = $3)
             )`,
            [usersChallenge.iscompleted, usersChallenge.userid, usersChallenge.challengeid]
          );
                    return result.rowCount !== null && result.rowCount > 0;
        } catch (error) {
          throw throwDBErrors(error, "UsersChallenge");
        }
      }