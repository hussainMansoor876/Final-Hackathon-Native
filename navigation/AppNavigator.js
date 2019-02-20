import * as Screen from '../Screens'
import { createDrawerNavigator, createMaterialTopTabNavigator, createBottomTabNavigator, createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

const StackNavigator = createStackNavigator({
    Home: {
        screen: Screen.HomeScreen
    },
    Login: {
        screen: Screen.LoginScreen
    },
    Services: {
        screen: Screen.Services
    },
    Inbox: {
        screen: Screen.Inbox
    }
},
{
    initialRouteName: "Home"
}
)

const TabNavigator = createMaterialTopTabNavigator({
    Home: {
        screen: Screen.HomeScreen
    },
    Login: {
        screen: Screen.LoginScreen
    },
    Company: {
        screen: Screen.Services
    },
    Inbox: {
        screen: Screen.Inbox
    }
})

const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: Screen.HomeScreen
    },
    Services: {
        screen: Screen.Services
    },
    Inbox: {
        screen: Screen.Inbox
    }
},{
    drawerWidth: 230,
    drawerType: 'back'
})

const BottomNavigator = createBottomTabNavigator({
    Home: {
        screen: Screen.HomeScreen
    },
    Company: {
        screen: Screen.Services
    },
    Inbox: {
        screen: Screen.Inbox
    }
    })

const SwitchNavigator = createSwitchNavigator({
    Home: {
        screen: Screen.HomeScreen
    },
    Company: {
        screen: Screen.Services
    },
    Inbox: {
        screen: Screen.Inbox
    }
    })


const StackNavigatorApp = createAppContainer(StackNavigator)
const TabNavigatorApp = createAppContainer(TabNavigator)
const DrawerNavigatorApp = createAppContainer(DrawerNavigator)
const BottomNavigatorApp = createAppContainer(BottomNavigator)
const SwitchNavigatorApp = createAppContainer(SwitchNavigator)

// const Navigator = {
//     StackNavigatorApp,
//     TabNavigatorApp,
//     DrawerNavigatorApp,
//     BottomNavigatorApp,
//     SwitchNavigatorApp
// }


export default DrawerNavigatorApp;