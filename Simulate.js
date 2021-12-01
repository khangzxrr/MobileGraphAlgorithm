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

    const padding = 30;
    const nodeSize = 20;

    const isTooCloseToAnotherNode = (curX, curY) => {
        for (let i = 0; i < nodes.length; i++) {
            var distance = Math.sqrt(Math.pow(curX - nodes[i].x, 2) + Math.pow(curY - nodes[i].y, 2));

            if (distance <= padding + nodeSize) {
                return true;
            }
        }

        return false;
    }

    const generateNodes = () => {
        for (let i = 0; i < maxNodes; i++) {
            var newX = Math.floor(Math.random() * (screenWidth - padding + 1));
            var newY = Math.floor(Math.random() * (screenHeight - padding + 1));

            while (isTooCloseToAnotherNode(newX, newY) || newX <= padding || newY <= padding || Math.abs(screenHeight - newY) <= 50) {
                newX = Math.floor(Math.random() * (screenWidth - padding * 2));
                newY = Math.floor(Math.random() * (screenHeight - padding * 2));
            }

            nodes.push({
                x: newX,
                y: newY,
                label: i,
                adjacencies: []
            });
        }
    }

    const renderNode = (node, color = 'red') => {
        canvasContext.beginPath();
        canvasContext.fillStyle =  color;

        canvasContext.arc(node.x, node.y, nodeSize, 0, 2 * Math.PI);
        canvasContext.fill();

        canvasContext.font = "30px Arial";
        canvasContext.fillStyle = "white";
        canvasContext.textAlign = "center";

        canvasContext.fillText(node.label, node.x, node.y + 10);
    }
    const renderNodes = () => {
        nodes.forEach((node) => {
            renderNode(node);
        });
    }



    const generateNodeLinks = () => {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = 0; j < nodes.length; j++) {
                let connected = Math.random() * 60;
                if (i == j){
                    continue;
                }

                if (connected >= 50) {
                    if (nodes[i].adjacencies.includes(j) == false){
                        nodes[i].adjacencies.push(j);
                    }

                    if (nodes[j].adjacencies.includes(i) == false){
                        nodes[j].adjacencies.push(i);
                    }
                    
                }
            }
        }

        for(let i = 0; i < nodes.length; i++){
            if (nodes[i].adjacencies.length == 0){  
                let linkToNode = Math.floor(Math.random() * nodes.length);

                console.log(linkToNode);

                nodes[i].adjacencies.push(linkToNode);
                nodes[linkToNode].adjacencies.push(i);

            }
        }

    }

    const renderNodesConnection = () => {

        for (let i = 0; i < nodes.length; i++) {

            let adjacencies = nodes[i].adjacencies;

            for (let j = 0; j < nodes[i].adjacencies.length; j++) {
                let adjNodeID = adjacencies[j];

                canvasContext.beginPath();
                canvasContext.moveTo(nodes[i].x, nodes[i].y);
                canvasContext.lineTo(nodes[adjNodeID].x, nodes[adjNodeID].y);
                canvasContext.stroke();
            }
        }

    }

    const highlightNode = (nodeID) => {
        renderNode(nodeID, 'green');
    }
    const highlightLine = (firstNodeID, secondNodeID) => {
        canvasContext.beginPath();
        canvasContext.moveTo(nodes[firstNodeID].x, nodes[firstNodeID].y);
        canvasContext.lineTo(nodes[secondNodeID].x, nodes[secondNodeID].y);
        canvasContext.strokeStyle = "orange";
        canvasContext.stroke();
    }

    const timeout = (delay) => {
        return new Promise( res => setTimeout(res, delay) );
    }

    const simulating = async () => {
        let queues = [];
        let visited = [];

        queues.push(0); //node 1 

        while (queues.length != 0) {
            let nodeID = queues[0];

            queues.shift(); //pop

            visited.push(nodeID); //add node ID to visited

            await timeout(500);
            highlightNode(nodes[nodeID]);
            
            let adj = nodes[nodeID].adjacencies;

            for (let i = 0; i < adj.length; i++) {
                if (visited.includes(adj[i]) == false) { //if node ID is not visited
                    queues.push(adj[i]);

                    renderNode(nodes[adj[i]], 'orange');
                }
            }

            console.log(queues);

        }

    }

    const handleCanvas = (canvas) => {
        if (canvas == null) {
            return;
        }

        canvas.width = screenWidth;
        canvas.height = screenHeight;

        const ctx = canvas.getContext('2d');
        canvasContext = ctx;

        generateNodes();

        generateNodeLinks();

        renderNodesConnection();

        renderNodes();

        simulating();

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
