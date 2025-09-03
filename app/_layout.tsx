import { useRouter, usePathname, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { getUser } from "../lib/actions";
import { View } from "react-native";
import { Text } from "react-native-paper";

const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const getSession = async () => {
      setIsLoading(true)
      const session = await getUser()

      console.log(session)
      setIsLoading(false)

      if (!session && pathname !== "/login") {
        router.replace("/login");
      } else if (session && pathname === "/login") {
        router.replace("/");
      }
    }

    getSession()
  }, [pathname, router])

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <>
      {children}
    </>
  )
}

export default function RootLayout() {
  return (
    <RouteGuard>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </RouteGuard>
  )
}
