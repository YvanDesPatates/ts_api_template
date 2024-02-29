import {AccountLogic} from "../../src/account/AccountLogic";
import {DisplayableJsonError} from "../../src/displayableErrors/DisplayableJsonError";
import {AccountJsonDAO} from "../../src/account/accountJsonDAO";
import {MissingAttributeError} from "../../src/displayableErrors/MissingAttributeError";

describe("AccountLogic.ts tests", () => {
    beforeAll(() => {
        //avoid saving test data in the database
        mockDaocreate()
    });

    test("create account with unused email", async () => {
        const idExistsMock = mockDaoIdExists(false);
        const accountToCreate = new AccountLogic("emaileeeee", "name", 5, "pwd");
        const createdAccount = accountToCreate.create();
        expect(createdAccount).toBeInstanceOf(AccountLogic);

        idExistsMock.mockReset();
    })

    test("create account without pwd is impossible", async () => {
        expect(() => new AccountLogic("email", "name", 5).create())
            .toThrow(MissingAttributeError);
    });

    test("create account with existing email is impossible", async () => {
        const idExistsMock = mockDaoIdExists(true);
        expect(() => new AccountLogic("email", "name", 5, "pwd").create())
            .toThrow(DisplayableJsonError);

        idExistsMock.mockReset();
    });
});

//#region mocks methods
function mockDaoIdExists(returnValue: boolean) {
    return jest
        .spyOn(AccountJsonDAO.prototype, 'idExists')
        .mockImplementation((id) => {
            return returnValue;
        });
}

function mockDaocreate() {
    return jest
        .spyOn(AccountJsonDAO.prototype, 'create')
        .mockImplementation((account) => {
            return account;
        });
}
//#endregion
