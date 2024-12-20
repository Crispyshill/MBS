import {getChallenges as getChallengesFromRepository, getOneChallenge as getOneChallengeFromRepository, addOneChallenge as addOneChallengeFromRepository, updateChallenge as updateChallengeFromRepository, deleteChallenge as deleteChallengeFromRepository} from "../../repositories/challengeRepository";
import {getChallenges, getOneChallenge, addOneChallenge, updateChallenge, deleteChallenge} from "../../services/challengeService";
import { Challenge } from "../../models/challengeModel";
import { RepositoryError } from "../../utils/repositoryUtils";


jest.mock("../../repositories/challengeRepository", () => ({
    getChallenges: jest.fn(),
    getOneChallenge: jest.fn(),
    addOneChallenge: jest.fn(),
    updateChallenge: jest.fn(),
    deleteChallenge: jest.fn()
  }));

  const testChallenge: Challenge = {
    externalid: "", // A unique identifier in string format
    name: "10,000 Steps Challenge", // A sample challenge name
    description: "Walk 10,000 steps every day for a week.", // A sample description
    points: 50, // Number of points awarded for completing the challenge
    startdate: "2024-01-01T08:00:00Z", // Optional: ISO 8601 formatted start date
    enddate: "2024-01-07T08:00:00Z", // Optional: ISO 8601 formatted end date
  };

  const testChallengeId: string = "asldifln799234";

describe("Challenge Service", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    describe("getChallenges", () => {
        it("should return all challenges", async () => {
            const mockResult = [testChallenge];

              (getChallengesFromRepository as jest.Mock).mockResolvedValueOnce(mockResult);
              await expect(getChallenges()).resolves.toBe(mockResult);
        });
        it("should return an empty array if no challenges are returned", async () => {
            const mockResult: Challenge[] = [];
            (getChallengesFromRepository as jest.Mock).mockResolvedValueOnce(mockResult);
            await expect(getChallenges()).resolves.toBe(mockResult);
        });
    });

    describe("getOneChallenge", () => {
        it("should return one challenge when a valid id is passed", async () => {
            const mockResult: Challenge = testChallenge;
            (getOneChallengeFromRepository as jest.Mock).mockResolvedValueOnce(mockResult);
            await expect(getOneChallenge(testChallengeId)).resolves.toBe(mockResult);
        });

        it("should throw an error if fetching the challenge from the repository results in an error", async () => {
            const mockResult = new RepositoryError("No such Challenge", "00001");
            (getOneChallengeFromRepository as jest.Mock).mockRejectedValueOnce(mockResult);
            await expect(getOneChallenge(testChallengeId)).rejects.toThrow(mockResult);
        });
    });

    describe("addOneChallenge", () => {
        it("should return true if the challenge was added", async () => {
            const mockResult = true;
            (addOneChallengeFromRepository as jest.Mock).mockResolvedValueOnce(mockResult);
            await expect(addOneChallenge(testChallenge)).resolves.toBe(mockResult);
        });
        it("should return false if the challenge was not added", async () => {
            const mockResult = false;
            (addOneChallengeFromRepository as jest.Mock).mockResolvedValueOnce(mockResult);
            await expect(addOneChallenge(testChallenge)).resolves.toBe(mockResult);
        });
    });

    describe("updateChallenge", () => {
        it("should return true if the challenge was updated", async () => {
            const mockResult = true;
            (updateChallengeFromRepository as jest.Mock).mockResolvedValueOnce(mockResult);
            await expect(updateChallenge(testChallenge)).resolves.toBe(mockResult);
        });

        it("should return false if the challenge was not updated", async () => {
            const mockResult = false;
            (updateChallengeFromRepository as jest.Mock).mockResolvedValueOnce(mockResult);
            await expect(updateChallenge(testChallenge)).resolves.toBe(mockResult);
        });

        it("should throw an error if the repository call gives an error", async () => {
            const mockResult = new Error("This is an error from the repo call");
            (updateChallengeFromRepository as jest.Mock).mockRejectedValueOnce(mockResult);
            await expect(updateChallenge(testChallenge)).rejects.toThrow(mockResult);
        });

    })

    describe ("deleteChallenge", () => {
        it("should return true if it deleted the challenge", async () => {
            const mockResult = true;
            (deleteChallengeFromRepository as jest.Mock).mockResolvedValueOnce(mockResult);
            await expect(deleteChallenge(testChallengeId)).resolves.toBe(true);
        });

        it("should return false if no rows are deleted", async () => {
            const mockResult = false;
            (deleteChallengeFromRepository as jest.Mock).mockResolvedValueOnce(mockResult);
            await expect(deleteChallenge(testChallengeId)).resolves.toBe(false);
        });

        it("should throw an error if the repo call errors", async () => {
            const mockResult = new Error("The repo call threw an error");
            (deleteChallengeFromRepository as jest.Mock).mockRejectedValueOnce(mockResult);
            await expect(deleteChallenge(testChallengeId)).rejects.toThrow(mockResult);
        });
    })
   

});