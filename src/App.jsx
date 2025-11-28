import React, { useState, useEffect } from 'react';
import { Search, BookOpen, ChevronLeft, ChevronRight, Heart, Menu, X, Info, Moon, Sun, Settings, ArrowLeft, Library, Eye, EyeOff } from 'lucide-react';

// --- DATA SOURCE ---
const libraryData = [
  {
    id: 'rsn',
    title: "Shri Radha Sudha Nidhi",
    author: "Srila Hita Harivamsa Mahaprabhu",
    description: "The nectar of devotion to Srimati Radharani (270 Verses).",
    verses: [
      {
        id: 1,
        sanskrit: "यस्याः कदापि वसनाञ्चलखेलनोत्थ-\nधन्यातिधन्यपवनेन कृतार्थमानी ।\nयोगीन्द्रदुर्गमगतिर्मधुसूदनोऽपि\nतस्या नमोऽस्तु वृषभानुभुवो दिशेऽपि ॥१॥",
        transliteration: "yasyāḥ kadāpi vasanāñcala-khelanottha-\ndhanyātidhanya-pavanena kṛtārthamānī |\nyogīndra-durgama-gatir madhusūdano 'pi\ntasyā namo 'stu vṛṣabhānubhuvo diśe 'pi ||1||",
        hindi: "जिनके वस्त्रांचल के हिलने से उत्पन्न धन्यातिधन्य वायु के स्पर्श मात्र से योगिराजों के लिए भी अगम्य गति वाले भगवान मधुसूदन भी अपने को कृतार्थ मानते हैं...",
        hinglish: "Jinke vastranchal ke hilne se utpann dhanyatidhanya vayu ke sparsh matra se...",
        translation: "Even the supreme Lord Madhusudana (Krishna), whose ways are difficult for great yogis to understand, considers Himself blessed..."
      },
      {
        id: 2,
        sanskrit: "राधाकरावाचितपल्लवाग्रा\nराधापदाङ्कविलसन्मदाग्रा ।\nराधायशो-मुखररम्यशाखा\nराधाविहारविपिनं जिजीयात् ॥२॥",
        transliteration: "rādhā-karāvacita-pallavāgrā\nrādhā-padāṅka-vilasan-madāgrā...",
        hindi: "राधा के करकमलों द्वारा चुने गए पल्लवों के अग्रभाग वाला...",
        hinglish: "Radha ke kar-kamalon dwara chune gaye pallavon ke agrabhag wala...",
        translation: "May the forest of Vrindavan, where Radha enjoys Her pastimes, be ever victorious..."
      }
    ]
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

const Header = ({ title, isDarkMode, toggleTheme, onBack, showBack }) => (
  <header className={`sticky top-0 z-50 shadow-lg transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-amber-100' : 'bg-amber-700 text-amber-50'}`}>
    <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-3 overflow-hidden">
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
      <button 
        onClick={toggleTheme}
        className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-amber-300' : 'hover:bg-amber-600 text-yellow-200'}`}
      >
        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
    </div>
  </header>
);

const ViewSettings = ({ settings, toggleSetting, isDarkMode }) => (
  <div className={`mb-8 rounded-xl p-4 border transition-colors duration-300 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-amber-200 shadow-sm'}`}>
    <div className="flex items-center space-x-2 mb-3">
      <Settings className={`h-4 w-4 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />
      <span className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-amber-800'}`}>Display Options</span>
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

const VerseCard = ({ verse, settings, isDarkMode }) => (
  <div className={`rounded-xl shadow-md overflow-hidden transition-all duration-300 border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-amber-100 hover:shadow-lg'}`}>
    <div className={`px-6 py-3 border-b flex justify-between items-center ${isDarkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-amber-50 border-amber-100'}`}>
      <span className={`font-serif font-bold text-lg ${isDarkMode ? 'text-amber-400' : 'text-amber-800'}`}>Verse {verse.id}</span>
      <Heart className={`h-5 w-5 cursor-pointer transition-colors ${isDarkMode ? 'text-slate-600 hover:text-rose-500' : 'text-amber-300 hover:text-rose-500'}`} />
    </div>
    <div className="p-6 md:p-8 space-y-6">
      <div className="text-center">
        <p className={`text-xl md:text-2xl font-serif leading-relaxed whitespace-pre-line font-medium ${isDarkMode ? 'text-slate-100' : 'text-gray-800'}`}>{verse.sanskrit}</p>
      </div>
      
      {settings.transliteration && verse.transliteration && (
        <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-slate-900/50 text-emerald-200' : 'bg-gray-50 text-slate-600'}`}>
          <p className="font-mono text-sm md:text-base italic">{verse.transliteration}</p>
        </div>
      )}

      <div className="space-y-4 pt-2">
         {settings.hindi && verse.hindi && (
           <div className={`border-l-4 pl-4 ${isDarkMode ? 'border-orange-500' : 'border-orange-300'}`}>
             <h4 className={`text-[10px] uppercase font-bold mb-1 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>Hindi</h4>
             <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>{verse.hindi}</p>
           </div>
         )}
         {settings.hinglish && verse.hinglish && (
           <div className={`border-l-4 pl-4 ${isDarkMode ? 'border-purple-500' : 'border-purple-300'}`}>
             <h4 className={`text-[10px] uppercase font-bold mb-1 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>Hinglish</h4>
             <p className={`italic ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>{verse.hinglish}</p>
           </div>
         )}
         {settings.english && verse.translation && (
           <div className={`border-l-4 pl-4 ${isDarkMode ? 'border-blue-500' : 'border-blue-300'}`}>
             <h4 className={`text-[10px] uppercase font-bold mb-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>English</h4>
             <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>{verse.translation}</p>
           </div>
         )}
      </div>
    </div>
  </div>
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
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [settings, setSettings] = useState({ transliteration: true, hindi: true, hinglish: false, english: true });

  const versesPerPage = 5;

  useEffect(() => { setCurrentPage(1); setSearchTerm(''); }, [currentBook]);

  if (!currentBook) {
    return (
      <div className={`min-h-screen transition-colors duration-300 font-sans ${isDarkMode ? 'bg-slate-900 text-slate-200' : 'bg-[#FFFBF0] text-gray-800'}`}>
        <Header title="Library" isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} showBack={false} />
        <LibraryView onSelectBook={setCurrentBook} isDarkMode={isDarkMode} />
      </div>
    );
  }

  const filteredVerses = currentBook.verses.filter(verse => 
    verse.sanskrit.includes(searchTerm) || 
    verse.translation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    verse.hindi?.includes(searchTerm) ||
    verse.id.toString() === searchTerm
  );

  const indexOfLastVerse = currentPage * versesPerPage;
  const currentVerses = filteredVerses.slice(indexOfLastVerse - versesPerPage, indexOfLastVerse);
  const totalPages = Math.ceil(filteredVerses.length / versesPerPage);

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${isDarkMode ? 'bg-slate-900 text-slate-200' : 'bg-[#FFFBF0] text-gray-800'}`}>
      <Header title={currentBook.title} isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} showBack={true} onBack={() => setCurrentBook(null)} />
      <main className="max-w-3xl mx-auto px-4 pt-8 pb-16">
        <ViewSettings settings={settings} toggleSetting={(key) => setSettings({...settings, [key]: !settings[key]})} isDarkMode={isDarkMode} />
        <div className="sticky top-20 z-40 mb-10">
          <div className="relative max-w-xl mx-auto shadow-lg rounded-full">
             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Search className="h-5 w-5 text-gray-400" /></div>
             <input type="text" placeholder="Search verses..." className={`block w-full pl-11 pr-4 py-4 rounded-full border-2 focus:outline-none ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-amber-100'}`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>
        <div className="space-y-8">
            {currentVerses.map(verse => <VerseCard key={verse.id} verse={verse} settings={settings} isDarkMode={isDarkMode} />)}
        </div>
        {filteredVerses.length > versesPerPage && (
            <div className="mt-12 flex justify-center space-x-4">
                <button onClick={() => setCurrentPage(c => Math.max(1, c-1))} disabled={currentPage===1} className={`p-2 border rounded-full ${isDarkMode ? 'border-slate-700' : 'border-amber-200'}`}><ChevronLeft/></button>
                <span className="py-2">Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage(c => Math.min(totalPages, c+1))} disabled={currentPage===totalPages} className={`p-2 border rounded-full ${isDarkMode ? 'border-slate-700' : 'border-amber-200'}`}><ChevronRight/></button>
            </div>
        )}
      </main>
    </div>
  );
}
