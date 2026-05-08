import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const exampleQueries = [
  "authentication patterns",
  "performance optimization",
  "ARM specific code",
];

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.inputShell}>
          <TextInput
            style={styles.input}
            placeholder="Search by meaning..."
            placeholderTextColor="#6b7280"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
          />
        </View>

        <TouchableOpacity
          onPress={handleSearch}
          style={styles.primaryButton}
          disabled={isSearching}
        >
          <Text style={styles.primaryButtonText}>
            {isSearching ? "Searching..." : "Semantic Search"}
          </Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>On-Device AI</Text>
          <Text style={styles.cardBody}>
            Powered by all-MiniLM-L6-v2 running locally on your device
          </Text>
          <View style={styles.statRow}>
            <Text style={styles.mutedText}>Model Size:</Text>
            <Text style={styles.statValue}>22M params</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.mutedText}>Embedding Dim:</Text>
            <Text style={styles.statValue}>384</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.mutedText}>Avg. Time:</Text>
            <Text style={styles.statValue}>~50ms</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Try These Queries</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {exampleQueries.map((example) => (
            <TouchableOpacity
              key={example}
              onPress={() => setQuery(example)}
              style={styles.queryChip}
            >
              <Text style={styles.queryChipText}>{example}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {query && !isSearching ? (
          <View style={styles.emptyState}>
            <Text style={styles.mutedText}>Search results will appear here</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000000",
  },
  content: {
    padding: 16,
  },
  inputShell: {
    backgroundColor: "#111827",
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
  },
  input: {
    color: "#ffffff",
    fontSize: 18,
  },
  primaryButton: {
    backgroundColor: "#00c7b7",
    borderRadius: 12,
    marginBottom: 24,
    padding: 16,
  },
  primaryButtonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 12,
    marginBottom: 24,
    padding: 16,
  },
  cardTitle: {
    color: "#00c7b7",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },
  cardBody: {
    color: "#d1d5db",
    marginBottom: 8,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  mutedText: {
    color: "#9ca3af",
  },
  statValue: {
    color: "#ffffff",
    fontWeight: "700",
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
  },
  queryChip: {
    backgroundColor: "#1f2937",
    borderRadius: 999,
    marginRight: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  queryChipText: {
    color: "#d1d5db",
  },
  emptyState: {
    alignItems: "center",
    marginTop: 24,
  },
});
