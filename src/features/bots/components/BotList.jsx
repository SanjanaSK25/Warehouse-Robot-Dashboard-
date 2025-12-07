import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateBots } from "../botsSlice";
import BotCard from "./BotCard";

function BotList() {
  const dispatch = useDispatch();
  const bots = useSelector((state) => state.bots.list);

  useEffect(() => {
    // initial load
    dispatch(updateBots());

    // auto update every 10s
    const interval = setInterval(() => {
      dispatch(updateBots());
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="bot-grid">
      {bots.map((bot) => (
        <BotCard key={bot.id} bot={bot} />
      ))}
    </div>
  );
}

export default BotList;
