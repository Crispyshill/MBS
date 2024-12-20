import { createUsersChallenge, getAllUsersChallenges, getOneUsersChallenge, updateUsersChallenge, deleteUsersChallenge } from "../../services/usersChallengeService";
import { createUsersChallenge as createUsersChallengeFromRepo, getAllUsersChallenges as getAllUsersChallengesFromRepo, getOneUsersChallenge as getOneUsersChallengeFromRepo, updateUsersChallenge as updateUsersChallengeFromRepo, deleteUsersChallenge as deleteUsersChallengeFromRepo } from "../../repositories/usersChallengeRepository";
import { UsersChallenge } from "../../models/usersChallengeModel";
import { RepositoryError } from "../../utils/repositoryUtils";


jest.mock("../../repositories/usersChallengeRepository", () => ({
    createUsersChallenge: jest.fn(),
    getAllUsersChallenges: jest.fn(),
    getOneUsersChallenge: jest.fn(),
    updateUsersChallenge: jest.fn(),
    deleteUsersChallenge: jest.fn()
  }));

  const testUsersChallenge: UsersChallenge = {
    externalid: "userchallenge-12345", // A unique identifier for the user's challenge participation
    userid: "user-67890", // The external ID of the user
    challengeid: "challenge-12345", // The external ID of the challenge
    iscompleted: true, // Indicates the user has completed the challenge
    completeddate: "2024-01-15T10:00:00Z", // ISO 8601 formatted completion date
    challenge: {
      externalid: "challenge-12345", // External ID of the challenge
      name: "10,000 Steps Challenge", // Name of the challenge
      description: "Walk 10,000 steps every day for a week.", // Challenge description
      points: 50, // Points awarded for completing the challenge
      startdate: "2024-01-01T08:00:00Z", // Start date of the challenge
      enddate: "2024-01-07T08:00:00Z", // End date of the challenge
    },
  }

  const testUserId = "alsdj948528";
  const testUsersChallengeId = "sa87yn3asd9u";


  describe("Users Challenge Service", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    describe("createUsersChallenge", () => {
        it("should return true if it created a user", async () => {
            const mockResult = true;
            (createUsersChallengeFromRepo as jest.Mock).mockResolvedValueOnce(mockResult);
            await expect(createUsersChallenge(testUsersChallenge)).resolves.toBe(mockResult);
        });

        it("should return false if it did not create a user", async () => {
            const mockResult = false;
            (createUsersChallengeFromRepo as jest.Mock).mockResolvedValueOnce(mockResult);
            await expect(createUsersChallenge(testUsersChallenge)).resolves.toBe(mockResult);
        });
        it("should throw an error if the repo call errors", async () => {
            const mockResult = new Error("Error creating a new user");
            (createUsersChallengeFromRepo as jest.Mock).mockRejectedValueOnce(mockResult);
            await expect(createUsersChallenge(testUsersChallenge)).rejects.toBe(mockResult);
        });
    });

    describe("getAllUsersChallenges", () => {
        it("should return an array of users challenges", async () => {
            const mockResult = [testUsersChallenge];
            (getAllUsersChallengesFromRepo as jest.Mock).mockResolvedValueOnce(mockResult);
            await expect(getAllUsersChallenges(testUserId)).resolves.toBe(mockResult);
        });

        it("should throw an error if the repo call errored", async () => {
            const mockResult = new Error("Error fetching usersChallenges");
            (getAllUsersChallengesFromRepo as jest.Mock).mockRejectedValueOnce(mockResult);
            await expect(getAllUsersChallenges(testUserId)).rejects.toThrow(mockResult);
        });

        it("should return an empty array if the repo returns an empty array", async () => {
            const mockResult: UsersChallenge[] = [];
            (getAllUsersChallengesFromRepo as jest.Mock).mockResolvedValueOnce(mockResult);
            await expect(getAllUsersChallenges(testUserId)).resolves.toBe(mockResult);
        });
    });

    describe("getOneUsersChallenge", () => {
        it("should return a Users Challenge when provided with a valid UsersChallengeId", async () => {
            const mockResult: UsersChallenge = testUsersChallenge;
            (getOneUsersChallengeFromRepo as jest.Mock).mockResolvedValueOnce(mockResult);
            await expect(getOneUsersChallenge(testUsersChallengeId)).resolves.toBe(mockResult);
        });
        it("should throw the error if the repo call errors", async () => {
            const mockResult = new RepositoryError("No such UsersChallenge", "00001");
            (getOneUsersChallengeFromRepo as jest.Mock).mockRejectedValueOnce(mockResult);
            await expect(getOneUsersChallenge(testUsersChallengeId)).rejects.toThrow(mockResult);
        });
       
    });

    describe("updateUsersChallenge", () => {
        it("should return true if it updated the users challenge", async () => {
            const mockResult = true;
            (updateUsersChallengeFromRepo as jest.Mock).mockResolvedValueOnce(mockResult);
            await expect(updateUsersChallenge(testUsersChallenge)).resolves.toBe(mockResult);
        });
        it("should return false if it failed to update the users challenge", async () => {
            const mockResult = false;
            (updateUsersChallengeFromRepo as jest.Mock).mockResolvedValueOnce(mockResult);
            await expect(updateUsersChallenge(testUsersChallenge)).resolves.toBe(mockResult);
        });
        it("should throw the error if the repo call errors", async () => {
            const mockResult = new Error("Error updating users challenge");
            (updateUsersChallengeFromRepo as jest.Mock).mockRejectedValueOnce(mockResult);
            await expect(updateUsersChallenge(testUsersChallenge)).rejects.toThrow(mockResult);
        });
    });


    describe("deleteUsersChallenge", () => {
        it("should return true if it deleted the users challenge", async () => {
            const mockResult = true;
            (deleteUsersChallengeFromRepo as jest.Mock).mockResolvedValueOnce(mockResult);
            await expect(deleteUsersChallenge(testUsersChallengeId)).resolves.toBe(mockResult);
        });
        it("should return false if it failed to delete the users challenge", async () => {
            const mockResult = false;
            (deleteUsersChallengeFromRepo as jest.Mock).mockResolvedValueOnce(mockResult);
            await expect(deleteUsersChallenge(testUsersChallengeId)).resolves.toBe(mockResult);
        });
        it("should throw the error if the repo call errors", async () => {
            const mockResult = new Error("Error deleting users challenge");
            (deleteUsersChallengeFromRepo as jest.Mock).mockRejectedValueOnce(mockResult);
            await expect(deleteUsersChallenge(testUsersChallengeId)).rejects.toThrow(mockResult);
        });
    })

});