import { createUser, newUser, removeUser } from "./user";

export function useAccountLifecycle() {
  let user;
  let accountMayExist;

  beforeEach(() => {
    user = newUser();
    accountMayExist = false;
  });

  afterEach(() => {
    if (accountMayExist) removeUser(user);
  });

  return {
    user: () => user,
    markAccountCreated: () => {
      accountMayExist = true;
    },
    createExistingAccount: () => {
      accountMayExist = true;
      return createUser(user);
    },
  };
}
