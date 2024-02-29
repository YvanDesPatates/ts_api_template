import {AccountLogic} from "../../src/account/AccountLogic";
import {DisplayableJsonError} from "../../src/displayableErrors/DisplayableJsonError";

describe("AccountLogic.ts tests", () => {
    test("create account with existing email is impossible", () => {
        const email = "email";
        new AccountLogic(email, "name", 5, "pwd").create();
        expect(() => new AccountLogic(email, "name", 5, "pwd").create())
            .toThrow(DisplayableJsonError);
        expect(2 + 2).toBe(4);
    });
});