export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: HomeParamList;
  Pickup: PickUpParamList;
  Profile: ProfileParamList;
};

export type HomeParamList = { HomeScreen: undefined };
export type PickUpParamList = { PickUpScreen: undefined };
export type ProfileParamList = {
  ProfileScreen: undefined;
};
