import React, {useState} from 'react';
import {Screen, showErrorMessage, Text, View} from 'ui';
// import {API_URL} from '@env';
import {translate, timeout} from 'core';
import {useTasks} from 'api';
import {
  ActivityIndicator,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export const Home = () => {
  const hoursArray = [...Array(24).keys()].flatMap(h => {
    return [h + 0.5, h + 1];
  });

  // const {data, isLoading, refetch} = useTasks();
  const [hoursInBed, setHoursInBed] = useState();
  const [hoursAsleep, setHoursAsleep] = useState();
  const [calculation, setCalculation] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const calculateScore = (): number => {
    if (hoursInBed && hoursAsleep) {
      return 100 * (hoursAsleep / hoursInBed);
    }
    return 0;
  };

  const uploadData = async (score: number) => {
    await timeout(2000);
    await setIsLoading(true);
    return [score, 201];
  };

  const onPressButton = () => {
    // setIsLoading(isLoading);
    console.log(isLoading, calculateScore());
    const score = calculateScore();
    setCalculation(score);
    uploadData(score);
  };
  const isButtonDisabled = !hoursInBed && !hoursAsleep;

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
          {isLoading && (
            <>
              <ActivityIndicator color="#000" />
              <Text variant="header" textAlign="center">
                Loading
              </Text>
            </>
          )}

          <Text variant="body" textAlign="center">
            {calculation}
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
