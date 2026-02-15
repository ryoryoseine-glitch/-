'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { mockReviews, mockUser, Review, User } from '@/app/_data/mock';

type NewReviewInput = Omit<Review, 'id' | 'dateISO' | 'likes' | 'commentsCount' | 'author'>;

type StoreContextType = {
  reviews: Review[];
  user: User;
  addReview: (review: NewReviewInput) => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function MockStoreProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [user, setUser] = useState<User>(mockUser);

  const addReview = (reviewInput: NewReviewInput) => {
    const review: Review = {
      ...reviewInput,
      id: `r${Date.now()}`,
      dateISO: new Date().toISOString().slice(0, 10),
      likes: 0,
      commentsCount: 0,
      author: {
        name: user.farmName,
        isInfluencer: false
      }
    };

    setReviews((prev) => [review, ...prev]);
    setUser((prev) => ({
      ...prev,
      postsCount: prev.postsCount + 1,
      level: prev.postsCount === 0 ? prev.level + 1 : prev.level
    }));
  };

  const value = useMemo(
    () => ({
      reviews,
      user,
      addReview
    }),
    [reviews, user]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useMockStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useMockStore must be used within MockStoreProvider');
  }
  return context;
}
