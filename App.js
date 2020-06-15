import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableHighlight } from 'react-native';

import Breathing from './Breathing'

export default function App() {
  const [inCount, setInCount] = useState(4)
  const [holdCount, setHoldCount] = useState(4)
  const [outCount, setOutCount] = useState(4)
  const [waitCount, setWaitCount] = useState(4)
  const [breathMode, setBreathMode] = useState(false)

  function toggleBreathMode() {
    !!breathMode ? setBreathMode(false) : setBreathMode(new Date())
  }

  const settings = <View style={styles.rows}>
    <Row label="In" n={inCount} setFunction={setInCount}/>
    <Row label="Hold" n={holdCount} setFunction={setHoldCount}/>
    <Row label="Out" n={outCount} setFunction={setOutCount}/>
    <Row label="Wait" n={waitCount} setFunction={setWaitCount}/>
  </View>

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Text style={styles.title}>Mindful Breathing</Text>
        {breathMode ? <Breathing {...{inCount, holdCount, waitCount, outCount}} startTime={breathMode} /> : settings}
        <View style={styles.buttonRow}>
          <TouchableHighlight style={styles.button} onPress={toggleBreathMode}>
            <Text style={styles.buttonText}>
              {breathMode ? 'STOP' : 'START'}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
}

function Row(props) {
  function padN(n) {
    if (n < 10) {
      return `0${n}`
    }
    return n
  }

  function incrementN() {
    props.setFunction(props.n+1)
  }

  function decrementN() {
    if (props.n > 0) {
      props.setFunction(props.n-1)
    }
  }

  return <View style={styles.row}>
    <Text style={styles.heading}>Counts <Text style={styles.bold}>{props.label}</Text></Text>
    <Text style={styles.number}>{padN(props.n)}</Text>
    <TouchableHighlight style={styles.rowButton} onPress={decrementN}>
      <Text style={styles.rowButtonText}>-</Text>
    </TouchableHighlight>
    <TouchableHighlight style={styles.rowButton} onPress={incrementN}>
      <Text style={styles.rowButtonText}>+</Text>
    </TouchableHighlight>
  </View>
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  rows: {
    // flex: 1,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
    marginTop: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    width: 110,
  },
  number: {
    fontSize: 64,
  },
  bold: {
    fontWeight: 'bold',
  },
  rowButton: {
    backgroundColor: 'black',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  rowButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonRow: {
    marginBottom: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 40,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'black',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    // fontWeight: 'bold',
  },
  container: {
    marginTop: 35,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
});
