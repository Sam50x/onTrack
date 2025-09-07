import { useRouter } from 'expo-router'
import { signOut } from '../../lib/actions'
import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'

const HomeScreen = () => {

    const router = useRouter()

    const handleSignOut = async () => {
        const res = await signOut()

        console.log(res)

        router.replace('/login')
    }


    return (
        <View>
            <Text>HomeScreen</Text>
            <Button onPress={handleSignOut}>Sign out</Button>
        </View>
    )
}

export default HomeScreen