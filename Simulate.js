import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Canvas from 'react-native-canvas';

export default function Simulate({ navigation, route }) {
    const maxNodes = route.params.nodesCount;
    const algorithm = route.params.algorithm;

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    let canvasContext = null; //canvas context

    let nodes = []; //contain nodes information
    let justify = []; //weight between nodes

    const padding = 30;
    const nodeSize = 20;

    const isTooCloseToAnotherNode = (curX, curY) => {
        for(let i = 0; i < nodes.length; i++){
            var distance = Math.sqrt(Math.pow(curX - nodes[i].x, 2) + Math.pow(curY - nodes[i].y, 2));

            if (distance <= padding + nodeSize){
                return true;
            }
        }

        return false;
    }

    for (let i = 0; i < maxNodes; i++) {
        var newX = Math.floor(Math.random() * (screenWidth - padding + 1));
        var newY = Math.floor(Math.random() * (screenHeight - padding + 1));

        while (isTooCloseToAnotherNode(newX, newY) || newX <= padding || newY <= padding ){
            newX = Math.floor(Math.random() * (screenWidth - padding * 2 ));
            newY = Math.floor(Math.random() * (screenHeight - padding * 2));
        }

        nodes.push({ 
            x: newX, 
            y: newY,
            label: i + 1
        });
    }

    console.log(nodes.length);

    const renderNodes = () => {
        nodes.forEach((node) => {
            canvasContext.beginPath();
            canvasContext.fillStyle = 'red';

            canvasContext.arc(node.x, node.y, nodeSize, 0, 2 * Math.PI);
            canvasContext.fill();

            canvasContext.font = "30px Arial";
            canvasContext.fillStyle = "white";
            canvasContext.textAlign = "center";

            canvasContext.fillText(node.label, node.x, node.y + 10);
            
        });
    }

    const handleCanvas = (canvas) => {
        if (canvas == null) {
            return;
        }

        canvas.width = screenWidth;
        canvas.height = screenHeight;

        const ctx = canvas.getContext('2d');
        canvasContext = ctx;

        renderNodes();
    };



    return (
        <Canvas ref={handleCanvas} />
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
