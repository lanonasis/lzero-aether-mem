import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

const filters = [
  { label: "All", value: null },
  { label: "Code", value: "code" },
  { label: "Notes", value: "note" },
  { label: "Ideas", value: "idea" },
] as const;

export default function MemoriesScreen() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const filteredMemories = selectedType
    ? mockMemories.filter((memory) => memory.type === selectedType)
    : mockMemories;

  return (
    <View style={styles.screen}>
      <View style={styles.filterRow}>
        {filters.map((filter) => {
          const selected = selectedType === filter.value;
          return (
            <TouchableOpacity
              key={filter.label}
              onPress={() => setSelectedType(filter.value)}
              style={[styles.filterButton, selected && styles.filterButtonSelected]}
            >
              <Text style={[styles.filterText, selected && styles.filterTextSelected]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {filteredMemories.map((memory) => (
          <View key={memory.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.title}>{memory.title}</Text>
              <View style={styles.typeBadge}>
                <Text style={styles.typeText}>{memory.type}</Text>
              </View>
            </View>
            <Text style={styles.body}>{memory.content}</Text>
            <View style={styles.tags}>
              {memory.tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.date}>{memory.createdAt.toLocaleDateString()}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000000",
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    padding: 16,
  },
  filterButton: {
    backgroundColor: "#1f2937",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterButtonSelected: {
    backgroundColor: "#00c7b7",
  },
  filterText: {
    color: "#d1d5db",
    fontWeight: "700",
  },
  filterTextSelected: {
    color: "#000000",
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 96,
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
  },
  cardHeader: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: {
    color: "#ffffff",
    flex: 1,
    fontSize: 18,
    fontWeight: "800",
  },
  typeBadge: {
    backgroundColor: "rgba(0, 199, 183, 0.18)",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  typeText: {
    color: "#00c7b7",
    fontSize: 12,
    fontWeight: "700",
  },
  body: {
    color: "#d1d5db",
    marginBottom: 12,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "#1f2937",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagText: {
    color: "#9ca3af",
    fontSize: 12,
  },
  date: {
    color: "#6b7280",
    fontSize: 12,
    marginTop: 10,
  },
  addButton: {
    alignItems: "center",
    backgroundColor: "#00c7b7",
    borderRadius: 28,
    bottom: 24,
    height: 56,
    justifyContent: "center",
    position: "absolute",
    right: 24,
    width: 56,
  },
  addButtonText: {
    color: "#000000",
    fontSize: 30,
    fontWeight: "800",
  },
});
