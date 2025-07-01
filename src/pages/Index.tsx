
import { useState } from "react";
import LoginScreen from "@/components/LoginScreen";
import MainApp from "@/components/MainApp";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return <MainApp />;
};

export default Index;
