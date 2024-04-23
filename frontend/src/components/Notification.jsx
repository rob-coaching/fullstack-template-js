import { useEffect, useState } from "react";
import { useStore } from "../data/useStore";

export const Notification = () => {
  const { error, setError } = useStore();
  const [show, setShow] = useState(false);

  // whenever a new error is set
  // => show absolute positioned notification div for short time, then hide
  useEffect(() => {
    setShow(true);
    // hide error after some secs
    setTimeout(() => {
      setError(""); // clear error again
      setShow(false);
    }, 4000);
  }, [error]);

  if (!error) {
    return <div className="error noti"></div>;
  }

  //  show notification whenever error changes
  return <div className="error noti active">⚠️ {error}</div>;
};
