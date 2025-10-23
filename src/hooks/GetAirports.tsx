import { useState, useEffect } from "react";
import axios from "axios";

// Helper function to detect language (Arabic vs English)
const detectLang = (text: string): "ar" | "en" => {
  if (!text) return "en";
  const arabicRegex =
    /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return arabicRegex.test(text) ? "ar" : "en";
};

// ✅ Custom hook
export const useAirports = (query: string = "saudi arabia") => {
  const [airPorts, setAirPorts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    const fetchAirports = async () => {
      setLoading(true);
      setError(null);

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const airportsApiUrl = `${baseUrl}/airports/getairport?keyword=${query}&page=1`;

        const response = await axios.get(airportsApiUrl, {
          headers: {
            "Content-Type": "application/json",
            lng: detectLang(query),
          },
        });

        setAirPorts(response.data.data || []);
      } catch (err: any) {
        console.error("Error fetching airports:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAirports();
  }, [query]);

  return { airPorts, loading, error };
};
