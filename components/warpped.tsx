"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw, TrendingUp, MapPin, Crown, DollarSign, Share2, Copy, CheckCircle } from 'lucide-react';
import { Order, sampleData } from '@/constants/food';
import Image from 'next/image';

function generateSlug(name: string): string {
  const polishChars: { [key: string]: string } = {
    'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
    'Ą': 'a', 'Ć': 'c', 'Ę': 'e', 'Ł': 'l', 'Ń': 'n', 'Ó': 'o', 'Ś': 's', 'Ź': 'z', 'Ż': 'z'
  };
  
  return name
    .split('')
    .map(char => polishChars[char] || char)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function analyzePersonData(data: Order[], person: string) {
  const personOrders = data.filter(order => order.person === person);
  
  if (personOrders.length === 0) {
    return null;
  }
  
  const totalSpent = personOrders.reduce((sum, order) => sum + order.amount, 0);
  
  const orderCount = personOrders.length;
  
  const restaurantCounts: Record<string, number> = {};
  const restaurantSpending: Record<string, number> = {};
  
  personOrders.forEach(order => {
    restaurantCounts[order.restaurant] = (restaurantCounts[order.restaurant] || 0) + 1;
    restaurantSpending[order.restaurant] = (restaurantSpending[order.restaurant] || 0) + order.amount;
  });
  
  const favoriteRestaurant = Object.entries(restaurantCounts)
    .sort(([,a], [,b]) => b - a)[0];
  
  const allPeople = [...new Set(data.map(order => order.person))];
  const peopleStats = allPeople.map(p => ({
    person: p,
    orderCount: data.filter(order => order.person === p).length,
    totalSpent: data.filter(order => order.person === p).reduce((sum, order) => sum + order.amount, 0)
  }));
  
  const orderRanking = peopleStats
    .sort((a, b) => b.orderCount - a.orderCount)
    .findIndex(p => p.person === person) + 1;
    
  const spendingRanking = peopleStats
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .findIndex(p => p.person === person) + 1;
    
  const betterThanPercent = Math.round(((allPeople.length - orderRanking) / allPeople.length) * 100);
  
  return {
    totalSpent,
    orderCount,
    favoriteRestaurant: favoriteRestaurant ? favoriteRestaurant[0] : 'Brak danych',
    favoriteRestaurantCount: favoriteRestaurant ? favoriteRestaurant[1] : 0,
    favoriteRestaurantSpent: favoriteRestaurant ? restaurantSpending[favoriteRestaurant[0]] : 0,
    orderRanking,
    spendingRanking,
    betterThanPercent,
    totalPeople: allPeople.length
  };
}

const SlideWrapper: React.FC<{ children: React.ReactNode; gradient: string }> = ({ children, gradient }) => (
  <div className={`w-full h-full flex flex-col justify-center items-center text-center p-8 ${gradient} text-white relative overflow-hidden`}>
    <div className="absolute inset-0 bg-black/20"></div>
    <div className="relative z-10 max-w-md mx-auto">
      {children}
    </div>
  </div>
);

const WelcomeSlide: React.FC<{ person: string }> = ({ person }) => (
  <SlideWrapper gradient="bg-[url('/images/bg-2.png')] bg-contain bg-center bg-no-repeat circular-regular">
  <div className="mb-8 text-center">
    <div className="flex items-end justify-center space-x-2">
      <span className="text-4xl font-bold circular-bold leading-none text-black">2025</span>
      <span className="text-2xl circular-black leading-tight text-black">Food Wrapped</span>
    </div>
    <div className='mt-4'>
        <p className='text-xl text-black circular-black'>
            RQG Edition
        </p>
    </div>
  </div>
</SlideWrapper>

);

const OrderCountSlide: React.FC<{ count: number; person: string }> = ({ count, person }) => (
  <SlideWrapper gradient="bg-[url('/images/bg-3.jpg')] bg-contain bg-center bg-no-repeat circular-regular">
    <h2 className="text-3xl font-bold mb-4 mt-8 circular-bold">Twoje zamówienia</h2>
    <div className="">
      <div className="text-6xl font-bold mb-2 circular-black">{count}</div>
      <p className="text-lg">Tyle razy zamówiliśmy razem.</p>
    </div>
    <p className="text-sm opacity-90 circular-medium mt-4">
      {count > 10 ? 'Bratku mniam.' : count > 5 ? 'Nie tak źle.' : 'Że tak powiem, okazyjnie.'}
    </p>
  </SlideWrapper>
);

const FavoriteRestaurantSlide: React.FC<{ restaurant: string; count: number; spent: number }> = ({ restaurant, count, spent }) => {
  const getCountText = (count: number) => {
    if (count === 1) {
      return "1 raz zamawialiśmy z tego miejsca.";
    } else {
      return `${count} razy zamawialiśmy z tego miejsca.`;
    }
  };

  return (
    <SlideWrapper gradient="bg-[url('/images/bg-4.png')] bg-contain bg-center bg-no-repeat circular-bold">
      <h2 className="text-3xl font-bold mb-6 circular-bold">Twoje ulubione miejsce</h2>
      <div className="">
        <h3 className="text-6xl font-bold mb-2 circular-black">{restaurant}</h3>
        <p className="text-sm mb-2 mt-4 circular-medium">{getCountText(count)}</p>
        <p className="text-4xl mt-10 circular-black">{spent.toFixed(2)} zł wydane</p>
      </div>
      <p className="text-sm opacity-90 circular-medium">Raz wegab potem kolczyk w uchu.</p>
    </SlideWrapper>
  );
};

const RankingSlide: React.FC<{ ranking: number; betterThanPercent: number; totalPeople: number }> = ({ ranking, betterThanPercent, totalPeople }) => (
  <SlideWrapper gradient="bg-[url('/images/bg-5.png')] bg-contain bg-center bg-no-repeat circular-bold">
    <h2 className="text-3xl font-bold circular-black">Twoja pozycja</h2>
    <div className="">
      <div className="text-5xl font-bold">#{ranking}</div>
    </div>
    <p className="text-lg opacity-90">
      {betterThanPercent > 80 ? `Jesteś w TOP 20%! 🔥` : 
       betterThanPercent > 50 ? `${betterThanPercent}% osób zamówiło mniej niż Ty!` :
       ''}
    </p>
  </SlideWrapper>
);

const TotalSpentSlide: React.FC<{ amount: number; person: string }> = ({ amount, person }) => (
  <SlideWrapper gradient="bg-[url('/images/bg-1.png')] bg-contain bg-center bg-no-repeat circular-bold">
    <div className="mt-[-8rem]">
      <h2 className="text-3xl mb-4 text-black circular-black">Tyle wydałes na jedzenie</h2>
      <div className="">
        <div className="text-6xl mb-2 text-black circular-black">{amount.toFixed(2)} zł</div>
        <p className="text-lg text-black">wydane na radosc</p>
      </div>
      <p className="text-lg opacity-90 mt-8 text-black">
        {amount > 500 ? 'Bratku ja wydałem podobnie także się nie przejmuj' :
        amount > 200 ? 'Bratku tyle radości razem' : 
         amount > 100 ? 'Warto było czasami coś wydać' :
         amount > 10 ? 'sporadycznie ale i tak baja' :
         'Czemu nigdy nie zamawiasz?'}
      </p>
    </div>
  </SlideWrapper>
);

const RestaurantSummarySlide: React.FC<{ person: string }> = ({ person }) => {
  const personOrders = sampleData.filter(order => order.person === person);

  const restaurantStats = personOrders.reduce((acc, order) => {
    if (!acc[order.restaurant]) {
      acc[order.restaurant] = {
        name: order.restaurant,
        totalSpent: 0,
        orderCount: 0,
        category: order.category || 'Różne',
      };
    }
    acc[order.restaurant].totalSpent += order.amount;
    acc[order.restaurant].orderCount += 1;
    return acc;
  }, {} as Record<string, { name: string; totalSpent: number; orderCount: number; category: string }>);

  const sortedRestaurants = Object.values(restaurantStats)
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 2);

  const mostOrderedCategory = (() => {
    const categoryCount: Record<string, number> = {};
    personOrders.forEach(order => {
      const category = order.category || 'Różne';
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });
    return Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Różne';
  })();

  return (
    <SlideWrapper gradient="bg-[url('/images/bg-7.png')] bg-contain bg-center bg-no-repeat circular-bold">
      <div className="w-full max-w-sm flex flex-col items-center justify-between h-full">
        {/* Image in framed position */}
        <div className="relative mb-4" style={{ marginTop: '-1rem' }}>
          <div className="absolute inset-0 flex justify-center items-center">
          </div>
        </div>

        {/* Stats in bottom half - evenly distributed */}
        <div className="w-full flex-1 flex flex-col justify-center mt-[280px]">
          <div className="grid grid-cols-2 gap-6 text-sm text-black">
            <div>
              <h3 className="text-lg circular-black mb-2">Top Restauracje</h3>
              {sortedRestaurants.map((restaurant, index) => (
                <div key={index} className="mb-1 text-lg circular-black">
                  {index + 1}. {restaurant.name}
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-lg circular-black mb-2">Wydane kwoty</h3>
              {sortedRestaurants.map((restaurant, index) => (
                <div key={index} className="mb-1 circular-black text-lg">
                  {restaurant.totalSpent.toFixed(0)} zł
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm text-black mt-6">
            <div>
              <h3 className="text-lg circular-black mb-2">Liczba zamówień</h3>
              <div className="text-2xl circular-black">{personOrders.length}</div>
            </div>
            <div>
              <h3 className="text-lg circular-black mb-2">Top Gatunek</h3>
              <div className="text-lg circular-bold">{mostOrderedCategory}</div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
};



const AdminPanel: React.FC<{ onSelectPerson: (person: string) => void }> = ({ onSelectPerson }) => {
  const people = [...new Set(sampleData.map(order => order.person))];
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  
  const copyLink = async (person: string) => {
    const slug = generateSlug(person);
    const link = `${baseUrl}?person=${slug}`;
    
    try {
      await navigator.clipboard.writeText(link);
      setCopiedLink(person);
      setTimeout(() => setCopiedLink(null), 2000);
    } catch (err) {
      console.error('skibidi:', err);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto h-screen bg-[url('/images/bg-1.png')] bg-cover bg-center shadow-2xl overflow-hidden">
    <div className="h-full flex flex-col justify-center items-center text-center p-8 text-black overflow-y-auto">
      <div className="mb-8">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 xl:mt-20">
          <span className="text-3xl">
            <Image src="/images/food.png" alt='food' width={48} height={48}/>
          </span>
        </div>
          <h1 className="text-4xl font-bold mb-2 circular-regular">Food Wrapped</h1>
        </div>
        
        <div className="w-full">
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {people.map(person => {
              const slug = generateSlug(person);
              const link = `${baseUrl}?person=${slug}`;
              const isCopied = copiedLink === person;
              
              return (
                <div key={person} className="bg-white/10 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{person}</span>
                    <button
                      onClick={() => copyLink(person)}
                      className="p-1 hover:bg-white/20 rounded transition-colors"
                      title="Kopiuj link"
                    >
                      {isCopied ? 
                        <CheckCircle className="w-4 h-4 text-green-300" /> : 
                        <Copy className="w-4 h-4" />
                      }
                    </button>
                  </div>
                  <p className="text-xs opacity-75 break-all">{link}</p>
                  <button
                    onClick={() => onSelectPerson(person)}
                    className="mt-2 text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
                  >
                    Podgląd
                  </button>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 p-4 bg-white/10 rounded-xl">
            <h3 className="font-medium mb-2">Jak używać:</h3>
            <ul className="text-sm opacity-90 text-left space-y-1">
              <li>• Wyślij każdej osobie jej unikalny link</li>
              <li>• Link prowadzi bezpośrednio do ich wrapped</li>
              <li>• Możesz podglądać każdy wrapped klikając "Podgląd"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotFoundSlide: React.FC<{ slug: string }> = ({ slug }) => (
  <SlideWrapper gradient="bg-gradient-to-br from-red-500 to-pink-600">
    <div className="mb-8">
      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-3xl">😔</span>
      </div>
      <h1 className="text-4xl font-bold mb-2">Oops!</h1>
    </div>
    <div>
      <h2 className="text-2xl font-semibold mb-4">Nie znaleziono użytkownika</h2>
      <p className="text-lg opacity-90 mb-4">
        Link "{slug}" nie prowadzi do żadnego istniejącego wrapped.
      </p>
      <p className="text-sm opacity-75">
        Sprawdź, czy link jest prawidłowy lub skontaktuj się z osobą, która Ci go wysłała.
      </p>
    </div>
  </SlideWrapper>
);

const FoodWrapped: React.FC = () => {
  const [selectedPerson, setSelectedPerson] = useState<string>('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(true);
  const [personNotFound, setPersonNotFound] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentAudioRef = useRef<string>('');

  const people = [...new Set(sampleData.map(order => order.person))];
  
  // Tablica ścieżek do plików muzycznych dla każdego slajdu
  const soundTracks = [
    '/sounds/sound1.mp3', // Welcome
    '/sounds/sound2.mp3', // Order Count
    '/sounds/sound3.mp3', // Favorite Restaurant
    '/sounds/sound4.mp3', // Ranking
    '/sounds/sound5.mp3', // Total Spent
    '/sounds/sound1.mp3'  // Restaurant Summary
  ];

  // Funkcja do przełączania muzyki
  const switchMusic = (slideIndex: number) => {
    if (isMuted) return;
    
    // Zatrzymaj obecną muzykę
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    // Ustaw nową ścieżkę
    const newTrack = soundTracks[slideIndex] || soundTracks[0];
    
    // Jeśli to ta sama ścieżka, nie rób nic
    if (currentAudioRef.current === newTrack) {
      if (audioRef.current && isPlaying) {
        audioRef.current.play().catch(console.error);
      }
      return;
    }
    
    // Stwórz nowy element audio
    audioRef.current = new Audio(newTrack);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    currentAudioRef.current = newTrack;
    
    // Jeśli prezentacja jest włączona, odtwórz muzykę
    if (isPlaying) {
      audioRef.current.play().catch(console.error);
    }
  };

  // Funkcja do wyciszania/odciszania
  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    if (audioRef.current) {
      if (newMutedState) {
        audioRef.current.pause();
      } else if (isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  };
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const personSlug = urlParams.get('person');
    
    if (personSlug) {
      const foundPerson = people.find(person => generateSlug(person) === personSlug);
      
      if (foundPerson) {
        setSelectedPerson(foundPerson);
        setShowAdminPanel(false);
        setPersonNotFound(false);
      } else {
        setPersonNotFound(true);
        setShowAdminPanel(false);
      }
    }
  }, []);
  
  // Effect dla automatycznego przełączania slajdów
  useEffect(() => {
    if (isPlaying && !showAdminPanel && !personNotFound) {
      const timer = setInterval(() => {
        setCurrentSlide(prev => {
          if (prev >= 5) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 7000);
      
      return () => clearInterval(timer);
    }
  }, [isPlaying, showAdminPanel, currentSlide, personNotFound]);

  // Effect dla przełączania muzyki przy zmianie slajdu
  useEffect(() => {
    if (!showAdminPanel && !personNotFound) {
      switchMusic(currentSlide);
    }
  }, [currentSlide, showAdminPanel, personNotFound]);

  // Effect dla obsługi play/pause
  useEffect(() => {
    if (!isMuted && audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isMuted]);

  // Cleanup przy odmontowywaniu komponentu
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handlePersonSelect = (person: string) => {
    setSelectedPerson(person);
    setShowAdminPanel(false);
    setPersonNotFound(false);
    setCurrentSlide(0);
  };

  const handleRestart = () => {
    setCurrentSlide(0);
    setIsPlaying(false);
  };

  const handleBack = () => {
    // Zatrzymaj muzykę przy powrocie do panelu admin
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      currentAudioRef.current = '';
    }
    
    setShowAdminPanel(true);
    setSelectedPerson('');
    setPersonNotFound(false);
    setCurrentSlide(0);
    setIsPlaying(false);
    
    const url = new URL(window.location.href);
    url.searchParams.delete('person');
    window.history.replaceState({}, '', url.pathname);
  };

  const handleSlideChange = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentSlide(prev => Math.min(5, prev + 1));
    } else {
      setCurrentSlide(prev => Math.max(0, prev - 1));
    }
  };

  if (personNotFound) {
    const urlParams = new URLSearchParams(window.location.search);
    const personSlug = urlParams.get('person') || 'unknown';
    
    return (
      <div className="w-full max-w-md mx-auto h-[600px] bg-black rounded-2xl shadow-2xl overflow-hidden relative">
        <NotFoundSlide slug={personSlug} />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex justify-center">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Powrót do głównej</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showAdminPanel) {
    return <AdminPanel onSelectPerson={handlePersonSelect} />;
  }

  const stats = analyzePersonData(sampleData, selectedPerson);
  
  if (!stats) {
    return (
      <div className="w-full max-w-md mx-auto h-[600px] bg-black rounded-2xl shadow-2xl overflow-hidden relative">
        <SlideWrapper gradient="bg-gradient-to-br from-red-500 to-pink-600">
          <h2 className="text-2xl font-semibold mb-4">Błąd</h2>
          <p className="text-lg opacity-90">Brak danych dla tej osoby</p>
        </SlideWrapper>
      </div>
    );
  }
  
const slides = [
  <WelcomeSlide key="welcome" person={selectedPerson} />,
  <OrderCountSlide key="count" count={stats.orderCount} person={selectedPerson} />,
  <FavoriteRestaurantSlide 
    key="restaurant" 
    restaurant={stats.favoriteRestaurant} 
    count={stats.favoriteRestaurantCount}
    spent={stats.favoriteRestaurantSpent}
  />,
  <RankingSlide 
    key="ranking" 
    ranking={stats.orderRanking} 
    betterThanPercent={stats.betterThanPercent}
    totalPeople={stats.totalPeople}
  />,
  <TotalSpentSlide key="spent" amount={stats.totalSpent} person={selectedPerson} />,
  <RestaurantSummarySlide key="summary" person={selectedPerson} />
];


  return (
    <div className="w-full max-w-md mx-auto h-screen bg-black shadow-2xl overflow-hidden relative">
      {/* Slajd */}
      <div className="h-full">
        {slides[currentSlide]}
      </div>
      
      {/* Kontrolki */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        {/* Progress bar */}
        <div className="flex space-x-1 mb-4">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-[2px] rounded-full ${
                index <= currentSlide ? 'bg-white' : 'bg-white/30'
              } ${index === currentSlide && isPlaying ? 'animate-pulse' : ''}`}
            />
          ))}
        </div>
        
        {/* Przyciski kontroli */}
        <div className="flex justify-between items-center">
          
           <button
              onClick={toggleMute}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              title={isMuted ? "Włącz dźwięk" : "Wycisz"}
            >
              {isMuted ? 
                <Image src="/images/mute.svg" alt='mute' width={24} height={24} className='invert'/> : 
                <Image src="/images/sound.svg" alt='sound' width={24} height={24} className='invert'/>
              }
            </button>
          
          <div className="flex space-x-2">
            <button
              onClick={handleRestart}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              title="Od początku"
            >
              <Image src="/images/repeat.svg" alt='repeat' width={24} height={24} className='invert'/>
            </button>
            
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              title={isPlaying ? "Zatrzymaj" : "Odtwórz"}
            >
              {isPlaying ? 
                <Image src="/images/stop.svg" alt='stop' width={24} height={24} className='invert'/> : 
                <Image src="/images/play.svg" alt='play' width={24} height={24} className='invert'/>
              }
            </button>
            
            <button
              onClick={() => handleSlideChange('next')}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              disabled={currentSlide >= slides.length - 1}
              title="Następny slajd"
            >
              <Image src="/images/next.svg" alt='next' width={24} height={24} className='invert'/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodWrapped;