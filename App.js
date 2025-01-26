// App.js
import React, { useState, useEffect } from "react";
import "./styles.css";

// Συνιστώσα για την καταγραφή, αποθήκευση και επεξεργασία συναισθημάτων
function EmotionLog({
  onLogEmotion,
  emotions,
  onEditEmotion,
  onDeleteEmotion,
}) {
  const [emotion, setEmotion] = useState("");

  const handleSubmit = () => {
    onLogEmotion(emotion);
    setEmotion("");
  };

  return (
    <div>
      <h2>Καταγραφή Συναισθημάτων</h2>
      <input
        type="text"
        value={emotion}
        onChange={(e) => setEmotion(e.target.value)}
        placeholder="Πως αισθάνεσαι;"
      />
      <button onClick={handleSubmit}>Καταγραφή</button>

      <h3>Αποθηκευμένα Συναισθήματα</h3>
      <ul>
        {emotions.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => onEditEmotion(index)}>Επεξεργασία</button>
            <button onClick={() => onDeleteEmotion(index)}>Διαγραφή</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Chat({ messages, onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    onSendMessage(message);
    setMessage("");
  };

  return (
    <div>
      <h2>Chat με Θεραπευτή</h2>
      <div style={{ height: "200px", overflowY: "scroll" }}>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Γράψε το μήνυμά σου..."
      />
      <button onClick={handleSend}>Αποστολή</button>
    </div>
  );
}

function AssessmentTest() {
  const [score, setScore] = useState(0);

  const handleChange = (e) => {
    setScore(e.target.value);
  };

  return (
    <div>
      <h2>Αξιολόγηση</h2>
      <label>
        Πως αισθάνεσαι αυτές τις μέρες (1-10):
        <input
          type="number"
          value={score}
          onChange={handleChange}
          min="1"
          max="10"
        />
      </label>
      <p>Score: {score}</p>
    </div>
  );
}

export default function App() {
  const [emotionLogs, setEmotionLogs] = useState([]);
  const [messages, setMessages] = useState([
    "Γειά σας! Πως μπορώ να βοηθήσω σήμερα;",
  ]);

  useEffect(() => {
    // Φόρτωμα συναισθημάτων από το localStorage όταν φορτώνει η εφαρμογή
    const storedEmotions = JSON.parse(localStorage.getItem("emotions")) || [];
    setEmotionLogs(storedEmotions);
  }, []);

  const handleLogEmotion = (emotion) => {
    const newEmotions = [...emotionLogs, emotion];
    setEmotionLogs(newEmotions);
    localStorage.setItem("emotions", JSON.stringify(newEmotions));
  };

  const handleEditEmotion = (index) => {
    const updatedEmotion = prompt(
      "Επεξεργασία Συναισθήματος",
      emotionLogs[index]
    );
    if (updatedEmotion) {
      const newEmotions = [...emotionLogs];
      newEmotions[index] = updatedEmotion;
      setEmotionLogs(newEmotions);
      localStorage.setItem("emotions", JSON.stringify(newEmotions));
    }
  };

  const handleDeleteEmotion = (index) => {
    const newEmotions = emotionLogs.filter((_, i) => i !== index);
    setEmotionLogs(newEmotions);
    localStorage.setItem("emotions", JSON.stringify(newEmotions));
  };

  const handleSendMessage = (message) => {
    setMessages([
      ...messages,
      `Εσύ: ${message}`,
      "Θεραπευτής: Πώς αισθάνεσαι;",
    ]);
  };

  return (
    <div className="App">
      <h1>App-to-Up: Εφαρμογή Αντιμετώπισης Burnout</h1>
      <EmotionLog
        onLogEmotion={handleLogEmotion}
        emotions={emotionLogs}
        onEditEmotion={handleEditEmotion}
        onDeleteEmotion={handleDeleteEmotion}
      />
      <Chat messages={messages} onSendMessage={handleSendMessage} />
      <AssessmentTest />
    </div>
  );
}
