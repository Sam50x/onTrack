import { View } from 'react-native'
import LottieView from 'lottie-react-native';
import tw from 'twrnc'

const loadingAnimationPath = require('../assets/lottie/loadingAnimation.json')

const LoadingScreen = () => {
    return (
        <View style={tw`flex-1 w-full flex justify-center items-center`}>
            <LottieView style={tw`flex-1 w-1/2 p-12`} source={loadingAnimationPath} autoPlay loop />
        </View>
    )
}

export default LoadingScreen