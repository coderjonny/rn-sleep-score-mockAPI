import React, {useState} from 'react';
import {Screen, showErrorMessage, Text, View} from 'ui';
import {translate} from 'core';
import {
  ActivityIndicator,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {calculateScore, hoursArray} from './utils';

export const Home = () => {
  const [hoursInBed, setHoursInBed] = useState(0);
  const [hoursAsleep, setHoursAsleep] = useState(0);
  const [calculation, setCalculation] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const uploadMockData = (score: number) => {
    setIsLoading(true);
    setIsError(false);
    const randomSuccessOrFailure = Math.random() * 10 < 6;
    setTimeout(() => {
      setIsLoading(false);
      if (randomSuccessOrFailure) {
        setCalculation(score);
      } else {
        showErrorMessage('Error saving data');
        setIsError(true);
      }
    }, 800); // simulate loading time
  };

  const onPressButton = async () => {
    const score = calculateScore(hoursInBed, hoursAsleep);
    uploadMockData(score);
  };

  const isButtonDisabled = hoursInBed === 0 || hoursAsleep === 0;

  const text = isLoading
    ? 'loading'
    : isError
    ? 'Error saving, try again..'
    : calculation;

  return (
    <Screen>
      <ScrollView>
        <View flex={1} justifyContent="center">
          <Text variant="header" textAlign="center">
            {translate('in-bed')}
          </Text>
          <Picker
            selectedValue={hoursInBed}
            onValueChange={itemValue => setHoursInBed(itemValue)}>
            {hoursArray.map(hour => {
              return (
                <Picker.Item key={hour} label={`${hour} hr`} value={hour} />
              );
            })}
          </Picker>
          <Text variant="header" textAlign="center">
            {translate('asleep')}
          </Text>
          <Picker
            selectedValue={hoursAsleep}
            onValueChange={itemValue => setHoursAsleep(itemValue)}>
            {hoursArray.map(hour => {
              return (
                <Picker.Item key={hour} label={`${hour} hr`} value={hour} />
              );
            })}
          </Picker>
          {isLoading && <ActivityIndicator color="#000" />}
          <Text variant="header" textAlign="center">
            {text}
          </Text>

          <Pressable
            disabled={isButtonDisabled}
            onPress={onPressButton}
            style={({pressed}) => [
              {
                backgroundColor: pressed
                  ? 'lightblue'
                  : isButtonDisabled
                  ? 'grey'
                  : 'blue',
              },
              styles.button,
            ]}>
            <Text style={styles.text}>Calculate</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
