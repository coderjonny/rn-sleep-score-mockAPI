# Mobile Demo Sleep App

After running this demo project in a simulator, you can see if the sleepScore data really got saved at this mock API url: https://621930ff81d4074e85a45626.mockapi.io/api/v1/sleepScore

- Most of the relevant logic and UI lives in the `src/screens/Home/index.tsx` file.
- Testing of the utils functions live in the `src/screens/Home/__tests__/index.test.tsx` file.

## ▶️ Usage

1. [Setting up IOS and Android development environment](https://reactnative.dev/docs/environment-setup)

2. Start working

```bash
## install deps
yarn

## install ios pods
yarn setup:ios

## ios
yarn ios

## android
yarn android

## running tests!
yarn test

```

I used a template that came with typescript and some helpers already packaged for this React-Native project: [react-native-obytes-template](https://github.com/obytes/react-native-template-obytes)
