import {Text, View, StyleSheet, SectionList,FlatList, SectionListData} from 'react-native';
import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

interface IProps {}

interface IState {
  questionNo: number;
  timer: number;
  correctOption: string;
  correctAnswers: number;
  isSubmit: boolean,
  answerList:string[],
}

let intervalId:number

const questionsData = [
  {
    id: 1,
    question: 'Javascript is an _______ language?',
    answers: [
      'Objected-Oriented',
      'Objecte-based',
      'Procedural',
      'None of the above',
    ],
    correct: 'Objected-Oriented',
  },
  {
    id: 2,
    question:
      'Which of the following methods can be used to display data in some form using Javascript?',
    answers: [
      'document.write()',
      'console.log()',
      'window.alert()',
      'All of the above',
    ],
    correct: 'All of the above',
  },
  {
    id: 3,
    question:
      'What of the following is used in React.js to increase performance?',
    answers: [
      'Original DOM',
      'Virtual DOM',
      'Both A and B',
      'None of the above',
    ],
    correct: 'Virtual DOM',
  },
  {
    id: 4,
    question:
      ' A class is a type of function, but instead of using the keyword function to initiate it, which keyword do we use?',
    answers: ['Constructor', 'Class', 'Object', 'DataObject'],
    correct: 'Class',
  },
  {
    id: 5,
    question:
      'When an operator’s value is NULL, the typeof returned by the unary operator is:',
    answers: ['Boolean', 'Undefined', 'Object', 'Integer'],
    correct: 'Object',
  },
  {
    id: 6,
    question:
      'Which function is used to serialize an object into a JSON string in Javascript?',
    answers: ['stringify()', 'parse()', 'convert()', 'None of the above'],
    correct: 'stringify()',
  },
  {
    id: 7,
    question:
      'Which of the following acts as the input of a class-based component?',
    answers: ['Class', 'Factory', 'Render', 'Props'],
    correct: 'Props',
  },

  {
    id: 8,
    question:
      'How many numbers of elements a valid react component can return?',
    answers: ['1', '2', '3', '4'],
    correct: '3',
  },

  {
    id: 9,
    question: ' What is a state in React?',
    answers: [
      'A permanent storage.',
      'Internal storage of the component.',
      'External storage of the component.',
      'None of the above.',
    ],
    correct: 'Internal storage of the component.',
  },

  {
    id: 10,
    question: ' How many ways of defining your variables in ES6?',
    answers: ['1', '2', '3', '4'],
    correct: '3',
  },
];

export class QuestionsPage extends Component<IProps, IState> {
  state: IState = {
    questionNo: 0,
    timer: 0,
    correctOption: questionsData[0].correct,
    correctAnswers: 0,
    isSubmit: false,
    answerList:[],
  };

  goToNextQuestion = () => {
    if (this.state.questionNo === questionsData?.length - 1) {
      this.goToResultsPage();
    } else {
      console.log(this.state.answerList)
      this.setState(p => ({
        questionNo: p.questionNo + 1,
        correctOption: questionsData[p.questionNo + 1].correct,
        timer: 0,
      }));
    }
  };

  getTimerFunction = () => {
    if (this.state.timer <= 19) {
      this.setState(p => ({timer: p.timer + 1}));
    } else {
      this.goToNextQuestion();
    }
  };

  goToResultsPage = () => {
    clearInterval(intervalId)
    this.setState({isSubmit: true});
  };

  componentDidMount() {
    intervalId = setInterval(() => {
      this.getTimerFunction();
    }, 1000);
  }

  getSelectedOption = (option: string) => {
    this.state.answerList.push(option)
    console.log(this.state.answerList)
    if (option === this.state.correctOption) {
      this.setState(p => ({correctAnswers: p.correctAnswers + 1}));
    }
    this.goToNextQuestion();
  };

