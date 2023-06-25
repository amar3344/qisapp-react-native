import {Text, View, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface IProps {
  navigation ?: {
    navigate: (arg: string) => void;
  };
}

interface IState {}

export class QisApplication extends Component<IProps, IState> {
  getQuizzPage = () => {
    this.props.navigation?.navigate('QuestionPage');
  };
  render() {
    return (
      <View style={styles.appContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Qizz Application</Text>
        </View>
        <View style={styles.instructions}>
          <Text style={styles.precautions}>1.There will be a 10 Questions.</Text>
          <Text style={styles.precautions}>2.Each Question has 20 seconds.</Text>
          <Text style={styles.precautions}>
            3.For Next Question click on Skip Button
          </Text>
          <Text style={styles.precautions}>4.By Click on Submit Button quizz will stops and shows the results.</Text>
        </View>
        <TouchableOpacity onPress={this.getQuizzPage} style={styles.button}>
          <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
        <Text style={styles.precautions}>All the Best</Text>
      </View>
    );
  }
}

export default QisApplication;

const styles = StyleSheet.create({

    headerText:{
        color:'#fff',
        fontSize:30,
        fontWeight:'600',
    },

    instructions:{
        textAlign:'right',
        elevation:3,
        marginTop:20,
        marginBottom:20,
    },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    textAlign:'center',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
    width: 100,
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:'center',
    alignItems:'center',
    elevation:3,
    padding:20,
  },
  header: {
    backgroundColor: 'blue',
    padding:20,
    borderRadius:10,
    marginBottom:10,
  },

  precautions: {
    fontSize: 20,
    fontWeight: '500',
    color: '#1874CD',
  },
});
