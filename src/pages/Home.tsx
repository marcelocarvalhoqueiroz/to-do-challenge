import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type ArgsEdit = {
  id: number,
  newTitle: string
} 

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const tasksEqualTitle = tasks.find(item => item.title === newTaskTitle)
    if(tasksEqualTitle){
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
    }
    const taskData = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(oldState => [...oldState, taskData])
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTasks = tasks.map(task => ({ ...task}))
    const findedTask = updatedTasks.find(item => item.id === id)

    if(!findedTask){
      return
    }
    findedTask.done = !findedTask.done
    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert('Remover task', 'Deseja remover a task?', [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        style: 'destructive',
        onPress: () => {
          setTasks(oldState => oldState.filter(
            task => task.id !== id
          ))
        }
      }
    ])
  }

  function handleEditTask({ id, newTitle}: ArgsEdit){
    const updatedTasks = tasks.map(task => ({...task}))
    const taskToEdit = updatedTasks.find(task => task.id === id)
    
    if(!taskToEdit){
      return
    }
    taskToEdit.title = newTitle
    setTasks(updatedTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})