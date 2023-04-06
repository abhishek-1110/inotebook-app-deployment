import Notes from "./Notes";
import Alert from "./Alert";
import { useState } from "react";
const Home = () => {
  const [alert, setAlert] = useState();

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <>
      <Alert message={alert} />
      <Notes showAlert={showAlert}></Notes>
    </>
  );
};

export default Home;
