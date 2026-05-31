import { useState, useEffect } from "react";
import axios from "axios";
import { API_DOMAIN } from "../utils/Constants";
import { useAuth } from "../contexts/AuthProvider";
import { useCart } from "../contexts/CartProvider";

export default function useFetchPoints(matric) {
  const { userCredits, setCredits } = useCart();
  const [loading, setLoading] = useState(false);
  const { token, logoutAction } = useAuth();

  useEffect(() => {
    if (!matric) return;

    const fetchPoints = async () => {
      setLoading(true);
      try {

        const config = { 
        headers: { 
            "Content-Type": "text/plain;charset=utf-8", 
            }, 
            redirect: "follow", 
            mode: "cors", 
            method: "POST", 
        };
  
        const response = await axios.post(API_DOMAIN, {
          matric,
          type: "shopData",
          token: token,
        }, config);
        if (response.data.status === "DATA RETRIEVAL SUCCESSFUL") {
          setCredits(response.data.info.currentInnocredit);
        }
        if (response.data.error === 'Invalid token') {
          return logoutAction(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, [matric]);

  return { userCredits, loading };
}
