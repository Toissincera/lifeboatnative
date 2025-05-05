import { atom, selector, selectorFamily } from "recoil";
import { recoilPersist } from "recoil-persist";
// const { persistAtom } = recoilPersist()


const { persistAtom } = recoilPersist({
  key: "persist-state", // this key is using to store data in local storage
  storage: sessionStorage, // configurate which stroage will be used to store the data
});


export const CaseListState = atom({
  key: "CaseList",
  default: [],
});

export const UserState = atom({
  key: "user",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const userMemberRoleState = selector({
  key: 'userMemberRoleState',
  get: ({ get }) => {
    const userRole = get(UserState);
    return userRole?.memberRole
  },
});

// Define permissions for each member role
export const ameerPermissions = ['write', 'delete', 'manageUsers'];
export const treasurerPermissions = ['write', 'delete'];
export const memberPermissions = ['read'];

export const userPermissionsState = selector({
  key: 'userPermissionsState',
  get: ({ get }) => {
    const memberRole = get(userMemberRoleState);
    switch (memberRole) {
      case 'ameer':
        return ameerPermissions;
      case 'treasurer':
        return treasurerPermissions;
      case 'member':
        return memberPermissions;
      default:
        return [];
    }
  },
});

// export const hasPermission = selector({
//   key: 'hasPermission',
//   get: ({ get }, permission) => {
//     console.log(permission)
//     const permissions = get(userPermissionsState);
//     return permissions.includes(permission);
//   },
// });

export const hasPermission = selectorFamily({
  key: 'hasPermission',
  get: (permission) => ({ get }) => {
    const permissions = get(userPermissionsState);
    return permissions.includes(permission);
  },
});

export const snackbarState = atom({
  key: "snackbarState",
  default: {
      open: false,
      vertical: "top",
      horizontal: "right",
      severity: "info",
      message: "",
  },
});

export const darkModeState = atom({
key: "darkMode",
default: false,
effects_UNSTABLE: [persistAtom],
});

export const drawerWidthState = atom({
key: "drawerWidth",
default: 240,
effects_UNSTABLE: [persistAtom],
});

export const modalState = atom({
key: "open",
default: false,
});

// export const usersQuery = selector({
//     key: 'usersQuery',
//     get: async () => {
//         const users = await getUsers()
//         return users;
//     }
// });

// export const toggleDarkModeState = selector({
//     key: 'toggleDarkMode',
//     set: ({ get, set }) => {
//         const currentValue = get(darkModeState);

//         set(darkModeState, !currentValue);
//     }
// });
// export const userByIdQuery = selectorFamily({
//     key: 'userByIdQuery',
//     get: (id) => async () => {
//         const user = await getUser(id)
//         return user;
//     }
// });
