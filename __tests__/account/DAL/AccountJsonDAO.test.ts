import {AccountJsonDAO} from "../../../src/account/DAL/AccountJsonDAO";
import {AccountDBModel} from "../../../src/account/DAL/AccountDBModel";

const dao: AccountJsonDAO = new AccountJsonDAO();

describe("Test app.ts", () => {
    beforeEach(() => {
        resetDataBase();
    });

    afterAll(() => {
        resetDataBase();
    });

    test("create and get", async () => {
        const account = await dao.create(getDbModel());
        expect(account.email).toBeDefined();
        const gettedAccount = await dao.getById(<string>account.email);
        if (!gettedAccount){
            throw new Error("gettedAccount is not defined");
        }
        assertAccountsAraEquals(gettedAccount, account);
    });

    test("idExists true", async () => {
        const account = await dao.create(getDbModel());
        expect(await dao.idExists(<string>account.email)).toBe(true);
    });

    test("idExists false", async () => {
        const account = getDbModel();
        expect(await dao.idExists(<string>account.email)).toBe(false);
    });

    test("get all", async () => {
        await dao.create(getDbModel());
        const account2 = getDbModel();
        account2.email = "new_email";
        await dao.create(account2);
        const account3 = getDbModel();
        account2.email = "brand_new_email";
        await dao.create(account3);

        const accounts = await dao.getAll();
        expect(accounts.length).toBe(3);
    });

    test("delete", async () => {
        const account = await dao.create(getDbModel());
        await dao.delete(<string>account.email);

        expect(await dao.getById(<string>account.email)).toBeNull();
    });

    test("delete don't delete others", async () => {
        const account = await dao.create(getDbModel());
        const account2 = getDbModel();
        account2.email = "new_email";
        await dao.create(account2);

        await dao.delete(<string>account.email);

        expect(await dao.getById(<string>account2.email)).toBeDefined();
    });
});

async function resetDataBase() {
    const accounts = await dao.getAll();
    for (const account of accounts) {
        await dao.delete(<string>account.email);
    }
}

function getDbModel(): AccountDBModel {
    return new AccountDBModel("email", "name", 5, "pwd");
}

function assertAccountsAraEquals(accountToTest: AccountDBModel, expectedAccountInfos: AccountDBModel){
    expect(accountToTest).toBeDefined();
    expect(expectedAccountInfos).toBeDefined();
    expect(accountToTest.email).toEqual(expectedAccountInfos.email);
    expect(accountToTest.name).toEqual(expectedAccountInfos.name);
    expect(accountToTest.amount).toEqual(expectedAccountInfos.amount);
    expect(accountToTest.pwd).toEqual(expectedAccountInfos.pwd);
}