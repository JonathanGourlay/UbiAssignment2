import React from 'react'
import { View, Switch } from 'react-native'

const SwitchComp = (props) => {
    const [isEnabled, setIsEnabled] = React.useState(false);
    const toggleSwitch = () => {
        props.onChange(!isEnabled);
        setIsEnabled(previousState => !previousState);
    }

    return (
        <View >
            <Switch
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
}
export default SwitchComp;