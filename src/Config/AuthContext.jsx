import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  updatePassword,
  deleteUser,
} from "firebase/auth";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";

import { auth } from "./Firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = (email, password, username) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Set the display name to the username
        updateProfile(user, { displayName: username })
          .then(() => {
            // Update the local user object with the updated display name
            setUser({ ...user, displayName: username, flag: true });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    const googleAuth = new GoogleAuthProvider();
    //signInWithRedirect(auth, provider)
    signInWithPopup(auth, googleAuth)
      .then((response) => {
        //console.log(response.user);
        const { uid, displayName, email, photoURL, emailVerified } =
          response.user;
        const providerId = googleAuth.providerId;
        //console.log("UID:", uid);
        //console.log("Display Name:", displayName);
        //console.log("Email:", email);
        //console.log("Photo URL:", photoURL);
        //console.log("Email Verified:", emailVerified);
        //console.log("Provider Id:", providerId);

        setUser({ ...response.user, displayName, providerId, flag: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = () => {
    signOut(auth);
    setUser({});
  };

  const changeEmail = (newEmail) => {
    const currentUser = auth.currentUser;
    updateEmail(currentUser, newEmail)
      .then(() => {
        setUser({ ...user, email: newEmail });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeUsername = (newUsername) => {
    const currentUser = auth.currentUser;
    updateProfile(currentUser, { displayName: newUsername })
      .then(() => {
        setUser({ ...user, displayName: newUsername });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changePassword = (newPassword) => {
    const currentUser = auth.currentUser;
    updatePassword(currentUser, newPassword)
      .then(() => {
        console.log("Password changed");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteUserAccount = () => {
    const currentUser = auth.currentUser;
    deleteUser(currentUser)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      //console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        logout,
        signIn,
        googleSignIn,
        changeEmail,
        changeUsername,
        changePassword,
        deleteUserAccount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
