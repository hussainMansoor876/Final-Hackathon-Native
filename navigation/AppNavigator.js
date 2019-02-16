import * as Screen from '../Screens'
import { createDrawerNavigator, createMaterialTopTabNavigator, createBottomTabNavigator, createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

const StackNavigator = createStackNavigator({
    Home: {
        screen: Screen.HomeScreen
    },
    Login: {
        screen: Screen.LoginScreen
    },
    Company: {
        screen: Screen.CompanyScreen
    },
    CreateCompany: {
        screen: Screen.CreateCompanyScreen
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
        screen: Screen.CompanyScreen
    },
    CreateCompany: {
        screen: Screen.CreateCompanyScreen
    }
})

const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: Screen.HomeScreen
    },
    Company: {
        screen: Screen.CompanyScreen
    },
    CreateCompany: {
        screen: Screen.CreateCompanyScreen
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
        screen: Screen.CompanyScreen
    },
    CreateCompany: {
        screen: Screen.CreateCompanyScreen
    }
    })

const SwitchNavigator = createSwitchNavigator({
    Home: {
        screen: Screen.HomeScreen
    },
    Company: {
        screen: Screen.CompanyScreen
    },
    CreateCompany: {
        screen: Screen.CreateCompanyScreen
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