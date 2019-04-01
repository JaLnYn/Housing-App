import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import Login from './pages/Login'
import Signup from './pages/Signup'

const RootStack = createStackNavigator({
Login: {
  screen: Login
},
Signup: {
  screen: Signup
}
});

const App = createAppContainer(RootStack);

export default App;