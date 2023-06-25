import React, { Component } from 'react'
import QisApplication from './src/components/QisApplication'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import QuestionsPage from './src/components/QuestionsPage';

const Stack = createStackNavigator()

export class App extends Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Qizz App" component={QisApplication} options={{headerShown:false}}/>
          <Stack.Screen name="QuestionPage" component={QuestionsPage} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
      
    )
  }
}

export default App