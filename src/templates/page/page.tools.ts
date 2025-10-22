export function fetchUser() {
  return new Promise<User | null>((resolve) => {
    const user = localStorage.getItem("user");

    if (user) {
      try {
        const parsedUser = JSON.parse(user);

        resolve(parsedUser);
      } catch (e) {
        resolve(null);
      }
    } else {
      resolve(null);
    }
  });
}
