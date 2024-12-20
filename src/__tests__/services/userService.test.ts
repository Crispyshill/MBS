import {getAllUsers as getAllUsersFromRepository, findUserById, findUserByEmail, insertNewUser, updateUser as updateUserFromRepository, deleteUser as deleteUserFromRepository, getUserPasswordHashFromEmail} from "../../repositories/userRepository";
import { getAllUsers, getOneUser, getOneUserFromEmail, createNewUser, updateUser, deleteUser, checkUserCredentials } from "../../services/userService";
import { User } from "../../models/userModel";
import { RepositoryError } from "../../utils/repositoryUtils";
import { hashPassword, comparePassword } from "../../utils/auth";


jest.mock("../../utils/auth", () => ({
    hashPassword: jest.fn(),
    comparePassword: jest.fn()
}));

jest.mock("../../repositories/userRepository", () => ({
    getAllUsers: jest.fn(),
    findUserById: jest.fn(),
    findUserByEmail: jest.fn(),
    insertNewUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    getUserPasswordHashFromEmail: jest.fn()
  }));

  const testUser: User = {
    externalid: "12345-abcde", // A unique identifier in string format
    email: "testuser@example.com", // A dummy email address
    created_at: "2024-01-01T12:00:00Z", // ISO 8601 formatted timestamp
    firstname: "John", // Dummy first name
    lastname: "Doe", // Dummy last name
  };
    const testEmail = "help@test.com";
    const testPassword = "Password123";
    const hashedPassword = "asldif97696970";


  const testUserId: string = "12345-abcde";


  describe("User Service", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    describe("getAllUsers", () => {
        it("should return an array of users", async () => {
            const mockResult = [testUser];
            (getAllUsersFromRepository as jest.Mock).mockResolvedValueOnce(mockResult);
            await expect(getAllUsers()).resolves.toBe(mockResult);
        });

        it("should throw an error if the repo call gives an error", async () => {
            const mockResult = new RepositoryError("No Users returned", "00002");
            (getAllUsersFromRepository as jest.Mock).mockRejectedValueOnce(mockResult);
            await expect(getAllUsers()).rejects.toThrow(mockResult);
        });
    });

    describe("getOneUser", () => {
        it("should return a user", async () => {
            const mockResult = testUser;
            (findUserById as jest.Mock).mockResolvedValueOnce(mockResult);
            await expect(getOneUser(testUserId)).resolves.toBe(mockResult);
        })

        it("should throw an error if the repo call returns an error", async () => {
            const mockResult = new RepositoryError("No such User", "00001");
            (findUserById as jest.Mock).mockRejectedValueOnce(mockResult);
            await expect(getOneUser(testUserId)).rejects.toThrow(mockResult);
        })
    });

    describe("getOneUserFromEmail", () => {
        it("should return a user", async () => {
            const mockResult = testUser;
            (findUserByEmail as jest.Mock).mockResolvedValueOnce(mockResult);
            await expect(getOneUserFromEmail("help@test.com")).resolves.toBe(mockResult);
        });
        it("should throw an error if the repo call errors", async () => {
            const mockResult = new RepositoryError("No such User", "00001");
            (findUserByEmail as jest.Mock).mockRejectedValueOnce(mockResult);
            await expect(getOneUserFromEmail("help@test.com")).rejects.toThrow(mockResult);
        });
    });

    describe("createNewUser", () => {
        it("should return a userId and email if given valid info", async () => {
            const mockInsertUserResult = {externalid: "asoih298239", email: "help@test.com"};


            (hashPassword as jest.Mock).mockResolvedValueOnce(hashedPassword);
            (insertNewUser as jest.Mock).mockResolvedValueOnce(mockInsertUserResult);
    
            const result = await createNewUser(testEmail, testPassword);
    
            expect(hashPassword).toHaveBeenCalledWith(testPassword);
            expect(insertNewUser).toHaveBeenCalledWith(testEmail, hashedPassword);
            expect(result).toEqual(mockInsertUserResult);

        });

        it("should return null if the user insertion fails", async () => {
            (hashPassword as jest.Mock).mockResolvedValueOnce(hashedPassword);
            (insertNewUser as jest.Mock).mockResolvedValueOnce(null);
    
            const result = await createNewUser(testEmail, testPassword);
    
            expect(hashPassword).toHaveBeenCalledWith(testPassword);
            expect(insertNewUser).toHaveBeenCalledWith(testEmail, hashedPassword);
            expect(result).toBeNull();
        });
    
        it("should throw an error if hashing the password fails", async () => {
            const hashError = new Error("Failed to hash password");
            (hashPassword as jest.Mock).mockRejectedValueOnce(hashError);
    
            await expect(createNewUser(testEmail, testPassword)).rejects.toThrow(hashError);
            expect(hashPassword).toHaveBeenCalledWith(testPassword);
            expect(insertNewUser).not.toHaveBeenCalled();
        });
    
        it("should throw an error if user insertion throws an error", async () => {
            const insertError = new Error("Failed to insert user");
            (hashPassword as jest.Mock).mockResolvedValueOnce(hashedPassword);
            (insertNewUser as jest.Mock).mockRejectedValueOnce(insertError);
    
            await expect(createNewUser(testEmail, testPassword)).rejects.toThrow(insertError);
            expect(hashPassword).toHaveBeenCalledWith(testPassword);
            expect(insertNewUser).toHaveBeenCalledWith(testEmail, hashedPassword);
        });
    });

    describe("updateUser", () => {
        it("should return true and not error when given a valid user", async () => {
            const mockResult = true;
            (updateUserFromRepository as jest.Mock).mockResolvedValueOnce(mockResult);
            await expect(updateUser(testUser)).resolves.toBe(true);
        });

        it("should return false if no user was updated", async () => {
            const mockResult = false;
            (updateUserFromRepository as jest.Mock).mockResolvedValueOnce(mockResult);
            await expect(updateUser(testUser)).resolves.toBe(false);
        });

        it("should throw an error if the repo call errors", async () => {
            const mockResult = new Error("There was an unexpected error while updating the user");
            (updateUserFromRepository as jest.Mock).mockRejectedValueOnce(mockResult);
            await expect(updateUser(testUser)).rejects.toThrow(mockResult);
        });
    });

    describe("deleteUser", () => {
        it("should return true if it deleted the user", async () => {
            const mockResult = true;
            (deleteUserFromRepository as jest.Mock).mockResolvedValueOnce(mockResult);
            await expect(deleteUser(testUserId)).resolves.toBe(mockResult);
        });

        it("should return false if the user is not deleted", async () => {
            const mockResult = false;
            (deleteUserFromRepository as jest.Mock).mockResolvedValueOnce(mockResult);
            await expect(deleteUser(testUserId)).resolves.toBe(mockResult);
        });

        it("should throw the error if the repo call errors", async () => {
            const mockResult = new Error("Error updating user");
            (deleteUserFromRepository as jest.Mock).mockRejectedValueOnce(mockResult);
            await expect(deleteUser(testUserId)).rejects.toThrow(mockResult);
        });
    });

    describe("checkUserCredentials", () => {
        const testEmail = "test@example.com";
        const testPassword = "password123";
        const testPasswordHash = "hashedPassword123";
    
        it("should return true when credentials are valid", async () => {
            (getUserPasswordHashFromEmail as jest.Mock).mockResolvedValueOnce({ password_hash: testPasswordHash });
            (comparePassword as jest.Mock).mockResolvedValueOnce(true);
    
            const result = await checkUserCredentials(testEmail, testPassword);
    
            expect(getUserPasswordHashFromEmail).toHaveBeenCalledWith(testEmail);
            expect(comparePassword).toHaveBeenCalledWith(testPassword, testPasswordHash);
            expect(result).toBe(true);
        });
    
        it("should return false when the password does not match", async () => {
            (getUserPasswordHashFromEmail as jest.Mock).mockResolvedValueOnce({ password_hash: testPasswordHash });
            (comparePassword as jest.Mock).mockResolvedValueOnce(false);
    
            const result = await checkUserCredentials(testEmail, testPassword);
    
            expect(getUserPasswordHashFromEmail).toHaveBeenCalledWith(testEmail);
            expect(comparePassword).toHaveBeenCalledWith(testPassword, testPasswordHash);
            expect(result).toBe(false);
        });
    
        it("should throw an error if fetching the password hash fails", async () => {
            const fetchError = new Error("Failed to fetch user password hash");
            (getUserPasswordHashFromEmail as jest.Mock).mockRejectedValueOnce(fetchError);
    
            await expect(checkUserCredentials(testEmail, testPassword)).rejects.toThrow(fetchError);
            expect(getUserPasswordHashFromEmail).toHaveBeenCalledWith(testEmail);
            expect(comparePassword).not.toHaveBeenCalled();
        });
    
        it("should throw an error if comparing the password fails", async () => {
            const compareError = new Error("Password comparison failed");
            (getUserPasswordHashFromEmail as jest.Mock).mockResolvedValueOnce({ password_hash: testPasswordHash });
            (comparePassword as jest.Mock).mockRejectedValueOnce(compareError);
    
            await expect(checkUserCredentials(testEmail, testPassword)).rejects.toThrow(compareError);
            expect(getUserPasswordHashFromEmail).toHaveBeenCalledWith(testEmail);
            expect(comparePassword).toHaveBeenCalledWith(testPassword, testPasswordHash);
        });
    });
});