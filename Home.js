
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Picker, Button, Text } from 'react-native';

export default function HomeScreen({ navigation }) {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState('bfs');

    const [nodesCount, setNodesCount] = useState('0');

    const [warningText, setWarningText] = useState('');


    const onConfirm = () => {
        if (nodesCount == '' || nodesCount == '0') {
            alert('please input node count');
        }else{
            navigation.navigate('Simulate', { algorithm: selectedAlgorithm, nodesCount: parseInt(nodesCount)  });
        }
    };

    const onNodesCountInputChanged = (newNodesCount) => {
        newNodesCount = newNodesCount.replace(/[^0-9]/g, '');

        if (parseInt(newNodesCount) > 49) {
            console.log('there are too many node');
            setWarningText('There are too many nodes, display may hard to watch\nlitmit: 50');
        } else {
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


            <TextInput
                value={nodesCount}
                onChangeText={onNodesCountInputChanged}
                style={styles.input}
                placeholder='Enter how many nodes here'
                keyboardType='numeric'
                maxLength={2}
            />

            <Button title='Confirm' onPress={onConfirm} />
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
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10
    }
});
