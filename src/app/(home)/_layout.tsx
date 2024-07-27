import { Slot } from "expo-router";
import { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";

const client = StreamChat.getInstance("fu2shgkgbd87");

export default function HomeLayout() {
  useEffect(() => {
    const connect = async () => {
      await client.connectUser(
        {
          id: "jlahey",
          name: "Jim Lahey",
          image: "https://i.imgur.com/fR9Jz14.png",
        },
        client.devToken("jlahey")
      );

      const channel = client.channel("messaging", "the_park", {
        name: "The Park",
      });
      await channel.watch();
    };

    connect();
  });

  return (
    <OverlayProvider>
      <Chat client={client}>
        <Slot />
      </Chat>
    </OverlayProvider>
  );
}
