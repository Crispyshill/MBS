import { } from "../repositories/usersChallengeRepository";
import { UsersChallenge } from "../models/usersChallengeModel";
import {getAllUsersChallenges as getAllUsersChallengesFromRepo, getOneUsersChallenge as getOneUsersChallengeFromRepo, updateUsersChallenge as updateUsersChallengeFromRepo, deleteUsersChallenge as deleteUsersChallengeFromRepo, createUsersChallenge as createUsersChallengeFromRepo} from "../repositories/usersChallengeRepository";


export const getAllUsersChallenges = async (userId: string): Promise<UsersChallenge[]> => {
  try{
    const usersChallenges: UsersChallenge[] = await getAllUsersChallengesFromRepo(userId);
    return usersChallenges;
  } catch(error) {
    console.error("Error getting all users challenges");
    throw error;
  }
  }

  export const getOneUsersChallenge = async (usersChallengeId: string): Promise<UsersChallenge> => {
    try{
      const usersChallenge: UsersChallenge = await getOneUsersChallengeFromRepo(usersChallengeId);
      return usersChallenge;
    } catch(error) {
      console.error("Error getting one users challenge");
      throw error;
    }
    }
  
  
  export const updateUsersChallenge = async (usersChallenge: UsersChallenge): Promise<boolean> => {
    try{
      const result: boolean = await updateUsersChallengeFromRepo(usersChallenge);
      return result;
    } catch(error) {
      console.error("Error updating users challenge");
      throw error;
    }
    }


    export const createUsersChallenge = async (usersChallenge: UsersChallenge): Promise<boolean> => {
      try{
        const result: boolean = await createUsersChallengeFromRepo(usersChallenge);
        return result;
      } catch(error) {
        console.error("Error creating users challenge");
        throw error;
      }
      }

      export const deleteUsersChallenge = async (usersChallengeId: string): Promise<boolean> => {
        try{
          const result: boolean = await deleteUsersChallengeFromRepo(usersChallengeId);
          return result;
        } catch(error) {
          console.error("Error deleting users challenge");
          throw error;
        }
        }
