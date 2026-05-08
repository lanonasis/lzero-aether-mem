import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const features = [
  {
    title: "On-Device AI",
    body: "Generate embeddings locally in about 50ms. No cloud calls required.",
  },
  {
    title: "Offline First",
    body: "Works offline with an automatic sync path when connectivity returns.",
  },
  {
    title: "Semantic Search",
    body: "Search by meaning instead of relying only on exact keywords.",
  },
  {
    title: "Privacy First",
    body: "Embeddings stay on device so personal context remains private.",
  },
];

const performanceTargets = [
  ["iPhone 15 Pro", "45ms"],
  ["Pixel 8", "52ms"],
  ["MacBook M3", "28ms"],
  ["Raspberry Pi 5", "180ms"],
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.title}>Aether Memory</Text>
        <Text style={styles.subtitle}>ARM-optimized AI memory companion</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Features</Text>
        {features.map((feature) => (
          <View key={feature.title} style={styles.card}>
            <Text style={styles.cardTitle}>{feature.title}</Text>
            <Text style={styles.cardBody}>{feature.body}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ARM Performance</Text>
        <View style={styles.card}>
          {performanceTargets.map(([device, value]) => (
            <View key={device} style={styles.statRow}>
              <Text style={styles.mutedText}>{device}</Text>
              <Text style={styles.statValue}>{value}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.actions}>
        <Link href="/memories" asChild>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>View Memories</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/search" asChild>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Semantic Search</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <Text style={styles.footer}>Built for ARM AI Developer Challenge</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000000",
  },
  content: {
    padding: 24,
  },
  hero: {
    marginBottom: 32,
  },
  title: {
    color: "#ffffff",
    fontSize: 36,
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitle: {
    color: "#9ca3af",
    fontSize: 18,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
  },
  cardTitle: {
    color: "#00c7b7",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  cardBody: {
    color: "#d1d5db",
    fontSize: 15,
    lineHeight: 21,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  mutedText: {
    color: "#9ca3af",
  },
  statValue: {
    color: "#00c7b7",
    fontWeight: "700",
  },
  actions: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#00c7b7",
    borderRadius: 12,
    padding: 16,
  },
  primaryButtonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },
  secondaryButton: {
    backgroundColor: "#334155",
    borderRadius: 12,
    padding: 16,
  },
  secondaryButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },
  footer: {
    color: "#6b7280",
    marginTop: 32,
    textAlign: "center",
  },
});
