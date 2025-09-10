import { useRouter } from 'expo-router'
import { signOut } from '../../lib/actions'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import tw from 'twrnc'

const HomeScreen = () => {

    const router = useRouter()

    const handleSignOut = async () => {
        const res = await signOut()

        console.log(res)

        router.replace('/login')
    }


    return (
        <View style={tw`flex-1 bg-[#353434]`}>
            <Text>HomeScreen</Text>
            <Button onPress={handleSignOut}>Sign out</Button>
        </View>
    )
}

export default HomeScreen