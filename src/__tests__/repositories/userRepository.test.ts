import  db  from "../../utils/db";
import {
  insertNewUser,
  getUserPasswordHashFromEmail,
  getAllUsers,
  findUserByEmail,
  findUserById,
  updateUser,
  deleteUser,
} from "../../repositories/userRepository";


jest.mock("../../utils/db");

describe("User Repository", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("insertNewUser", () => {
    it("should insert a new user and return their externalid and email", async () => {
      const mockResult = { rowCount: 1, rows: [{ externalid: "ext-123", email: "test@example.com" }] };
      (db.query as jest.Mock).mockResolvedValueOnce(mockResult);

      const result = await insertNewUser("test@example.com", "hashedpassword");

      expect(db.query).toHaveBeenCalledWith(
        "INSERT INTO public.users (email, password_hash) VALUES ($1, $2) RETURNING externalid, email",
        ["test@example.com", "hashedpassword"]
      );
      expect(result).toEqual(mockResult.rows[0]);
    });

    it("should throw a database error when insertion fails", async () => {
      (db.query as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

      await expect(insertNewUser("test@example.com", "hashedpassword")).rejects.toThrow("An unexpected database error occurred while processing User");
    });
  });

  describe("getUserPasswordHashFromEmail", () => {
    it("should return the password hash for a valid email", async () => {
      const mockResult = { rowCount: 1, rows: [{ password_hash: "hashedpassword" }] };
      (db.query as jest.Mock).mockResolvedValueOnce(mockResult);

      const result = await getUserPasswordHashFromEmail("test@example.com");

      expect(result).toEqual(mockResult.rows[0]);
    });

    it("should throw an error if the email is not found", async () => {
      const mockResult = { rowCount: 0, rows: [] };
      (db.query as jest.Mock).mockResolvedValueOnce(mockResult);

      await expect(getUserPasswordHashFromEmail("unknown@example.com")).rejects.toThrow("No such User");
    });
  });

  describe("getAllUsers", () => {
    it("should return all users", async () => {
      const mockResult = { rowCount: 1, rows: [{ externalid: "ext-123", email: "test@example.com" }] };
      (db.query as jest.Mock).mockResolvedValueOnce(mockResult);

      const result = await getAllUsers();

      expect(result).toEqual(mockResult.rows);
    });

    it("should throw an error if no users are found", async () => {
      const mockResult = { rowCount: 0, rows: [] };
      (db.query as jest.Mock).mockResolvedValueOnce(mockResult);

      await expect(getAllUsers()).rejects.toThrow("No Users returned");
    });
  });

  describe("findUserByEmail", () => {
    it("should return a user for a valid email", async () => {
      const mockResult = { rowCount: 1, rows: [{ externalid: "ext-123", email: "test@example.com" }] };
      (db.query as jest.Mock).mockResolvedValueOnce(mockResult);

      const result = await findUserByEmail("test@example.com");

      expect(result).toEqual(mockResult.rows[0]);
    });

    it("should throw an error if the user is not found", async () => {
      const mockResult = { rowCount: 0, rows: [] };
      (db.query as jest.Mock).mockResolvedValueOnce(mockResult);

      await expect(findUserByEmail("unknown@example.com")).rejects.toThrow("No such User");
    });
  });

  describe("deleteUser", () => {
    it("should delete a user for a valid external ID, and return true", async () => {
      const mockResult = { rowCount: 1 };
      (db.query as jest.Mock).mockResolvedValueOnce(mockResult);

      await expect(deleteUser("ext-123")).resolves.toBe(true);

      expect(db.query).toHaveBeenCalledWith("DELETE FROM users WHERE externalid = $1", ["ext-123"]);
    });

    it("should return false if no user was deleted", async () => {
      const mockResult = { rowCount: 0 };
      (db.query as jest.Mock).mockResolvedValueOnce(mockResult);

      await expect(deleteUser("unknown-id")).resolves.toBe(false);
    });
  });


  describe("updateUser", () => {
    it("should update a user when provided a valid object with an existing externalid", async () => {
      const mockResult = { rowCount: 1};
      (db.query as jest.Mock).mockResolvedValueOnce(mockResult);

      await expect(updateUser({
        externalid: "12345-abcde", // A unique identifier in string format
        email: "testuser@example.com", // A dummy email address
        created_at: "2024-01-01T12:00:00Z", // ISO 8601 formatted timestamp
        firstname: "John", // Dummy first name
        lastname: "Doe", // Dummy last name
      })).resolves.toBe(true);

    });

    it("Should return false if no user was updated", async () => {
      const mockResult = { rowCount: 0};
      (db.query as jest.Mock).mockResolvedValueOnce(mockResult);

      await expect(updateUser({
        externalid: "12345-abcde", // A unique identifier in string format
        email: "testuser@example.com", // A dummy email address
        created_at: "2024-01-01T12:00:00Z", // ISO 8601 formatted timestamp
        firstname: "John", // Dummy first name
        lastname: "Doe", // Dummy last name
      })).resolves.toBe(false);
    });
  });


  describe("findUserById", () => {
    it("Should return the corresponding user when provided a valid externalId", async () => {
      const mockResult = {
        rows: [
          {
            externalid: "12345-abcde", // A unique identifier in string format
            email: "testuser@example.com", // A dummy email address
            created_at: "2024-01-01T12:00:00Z", // ISO 8601 formatted timestamp
            firstname: "John", // Dummy first name
            lastname: "Doe", // Dummy last name
          },
        ],
        rowCount: 1, // Indicate a successful query
      };


      (db.query as jest.Mock).mockResolvedValueOnce(mockResult);

      await expect(findUserById("12345-abcde")).resolves.toBe(mockResult.rows[0]);
      
    })
  });

  it("Should throw an error if no user is returned", async () => {
    const mockResult = {rowCount: 0};
    (db.query as jest.Mock).mockResolvedValueOnce(mockResult);

    await expect(findUserById("12345-abcde")).rejects.toThrow("No such User");
  })

});
