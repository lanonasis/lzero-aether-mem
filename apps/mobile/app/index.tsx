import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6">
        {/* Hero Section */}
        <View className="mb-8">
          <Text className="text-4xl font-bold text-foreground mb-2">
            🧠 Aether Memory
          </Text>
          <Text className="text-lg text-gray-400">
            ARM-Optimized AI Memory Companion
          </Text>
        </View>

        {/* Features */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-foreground mb-4">
            Key Features
          </Text>
          
          <View className="bg-gray-900 rounded-lg p-4 mb-3">
            <Text className="text-primary text-lg font-semibold mb-1">
              ⚡ On-Device AI
            </Text>
            <Text className="text-gray-300">
              Generate embeddings locally in ~50ms. No cloud calls required.
            </Text>
          </View>

          <View className="bg-gray-900 rounded-lg p-4 mb-3">
            <Text className="text-primary text-lg font-semibold mb-1">
              📴 Offline First
            </Text>
            <Text className="text-gray-300">
              Works completely offline with automatic sync when online.
            </Text>
          </View>

          <View className="bg-gray-900 rounded-lg p-4 mb-3">
            <Text className="text-primary text-lg font-semibold mb-1">
              🔍 Semantic Search
            </Text>
            <Text className="text-gray-300">
              Search by meaning, not just keywords. Powered by transformers.js
            </Text>
          </View>

          <View className="bg-gray-900 rounded-lg p-4">
            <Text className="text-primary text-lg font-semibold mb-1">
              🔒 Privacy First
            </Text>
            <Text className="text-gray-300">
              Your embeddings never leave your device. Complete privacy.
            </Text>
          </View>
        </View>

        {/* Performance Stats */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-foreground mb-4">
            ARM Performance
          </Text>
          <View className="bg-gray-900 rounded-lg p-4">
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-400">iPhone 15 Pro</Text>
              <Text className="text-primary font-semibold">45ms</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-400">Pixel 8</Text>
              <Text className="text-primary font-semibold">52ms</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-400">MacBook M3</Text>
              <Text className="text-primary font-semibold">28ms</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-400">Raspberry Pi 5</Text>
              <Text className="text-primary font-semibold">180ms</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="space-y-3">
          <Link href="/memories" asChild>
            <TouchableOpacity className="bg-primary rounded-lg p-4">
              <Text className="text-center text-black font-bold text-lg">
                View Memories
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href="/search" asChild>
            <TouchableOpacity className="bg-secondary rounded-lg p-4">
              <Text className="text-center text-white font-bold text-lg">
                Semantic Search
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Hackathon Badge */}
        <View className="mt-8 items-center">
          <Text className="text-gray-500 text-sm">
            Built for ARM AI Developer Challenge
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
