import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Wish } from '@shared/types';
import { api } from '@/lib/api-client';
type WishesState = {
  wishes: Wish[];
  isLoading: boolean;
  error: string | null;
};
type WishesActions = {
  fetchWishes: () => Promise<void>;
  addWish: (newWish: { name?: string; text: string }) => Promise<void>;
};
export const useWishesStore = create<WishesState & WishesActions>()(
  immer((set) => ({
    wishes: [],
    isLoading: true,
    error: null,
    fetchWishes: async () => {
      try {
        set({ isLoading: true, error: null });
        const wishes = await api<Wish[]>('/api/wishes');
        set({ wishes, isLoading: false });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch wishes';
        set({ isLoading: false, error: errorMessage });
        console.error(errorMessage);
      }
    },
    addWish: async (newWish) => {
      try {
        const createdWish = await api<Wish>('/api/wishes', {
          method: 'POST',
          body: JSON.stringify(newWish),
        });
        set((state) => {
          state.wishes.unshift(createdWish);
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to add wish';
        set({ error: errorMessage });
        console.error(errorMessage);
        // Re-throw to be caught in the component for toast notifications
        throw new Error(errorMessage);
      }
    },
  }))
);