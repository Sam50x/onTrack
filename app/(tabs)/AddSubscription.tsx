import { View, KeyboardAvoidingView, Platform } from 'react-native'
import tw from 'twrnc'
import { TextInput, SegmentedButtons, Button } from 'react-native-paper'

const AddSubscriptionScreen = () => {
    return (
        <KeyboardAvoidingView
            style={tw`flex-1`}
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        >
            <View style={tw`flex-1 bg-[#353434] flex- flex-col justify-center items-center`}>
                <View style={tw`w-full flex flex-col justify-center items-center gap-2 p-4`}>
                    <TextInput
                        style={tw`w-80`}
                        label={'Title'}

                    />
                    <TextInput
                        style={tw`w-80`}
                        label={'Description'}

                    />
                    <View style={tw`w-full flex flex-row justify-center items-center gap-2`}>
                        <TextInput
                            style={tw`w-49`}
                            label={'Last Paid Date'}
                            placeholder='mm/dd/yy'

                        />
                        <TextInput
                            style={tw`w-29`}
                            label={'Price'}

                        />
                    </View>
                    <SegmentedButtons
                        value={'Monthly'}
                        onValueChange={() => console.log('s')}
                        buttons={[
                            {
                                value: 'Monthly',
                                label: 'Monthly',
                            },
                            {
                                value: 'Yearly',
                                label: 'Yearly',
                            },
                        ]}
                        style={tw`w-80 py-1`}
                        theme={{
                            colors: {
                                onSurface: 'white',
                            }
                        }}
                    />
                    <Button
                        mode='contained'
                        style={tw`w-80`}
                    >
                        Add Subscription
                    </Button>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default AddSubscriptionScreen