import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";

// Mock data for demo
const mockMemories = [
  {
    id: "1",
    title: "OAuth2 Implementation",
    content: "Use PKCE flow for mobile apps. Store tokens in secure storage.",
    type: "code",
    tags: ["auth", "security"],
    createdAt: new Date("2025-01-15"),
  },
  {
    id: "2",
    title: "React Performance Tip",
    content: "Use React.memo for expensive components. Avoid inline functions in props.",
    type: "note",
    tags: ["react", "performance"],
    createdAt: new Date("2025-01-14"),
  },
  {
    id: "3",
    title: "ARM Optimization Idea",
    content: "Consider using quantized models for faster inference on mobile devices.",
    type: "idea",
    tags: ["arm", "ai", "optimization"],
    createdAt: new Date("2025-01-13"),
  },
];

export default function MemoriesScreen() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredMemories = selectedType
    ? mockMemories.filter((m) => m.type === selectedType)
    : mockMemories;

  return (
    <View className="flex-1 bg-background">
      {/* Filter Tabs */}
      <View className="flex-row p-4 space-x-2">
        <TouchableOpacity
          onPress={() => setSelectedType(null)}
          className={`px-4 py-2 rounded-full ${
            selectedType === null ? "bg-primary" : "bg-gray-800"
          }`}
        >
          <Text
            className={`font-semibold ${
              selectedType === null ? "text-black" : "text-gray-300"
            }`}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedType("code")}
          className={`px-4 py-2 rounded-full ${
            selectedType === "code" ? "bg-primary" : "bg-gray-800"
          }`}
        >
          <Text
            className={`font-semibold ${
              selectedType === "code" ? "text-black" : "text-gray-300"
            }`}
          >
            Code
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedType("note")}
          className={`px-4 py-2 rounded-full ${
            selectedType === "note" ? "bg-primary" : "bg-gray-800"
          }`}
        >
          <Text
            className={`font-semibold ${
              selectedType === "note" ? "text-black" : "text-gray-300"
            }`}
          >
            Notes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedType("idea")}
          className={`px-4 py-2 rounded-full ${
            selectedType === "idea" ? "bg-primary" : "bg-gray-800"
          }`}
        >
          <Text
            className={`font-semibold ${
              selectedType === "idea" ? "text-black" : "text-gray-300"
            }`}
          >
            Ideas
          </Text>
        </TouchableOpacity>
      </View>

      {/* Memories List */}
      <ScrollView className="flex-1 px-4">
        {filteredMemories.map((memory) => (
          <View key={memory.id} className="bg-gray-900 rounded-lg p-4 mb-3">
            <View className="flex-row justify-between items-start mb-2">
              <Text className="text-foreground text-lg font-bold flex-1">
                {memory.title}
              </Text>
              <View className="bg-primary/20 px-2 py-1 rounded">
                <Text className="text-primary text-xs font-semibold">
                  {memory.type}
                </Text>
              </View>
            </View>
            <Text className="text-gray-300 mb-3">{memory.content}</Text>
            <View className="flex-row flex-wrap">
              {memory.tags.map((tag) => (
                <View key={tag} className="bg-gray-800 px-2 py-1 rounded mr-2 mb-1">
                  <Text className="text-gray-400 text-xs">#{tag}</Text>
                </View>
              ))}
            </View>
            <Text className="text-gray-500 text-xs mt-2">
              {memory.createdAt.toLocaleDateString()}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Add Button */}
      <TouchableOpacity className="absolute bottom-6 right-6 bg-primary w-14 h-14 rounded-full items-center justify-center shadow-lg">
        <Text className="text-black text-3xl font-bold">+</Text>
      </TouchableOpacity>
    </View>
  );
}
