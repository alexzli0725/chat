import axios from "axios";
import { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const BACKEND_URL = "http://localhost:3001/api/chat";

const index = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const res = await axios.post(BACKEND_URL, {
        messages: [
          {
            role: "system",
            content:
              "You are a fashion assistant. Provide outfit suggestions with emojis.",
          },
          {
            role: "user",
            content: query,
          },
        ],
      });

      const content = res.data.choices?.[0]?.message?.content;
      setResponse(content || "No response from AI.");
    } catch (err) {
      console.error("Error:", err.message);
      setResponse("Something went wrong. 😔");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: "#f8f9fa" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 12 }}>
        👗 Fashion AI Assistant
      </Text>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Ask for an outfit suggestion..."
        style={{
          backgroundColor: "#fff",
          borderRadius: 8,
          padding: 12,
          marginBottom: 12,
          fontSize: 16,
        }}
      />

      <TouchableOpacity
        onPress={sendMessage}
        style={{
          backgroundColor: "#007bff",
          padding: 12,
          borderRadius: 8,
          marginBottom: 12,
        }}
        disabled={isLoading}
      >
        <Text style={{ color: "#fff", fontSize: 16, textAlign: "center" }}>
          {isLoading ? "Thinking..." : "Send"}
        </Text>
      </TouchableOpacity>

      {isLoading && <ActivityIndicator size="large" color="#007bff" />}

      <ScrollView style={{ flex: 1, marginTop: 12 }}>
        <Text style={{ fontSize: 16 }}>{response}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
