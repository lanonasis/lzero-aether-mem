import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate AI search
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  return (
    <View className="flex-1 bg-background">
      <View className="p-4">
        {/* Search Input */}
        <View className="bg-gray-900 rounded-lg p-4 mb-4">
          <TextInput
            className="text-foreground text-lg"
            placeholder="Search by meaning..."
            placeholderTextColor="#6B7280"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
          />
        </View>

        <TouchableOpacity
          onPress={handleSearch}
          className="bg-primary rounded-lg p-4 mb-6"
          disabled={isSearching}
        >
          <Text className="text-center text-black font-bold text-lg">
            {isSearching ? "Searching..." : "🔍 Semantic Search"}
          </Text>
        </TouchableOpacity>

        {/* AI Info */}
        <View className="bg-gray-900 rounded-lg p-4 mb-6">
          <Text className="text-primary text-lg font-bold mb-2">
            🧠 On-Device AI
          </Text>
          <Text className="text-gray-300 mb-2">
            Powered by all-MiniLM-L6-v2 running locally on your device
          </Text>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Model Size:</Text>
            <Text className="text-foreground font-semibold">22M params</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Embedding Dim:</Text>
            <Text className="text-foreground font-semibold">384</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Avg. Time:</Text>
            <Text className="text-foreground font-semibold">~50ms</Text>
          </View>
        </View>

        {/* Example Queries */}
        <View>
          <Text className="text-foreground text-lg font-bold mb-3">
            Try These Queries:
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              onPress={() => setQuery("authentication patterns")}
              className="bg-gray-800 px-4 py-2 rounded-full mr-2"
            >
              <Text className="text-gray-300">authentication patterns</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setQuery("performance optimization")}
              className="bg-gray-800 px-4 py-2 rounded-full mr-2"
            >
              <Text className="text-gray-300">performance optimization</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setQuery("ARM specific code")}
              className="bg-gray-800 px-4 py-2 rounded-full mr-2"
            >
              <Text className="text-gray-300">ARM specific code</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Results Placeholder */}
        {query && !isSearching && (
          <View className="mt-6">
            <Text className="text-gray-400 text-center">
              Search results will appear here
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
