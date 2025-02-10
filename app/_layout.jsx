import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import UserDetailContext from "../context/UserDetailContext";
import { useState } from "react";
import { createContext } from "react";



export default function RootLayout() {
 const [loaded, error] = useFonts({
    'playfair_display': require('./../assets/fonts/PlayfairDisplay-Regular.ttf'),
    'playfair-bold': require('./../assets/fonts/PlayfairDisplay-Bold.ttf')
  });

  const [userDetail, setUserDetail] = useState();

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      ></Stack>
    </UserDetailContext.Provider>
  );
}