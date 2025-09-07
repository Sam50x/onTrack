import { useRouter, usePathname, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { getUser } from "../lib/actions";
import { View } from "react-native";
import tw, { useDeviceContext } from 'twrnc'
import LoadingScreen from "../components/LoadingScreen";

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
      <View style={[tw`flex-1 flex justify-center items-center`, { backgroundColor: '#353434' }]}>
        <LoadingScreen />
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
  useDeviceContext(tw)
  return (
    <RouteGuard>
      <Stack screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#353434' }
      }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </RouteGuard>
  )
}
