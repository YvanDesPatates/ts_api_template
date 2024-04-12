import {AccountLogic} from "../../src/account/AccountLogic";
import {DisplayableJsonError} from "../../src/displayableErrors/DisplayableJsonError";
import {AccountJsonDAO} from "../../src/account/DAL/AccountJsonDAO";
import {MissingAttributeError} from "../../src/displayableErrors/MissingAttributeError";
import {AccountMongoDAO} from "../../src/account/DAL/AccountMongoDAO";

const mockFunctions: Array<jest.SpyInstance> = [];

describe("AccountLogic.ts tests", () => {
    beforeAll(() => {
        //avoid saving test data in the database
        mockFunctions.push(mockDaoJsoncreate());
        mockFunctions.push(mockDaoJsonDelete());
        mockFunctions.push(mockDaoMongocreate());
        mockFunctions.push(mockDaoMongoDelete())
    });

    afterAll(() => {
        mockFunctions.forEach(mockFunction => mockFunction.mockReset());
    });

    test("create account with unused email", async () => {
        const idExistsMock = mockDAOsIdExists(async () => false);

        const accountToCreate = new AccountLogic("emaileeeee", "name", 5, "pwd");
        const createdAccount = await accountToCreate.create();
        expect(createdAccount).toBeInstanceOf(AccountLogic);

        idExistsMock.forEach(mock => mock.mockReset());
    });

    test("create account without pwd is impossible", async () => {
        await expect(async () => await new AccountLogic("email", "name", 5).create())
            .rejects
            .toThrow(MissingAttributeError);
    });

    test("create account with blank pwd is impossible", async () => {
        await expect(async () => await new AccountLogic("email", "name", 5, "").create())
            .rejects
            .toThrow(DisplayableJsonError);
    });

    test("create account with existing email is impossible", async () => {
        const idExistsMock = mockDAOsIdExists();
        await expect(async () => await new AccountLogic("email", "name", 5, "pwd").create())
            .rejects
            .toThrow(DisplayableJsonError);

        idExistsMock.forEach(mock => mock.mockReset());
    });

    test("update account", async () => {
        const idExistsMock = mockDAOsIdExists(async id => id === "email");
        const updatedAccount = await new AccountLogic("newEmail", "name", 5, "pwd").update("email");
        expect(updatedAccount).toBeInstanceOf(AccountLogic);
        expect(updatedAccount).toHaveProperty("email", "newEmail");

        idExistsMock.forEach(mock => mock.mockReset());
    });

    test("update account with existing email is impossible", async () => {
        const idExistsMock = mockDAOsIdExists();
        await expect(async () => await new AccountLogic("newEmail", "name", 5, "pwd").update("email"))
            .rejects
            .toThrow(DisplayableJsonError);

        idExistsMock.forEach(mock => mock.mockReset());
    });

    test("update account without pwd is impossible", async () => {
        const idExistsMock = mockDAOsIdExists(async id => id === "email");
        await expect(async () => await new AccountLogic("newEmail", "name", 5).update("email"))
            .rejects
            .toThrow(MissingAttributeError);

        idExistsMock.forEach(mock => mock.mockReset());
    });

    test("delete account", async () => {
        const idExistsMock = mockDAOsIdExists();
        new AccountLogic("newEmail", "name", 5, "pwd").delete();

        idExistsMock.forEach(mock => mock.mockReset());
    });

    test("delete account with non existing email throw 404 error", async () => {
        const idExistsMock = mockDAOsIdExists(async () => false);
        await expect(async () => await new AccountLogic("newEmail", "name", 5, "pwd").delete())
            .rejects
            .toThrow(DisplayableJsonError);

        idExistsMock.forEach(mock => mock.mockReset());
    });

});

//#region mocks methods
/**
 * Mock the idExists method of AccountJsonDAO and AccountMongoDAO
 * @param mockFunction is the return value the mocked function will return, by default it returns true
 */
function mockDAOsIdExists(mockFunction: (id: string) => Promise<boolean> = async () => true) {
    return [
        jest
            .spyOn(AccountJsonDAO.prototype, 'idExists')
            .mockImplementation(mockFunction),
        jest
            .spyOn(AccountMongoDAO.prototype, 'idExists')
            .mockImplementation(mockFunction)
    ]
}

function mockDaoJsoncreate() {
    return jest
        .spyOn(AccountJsonDAO.prototype, 'create')
        .mockImplementation(async (account) => account);
}

function mockDaoJsonDelete(returnValue: boolean = true) {
    return jest
        .spyOn(AccountJsonDAO.prototype, 'delete')
        .mockImplementation(async () => returnValue);
}

function mockDaoMongocreate() {
    return jest
        .spyOn(AccountMongoDAO.prototype, 'create')
        .mockImplementation(async (account) => account);
}

function mockDaoMongoDelete(returnValue: boolean = true) {
    return jest
        .spyOn(AccountMongoDAO.prototype, 'delete')
        .mockImplementation(async () => returnValue);
}

//#endregion
