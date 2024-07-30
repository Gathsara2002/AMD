import { View, Text, Pressable, Alert } from 'react-native';
import React from 'react';
import { useChatContext } from 'stream-chat-expo';
import { useAuth } from '../providers/AuthProvider';
import { router } from 'expo-router';

// @ts-ignore
const UserListItem = ({ user }) => {
  const { client } = useChatContext();
  const { user: me } = useAuth();

  const onPress = async () => {
    if (!me) {
      Alert.alert('Error', 'You must be logged in to start a chat.');
      return;
    }

    try {
      // Start a chat with the user
      const channel = client.channel('messaging', {
        members: [me.id, user.id],
      });
      await channel.watch();
      router.replace(`/(home)/channel/${channel.cid}`);
    } catch (error) {
      console.error('Error starting chat:', error);
      Alert.alert('Error', 'Failed to start a chat. Please try again.');
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={{ padding: 15, backgroundColor: 'white' }}
    >
      <Text style={{ fontWeight: '600' }}>{user.full_name}</Text>
    </Pressable>
  );
};

export default UserListItem;
