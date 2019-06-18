import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import React from 'react';
import {Button} from 'react-native'
import Auth from './pages/Auth'
import './components/Global'


import TenantMain from './pages/Tenant/TenantMain'
import OwnerMain from './pages/Owner/OwnerMain'
import OwnerMsg from './pages/Owner/OwnerMsg'
import TenantMsg from './pages/Tenant/TenantMsg'
import TenantProfile from './pages/Tenant/TenantProfile'
import OwnerProfile from './pages/Owner/OwnerProfile'
import EditHouse from './pages/Owner/EditHouse'
import AddHouse from './pages/Owner/AddHouse'
import Splash from './pages/Splash'




const TNav = createBottomTabNavigator(
  {
    TenantProfile: {
      screen: TenantProfile
    },
    TenantMain: {
      screen: TenantMain
    },
    TenantMsg: {
      screen: TenantMsg
    }
  },
  {
     initialRouteName: 'TenantMain',
   }
)

const myHouses = createStackNavigator({
  OwnerMain: {
    screen: OwnerMain,
    navigationOptions: {
      header: null,
    }
  },
  EditHouse: {
    screen: EditHouse
    
  },
  AddHouse: {
    screen: AddHouse
    
  },
},
{
   initialRouteName: 'OwnerMain',
 })

const ONav = createBottomTabNavigator(
  {
    OwnerProfile: {
      screen: OwnerProfile
    },
    myHouses: myHouses,
    OwnerMsg: {
      screen: OwnerMsg
    }
  },
  {
     initialRouteName: 'myHouses',
   }
)


const RootStack = createSwitchNavigator({
  Splash: {
    screen: Splash
  },
  Auth: {
    screen: Auth
  },
  ONav : ONav,
  TNav : TNav
})

const App = createAppContainer(RootStack);

export default App;