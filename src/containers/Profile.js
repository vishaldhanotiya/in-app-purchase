import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as profileActions from '../store/actions/ProfileActions';

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const getProfile = () => dispatch(profileActions.getProfile());

  const data = useSelector((state) => state.profileReducer.data);
  console.log('data in profile action', data);

  // useEffect(() => {
  //   getProfile();
  //   return () => {};
  // }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require('../assets/ic_splash.png')}
      />
      {data && data.data !== null && (
        <View>
          <Text style={styles.textStyle}>{`Name: ${data.data.name}`}</Text>
          <Text
            style={
              styles.textStyle
            }>{`Mobile Number ${data.data.phone_number}`}</Text>
          <Text style={styles.textStyle}>{`Email:${data.data.email}`}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          navigation.navigate('EditProfile', { data: data });
        }}>
        <Text style={{ fontSize: 10, fontWeight: 'bold' }}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent:"center"
  },
  imageStyle: {
    width: 50,
    height: 50,
    marginTop: 10,
  },
  textStyle: {
    fontSize: 13,
    marginTop: 10,
  },
  buttonStyle: {
    width: 100,
    height: 50,
    backgroundColor: '#add8e6',
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
