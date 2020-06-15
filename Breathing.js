import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableHighlight, Vibration } from 'react-native';

import useInterval from './useInterval'
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import * as Haptics from 'expo-haptics'

export default function(props) {

  const [stepText, setStepText] = useState('Breathe In')
  const [timeText, setTimeText] = useState(0)
  const [fill, setFill] = useState(0)

  useInterval(() => {
    breathingLoop()
  }, 100)

  useEffect(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
    // Vibration.vibrate(500)
  }, [stepText])

  const totalTime = (props.holdCount + props.inCount + props.outCount + props.waitCount) * 1000

  function breathingLoop() {
    const secs = Math.round((new Date() - props.startTime)) % totalTime
    setTimeText(secs)
    setFill(secs / totalTime * 100)

    if (secs / 1000 < props.inCount) { // in
      setStepText('Breathe In')
      setFill(secs / (props.inCount * 1000) * 100)

    } else if (secs / 1000 < props.holdCount + props.inCount) { // hold
      setStepText('Hold')
      setFill((secs - props.inCount * 1000) / (props.holdCount * 1000) * 100)

    } else if (secs / 1000 < props.outCount + props.inCount + props.holdCount) { // out
      setStepText('Breathe Out')
      setFill((secs - (props.inCount + props.holdCount) * 1000) / (props.outCount * 1000) * 100)

    } else { // wait
      setStepText('Wait')
      setFill((secs - (props.inCount + props.holdCount + props.outCount) * 1000) / (props.waitCount * 1000) * 100)

    }
  }


  return <View style={styles.container}>
    <Text style={styles.instruction}>{stepText}</Text>
    <AnimatedCircularProgress
    size={200}
    width={100}
    fill={fill}
    tintColor="#999"
    backgroundColor="#fff" />
  </View>
}

const styles = {
  instruction: {
    fontSize: 42,
    textAlign: 'center',
    fontWeight: '100',
    marginBottom: 20,
    // fontStyle: 'italic'
  },
  container: {
    alignItems: 'center',
  },
}
