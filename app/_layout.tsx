import { Stack, usePathname, useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import tw, { useDeviceContext } from 'twrnc';
import LoadingScreen from "../components/LoadingScreen";
import { getUser } from "../lib/actions";
import supabase from "../lib/supabase";

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

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session)
        
        if (event === 'SIGNED_OUT' || !session) {
          router.replace('/login')
        } else if (event === 'SIGNED_IN' && session) {
          router.replace('/')
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  if (isLoading) {
    return (
      <SafeAreaView style={tw`flex-1`}>
        <View style={[tw`flex-1 flex justify-center items-center`, { backgroundColor: '#353434' }]}>
          <LoadingScreen />
        </View>
      </SafeAreaView>
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
    <SafeAreaProvider style={tw`bg-[#353434]`}>
      <StatusBar style="light" />
      <SafeAreaView style={tw`flex-1`}>
        <RouteGuard>
          <Stack screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#353434' }
          }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        </RouteGuard>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
