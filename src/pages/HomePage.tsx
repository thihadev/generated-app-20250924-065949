import React, { useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { ArrowDown, Send } from 'lucide-react';
import { useWishesStore } from '@/hooks/useWishesStore';
import { WishLantern } from '@/components/WishLantern';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Toaster, toast } from '@/components/ui/sonner';
const wishSchema = z.object({
  name: z.string().optional(),
  text: z.string().min(5, 'Your wish must be at least 5 characters long.').max(280, 'Your wish cannot be more than 280 characters.'),
});
type WishFormData = z.infer<typeof wishSchema>;
const StarryBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    {[...Array(100)].map((_, i) => {
      const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 2 + 1}px`,
        height: `${Math.random() * 2 + 1}px`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 5 + 3}s`,
      };
      return <div key={i} className="absolute bg-creamy-white rounded-full animate-star-twinkle" style={style} />;
    })}
  </div>
);
export function HomePage() {
  const wishes = useWishesStore(state => state.wishes);
  const fetchWishes = useWishesStore(state => state.fetchWishes);
  const addWish = useWishesStore(state => state.addWish);
  const isLoading = useWishesStore(state => state.isLoading);
  const wishesWithPositions = useMemo(
    () =>
      wishes.map(wish => ({
        ...wish,
        initialX: Math.random() * 90 + 5, // 5% to 95% horizontal
        finalY: Math.random() * 80 + 10, // 10% to 90% vertical from top
      })),
    [wishes]
  );
  const formRef = useRef<HTMLDivElement>(null);
  const form = useForm<WishFormData>({
    resolver: zodResolver(wishSchema),
    defaultValues: { name: '', text: '' },
  });
  useEffect(() => {
    fetchWishes();
  }, [fetchWishes]);
  const onSubmit = async (data: WishFormData) => {
    try {
      await addWish(data);
      toast.success('Your wish has been sent to the stars!', {
        description: 'Look for your lantern floating in the gallery.',
      });
      form.reset();
    } catch (error) {
      toast.error('Oh no, a cosmic cloud!', {
        description: 'We couldn’t send your wish. Please try again.',
      });
    }
  };
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-celestial-blue text-creamy-white font-sans overflow-x-hidden">
      <StarryBackground />
      <Toaster theme="dark" richColors position="top-center" />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-24 md:space-y-32 pb-24">
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="font-display text-5xl md:text-7xl text-warm-gold drop-shadow-lg">Thadingyut Celestial Wish</h1>
              <p className="max-w-3xl mx-auto text-lg md:text-xl text-creamy-white/80 leading-relaxed">
                Celebrate the Myanmar Festival of Lights by sending your own wish to the celestial sky. Join a galaxy of hopes and dreams from around the world, illuminating the night with collective joy.
              </p>
              <Button
                onClick={scrollToForm}
                size="lg"
                className="bg-warm-gold text-celestial-blue font-bold text-lg px-8 py-6 rounded-full hover:bg-creamy-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-glow-amber"
              >
                Make a Celestial Wish
                <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
              </Button>
            </motion.div>
          </section>
          {/* Make a Wish Section */}
          <section ref={formRef} id="wish-form" className="scroll-mt-24">
            <Card className="max-w-2xl mx-auto p-4 sm:p-8 bg-celestial-blue/50 backdrop-blur-sm border-warm-gold/30 rounded-2xl shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="font-display text-4xl md:text-5xl text-warm-gold">What is Your Wish?</CardTitle>
                <CardDescription className="text-creamy-white/70 text-base">
                  Pen your hope, dream, or blessing. It will become a lantern and join the festival of lights.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-creamy-white">Your Name (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Anonymous Dreamer"
                              {...field}
                              className="bg-slate-900/50 border-warm-gold/50 text-creamy-white focus:ring-warm-gold focus:border-warm-gold"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="text"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-creamy-white">Your Wish</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="I wish for..."
                              {...field}
                              rows={5}
                              className="bg-slate-900/50 border-warm-gold/50 text-creamy-white focus:ring-warm-gold focus:border-warm-gold"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      className="w-full bg-warm-gold text-celestial-blue font-bold text-lg py-6 hover:bg-creamy-white transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                      {form.formState.isSubmitting ? 'Sending to the Sky...' : 'Release Lantern'}
                      <Send className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </section>
          {/* Wish Gallery Section */}
          <section className="relative min-h-screen" id="wish-gallery">
            <h2 className="text-center font-display text-5xl md:text-6xl text-warm-gold mb-12">
              A Sky Full of Wishes
            </h2>
            {isLoading && <p className="text-center">Loading wishes from the cosmos...</p>}
            <div className="absolute inset-0">
              {wishesWithPositions.map((wish, index) => (
                <WishLantern key={wish.id} wish={wish} delay={index * 0.2} initialX={wish.initialX} finalY={wish.finalY} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <footer className="text-center py-8 text-creamy-white/50">
        Built with ❤️ at Cloudflare
      </footer>
    </div>
  );
}