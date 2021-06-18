import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import ScanReferer from './screens/ScanReferer'
import Result from './screens/Result'

const Drawer = createDrawerNavigator();

function App(){
  return (
    <NavigationContainer>
       <Drawer.Navigator>
         <Drawer.Screen name="ScanReferer" component={ ScanReferer } />
         <Drawer.Screen name="Result" component={ Result } />
       </Drawer.Navigator>
    </NavigationContainer>
  )
}
console.disableYellowBox = true
export default App;

