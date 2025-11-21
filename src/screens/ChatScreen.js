import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme, spacing, fontSize } from '../theme/theme';

const ChatScreen = ({ navigation }) => {
  const isDark = false;

  // Mock chat conversations
  const conversations = [
    {
      id: '1',
      name: 'Jane Smith',
      lastMessage: 'Is this still available?',
      time: '2m ago',
      unread: 2,
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: '2',
      name: 'Mike Johnson',
      lastMessage: 'Thanks for the quick response!',
      time: '1h ago',
      unread: 0,
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    {
      id: '3',
      name: 'Sarah Williams',
      lastMessage: 'Can we schedule a viewing?',
      time: '3h ago',
      unread: 1,
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    {
      id: '4',
      name: 'David Brown',
      lastMessage: 'What is the condition?',
      time: '1d ago',
      unread: 0,
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
  ];

  const renderConversation = ({ item }) => (
    <TouchableOpacity
      style={[styles.conversationItem, { backgroundColor: theme.colors.surface }]}
      onPress={() => {
        // Navigate to chat detail
      }}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: item.avatar }}
          style={styles.avatar}
        />
        {item.unread > 0 && (
          <View style={[styles.unreadBadge, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.unreadText}>{item.unread}</Text>
          </View>
        )}
      </View>
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={[styles.conversationName, { color: theme.colors.text }]}>
            {item.name}
          </Text>
          <Text style={[styles.conversationTime, { color: theme.colors.textTertiary }]}>
            {item.time}
          </Text>
        </View>
        <Text
          style={[
            styles.lastMessage,
            { color: item.unread > 0 ? theme.colors.text : theme.colors.textSecondary },
            item.unread > 0 && { fontWeight: '600' },
          ]}
          numberOfLines={1}
        >
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Messages
        </Text>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="magnify"
            size={24}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      </View>

      {/* Conversations List */}
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={renderConversation}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="message-outline"
              size={64}
              color={theme.colors.textTertiary}
            />
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
              No messages yet
            </Text>
            <Text style={[styles.emptySubtext, { color: theme.colors.textTertiary }]}>
              Start a conversation from a listing
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    elevation: 2,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
  },
  listContent: {
    padding: spacing.md,
  },
  conversationItem: {
    flexDirection: 'row',
    padding: spacing.md,
    borderRadius: theme.roundness,
    marginBottom: spacing.sm,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  unreadBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: fontSize.xs,
    fontWeight: '700',
  },
  conversationContent: {
    flex: 1,
    justifyContent: 'center',
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  conversationName: {
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  conversationTime: {
    fontSize: fontSize.xs,
  },
  lastMessage: {
    fontSize: fontSize.sm,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyText: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    marginTop: spacing.md,
  },
  emptySubtext: {
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
  },
});

export default ChatScreen;

