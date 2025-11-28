import React, { useState, useEffect, useRef } from 'react';
import { Search, BookOpen, ChevronLeft, ChevronRight, Heart, Menu, X, Info, Moon, Sun, Settings, ArrowLeft, Library, Eye, EyeOff, Grid3X3, List } from 'lucide-react';

// --- DATA SOURCE ---
const libraryData = [
  {
    id: 'rsn',
    title: "Shri Radha Sudha Nidhi",
    author: "Shri Hit Harivansh Mahaprabhu",
    description: "The nectar of devotion to Srimati Radharani (270 Verses).",
    verses: [
      {
        id: 1,
        sanskrit: "यस्याः कदापि वसनाञ्चल-खेलनोत्थ-\nधन्यातिधन्य-पवनेन कृतार्थमानी ।\nयोगीन्द्र-दुर्गम-गतिर्-मधुसूदनोऽपि\nतस्या नमोऽस्तु वृषभानु-भुवो दिशेऽपि ॥ १ ॥",
        transliteration: "Yasyāḥ kadāpi vasanāñcala-khelanottha-\ndhanyātidhanya-pavanena kṛtārthamānī |\nYogīndra-durgama-gatir-Madhusūdano'pi\ntasyā namo'stu Vṛṣabhānu-bhuvo diśe'pi ||1||",
        hindi: "जिनके नीलाञ्चल के किसी समय हिलने से उठे हुये धन्यातिधन्य पवन के स्पर्श से, योगीन्द्रों के लिये अति दुर्गम गति वाले मधुसूदन भी अपने आपको कृतकृत्य मानते हैं, मैं उन श्रीवृषभानुनन्दिनी जी की दिशा को भी नमस्कार करता हूँ।",
        hinglish: "Jinke neelanchal ke kisi samay hilne se uthe huye dhanyatidhanya pavan ke sparsh se, yogindron ke liye ati durgam gati wale Madhusudan bhi apne aapko kritakritya maante hain, main un Shri Vrishabhanunandini ji ki disha ko bhi namaskar karta hoon.",
        translation: "Even Madhusudana (Lord Krishna), whose ways are incomprehensible even to the greatest of yogis, considers Himself utterly fulfilled by the touch of the most blessed breeze stirred by the playful movement of Her garment's edge. I offer my salutations even to the direction of that Vrishabhanu-nandini (Shri Radha)."
      },
      {
        id: 2,
        sanskrit: "ब्रह्मेश्वरादि-सुदुरूह-पदारविन्द-\nश्रीमत्पराग-परमाद्भुत-वैभवायाः ।\nसर्वार्थ-सार-रसवर्षि-कृपार्द्र-दृष्टे-\nस्तस्या नमोऽस्तु वृषभानु-भुवो महिम्ने ॥ २ ॥",
        transliteration: "Brahmeśvarādi-sudurūha-padāravinda-\nśrīmat-parāga-paramādbhuta-vaibhavāyāḥ |\nSarvārtha-sāra-rasavarṣi-kṛpārdra-dṛṣṭe-\nstasyā namo'stu Vṛṣabhānu-bhuvo mahimne ||2||",
        hindi: "जिनके चरण कमलों के शोभाशाली पराग (सुगन्धित रज) का अत्यन्त अद्भुत वैभव (ऐश्वर्य) ब्रह्मा, शंकर आदि के लिये भी सुदुरूह (प्राप्त करने में अत्यन्त कठिन) है और जिनकी कृपा से भीगी हुई दृष्टि सब पुरुषार्थों के सारभूत प्रेमरस की वृष्टि करने वाली है, उन श्रीवृषभानुनंदिनी जी की महिमा को नमस्कार हो।",
        hinglish: "Jinke charan kamalon ke shobhashali paraag (sugandhit raj) ka atyant adbhut vaibhav (aishvarya) Brahma, Shankar aadi ke liye bhi suduruh (prapt karne mein atyant kathin) hai aur jinki kripa se bhigi hui drishti sab purusharthon ke saarbhut premras ki vrishti karne wali hai, un Shri Vrishabhanunandini ji ki mahima ko namaskar ho.",
        translation: "The magnificent glory of the radiant pollen (dust) from Her lotus feet is exceedingly difficult to attain even for Brahma, Shankara, and others. Her glance, moistened with compassion, showers the rain of divine love-rasa, which is the essence of all life's goals. I offer my salutations to the glory (mahima) of that Vrishabhanu-nandini (Shri Radha)."
      },
      {
        id: 3,
        sanskrit: "यो ब्रह्म-रुद्र-शुक-नारद-भीष्म-मुख्यै-\nरालक्षितो न सहसा पुरुषस्य तस्य ।\nसद्यो-वशीकरण-चूर्णमनन्त-शक्तिं\nतं राधिका-चरण-रेणुमनुस्मरामि ॥ ३ ॥",
        transliteration: "Yo Brahma-Rudra-Śuka-Nārada-Bhīṣma-mukhyai-\nrālakṣito na sahasā puruṣasya tasya |\nSadyo-vaśīkaraṇa-cūrṇam-ananta-śaktiṃ\ntaṃ Rādhikā-caraṇa-reṇum-anusmarāmi ||3||",
        hindi: "जो ब्रह्मा, रुद्र, शुक, नारद, भीष्म द्वारा सहसा देखे नहीं जाते उन पुरुष (श्रीकृष्ण) को तत्काल वश में करने वाले, 'वशीकरण चूर्ण' के समान, अनन्त शक्तियों वाली श्रीराधिकाजू की चरण-धूलि का मैं स्मरण करता हूँ।",
        hinglish: "Jo Brahma, Rudra, Shuk, Narad, Bhishma dwara sahasa dekhe nahi jaate un Purush (Shri Krishna) ko tatkal vash mein karne wale, 'vashikaran churn' ke saman, anant shaktiyon wali Shri Radhikaju ki charan-dhuli ka main smaran karta hoon.",
        translation: "I meditate upon the dust of Shri Radhika's feet, which possesses infinite power and acts like an instant 'enchantment powder' (vashikaran churnam) to captivate that Supreme Purusha (Lord Krishna) who is not easily perceived even by Brahma, Rudra, Shuka, Narada, Bhishma, and other great personalities."
      },
      {
        id: 4,
        sanskrit: "आधाय मूर्द्धनि यदापुरुदार-गोप्यः\nकाम्यं पदं प्रिय-गुणैरपि पिच्छ-मौलेः ।\nभावोत्सवेन भजतां रस-कामधेनुं\nतं राधिका-चरण-रेणुमहं स्मरामि ॥ ४ ॥",
        transliteration: "Ādhāya mūrdhni yadāpurudāra-gopyaḥ\nkāmyaṃ padaṃ priya-guṇairapi piccha-mauleḥ |\nBhāvotsavena bhajatāṃ rasa-kāmadhenuṃ\ntaṃ Rādhikā-caraṇa-reṇumahaṃ smarāmi ||4||",
        hindi: "उदार गोपियों ने जिस चरण-धूलि को मस्तक पर चढ़ाकर मोर-मुकुट धारी श्री श्यामसुन्दर के लिये भी कामना करने योग्य पद (श्री प्रियाजू के दास्यभाव की पदवी) को प्रिय गुणों के साथ प्राप्त किया, भाव चाव से भजने वालों के लिये रस की कामधेनु के समान उन श्रीराधा के चरणों की धूलि का मैं स्मरण करता हूँ।",
        hinglish: "Udar gopiyon ne jis charan-dhuli ko mastak par chadhakar mor-mukut dhari Shri Shyamsundar ke liye bhi kamana karne yogya pad (Shri Priyaju ke daasyabhav ki padvi) ko priya gunon ke saath prapt kiya, bhaav chaav se bhajne walon ke liye ras ki Kamadhenu ke saman un Shri Radha ke charanon ki dhuli ka main smaran karta hoon.",
        translation: "I remember the dust of Shri Radha's feet. By placing this dust on their heads, the magnanimous Gopis attained a position (the status of Her service) endowed with dear qualities, a position desirable even to the wearer of the peacock crown (Lord Krishna) Himself. For those who worship with overflowing emotion, this foot-dust is like a wish-fulfilling cow (Kamadhenu) of rasa."
      },
      {
        id: 5,
        sanskrit: "दिव्य-प्रमोद-रस-सार-निजाङ्ग-सङ्ग-\nपीयूष-वीचि-निचयैरभिषेचयन्ती ।\nकन्दर्प-कोटि-शर-मूर्च्छित-नन्दसूनु-\nसञ्जीविनी जयति कापि निकुञ्ज-देवी ॥ ५ ॥",
        transliteration: "Divya-pramoda-rasa-sāra-nijāṅga-saṅga-\npīyūṣa-vīci-nicayairabhiṣecayantī |\nKandarpa-koṭi-śara-mūrcchita-Nandasūnu-\nsañjīvinī jayati kāpi Nikuñja-devī ||5||",
        hindi: "अलौकिक आनन्द स्वरूप रस के सारभूत अपने श्रीअंगों के संग-रूपी अमृत तरंगों के समूह से सींचकर, कोटि-कोटि मनोज (कामदेव) के बाणों से व्यथित नन्दकुमार को संजीवित करने वाली कोई अनिर्वचनीय निकुंजदेवी की जय हो।",
        hinglish: "Alaukik anand swaroop ras ke saarbhut apne shri-angon ke sang-rupi amrit tarangon ke samuh se sinchkar, koti-koti Manoj (Kaamdev) ke baanon se vyathit Nandkumar ko sanjivit karne wali koi anirvachaniya Nikunjadevi ki jai ho.",
        translation: "All glories to that indescribable Goddess of the Nikunja! She is the life-restoring herb (Sanjivani) for the son of Nanda (Lord Krishna), who faints, pierced by the arrows of millions of Cupids. She revives Him by anointing Him with waves of nectar flowing from the touch of Her divine limbs, which are the very essence of divine bliss and love-rasa."
      },
      {
        id: 6,
        sanskrit: "तन्नः प्रतिक्षण-चमत्कृत-चारु-लीला-\nलावण्य-मोहन-महा-मधुराङ्ग-भङ्गि ।\nराधाननं हि मधुराङ्ग-कला-निधान-\nमाविर्भविष्यति कदा रस-सिन्धु-सारम् ॥ ६ ॥",
        transliteration: "Tan naḥ pratikṣaṇa-camatkṛta-cāru-līlā-\nlāvaṇya-mohana-mahā-madhurāṅga-bhaṅgi |\nRādhānanaṃ hi madhurāṅga-kalā-nidhānam\nāvirbhaviṣyati kadā rasa-sindhu-sāram ||6||",
        hindi: "जिस मुख कमल से महामोहन माधुरी के (हावभाव आदि के) विविध अंगों की भंगिमायुक्त सुन्दर लीलाओं का लावण्य प्रतिक्षण चमत्कारपूर्ण बनता रहता है, माधुर्य के अंगों की कला (चातुर्य) का उत्पत्ति स्थान एवं रससिन्धु का सार रूप वह श्रीराधा-मुख हमारे सन्मुख कब प्रकट होगा?",
        hinglish: "Jis mukh kamal se mahamohan madhuri ke (haav-bhav aadi ke) vividh angon ki bhangimayukt sundar leelaon ka lavanya pratikshan chamatkarpurn banta rehta hai, madhurya ke angon ki kala (chaturya) ka utpatti sthan evam ras-sindhu ka saar roop wah Shri Radha-mukh hamare sanmukh kab prakat hoga?",
        translation: "When will that face of Shri Radha appear before us? It is the treasure-house of all sweet arts and the very essence of the ocean of rasa. From it, at every moment, emanates the astounding beauty of Her charming play (lila) and the captivating, supremely sweet gestures of Her form, which are profoundly enchanting."
      },
      {
        id: 7,
        sanskrit: "यत्किंकरीषु बहुशः खलु काकु-वाणी\nनित्यं परस्य पुरुषस्य शिखण्ड-मौलेः ।\nतस्याः कदा रस-निधेर्वृषभानुजाया-\nस्तत्केलि-कुञ्ज-भवनाङ्गण-मार्जनी स्याम् ॥ ७ ॥",
        transliteration: "Yat-kiṅkarīṣu bahuśaḥ khalu kāku-vāṇī\nnityaṃ parasya puruṣasya śikhaṇḍa-mauleḥ |\nTasyāḥ kadā rasa-nidhervṛṣabhānujāyās\ntat-keli-kuñja-bhavanāṅgaṇa-mārjanī syām ||7||",
        hindi: "मोरमुकुटधारी परम पुरुष श्रीश्यामसुन्दर जिनकी दासियों से नित्य अनेक बार दीनतापूर्ण वचन (श्री प्रियाजू की कृपा प्राप्ति के लिए) कहते रहते हैं, उन रसनिधि श्रीवृषभानुनन्दिनी के केलिकुंज-भवन के आँगन की सोहनी (झाड़ू) लगाने वाली (मैं) कब होऊँगी?",
        hinglish: "Mormukutdhari param purush Shri Shyamsundar jinki dasiyon se nitya anek baar dintapurn vachan (Shri Priyaju ki kripa prapti ke liye) kehte rehte hain, un rasnidhi Shri Vrishabhanunandini ke keli-kunj-bhavan ke aangan ki sohni (jhadoo) lagane wali (main) kab houngi?",
        translation: "When will I become the broom for sweeping the courtyard of the play-bower (keli-kunja) of that ocean of rasa, Vrishabhanu's daughter? To whose maidservants (kinkaris) the Supreme Person, the wearer of the peacock crown, constantly speaks countless words of humble entreaty (to gain Her favor)."
      },
      {
        id: 8,
        sanskrit: "वृन्दानि सर्व-महतामपहाय दूराद्\nवृन्दाटवीमनुसर प्रणयेन चेतः ।\nसत्तारणीकृत-सुभाव-सुधा-रसौघं\nराधाभिधानमिह दिव्य-निधानमस्ति ॥ ८ ॥",
        transliteration: "Vṛndāni sarva-mahatām-apahāya dūrād\nVṛndāṭavīmanusara praṇayena cetaḥ |\nSat-tāraṇīkṛta-subhāva-sudhā-rasaughaṃ\nRādhābhidhākamiha divya-nidhānamasti ||8||",
        hindi: "हे चित्त, तू सभी महान् (साधनों और साध्यों) के समूह दूर से त्याग करके प्रेमपूर्वक श्रीवृन्दावन का अनुसरण कर। (क्योंकि) वहाँ सज्जनों को तारने को तत्पर सुन्दर भावरूपी सुधारस से पूर्ण श्रीराधा नाम वाली अलौकिक निधि विराजमान है।",
        hinglish: "Hey chitt, tu sabhi mahan (sadhanon aur sadhyon) ke samuh door se tyag karke prempurvak Shri Vrindavan ka anusaran kar. (Kyunki) wahan sajjanon ko taarne ko tatpar sundar bhaavrupi sudharas se purn Shri Radha naam wali alaukik nidhi virajman hai.",
        translation: "O my mind! Abandon from afar all hosts of so-called great pursuits and goals, and follow the path to Vrindavan with true love. For here (in Vrindavan) exists a divine treasure known as 'Radha'—a flood of nectar-like loving sentiments (bhava) that is wholly dedicated to liberating the virtuous."
      },
      {
        id: 9,
        sanskrit: "केनापि नागर-वरेण पदे निपत्य\nसम्प्रार्थितैक-परिरम्भ-रसोत्सवायाः ।\nसभ्रू-विभङ्गमतिरङ्ग-निधेः कदा ते\nश्रीराधिके नहि नहीति गिरः शृणोमि ॥ ९ ॥",
        transliteration: "Kenāpi nāgara-vareṇa pade nipatya\nsamprārthitaika-parirambha-rasotsavāyāḥ |\nSabhrū-vibhaṅgam-atiraṅga-nidheḥ kadā te\nŚrī-Rādhike nahi nahīti giraḥ śṛṇomi ||9||",
        hindi: "हे श्रीराधे ! कोई लोकोत्तर चतुर शिरोमणि (श्रीश्यामसुन्दर) आपके चरणों में गिरकर आपसे एकबार रसोत्सव रूप आलिंगन की याचना कर रहे हैं और हे अतिकौतुकनिधि ! आप अपनी भृकुटियों को विभंगित करके 'नहीं-नहीं' कह रही हैं, मैं आपके इन शब्दों को कब सुनूँगी?",
        hinglish: "Hey Shri Radhe! Koi lokottar chatur shiromani (Shri Shyamsundar) aapke charanon mein girkar aapse ekbaar rasotsav roop aalingan ki yachna kar rahe hain aur hey atikautuknidhi! Aap apni bhrikutiyon ko vibhangit karke 'nahin-nahin' keh rahi hain, main aapke in shabdon ko kab sunoongi?",
        translation: "O Shri Radhika! O ocean of divine playfulness (atiranga-nidhi)! When will I hear your words, \"No, no!\" spoken with a playful knitting of your brows, as some unparalleled connoisseur (Krishna) falls at Your feet, begging for the blissful festival of a single embrace?"
      },
      {
        id: 10,
        sanskrit: "यत्पाद-पद्म-नख-चन्द्र-मणि-च्छटायाः\nविस्फूर्जितं किमपि गोप-वधूष्वदर्शि ।\nपूर्णानुराग-रस-सागर-सार-मूर्त्तिः\nसा राधिका मयि कदापि कृपां करोतु ॥ १० ॥",
        transliteration: "Yat-pāda-padma-nakha-candra-maṇi-cchaṭāyāḥ\nvisphūrjitaṃ kimapi gopa-vadhūṣvadarśi |\nPūrṇānurāga-rasa-sāgara-sāra-mūrtiḥ\nsā Rādhikā mayi kadāpi kṛpāṃ karotu ||10||",
        hindi: "जिनके चरण कमल के नखरूपी चन्द्रमणि की छटा का कुछ अनिर्वचनीय विलास गोपियों में देखा गया है, वे पूर्ण अनुराग रस के सागर की सार स्वरूप मूर्ति श्रीराधिका मुझ पर भी कभी कृपा करें।",
        hinglish: "Jinke charan kamal ke nakharupi chandramani ki chhata ka kuch anirvachaniya vilas gopiyon mein dekha gaya hai, ve purn anuraag ras ke sagar ki saar swaroop murti Shri Radhika mujh par bhi kabhi kripa karein.",
        translation: "May that Shri Radhika—who is the very embodiment of the essence of the ocean of complete love-rasa—bestow Her mercy upon me someday. An indescribable glimpse of the splendor from the effulgence of Her moon-like toenails is seen (reflected) in the Gopis."
      }
      // Add verses 11-270 here.
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

const ViewSettings = ({ settings, toggleSetting, isDarkMode }) => (
  <div className={`mb-6 rounded-xl p-4 border transition-colors duration-300 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-amber-200 shadow-sm'}`}>
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
  <div className={`w-full rounded-2xl shadow-xl overflow-hidden transition-all duration-300 border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-amber-100'}`}>
    <div className={`px-6 py-4 border-b flex justify-between items-center ${isDarkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-amber-50 border-amber-100'}`}>
      <span className={`font-serif font-bold text-xl ${isDarkMode ? 'text-amber-400' : 'text-amber-800'}`}>Verse {verse.id}</span>
      <Heart className={`h-6 w-6 cursor-pointer transition-colors ${isDarkMode ? 'text-slate-600 hover:text-rose-500' : 'text-amber-300 hover:text-rose-500'}`} />
    </div>
    <div className="p-6 md:p-10 space-y-8">
      <div className="text-center">
        <p className={`text-2xl md:text-3xl font-serif leading-relaxed whitespace-pre-line font-medium ${isDarkMode ? 'text-slate-100' : 'text-gray-800'}`}>{verse.sanskrit}</p>
      </div>
      
      {settings.transliteration && verse.transliteration && (
        <div className={`p-5 rounded-xl text-center ${isDarkMode ? 'bg-slate-900/50 text-emerald-200' : 'bg-gray-50 text-slate-600'}`}>
          <p className="font-mono text-base md:text-lg italic whitespace-pre-line">{verse.transliteration}</p>
        </div>
      )}

      <div className="space-y-6 pt-2">
         {settings.hindi && verse.hindi && (
           <div className={`border-l-4 pl-5 ${isDarkMode ? 'border-orange-500' : 'border-orange-300'}`}>
             <h4 className={`text-xs uppercase font-bold mb-2 tracking-widest ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>Hindi</h4>
             <p className={`text-xl leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>{verse.hindi}</p>
           </div>
         )}
         {settings.hinglish && verse.hinglish && (
           <div className={`border-l-4 pl-5 ${isDarkMode ? 'border-purple-500' : 'border-purple-300'}`}>
             <h4 className={`text-xs uppercase font-bold mb-2 tracking-widest ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>Hinglish</h4>
             <p className={`italic text-lg leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>{verse.hinglish}</p>
           </div>
         )}
         {settings.english && verse.translation && (
           <div className={`border-l-4 pl-5 ${isDarkMode ? 'border-blue-500' : 'border-blue-300'}`}>
             <h4 className={`text-xs uppercase font-bold mb-2 tracking-widest ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>English</h4>
             <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>{verse.translation}</p>
           </div>
         )}
      </div>
    </div>
  </div>
);

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
  const [settings, setSettings] = useState({ transliteration: true, hindi: true, hinglish: false, english: true });

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
    
    if (isLeftSwipe && currentIndex < (currentBook?.verses.length || 0) - 1) {
      setCurrentIndex(prev => prev + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Scroll to top when changing verse
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentIndex]);

  const handleBookSelect = (book) => {
    setCurrentBook(book);
    setCurrentIndex(0);
    setSearchTerm('');
  };

  // Search/Filter logic for finding specific verses within a book
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (!term) return;

    // Try to find the first matching verse index
    const matchIndex = currentBook.verses.findIndex(verse => 
      verse.id.toString() === term ||
      verse.sanskrit.toLowerCase().includes(term.toLowerCase()) ||
      (verse.hindi && verse.hindi.toLowerCase().includes(term.toLowerCase())) ||
      (verse.english && verse.english.toLowerCase().includes(term.toLowerCase()))
    );

    if (matchIndex !== -1) {
      setCurrentIndex(matchIndex);
    }
  };

  const handleNext = () => {
    if (currentIndex < currentBook.verses.length - 1) setCurrentIndex(c => c + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(c => c - 1);
  };

  const handleIndexSelect = (index) => {
    setCurrentIndex(index);
    setShowIndex(false);
  };

  if (!currentBook) {
    return (
      <div className={`min-h-screen transition-colors duration-300 font-sans ${isDarkMode ? 'bg-slate-900 text-slate-200' : 'bg-[#FFFBF0] text-gray-800'}`}>
        <Header title="Library" isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} showBack={false} />
        <LibraryView onSelectBook={handleBookSelect} isDarkMode={isDarkMode} />
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
        onBack={() => setCurrentBook(null)}
        showIndexButton={true}
        onIndexClick={() => setShowIndex(true)}
      />

      <IndexModal 
        isOpen={showIndex} 
        onClose={() => setShowIndex(false)} 
        verses={currentBook.verses} 
        onSelect={handleIndexSelect} 
        isDarkMode={isDarkMode} 
      />

      <main className="max-w-3xl mx-auto px-4 pt-6 pb-24 min-h-[80vh] flex flex-col">
        <ViewSettings settings={settings} toggleSetting={(key) => setSettings({...settings, [key]: !settings[key]})} isDarkMode={isDarkMode} />
        
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
          <VerseCard verse={currentVerse} settings={settings} isDarkMode={isDarkMode} />
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
