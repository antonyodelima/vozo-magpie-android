import { useCallback, useEffect, useRef, useState, type ComponentType } from "react";
import { ActivityIndicator, BackHandler, Platform, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { ScreenContainer } from "@/components/screen-container";
import { VOZO_SITE_URL } from "@/lib/site-config";

/**
 * Home Screen - NativeWind Example
 *
 * This template uses NativeWind (Tailwind CSS for React Native).
 * You can use familiar Tailwind classes directly in className props.
 *
 * Key patterns:
 * - Use `className` instead of `style` for most styling
 * - Theme colors: use tokens directly (bg-background, text-foreground, bg-primary, etc.); no dark: prefix needed
 * - Responsive: standard Tailwind breakpoints work on web
 * - Custom colors defined in tailwind.config.js
 */
const WebViewComponent = WebView as unknown as ComponentType<any>;

export default function HomeScreen() {
  const webViewRef = useRef<any>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleAndroidBack = useCallback(() => {
    if (canGoBack) {
      webViewRef.current?.goBack();
      return true;
    }
    return false;
  }, [canGoBack]);

  useEffect(() => {
    if (Platform.OS !== "android") return;
    const subscription = BackHandler.addEventListener("hardwareBackPress", handleAndroidBack);
    return () => subscription.remove();
  }, [handleAndroidBack]);

  const handleNavigation = (event: any) => {
    setCanGoBack(event.canGoBack);
  };

  return (
    <ScreenContainer edges={["top", "bottom", "left", "right"]} containerClassName="bg-[#0b0b10]" className="bg-[#0b0b10]">
      <View style={styles.root}>
        <WebViewComponent
          ref={webViewRef}
          source={{ uri: VOZO_SITE_URL }}
          style={styles.webview}
          originWhitelist={["https://*", "http://*"]}
          javaScriptEnabled
          domStorageEnabled
          mediaPlaybackRequiresUserAction={false}
          allowsInlineMediaPlayback
          allowsBackForwardNavigationGestures
          setSupportMultipleWindows={false}
          sharedCookiesEnabled
          thirdPartyCookiesEnabled
          onNavigationStateChange={handleNavigation}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onError={() => setLoading(false)}
          androidLayerType="hardware"
        />
        {loading && (
          <View pointerEvents="none" style={styles.loader}>
            <ActivityIndicator size="large" color="#d946ef" />
            <Text style={styles.loaderText}>Abrindo Vozo Magpie Studio…</Text>
          </View>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0b0b10" },
  webview: { flex: 1, backgroundColor: "#0b0b10" },
  loader: { ...StyleSheet.absoluteFillObject, alignItems: "center", justifyContent: "center", backgroundColor: "#0b0b10", gap: 14 },
  loaderText: { color: "#d7cde3", fontSize: 14 },
});
