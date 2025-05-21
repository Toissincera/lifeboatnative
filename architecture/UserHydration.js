import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { UserState } from "../recoil/atom";

export default function useHydrateUser(isHydrating, setIsHydrating) {
  const setUser = useSetRecoilState(UserState);
  useEffect(() => {
    const loadUser = async () => {
      try {
        const timeout = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 2000)
        );
        const loadUser = AsyncStorage.getItem("user");
        const userJson = await Promise.race([loadUser, timeout]);
        if (userJson) {
          setUser(JSON.parse(userJson));
        }
      } catch (err) {
        console.log("User hydration failed => ", err.message);
      } finally {
        setIsHydrating(false);
      }
    };

    loadUser();
  }, []);
}