  render() {
    const eachQuestionOb = questionsData[this.state.questionNo];
    const percentage = ((this.state.correctAnswers) * 100) / 10;
    return (
      <>
        {this.state.isSubmit ? (
          <SafeAreaView style={styles.safeareaview}>
          <View style={styles.container}>
            <View style={styles.resultCont}>
              <Text style={styles.correctAnswers}>
                Percentage : <Text>{percentage}</Text>
              </Text>
              <View>
                {percentage >= 50 ? (
                  <View>
                    <Text style={styles.resultingText}>Your are Amazing</Text>
                    <Text style={styles.emojies}>😀😀😀</Text>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.resultingText}>
                      Better Luck Next Time
                    </Text>
                    <Text style={styles.emojies}>😞😞😞</Text>
                  </View>
                )}
              </View>
              <View>
                <Text style={styles.lookText}>Look at Your Answers:</Text>
                {<FlatList
                data = {questionsData}
                renderItem={({item,index})=>(
                  <View style={styles.eachresultItem}>
                      <Text style={styles.resultQuestion}><Text style={{paddingRight:5}}>{index+1}Q:</Text>{item.question}</Text>
                      <View style={styles.answersCon}>
                        <View style={{width:'45%'}}>
                          <Text style={{color:"grey"}}>CorrectAnswer:</Text>
                          <Text style={styles.correctText}>{item.correct}</Text>
                        </View>
                        <View style={{width:'45%'}}>
                          <Text style={{color:"grey"}}>YourAnswer:</Text>
                          <Text>
                          <Text style={{color: item.correct === this.state.answerList[index] ? 'green' : 'gey'}} >{this.state.answerList[index]}</Text>
                          </Text>
                        </View>
                      </View>
                  </View>
                )}
                />}
              </View>
            </View>
          </View>
          </SafeAreaView>
        ) : (
          <>
            <View style={styles.timerCon}>
              <Text style={styles.remainingQues}>
                Questions : {this.state.questionNo + 1} / 10
              </Text>
              <Text style={styles.remainingQues}>Timer:{this.state.timer}</Text>
            </View>
            <View style={styles.questionCon}>
              <Text style={styles.questionText}>{eachQuestionOb.question}</Text>
              {eachQuestionOb.answers.map((item:string) => (
                <TouchableOpacity
                  style={styles.eachOption}
                  key={item}
                  onPress={() => this.getSelectedOption(item)}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.radioButtons}></View>
                    <Text style={styles.eachOptionText}>{item}</Text>
                  </View>
                </TouchableOpacity>
              ))}
              <View style={styles.buttonsCont}>
                <TouchableOpacity
                  style={styles.selectButtons}
                  onPress={this.goToResultsPage}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.selectButtons}
                  onPress={this.goToNextQuestion}>
                  <Text style={styles.buttonText}>Skip</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </>
    );
  }
}

export default QuestionsPage;

const styles = StyleSheet.create({

  lookText:{
    fontSize:16,
    fontWeight:'500',
  },

  answersCon:{
    backgroundColor:"#fff",
    padding:5,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    elevation:10,
    margin:5,
    borderRadius:5
  },

  resultQuestion:{
    fontSize:16,
    color:'#fff',
  },

  eachresultItem:{
    marginTop:10,
    marginBottom:10,
    elevation:5,
    backgroundColor:'#1a73cc',
    borderRadius:10,
    padding:5,
    
  },

  safeareaview:{
    flex:1,
    marginTop:10,
    paddingBottom:150,
    height:'100%',
    backgroundColor: '#86BCF1',

  },

  correctText:{
    color:'red'
  },
  radioButtons: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: '#FF0066',
    marginRight: 10,
  },

  emojies: {
    fontSize: 30,
    textAlign: 'center',
  },

  resultingText: {
    fontWeight: '500',
    color: '#104E8B',
    fontSize: 16,
  },
  result: {
    color: 'red',
  },

  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  correctAnswers: {
    color: '#000',
    fontWeight: '500',
    fontSize: 20,
    marginTop:120,
  },

  resultCont: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#86BCF1',
    padding: 30,
    borderRadius: 10,
  },
  questionText: {
    fontSize: 23,
    fontWeight: '600',
    color: '#1874CD',
  },

  questionCon: {
    padding: 20,
  },

  eachOption: {
    width: '80%',
    height: 60,
    justifyContent: 'center',
    marginTop: 10,
    paddingLeft: 10,
    elevation: 3,
    backgroundColor: '#fff',
    marginBottom: 10,
  },

  eachOptionText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    width:'95%',
  },

  selectButtons: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
    width: 100,
  },

  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },

  buttonsCont: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 30,
  },

  timerCon: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'blue',
  },

  remainingQues: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
  },
});
