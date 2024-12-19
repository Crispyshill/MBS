import { getChallenges, getOneChallenge, addOneChallenge, updateChallenge, deleteChallenge } from "../../repositories/challengeRepository";
import  db  from "../../utils/db";



jest.mock("../../utils/db");

describe("Challenge Repository", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

describe("GetChallenges", () => {
    it("Should return all the challenges", async () => {
        const mockResult = {rowCount: 1, rows: [{
            externalid: "abcd1234-efgh5678", // A unique identifier in string format
            name: "10,000 Steps Challenge", // A sample challenge name
            description: "Walk 10,000 steps every day for a week.", // A sample description
            points: 50, // Number of points awarded for completing the challenge
            startdate: "2024-01-01T08:00:00Z", // Optional: ISO 8601 formatted start date
            enddate: "2024-01-07T08:00:00Z", // Optional: ISO 8601 formatted end date
          }]};

          (db.query as jest.Mock).mockResolvedValueOnce(mockResult);
          const result = await getChallenges();
          await expect(result).toEqual(mockResult.rows);
    });

    it("Should throw an exception if there no challenges return", async () => {
      const mockResult = {rowCount: 0};
      (db.query as jest.Mock).mockResolvedValueOnce(mockResult);
      await expect(getChallenges()).rejects.toThrow("No Challenges returned");
    });
});


describe("getOneChallenge", () => {
  it("should return a challenge given a valid external id", async () => {
    const mockResult = {rowCount: 1, rows: [{
      externalid: "abcd1234-efgh5678", // A unique identifier in string format
      name: "10,000 Steps Challenge", // A sample challenge name
      description: "Walk 10,000 steps every day for a week.", // A sample description
      points: 50, // Number of points awarded for completing the challenge
      startdate: "2024-01-01T08:00:00Z", // Optional: ISO 8601 formatted start date
      enddate: "2024-01-07T08:00:00Z", // Optional: ISO 8601 formatted end date
    }]};

    (db.query as jest.Mock).mockResolvedValueOnce(mockResult);
    const result = await getOneChallenge("abcd1234-efgh5678");
    await expect(result).toBe(mockResult.rows[0]);
  });

  it("should throw an error if no rows are returned", async () => {
    const mockResult = {rowCount: 0};
    (db.query as jest.Mock).mockResolvedValueOnce(mockResult);
    await expect(getOneChallenge("abcd1234-efgh5678")).rejects.toThrow("No such Challenge");
  });


});


describe("addOneChallenge", () => {
  it("should add the new challenge and return true.", async() => {
    const mockResult = {rowCount: 1};
    (db.query as jest.Mock).mockResolvedValueOnce(mockResult);
    await expect(addOneChallenge({
      externalid: "", // A unique identifier in string format
      name: "10,000 Steps Challenge", // A sample challenge name
      description: "Walk 10,000 steps every day for a week.", // A sample description
      points: 50, // Number of points awarded for completing the challenge
      startdate: "2024-01-01T08:00:00Z", // Optional: ISO 8601 formatted start date
      enddate: "2024-01-07T08:00:00Z", // Optional: ISO 8601 formatted end date
    })).resolves.toBe(true);
  })
  it("should return false if no challenge was added", async () => {
    const mockResult = {rowCount: 0};
    (db.query as jest.Mock).mockResolvedValueOnce(mockResult);
    await expect(addOneChallenge({
      externalid: "", // A unique identifier in string format
      name: "10,000 Steps Challenge", // A sample challenge name
      description: "Walk 10,000 steps every day for a week.", // A sample description
      points: 50, // Number of points awarded for completing the challenge
      startdate: "2024-01-01T08:00:00Z", // Optional: ISO 8601 formatted start date
      enddate: "2024-01-07T08:00:00Z", // Optional: ISO 8601 formatted end date
    })).resolves.toBe(false);
  })
});


describe("updateChallenge", () => {
  it("should update the challenge and return true", async () => {
    const mockResult = {rowCount: 1};
    (db.query as jest.Mock).mockResolvedValueOnce(mockResult);
    await expect(updateChallenge({
      externalid: "", // A unique identifier in string format
      name: "10,000 Steps Challenge", // A sample challenge name
      description: "Walk 10,000 steps every day for a week.", // A sample description
      points: 50, // Number of points awarded for completing the challenge
      startdate: "2024-01-01T08:00:00Z", // Optional: ISO 8601 formatted start date
      enddate: "2024-01-07T08:00:00Z", // Optional: ISO 8601 formatted end date
    })).resolves.toBe(true);
  });

  it("should return false if no challenge was updated", async () => {
    const mockResult = {rowCount: 0};
    (db.query as jest.Mock).mockResolvedValueOnce(mockResult);
    await expect(updateChallenge({
      externalid: "", // A unique identifier in string format
      name: "10,000 Steps Challenge", // A sample challenge name
      description: "Walk 10,000 steps every day for a week.", // A sample description
      points: 50, // Number of points awarded for completing the challenge
      startdate: "2024-01-01T08:00:00Z", // Optional: ISO 8601 formatted start date
      enddate: "2024-01-07T08:00:00Z", // Optional: ISO 8601 formatted end date
    })).resolves.toBe(false);
  })
});

describe("deleteChallenge", () => {
  it("should delete the challenge and return true.", async () => {
    const mockResult = {rowCount: 1};
    (db.query as jest.Mock).mockResolvedValueOnce(mockResult);
    await expect(deleteChallenge("skakjdj")).resolves.toBe(true);
  });

  it("should return false if it did not delete any challenge", async () => {
    const mockResult = {rowCount: 0};
    (db.query as jest.Mock).mockResolvedValueOnce(mockResult);
    await expect(deleteChallenge("skakjdj")).resolves.toBe(false);
  });
});


});


