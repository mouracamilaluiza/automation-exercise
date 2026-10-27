import { shop } from "../pages/shop";
import { useAccountLifecycle } from "../support/account";
import { reportTest } from "../support/reporting";

describe("Checkout", () => {
  const account = useAccountLifecycle();

  it("TC15 — cadastrar antes do checkout e concluir pedido", () => {
    reportTest("TC15", "Checkout", "blocker");
    const user = account.user();
    shop.home();
    shop.auth();
    account.markAccountCreated();
    shop.register(user);
    shop.addFirstProduct();
    shop.checkout(user);
    shop.deleteAccount();
  });

  it("TC16 — autenticar antes do checkout e concluir pedido", () => {
    reportTest("TC16", "Checkout", "blocker");
    const user = account.user();
    account.createExistingAccount();
    shop.home();
    shop.auth();
    shop.login(user);
    shop.loggedIn(user);
    shop.addFirstProduct();
    shop.checkout(user);
    shop.deleteAccount();
  });
});
