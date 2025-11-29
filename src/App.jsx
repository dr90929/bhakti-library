import React, { useState, useEffect, useRef } from 'react';
import { Search, BookOpen, ChevronLeft, ChevronRight, Heart, Menu, X, Info, Moon, Sun, Settings, ArrowLeft, Library, Eye, EyeOff, Grid3X3, Minus, Plus, Share2 } from 'lucide-react';

// --- IMPORTS ---
import { verses } from './verses'; 

// --- DATA SOURCE ---
const libraryData = [
  {
    id: 'rsn',
    title: "Shri Radha Sudha Nidhi",
    author: "Shri Hit Harivansh Mahaprabhu",
    description: "The nectar of devotion to Srimati Radharani (270 Verses).",
    verses: verses 
  },
  {
    id: 'svm',
    title: "Sri Vrindavan Mahimamrita",
    author: "Srila Prabodhananda Sarasvati",
    description: "The nectarean glories of Sri Vrindavan Dhama.",
    verses: [
      {
        id: 1,
        sanskrit: "राधा-मुरलीधर-केलि-कुञ्जे\nकुञ्जे महारास-रसोत्सवाढ्ये ।\nयमुना-तटे प्रेम-रसैकमग्ने\nवृन्दावने कोऽपि वसन् धन्यः ॥१॥",
        transliteration: "rādhā-muralīdhara-keli-kuñje...",
        hindi: "जो राधा-मुरलीधर की केलि-कुंजों में...",
        hinglish: "Jo Radha-Muralidhar ki keli-kunjon mein...",
        translation: "Glorious is the person who resides in Vrindavan..."
      }
    ]
  }
];

// --- COMPONENTS ---

const Header = ({ title, isDarkMode, toggleTheme, onBack, showBack, onIndexClick, showIndexButton }) => (
  <header className={`sticky top-0 z-50 shadow-lg transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-amber-100' : 'bg-amber-700 text-amber-50'}`}>
    <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-3 overflow-hidden flex-1">
        {showBack ? (
          <button onClick={onBack} className="mr-2 hover:bg-black/10 p-1 rounded-full transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </button>
        ) : (
          <Library className={`h-6 w-6 ${isDarkMode ? 'text-amber-400' : 'text-yellow-300'}`} />
        )}
        <h1 className="text-xl md:text-xl font-serif font-bold tracking-wide truncate">
          {title}
        </h1>
      </div>
      <div className="flex items-center space-x-2">
        {showIndexButton && (
          <button
            onClick={onIndexClick}
            className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-amber-300' : 'hover:bg-amber-600 text-yellow-200'}`}
            title="Index"
          >
            <Grid3X3 className="h-5 w-5" />
          </button>
        )}
        <button 
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-amber-300' : 'hover:bg-amber-600 text-yellow-200'}`}
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
    </div>
  </header>
);

