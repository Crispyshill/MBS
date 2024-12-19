jest.mock("../../utils/db");
import {getAllUsersChallenges, getOneUsersChallenge, createUsersChallenge, updateUsersChallenge, deleteUsersChallenge} from "../../repositories/usersChallengeRepository"
import db from "../../utils/db";

describe("UsersChallenge Repository", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllUsersChallenges", () => {
    it("should return all users challenges given a valid user ID", async () => {
        const mockResult = {rowCount: 1, rows: [{
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
          }]};
          (db.query as jest.Mock).mockResolvedValueOnce(mockResult);
          const results = await getAllUsersChallenges("user-67890");

          await expect(results).toBe(mockResult.rows);
        
        
    });

    it("should not throw an error if no results are returned", async () => {
        const mockResult = {rowCount: 0};
        (db.query as jest.Mock).mockResolvedValueOnce(mockResult);
        await expect(getAllUsersChallenges("user-67890")).resolves.not.toThrow();
    })

  });

  describe("getOneUsersChallenge", () => {
    it("should return a UsersChallenge when given a valid userschallengeId", async () => {
        const mockResult = {rowCount: 1, rows: [{
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
          }]};
        (db.query as jest.Mock).mockResolvedValueOnce(mockResult);
        const result = await getOneUsersChallenge("userchallenge-12345");
        expect(result).toBe(mockResult.rows[0]);
    });

    it("should throw an error if no rows are returned", async () => {
        const mockResult = {rowCount: 0};
        (db.query as jest.Mock).mockResolvedValueOnce(mockResult);
        expect(getOneUsersChallenge("userchallenge-12345")).rejects.toThrow("No such UsersChallenge")
    })
  });

  describe("createUsersChallenge", () => {
    it("should create a users challenge and return true", async () => {
      const mockResult = {rowCount: 1};
      (db.query as jest.Mock).mockResolvedValueOnce(mockResult);
      expect(createUsersChallenge({
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
      })).resolves.toBe(true);
    })

    it("should return false if no UsersChallenge was created", async () => {
      const mockResult = {rowCount: 0};
      (db.query as jest.Mock).mockResolvedValueOnce(mockResult);
      expect(createUsersChallenge({
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
      })).resolves.toBe(false);
    })
  });


  describe("updateUsersChallenge", () => {
    it("Should update the UsersChallenge and return true", async () => {
      const mockResult = {rowCount: 1};
      (db.query as jest.Mock).mockResolvedValueOnce(mockResult);
      expect(updateUsersChallenge({
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
      })).resolves.toBe(true);
    });
    it("Should should return false if no rows are updated", async () => {
      const mockResult = {rowCount: 0};
      (db.query as jest.Mock).mockResolvedValueOnce(mockResult);
      expect(updateUsersChallenge({
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
      })).resolves.toBe(false);
    });
  });


  describe("deleteUsersChallenge", () => {
    it("should delete a UsersChallenge and return true", async () => {
      const mockResult = {rowCount: 1};
      (db.query as jest.Mock).mockResolvedValueOnce(mockResult);
      expect(deleteUsersChallenge("sdfasih")).resolves.toBe(true);
    })
  });

  it("should return false if no rows are deleted", async () => {
    const mockResult = {rowCount: 0};
    (db.query as jest.Mock).mockResolvedValueOnce(mockResult);
    expect(deleteUsersChallenge("alfdjj")).resolves.toBe(false);
  })

});