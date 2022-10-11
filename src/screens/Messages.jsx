import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { BlurView } from 'expo-blur';
import * as LocalAuthentication from 'expo-local-authentication';

function Messages() {
  const [auth, setAuth] = useState(false);

  useEffect(async () => {
    const authReq = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Every conversation is protected by a double authentication on your device.',
    });

    setAuth(authReq);
  }, []);

  async function unlock() {
    const authReq = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Every conversation is protected by a double authentication on your device.',
    });

    setAuth(authReq);
  }

  return (
    <View style={styles.container}>
      {!auth?.success ? (
        <BlurView tint="light" intensity={100} style={styles.privacyMask}>
          <TouchableOpacity onPress={unlock}>
            <Text>Unlock</Text>
          </TouchableOpacity>
        </BlurView>
      ) : (
        <Text>/Messages</Text>
      )}

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
  privacyMask: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Messages;
