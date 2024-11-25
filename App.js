import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import { StatusBar } from 'expo-status-bar';

export default function App() {

  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [courseGoals, setCourseGoals] = useState([])

  function startAddGoalHandler() {
    setModalIsVisible(true)
  }

  function endAddGoalHandler() {
    setModalIsVisible(false)
  }

  function addGoalHandler(enteredGoalText) {
    //console.log(enteredGoalText)
    setCourseGoals(currentCourseGoals => [
      ...courseGoals, 
      {text: enteredGoalText, id: Math.random().toString()}
    ])
    endAddGoalHandler()
  };

  function deleteGoalHandler(id) {
    console.log('DELETE' + id);
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
    <StatusBar style='light' />
    <View style={styles.appContainer}>
      <Button title='Add New Goal' color="#a065ec" onPress={startAddGoalHandler} />
      <GoalInput visible={modalIsVisible} onAddGoal={addGoalHandler} onCancel={endAddGoalHandler}/>
      <View style={styles.goalsContainer}>
        {/* <ScrollView alwaysBounceVertical={false}>
          {courseGoals.map((goal) => (
            <View key={goal} style={styles.goalItem}>
              <Text>{goal}</Text>
            </View>
          ))}
        </ScrollView> */}
        <FlatList data={courseGoals}
          renderItem={(itemData) => {
            return <GoalItem 
            text={itemData.item.text} 
            id={itemData.item.id}
            onDeleteItem={deleteGoalHandler}/>
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical={false}>

        </FlatList>
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
  
});