const ViewSettings = ({ settings, toggleSetting, fontSize, setFontSize, isDarkMode }) => (
  <div className={`mb-6 rounded-xl p-4 border transition-colors duration-300 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-amber-200 shadow-sm'}`}>
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-2">
        <Settings className={`h-4 w-4 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />
        <span className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-amber-800'}`}>Options</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <button 
          onClick={() => setFontSize(s => Math.max(14, s - 2))}
          className={`p-1.5 rounded-lg border ${isDarkMode ? 'border-slate-600 hover:bg-slate-700 text-slate-300' : 'border-amber-200 hover:bg-amber-50 text-amber-800'}`}
          title="Decrease Font Size"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className={`text-sm font-mono font-medium ${isDarkMode ? 'text-slate-400' : 'text-amber-900'}`}>A</span>
        <button 
          onClick={() => setFontSize(s => Math.min(32, s + 2))}
          className={`p-1.5 rounded-lg border ${isDarkMode ? 'border-slate-600 hover:bg-slate-700 text-slate-300' : 'border-amber-200 hover:bg-amber-50 text-amber-800'}`}
          title="Increase Font Size"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>

    <div className="flex gap-2 flex-wrap">
      {Object.keys(settings).map(key => (
        <button 
          key={key} 
          onClick={() => toggleSetting(key)} 
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border
          ${settings[key] 
            ? (isDarkMode ? 'bg-amber-900/40 border-amber-500/50 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-900') 
            : (isDarkMode ? 'bg-slate-700 border-slate-600 text-slate-400' : 'bg-gray-50 border-gray-200 text-gray-400')}`}
        >
          <span className="capitalize">{key}</span>
          {settings[key] ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
        </button>
      ))}
    </div>
  </div>
);

const VerseCard = ({ verse, currentBookId, settings, fontSize, isDarkMode }) => {
  
  const handleShare = async () => {
    // 1. URL create karte hain (HASH format mein)
    const baseUrl = window.location.origin + window.location.pathname;
    // Ensure no double slashes if pathname ends with /
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const hashLink = `/${currentBookId}/${verse.id}`;
    const fullUrl = `${cleanBaseUrl}/#${hashLink}`;
    
    // 2. Message Text Build karte hain
    // Hindi text ko trim kar rahe hain taaki message bahut lamba na ho
    const shortHindi = verse.hindi ? verse.hindi.substring(0, 150) + (verse.hindi.length > 150 ? '...' : '') : '';

    const shareText = `*Shri Radha Sudha Nidhi - Verse ${verse.id}*\n\n` +
      `${verse.sanskrit}\n\n` +
      `*Hindi:*\n${shortHindi}\n\n` +
      `Read full verse here:\n${fullUrl}`;

    // 3. Share Logic
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Verse ${verse.id} | Bhakti Library`,
          text: shareText,
          // FIX: 'url' parameter hata diya hai taaki link double na ho.
          // Link ab 'text' ke andar hi hai.
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for desktop
      try {
        await navigator.clipboard.writeText(shareText);
        alert('Verse link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className={`w-full rounded-2xl shadow-xl overflow-hidden transition-all duration-300 border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-amber-100'}`}>
      <div className={`px-6 py-4 border-b flex justify-between items-center ${isDarkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-amber-50 border-amber-100'}`}>
        <span className={`font-serif font-bold text-xl ${isDarkMode ? 'text-amber-400' : 'text-amber-800'}`}>Verse {verse.id}</span>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleShare}
            className={`transition-colors ${isDarkMode ? 'text-slate-400 hover:text-amber-300' : 'text-amber-400 hover:text-amber-600'}`}
            title="Share Verse Link"
          >
            <Share2 className="h-5 w-5" />
          </button>
          <Heart className={`h-6 w-6 cursor-pointer transition-colors ${isDarkMode ? 'text-slate-600 hover:text-rose-500' : 'text-amber-300 hover:text-rose-500'}`} />
        </div>
      </div>
      
      <div className="p-6 md:p-10 space-y-8">
        
        {/* Sanskrit Verse */}
        <div className="text-center">
          <p 
            style={{ fontSize: `${fontSize + 4}px`, lineHeight: '1.6' }} 
            className={`font-serif whitespace-pre-line font-medium ${isDarkMode ? 'text-slate-100' : 'text-gray-800'}`}
          >
            {verse.sanskrit}
          </p>
        </div>
        
        {settings.transliteration && verse.transliteration && (
          <div className={`p-5 rounded-xl text-center ${isDarkMode ? 'bg-slate-900/50 text-emerald-200' : 'bg-gray-50 text-slate-600'}`}>
            <p 
              style={{ fontSize: `${fontSize - 2}px` }}
              className="font-mono italic whitespace-pre-line"
            >
              {verse.transliteration}
            </p>
          </div>
        )}

        <div className="space-y-6 pt-2">
           {settings.hindi && verse.hindi && (
             <div className={`border-l-4 pl-5 ${isDarkMode ? 'border-orange-500' : 'border-orange-300'}`}>
               <h4 className={`text-xs uppercase font-bold mb-2 tracking-widest ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>Hindi</h4>
               <p 
                 style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
                 className={`whitespace-pre-wrap ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}
               >
                 {verse.hindi}
               </p>
             </div>
           )}
           {settings.hinglish && verse.hinglish && (
             <div className={`border-l-4 pl-5 ${isDarkMode ? 'border-purple-500' : 'border-purple-300'}`}>
               <h4 className={`text-xs uppercase font-bold mb-2 tracking-widest ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>Hinglish</h4>
               <p 
                 style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
                 className={`italic whitespace-pre-wrap ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}
               >
                 {verse.hinglish}
               </p>
             </div>
           )}
           {settings.english && verse.translation && (
             <div className={`border-l-4 pl-5 ${isDarkMode ? 'border-blue-500' : 'border-blue-300'}`}>
               <h4 className={`text-xs uppercase font-bold mb-2 tracking-widest ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>English</h4>
               <p 
                 style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
                 className={`whitespace-pre-wrap ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}
               >
                 {verse.translation}
               </p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

const IndexModal = ({ isOpen, onClose, verses, onSelect, isDarkMode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className={`w-full max-w-lg max-h-[80vh] flex flex-col rounded-2xl shadow-2xl ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-white text-gray-800'}`}>
        <div className={`p-4 border-b flex justify-between items-center ${isDarkMode ? 'border-slate-800' : 'border-gray-200'}`}>
          <h2 className="text-lg font-bold font-serif">Verse Index</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-black/10"><X className="h-5 w-5" /></button>
        </div>
        <div className="overflow-y-auto p-4 grid grid-cols-5 gap-3">
          {verses.map((verse, idx) => (
            <button
              key={verse.id}
              onClick={() => onSelect(idx)}
              className={`p-3 rounded-lg text-sm font-bold transition-all ${isDarkMode 
                ? 'bg-slate-800 hover:bg-amber-900/50 border border-slate-700 hover:border-amber-500' 
                : 'bg-amber-50 hover:bg-amber-100 border border-amber-200 hover:border-amber-400 text-amber-900'}`}
            >
              {verse.id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Footer = ({ isDarkMode }) => (
  <footer className={`py-8 mt-12 transition-colors duration-300 border-t ${isDarkMode ? 'bg-slate-900 text-slate-400 border-slate-800' : 'bg-amber-800 text-amber-100 border-amber-900'}`}>
    <div className="max-w-4xl mx-auto px-4 text-center">
      <div className="flex flex-col justify-center items-center gap-2 text-sm font-medium opacity-80">
        <span>© 2025 Bhakti Library</span>
      </div>
    </div>
  </footer>
);

const LibraryView = ({ onSelectBook, isDarkMode }) => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <div className="text-center mb-12 space-y-4">
      <h1 className={`text-4xl md:text-5xl font-serif font-bold ${isDarkMode ? 'text-amber-100' : 'text-amber-900'}`}>Bhakti Library</h1>
      <p className={`text-lg ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Select a sacred text to begin reading</p>
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      {libraryData.map((book) => (
        <div key={book.id} onClick={() => onSelectBook(book)} className={`group cursor-pointer rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isDarkMode ? 'bg-slate-800 border-slate-700 hover:border-amber-500/50' : 'bg-white border-amber-100 hover:border-amber-300 shadow-lg'}`}>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${isDarkMode ? 'bg-slate-700 text-amber-400' : 'bg-amber-100 text-amber-800'}`}><BookOpen className="h-6 w-6" /></div>
          <h2 className={`text-2xl font-serif font-bold mb-2 ${isDarkMode ? 'text-slate-100' : 'text-gray-800'}`}>{book.title}</h2>
          <p className={`text-sm font-medium mb-4 uppercase tracking-wider ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>{book.author}</p>
          <p className={`mb-6 line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>{book.description}</p>
          <div className={`flex items-center text-sm font-bold ${isDarkMode ? 'text-amber-200' : 'text-amber-800'}`}>Read Now <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" /></div>
        </div>
      ))}
    </div>
  </div>
);

export default function App() {
  const [currentBook, setCurrentBook] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showIndex, setShowIndex] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [fontSize, setFontSize] = useState(18); 
  const [settings, setSettings] = useState({ transliteration: true, hindi: true, hinglish: false, english: true });

  // --- HASH ROUTING LOGIC ---

  // 1. Initial Load & Hash Change Listener
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash; // e.g., #/rsn/5
      
      if (!hash || hash === '#/') {
        setCurrentBook(null);
        document.title = "Bhakti Library - Sacred Texts";
        return;
      }

      // Parse hash: #/bookId/verseId
      const parts = hash.replace(/^#\/?/, '').split('/');
      
      if (parts.length < 2) return;

      const bookId = parts[0];
      const verseId = parts[parts.length - 1];

      const foundBook = libraryData.find(b => b.id === bookId);
      
      if (foundBook) {
        const vIndex = foundBook.verses.findIndex(v => v.id.toString() === verseId);
        
        if (vIndex !== -1) {
          setCurrentBook(foundBook);
          setCurrentIndex(vIndex);
          // Update title immediately
          document.title = `Verse ${verseId} | ${foundBook.title}`;
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check on mount

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 2. Update Hash when state changes
  useEffect(() => {
    if (currentBook) {
      const currentVerseId = currentBook.verses[currentIndex].id;
      const newHash = `#/${currentBook.id}/${currentVerseId}`;
      
      if (window.location.hash !== newHash) {
         // Use replaceState to update URL without triggering a hashchange event loop if possible,
         // but strictly speaking assigning window.location.hash is standard.
         // history.pushState is better to avoid cluttering history if user slides quickly
         window.history.pushState(null, null, newHash);
         document.title = `Verse ${currentVerseId} | ${currentBook.title}`;
      }
    } else {
      if (window.location.hash && window.location.hash !== '#/') {
        window.history.pushState(null, null, ' ');
        document.title = "Bhakti Library - Sacred Texts";
      }
    }
  }, [currentBook, currentIndex]);

  // Navigation Helpers
  const navigateToBook = (book) => {
    window.location.hash = `/${book.id}/${book.verses[0].id}`;
  };

  const navigateToVerseIndex = (index) => {
    if (!currentBook) return;
    const verseId = currentBook.verses[index].id;
    window.location.hash = `/${currentBook.id}/${verseId}`;
  };

  const handleNext = () => {
    if (currentIndex < currentBook.verses.length - 1) {
      navigateToVerseIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      navigateToVerseIndex(currentIndex - 1);
    }
  };

  // Swipe logic
  const touchStart = useRef(null);
  const touchEnd = useRef(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentIndex]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (!term) return;

    const matchIndex = currentBook.verses.findIndex(verse => 
      verse.id.toString() === term ||
      verse.sanskrit.toLowerCase().includes(term.toLowerCase()) ||
      (verse.hindi && verse.hindi.toLowerCase().includes(term.toLowerCase())) ||
      (verse.english && verse.english.toLowerCase().includes(term.toLowerCase()))
    );

    if (matchIndex !== -1) {
      navigateToVerseIndex(matchIndex);
    }
  };

  const handleIndexSelect = (index) => {
    navigateToVerseIndex(index);
    setShowIndex(false);
  };

  if (!currentBook) {
    return (
      <div className={`min-h-screen transition-colors duration-300 font-sans ${isDarkMode ? 'bg-slate-900 text-slate-200' : 'bg-[#FFFBF0] text-gray-800'}`}>
        <Header title="Library" isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} showBack={false} />
        <LibraryView onSelectBook={navigateToBook} isDarkMode={isDarkMode} />
        <Footer isDarkMode={isDarkMode} />
      </div>
    );
  }

  const currentVerse = currentBook.verses[currentIndex];

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 font-sans ${isDarkMode ? 'bg-slate-900 text-slate-200' : 'bg-[#FFFBF0] text-gray-800'}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Header 
        title={currentBook.title} 
        isDarkMode={isDarkMode} 
        toggleTheme={() => setIsDarkMode(!isDarkMode)} 
        showBack={true} 
        onBack={() => {
            setCurrentBook(null);
            window.location.hash = '';
        }}
        showIndexButton={true}
        onIndexClick={() => setShowIndex(true)}
      />

      <IndexModal 
        isOpen={showIndex} 
        onClose={() => setShowIndex(false)} 
        verses={currentBook.verses} 
        onSelect={(idx) => {
            navigateToVerseIndex(idx);
            setShowIndex(false);
        }}
        isDarkMode={isDarkMode} 
      />

      <main className="max-w-3xl mx-auto px-4 pt-6 pb-24 min-h-[80vh] flex flex-col">
        <ViewSettings 
          settings={settings} 
          toggleSetting={(key) => setSettings({...settings, [key]: !settings[key]})} 
          fontSize={fontSize}
          setFontSize={setFontSize}
          isDarkMode={isDarkMode} 
        />
        
        {/* Search Bar */}
        <div className="mb-6 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className={`h-5 w-5 ${isDarkMode ? 'text-slate-500' : 'text-amber-400'}`} />
            </div>
            <input 
                type="text" 
                placeholder="Jump to verse number or search text..." 
                className={`block w-full pl-11 pr-4 py-3 rounded-full border-2 focus:outline-none transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200 focus:border-amber-500' : 'bg-white border-amber-100 text-gray-800 focus:border-amber-400'}`} 
                value={searchTerm} 
                onChange={handleSearch} 
            />
        </div>

        {/* Active Verse Card */}
        <div className="flex-grow flex items-center">
          <VerseCard 
            verse={currentVerse} 
            currentBookId={currentBook.id}
            settings={settings} 
            fontSize={fontSize} 
            isDarkMode={isDarkMode} 
          />
        </div>

        {/* Navigation Controls */}
        <div className={`fixed bottom-0 left-0 right-0 p-4 border-t shadow-lg z-40 backdrop-blur-md ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-amber-100'}`}>
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            
            <div className="flex justify-between items-center">
              <button 
                onClick={handlePrev} 
                disabled={currentIndex === 0}
                className={`flex items-center px-4 py-3 rounded-xl font-bold transition-all ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'active:scale-95'} ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-amber-400' : 'bg-amber-100 hover:bg-amber-200 text-amber-900'}`}
              >
                <ChevronLeft className="mr-1 h-5 w-5" /> Prev
              </button>

              <span className="font-mono font-medium opacity-60">
                {currentIndex + 1} / {currentBook.verses.length}
              </span>

              <button 
                onClick={handleNext} 
                disabled={currentIndex === currentBook.verses.length - 1}
                className={`flex items-center px-4 py-3 rounded-xl font-bold transition-all ${currentIndex === currentBook.verses.length - 1 ? 'opacity-30 cursor-not-allowed' : 'active:scale-95'} ${isDarkMode ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-amber-600 hover:bg-amber-700 text-white'}`}
              >
                Next <ChevronRight className="ml-1 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
