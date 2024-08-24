import { Sequelize } from "sequelize-typescript";
import { DBConnection } from "../../config/database";


describe("DBConnection", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should successfully connect to the database", async () => {
        const result = await DBConnection();
        expect(result).toBe(true);
    });

    it("should handle errors during database connection", async () => {
        jest.spyOn(Sequelize.prototype, 'authenticate').mockRejectedValue(new Error("Connection failed"));
        const result = await DBConnection();
        expect(result).toBe(false);
    });
});
