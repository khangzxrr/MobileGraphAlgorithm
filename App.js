import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Picker, Button } from 'react-native';

export default function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bfs');

  const [nodesCount, setNodesCount] = useState('0');

  const [warningText, setWarningText] = useState('hi');

  const onNodesCountInputChanged = (newNodesCount) => {
    newNodesCount = newNodesCount.replace(/[^0-9]/g, '');
    
    if (parseInt(newNodesCount) > 49) {
      console.log('there are too many node');
      setWarningText('There are too many nodes, display may hard to watch\nlitmit: 50');
    }else{
      setWarningText('');
    }
    
    setNodesCount(newNodesCount);
  };


  return (
    <View style={styles.container}>
      <Text>Setting up graph parameters</Text>
      <Text style={styles.warning}>{warningText}</Text>
      <Picker
        selectedValue={selectedAlgorithm}
        onValueChange={(itemValue, itemIndex) => setSelectedAlgorithm(itemValue)}

        style={{ width: 200, heigt: 100 }}
      >
        <Picker.Item label="BFS" value="bfs"></Picker.Item>
        <Picker.Item label="DFS" value="dfs"></Picker.Item>
        <Picker.Item label="Dijkstra" value="dijkstra"></Picker.Item>
        <Picker.Item label="A*" value="astar"></Picker.Item>

      </Picker>


      <TextInput value={nodesCount} onChangeText={onNodesCountInputChanged} style={styles.input} placeholder='Enter how many nodes here' keyboardType='numeric' />

      <Button title='Confirm' />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  warning: {
    color: 'orange'
  },  
  input: {
    borderWidth: 1,
    padding: 10,
    margin: 15
  }
});
