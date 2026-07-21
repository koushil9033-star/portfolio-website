import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, User as UserIcon, Bot, Loader2, LogOut } from 'lucide-react';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, orderBy, where, onSnapshot, addDoc, serverTimestamp, doc, setDoc, getDocs, getDoc } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Create user doc if not exists
        try {
          const userRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userRef);
          
          if (!userDoc.exists()) {
            await setDoc(userRef, {
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName || null,
              photoURL: currentUser.photoURL || null,
              createdAt: Date.now(),
              updatedAt: Date.now(),
            });
          } else {
            await setDoc(userRef, {
              displayName: currentUser.displayName || null,
              photoURL: currentUser.photoURL || null,
              updatedAt: Date.now(),
            }, { merge: true });
          }
        } catch (e) {
          handleFirestoreError(e, OperationType.WRITE, 'users');
        }

        // Find or create a chat session
        try {
          const sessionsRef = collection(db, 'chatSessions');
          const q = query(sessionsRef, where('userId', '==', currentUser.uid), orderBy('startedAt', 'desc'));
          const snapshot = await getDocs(q);
          
          let sid = null;
          snapshot.forEach((doc) => {
            if (doc.data().userId === currentUser.uid && !sid) {
              sid = doc.id;
            }
          });

          if (!sid) {
            const newSessionRef = await addDoc(collection(db, 'chatSessions'), {
              userId: currentUser.uid,
              startedAt: Date.now(),
              updatedAt: Date.now(),
              title: 'Chat with Burra\'s AI',
            });
            sid = newSessionRef.id;
          }
          setSessionId(sid);
        } catch (e) {
          handleFirestoreError(e, OperationType.GET, 'chatSessions');
        }
      } else {
        setSessionId(null);
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!sessionId) return;
    
    try {
      const messagesRef = collection(db, 'chatSessions', sessionId, 'messages');
      const q = query(messagesRef, orderBy('createdAt', 'asc'));
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMessages(msgs);
      }, (error) => {
        handleFirestoreError(error, OperationType.GET, `chatSessions/${sessionId}/messages`);
      });

      return () => unsubscribe();
    } catch (e) {
      console.error(e);
    }
  }, [sessionId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user || !sessionId || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    try {
      // Save user message to Firestore
      await addDoc(collection(db, 'chatSessions', sessionId, 'messages'), {
        sessionId,
        role: 'user',
        content: userMessage,
        createdAt: Date.now(),
      });

      // Prepare history for API
      const apiMessages = [...messages.map(m => ({ role: m.role, content: m.content })), { role: 'user', content: userMessage }];

      // Call API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) throw new Error('API Error');
      const data = await response.json();

      // Save AI response to Firestore
      await addDoc(collection(db, 'chatSessions', sessionId, 'messages'), {
        sessionId,
        role: 'assistant',
        content: data.content,
        createdAt: Date.now(),
      });

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center shadow-lg hover:bg-accent-hover hover:scale-105 transition-all"
            aria-label="Open Chat"
          >
            <MessageSquare size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-6rem)] bg-card border border-border shadow-2xl rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-background">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-foreground">AI Assistant</h3>
                  <p className="text-xs text-muted">Ask about my skills & projects</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {user && (
                  <button onClick={handleLogout} className="p-2 text-muted hover:text-foreground transition-colors" title="Logout">
                    <LogOut size={18} />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-muted hover:text-foreground transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-card/50">
              {!user ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-background border border-border flex items-center justify-center text-muted mb-2">
                    <MessageSquare size={24} />
                  </div>
                  <h4 className="font-bold text-foreground">Sign in to chat</h4>
                  <p className="text-sm text-muted max-w-[200px]">Sign in with Google to talk to my AI assistant and save your conversation.</p>
                  <button
                    onClick={handleLogin}
                    className="mt-4 px-6 py-2 bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 transition-colors"
                  >
                    Sign in with Google
                  </button>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-muted">
                  <Bot size={32} className="mb-4 opacity-50" />
                  <p className="text-sm">Hi {user.displayName?.split(' ')[0]}!<br/>I'm an AI assistant. How can I help you learn more about Burra?</p>
                </div>
              ) : (
                <>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 max-w-[85%] ${
                        msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                        msg.role === 'user' ? 'bg-background border border-border text-foreground' : 'bg-accent text-white'
                      }`}>
                        {msg.role === 'user' ? (
                          user.photoURL ? <img src={user.photoURL} alt="User" className="w-full h-full rounded-full" /> : <UserIcon size={16} />
                        ) : (
                          <Bot size={16} />
                        )}
                      </div>
                      <div
                        className={`p-3 rounded-2xl text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-foreground text-background rounded-tr-sm'
                            : 'bg-background border border-border text-foreground rounded-tl-sm'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 max-w-[85%] self-start">
                      <div className="w-8 h-8 rounded-full flex-shrink-0 bg-accent text-white flex items-center justify-center">
                        <Bot size={16} />
                      </div>
                      <div className="p-3 bg-background border border-border text-muted rounded-2xl rounded-tl-sm flex items-center justify-center">
                        <Loader2 size={16} className="animate-spin" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input Area */}
            {user && (
              <form onSubmit={handleSend} className="p-4 bg-background border-t border-border flex gap-2 items-end">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my projects..."
                  className="flex-1 bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-foreground resize-none max-h-32 min-h-[46px]"
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(e);
                    }
                  }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-3 bg-foreground text-background rounded-xl hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Send size={18} />
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
