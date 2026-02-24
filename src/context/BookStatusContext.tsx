"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";
import { getSupabase } from "@/lib/supabase";

export type ListName = "favorites" | "reading" | "finished";

// { favorites: Set<number>, reading: Set<number>, finished: Set<number> }
type StatusMap = Record<ListName, Set<number>>;

interface BookStatusContextType {
  isInList: (bookId: number, list: ListName) => boolean;
  toggle: (bookId: number, list: ListName) => Promise<void>;
  getList: (list: ListName) => number[];
}

const BookStatusContext = createContext<BookStatusContextType | null>(null);

export function BookStatusProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [status, setStatus] = useState<StatusMap>({
    favorites: new Set(),
    reading: new Set(),
    finished: new Set(),
  });

  // Load all rows for this user from Supabase
  useEffect(() => {
    if (!user?.id) {
      setStatus({ favorites: new Set(), reading: new Set(), finished: new Set() });
      return;
    }

    const sb = getSupabase();
    if (!sb) return;

    sb.from("book_status")
      .select("book_id, list")
      .eq("user_id", user.id)
      .then(({ data }) => {
        if (!data) return;
        const map: StatusMap = { favorites: new Set(), reading: new Set(), finished: new Set() };
        for (const row of data) {
          if (row.list in map) {
            (map[row.list as ListName] as Set<number>).add(row.book_id);
          }
        }
        setStatus(map);
      });
  }, [user?.id]);

  const toggle = useCallback(async (bookId: number, list: ListName) => {
    if (!user?.id) return;
    const sb = getSupabase();
    if (!sb) return;

    const isActive = status[list].has(bookId);

    // Optimistic update
    setStatus(prev => {
      const next = new Set(prev[list]);
      if (isActive) next.delete(bookId);
      else next.add(bookId);
      return { ...prev, [list]: next };
    });

    if (isActive) {
      await sb.from("book_status")
        .delete()
        .eq("user_id", user.id)
        .eq("book_id", bookId)
        .eq("list", list);
    } else {
      await sb.from("book_status")
        .insert({ user_id: user.id, book_id: bookId, list });
    }
  }, [user?.id, status]);

  const isInList = useCallback((bookId: number, list: ListName) => {
    return status[list].has(bookId);
  }, [status]);

  const getList = useCallback((list: ListName) => {
    return Array.from(status[list]);
  }, [status]);

  return (
    <BookStatusContext.Provider value={{ isInList, toggle, getList }}>
      {children}
    </BookStatusContext.Provider>
  );
}

export function useBookStatus() {
  const ctx = useContext(BookStatusContext);
  if (!ctx) throw new Error("useBookStatus must be used within BookStatusProvider");
  return ctx;
}
