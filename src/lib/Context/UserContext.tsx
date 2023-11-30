import Cookies from 'js-cookie';
import { createContext } from 'react';

export const UserContext = createContext<any | null>(null);
export const UserProvider = ({ children }: { children: any }) => {
  let user;
  const users = Cookies.get('user-info') as unknown as string;
  if (users !== undefined) {
    user = JSON.parse(users);
  }

  return (
    <>
      <UserContext.Provider
        value={{
          user,
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
};
