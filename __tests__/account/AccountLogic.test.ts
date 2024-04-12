import {AccountLogic} from "../../src/account/AccountLogic";
import {DisplayableJsonError} from "../../src/displayableErrors/DisplayableJsonError";
import {AccountJsonDAO} from "../../src/account/DAL/accountJsonDAO";
import {MissingAttributeError} from "../../src/displayableErrors/MissingAttributeError";

const mockFunctions: Array<jest.SpyInstance> = [];

describe("AccountLogic.ts tests", () => {
    beforeAll(() => {
        //avoid saving test data in the database
        mockFunctions.push(mockDaocreate());
        mockFunctions.push(mockDaoDelete());
    });

    afterAll(() => {
       mockFunctions.forEach(mockFunction => mockFunction.mockReset());
    });

    test("create account with unused email", async () => {
        const idExistsMock = mockDaoIdExists(async () => false);
        const accountToCreate = new AccountLogic("emaileeeee", "name", 5, "pwd");
        const createdAccount = await accountToCreate.create();
        expect(createdAccount).toBeInstanceOf(AccountLogic);

        idExistsMock.mockReset();
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
        const idExistsMock = mockDaoIdExists();
        await expect(async () => await new AccountLogic("email", "name", 5, "pwd").create())
            .rejects
            .toThrow(DisplayableJsonError);

        idExistsMock.mockReset();
    });

    test("update account", async () => {
        const idExistsMock = mockDaoIdExists(async id => id === "email");
        const updatedAccount = await new AccountLogic("newEmail", "name", 5, "pwd").update("email");
        expect(updatedAccount).toBeInstanceOf(AccountLogic);
        expect(updatedAccount).toHaveProperty("email", "newEmail");

        idExistsMock.mockReset();
    });

    test("update account with existing email is impossible", async () => {
        const idExistsMock = mockDaoIdExists();
        await expect(async () => await new AccountLogic("newEmail", "name", 5, "pwd").update("email"))
            .rejects
            .toThrow(DisplayableJsonError);

        idExistsMock.mockReset();
    });

    test("update account without pwd is impossible", async () => {
        const idExistsMock = mockDaoIdExists(async id => id === "email");
        await expect(async () => await new AccountLogic("newEmail", "name", 5).update("email"))
            .rejects
            .toThrow(MissingAttributeError);

        idExistsMock.mockReset();
    });

    test("delete account", async () => {
        const idExistsMock = mockDaoIdExists();
        new AccountLogic("newEmail", "name", 5, "pwd").delete();

        idExistsMock.mockReset();
    });

    test("delete account with non existing email throw 404 error", async () => {
        const idExistsMock = mockDaoIdExists(async () => false);
        await expect(async () => await new AccountLogic("newEmail", "name", 5, "pwd").delete())
            .rejects
            .toThrow(DisplayableJsonError);

        idExistsMock.mockReset();
    });

});

//#region mocks methods
/**
 * Mock the idExists method of AccountJsonDAO
 * @param mockFunction is the return value the mocked function will return, by default it returns true
 */
function mockDaoIdExists(mockFunction: (id: string) => Promise<boolean> = async () => true) {
    return jest
        .spyOn(AccountJsonDAO.prototype, 'idExists')
        .mockImplementation(mockFunction);
}

function mockDaocreate() {
    return jest
        .spyOn(AccountJsonDAO.prototype, 'create')
        .mockImplementation(async (account) => account);
}

function mockDaoDelete(returnValue: boolean = true) {
    return jest
        .spyOn(AccountJsonDAO.prototype, 'delete')
        .mockImplementation(async () =>  returnValue);
}
//#endregion
