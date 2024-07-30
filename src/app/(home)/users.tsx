import { useEffect, useState } from 'react';
import { FlatList, Text, View, ActivityIndicator } from 'react-native';
import { supabase } from '../../lib/superbase';
import { useAuth } from '../../providers/AuthProvider';
import UserListItem from '@/src/components/UserList';

export default function UsersScreen() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchUsers = async () => {
      setLoading(true);
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', user.id); // exclude current user

      if (error) {
        console.error('Error fetching profiles:', error);
      } else {
        setUsers(profiles);
      }
      setLoading(false);
    };

    fetchUsers();
  }, [user]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 10 }}
      renderItem={({ item }) => <UserListItem user={item} />}
    />
  );
}
