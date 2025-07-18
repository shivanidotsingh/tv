const tvShowsData = {
   "United Kingdom": [
        { title: "Fleabag", tags: ["classic"], year: "2016–2019"},
        { title: "Too Much", tags: [], year: "2025"},
        { title: "The Crown", tags: ["period", "classic"], year: "2016–present"},
        { title: "Black Mirror", tags: ["supernatural"], year: "2011–present" },
        { title: "Humans", tags: ["supernatural"], year: "2015–2018" },
        { title: "Lovesick", tags: [], year: "2014–2018" },
        { title: "You're the Worst", tags: ["therapist"], year: "2014–2019" },
        { title: "Happy Valley", tags: [], year: "2014–2023" },
        { title: "Killing Eve", tags: ["spy", "gem"], year: "2018–2022" },
        { title: "Sherlock", tags: ["book"], year: "2010–2017" },
        { title: "Catastrophe", tags: ["gem"], year: "2015–2019" },
        { title: "Criminal", tags: ["gem"], year: "2019–2020" },
        { title: "Derry Girls", tags: ["gem"], year: "2018–2022" },
        { title: "Sick Note", tags: [], year: "2017–2018" },
        { title: "Sex Education", tags: ["therapist", "pwd"], year: "2019–present" },
        { title: "Years and Years", tags: ["gem"], year: "2019" },
        { title: "State of the Union", tags: ["therapist"], year: "2019–present" },
        { title: "After Life", tags: ["gem"], year: "2019–2022" },
        { title: "Normal People", tags: ["gem", "book"], year: "2020" },
        { title: "I May Destroy You", tags: ["gem"], year: "2020" },
        { title: "The Duchess", tags: [], year: "2020" },
        { title: "This Way Up", tags: ["gem"], year: "2019–2021" },
        { title: "Wanderlust", tags: ["therapist", "gem"], year: "2018" },
        { title: "Crashing", tags: ["gem"], year: "2016" },
        { title: "End of the Fucking World", tags: [], year: "2017–2019" },
        { title: "Chewing Gum", tags: [], year: "2015–2017" },
        { title: "Trying", tags: [], year: "2020–present" },
        { title: "Safe", tags: [], year: "2018" },
        { title: "My Mad Fat Diary", tags: [], year: "2013–2015" },
        { title: "Downton Abbey", tags: ["period"], year: "2010–2015" },
        { title: "Broadchurch", tags: [], year: "2013–2017" },
        { title: "Inside Man", tags: [], year: "2022" },
        { title: "Doctor Foster", tags: [], year: "2015–2017" },
        { title: "We Are Lady Parts", tags: ["gem"], year: "2021–present" },
        { title: "The Pursuit of Love", tags: ["gem", "book", "period"], year: "2021" },
        { title: "Landscapers", tags: [], year: "2021" },
        { title: "Starstruck", tags: [], year: "2021–present" },
        { title: "Bridgerton", tags: ["book", "period"], year: "2020–present" },
        { title: "The Outlaws", tags: [], year: "2021–present" },
        { title: "Man Like Mobeen", tags: ["comedian"], year: "2017–present" },
        { title: "Flowers", tags: [], year: "2016–2017" },
        { title: "Mammals", tags: [], year: "2022" },
        { title: "Shantaram", tags: ["book", "period"], year: "2022" },
        { title: "I hate Suzie", tags: ["gem"], year: "2020–present" },
        { title: "Bad Sisters", tags: [], year: "2022–present" },
        { title: "Ted Lasso", tags: ["therapist"], year: "2020–2023" },
        { title: "Baby Reindeer", tags: ["comedian"], year: "2024" },
        { title: "The Buccaneers", tags: ["book", "period"], year: "2023" },
        { title: "Death and other Details", tags: ["gem"], year: "2024" },
        { title: "One Day", tags: ["book"], year: "2024"},
        { title: "Bodies", tags: ["supernatural", "book"], year: "2023" },
        { title: "KAOS", tags: ["gem", "supernatural"], year: "2024" },
        { title: "Black Doves", tags: ["spy"], year: "2024" },
        { title: "Adolescence", tags: [], year: "2025" },
        { title: "Four Weddings & a Funeral", tags: ["mini"], year: "2019" },
        { title: "Dept. Q", tags: [], year: "2025" },
        { title: "The Agency", tags: ["spy"], year: "2024" }

    ],
    "America — East": [
        { title: "Brooklyn Nine Nine", tags: ["classic", "comedian"], year: "2013–2021" },
        { title: "Broad City", tags: ["classic", "comedian"], year: "2014–2019" },
        { title: "High Maintenance", tags: ["gem"], year: "2016–2020" },
        { title: "Girls", tags: [], year: "2012–2017" },
        { title: "Community", tags: ["classic"], year: "2009–2015" },
        { title: "Schitt's Creek", tags: [], year: "2015–2020" },
        { title: "Search Party", tags: ["gem"], year: "2016–2022" },
        { title: "Seinfeld", tags: ["comedian", "classic"], year: "1989–1998" },
        { title: "Unbreakable Kimmy Schmidt", tags: [], year: "2015–2020" },
        { title: "The Politician", tags: [], year: "2019–2020"},
        { title: "What we do in the Shadows", tags: ["supernatural"], year: "2019–present" },
        { title: "Barry", tags: ["gem", "comedian"], year: "2018–2023" },
        { title: "Corporate", tags: ["gem"], year: "2018–2020" },
        { title: "Difficult People", tags: [], year: "2015–2017" },
        { title: "This is Us", tags: [], year: "2016–2022" },
        { title: "Orange is the New Black", tags: ["book", "classic"], year: "2013–2019" },
        { title: "Friends from College", tags: [], year: "2017–2019" },
        { title: "Suits", tags: [], year: "2011–2019" },
        { title: "Easy", tags: ["gem"], year: "2016–2019" },
        { title: "Rectify", tags: [], year: "2013–2016" },
        { title: "Life in Pieces", tags: ["gem"], year: "2015–2019" },
        { title: "The Unicorn", tags: [], year: "2019–2021" },
        { title: "The Other Two", tags: ["gem"], year: "2019–2023" },
        { title: "Great News", tags: [], year: "2017–2018" },
        { title: "Champions", tags: [], year: "2018" },
        { title: "Homecoming", tags: ["therapist"], year: "2018–2020" },
        { title: "About a boy", tags: [], year: "2014–2015" },
        { title: "Good Girls", tags: [], year: "2018–2021" },
        { title: "How to get away with murder", tags: [], year: "2014–2020" },
        { title: "13 Reasons Why", tags: ["therapist", "book"], year: "2017–2020" },
        { title: "Gypsy", tags: ["therapist"], year: "2017" },
        { title: "You", tags: ["book"], year: "2018–present" },
        { title: "Younger", tags: ["book"], year: "2015–2021" },
        { title: "Glow", tags: ["period"], year: "2017–2019" },
        { title: "Poker Face", tags: ["gem"], year: "2023–present" },
        { title: "The Curse", tags: ["supernatural"], year: "2023" },
        { title: "Mr and Mrs Smith", tags: ["spy"], year: "2024" },
        { title: "The Brothers Sun", tags: ["gem"], year: "2024" },
        { title: "The Diplomat", tags: [], year: "2023–present" },
        { title: "The Americans", tags: ["gem", "spy"], year: "2013–2018" },
        { title: "No Good Deed", tags: [], year: "2024" },
        { title: "Deli Boys", tags: ["gem"], year: "2025"},
        { title: "Sirens", tags: ["mini"], year: "2025"},
        { title: "Sex and the City", tags: ["book", "classic"], year: "1998–2004" },
        { title: "The Affair", tags: [], year: "2014–2019" },
        { title: "Mozart in the Jungle", tags: ["book", "gem"], year: "2014–2018" },
        { title: "Mr Robot", tags: [], year: "2015–2019" },
        { title: "Unreal", tags: [], year: "2015–2018" },
        { title: "Top of the Lake", tags: [], year: "2013–2017" },
        { title: "The Sinner", tags: ["book"], year: "2017–2021" },
        { title: "The Flight Attendant", tags: ["book"], year: "2020–2022" },
        { title: "The Morning Show", tags: ["book"], year: "2019–present" },
        { title: "Firefly Lane", tags: ["book"], year: "2021–2023" },
        { title: "The Good Wife", tags: [], year: "2009–2016" },
        { title: "The Good Fight", tags: [], year: "2017–2022" },
        { title: "Happy Endings", tags: [], year: "2011–2013" },
        { title: "The Chair", tags: ["gem"], year: "2021" },
        { title: "Dash & Lily", tags: ["book"], year: "2020" },
        { title: "Horace and Pete", tags: [], year: "2016" },
        { title: "Maid", tags: ["book"], year: "2021" },
        { title: "Severance", tags: ["supernatural"], year: "2022–present" },
        { title: "Peacemaker", tags: ["supernatural"], year: "2022–present" },
        { title: "WandaVision", tags: ["supernatural", "mini", "gem"], year: "2021" },
        { title: "Life & Beth", tags: ["gem"], year: "2022–present" },
        { title: "Mo", tags: ["comedian"], year: "2022" },
        { title: "The Patient", tags: ["therapist"], year: "2022" },
        { title: "Shrinking", tags: ["therapist"], year: "2023–present" },
        { title: "Last of Us", tags: ["supernatural"], year: "2023–present" },
        { title: "Fleishman is in trouble", tags: ["book"], year: "2022" },
        { title: "Love & Death", tags: ["book", "period", "mini"], year: "2023" },
        { title: "The Last Thing he told me", tags: ["book"], year: "2023" },
        { title: "Who is Erin Carter", tags: [], year: "2023" },
        { title: "Beef", tags: ["gem", "comedian"], year: "2023" },
        { title: "The Bear", tags: ["classic"], year: "2022–present" },
        { title: "English Teacher", tags: [], year: "2024" },
        { title: "Nobody wants this", tags: [], year: "2024" },
        { title: "Only murders in the building", tags: [], year: "2021–present" },
        { title: "The Lincoln Lawyer", tags: ["book"], year: "2022–present" },
        { title: "Succession", tags: ["classic"], year: "2018–2023" },
        { title: "The Perfect Couple", tags: ["book"], year: "2024" },
        { title: "Lessons in Chemistry", tags: ["book", "period"], year: "2023" },
        { title: "Masters of Sex", tags: ["book", "period"], year: "2013–2016" },
        { title: "Marvelous Mrs Maisel", tags: ["period"], year: "2017–2023" },
        { title: "Handmaid's Tale", tags: ["period"], year: "2017–present" },
        { title: "The Good Place", tags: ["supernatural", "classic"], year: "2016–2020" },
        { title: "The Leftovers", tags: ["supernatural"], year: "2014–2017" },
        { title: "Russian Doll", tags: ["supernatural"], year: "2019–present" },
        { title: "I am not Okay with this", tags: ["supernatural"], year: "2020" },
        { title: "Stranger Things", tags: ["supernatural", "period"], year: "2016–present" },
        { title: "Dickinson", tags: ["period"], year: "2019–2021" },
        { title: "Sweet Tooth", tags: ["supernatural"], year: "2021–present" },
        { title: "The Mindy Project", tags: ["comedian"], year: "2012–2017" },
        { title: "Master of None", tags: ["comedian", "gem"], year: "2015–2017" },
        { title: "Ramy", tags: ["comedian", "gem", "pwd"], year: "2019–present" },
        { title: "Bojack Horseman", tags: ["animated"], year: "2014–2020" },
        { title: "Tuca and Bertie", tags: ["animated"], year: "2019–present" },
        { title: "Big Mouth", tags: ["animated"], year: "2017–present" },
        { title: "Atypical", tags: ["therapist", "pwd"], year: "2017–2021" },
        { title: "Speechless", tags: ["pwd"], year: "2016–2019" },
        { title: "Dying for sex", tags: ["gem", "mini"], year: "2025" },
        { title: "Little Fires Everywhere", tags: ["book", "mini"], year: "2020" },
        { title: "Strangers", tags: ["gem", "mini"], year: "2017" },
        { title: "Maniac", tags: ["mini", "supernatural"], year: "2018" },
        { title: "Unbelievable", tags: ["book", "mini"], year: "2019" },
        { title: "SMILF", tags: ["mini"], year: "2017–2019" },
        { title: "Mrs Fletcher", tags: ["book", "mini"], year: "2019" },
        { title: "Modern Love", tags: ["book", "mini"], year: "2019–2021" },
        { title: "Mindhunter", tags: ["book", "mini"], year: "2017–2019" },
        { title: "The Undoing", tags: ["therapist", "book", "mini"], year: "2020" },
        { title: "Unorthodox", tags: ["gem", "book", "mini"], year: "2020" },
        { title: "Olive Kitteridge", tags: ["book", "mini", "period"], year: "2014" }, 
        { title: "Happyish", tags: ["mini"], year: "2015" },
        { title: "Gilmore Girls", tags: ["classic"], year: "2000–2007"  },
        { title: "In Treatment", tags: ["therapist", "gem"], year: "2008–2010" },
        { title: "Mad Men", tags: ["classic"], year: "2007–2015"},
        { title: "Gossip Girl", tags: ["classic"], year: "2007–2012"},
        { title: "Freaks and Geeks", tags: ["mini"], year: "1999"},
        { title: "Newsroom", tags: [], year: "2012–2014" },
        { title: "How I met your Mother", tags: ["classic"], year: "2005–2014"  },
        { title: "Friends", tags: ["classic"], year: "1994–2004"},
        { title: "One Tree Hill", tags: [], year: "2003–2012"  },
        { title: "Don't Trust the B in Apt 23", tags: [], year: "2012–2014" },
        { title: "American Crime Story", tags: [], year: "2016–present" },
        { title: "Feud", tags: [], year: "2017–present" },
        { title: "The Sopranos", tags: ["classic", "therapist"], year: "1999–2007" },
        { title: "The Residence", tags: ["book"], year: "2025" },
        { title: "The Gilded age", tags: ["period", "gem"], year: "2022–present" },
        { title: "That 70's Show", tags: ["mini"], year: "1998" },
        { title: "The Better Sister", tags: ["book"], year: "2025" },
        { title: "The Four Seasons", tags: [], year: "2025" },
        { title: "Overcompensating", tags: [], year: "2025" },
        { title: "Eric", tags: ["mini", "period"], year: "2024" },
        { title: "Couples Therapy", tags: ["docu", "gem"], year: "2019–present" }
    ],

 "America — West": [
    { title: "I'm Sorry", tags: ["comedian"], year: "2017–2019" },
    { title: "Insecure", tags: [], year: "2016–2021" },
    { title: "The Studio", tags: ["comedian"], year: "2025" },
    { title: "New Girl", tags: ["classic"], year: "2011–2018" },
    { title: "Silicon Valley", tags: [], year: "2014–2019" },
    { title: "Grace and Frankie", tags: [], year: "2015–2022" },
    { title: "Crazy ex girlfriend", tags: ["therapist", "comedian"], year: "2015–2019" },
    { title: "Transparent", tags: [], year: "2014–2019" },
    { title: "Jane the Virgin", tags: [], year: "2014–2019" },
    { title: "Better things", tags: ["gem"], year: "2016–2022" },
    { title: "Casual", tags: ["therapist"], year: "2015–2018" },
    { title: "Alone Together", tags: [], year: "2018" },
    { title: "Hacks", tags: [], year: "2021–present" },
    { title: "Big Little Lies", tags: ["therapist", "book"], year: "2017–2019" },
    { title: "Dead to Me", tags: [], year: "2019–2022" },
    { title: "One Day at a Time", tags: [], year: "2017–2020" },
    { title: "The Kominsky Method", tags: ["gem"], year: "2018–2021" },
    { title: "Sorry for your Loss", tags: ["gem"], year: "2018–2019" },
    { title: "The Last man on Earth", tags: [], year: "2015–2018" },
    { title: "Love", tags: [], year: "2016–2018" },
    { title: "Portlandia", tags: [], year: "2011–2018" },
    { title: "Shrill", tags: ["book"], year: "2019–2021" },
    { title: "Dave", tags: ["gem", "comedian"], year: "2020–present" },
    { title: "Never have I ever", tags: [], year: "2020–present" },
    { title: "Awkward.", tags: [], year: "2011–2016" },
    { title: "Dollface", tags: ["animated"], year: "2019–2022" },
    { title: "Made for Love", tags: ["book", "supernatural"], year: "2021–2022" },
    { title: "Nine Perfect Strangers", tags: ["book"], year: "2021" },
    { title: "Girlfriends' Guide to Divorce", tags: ["book"], year: "2014–2017" },
    { title: "Afterparty", tags: ["gem"], year: "2022–present" },
    { title: "Pieces of her", tags: ["book"], year: "2022" },
    { title: "On the Verge (LA)", tags: [], year: "2021" },
    { title: "Home Economics", tags: [], year: "2021–2023" },
    { title: "Euphoria", tags: ["therapist"], year: "2019–present" },
    { title: "Curb your enthusiasm", tags: ["comedian"], year: "2000–2024" },
    { title: "The Recruit", tags: ["spy"], year: "2022–present" },
    { title: "Special", tags: ["pwd"], year: "2019–2021" },
    { title: "Enlightened", tags: ["gem", "mini"], year: "2011–2013" },
    { title: "Togetherness", tags: ["gem", "mini"], year: "2015–2016" },
    { title: "Sharp Objects", tags: ["book", "mini"], year: "2018" },
    { title: "Terriers", tags: ["mini"], year: "2010" },
    { title: "Enlisted", tags: ["mini"], year: "2014" },
    { title: "I Love Dick", tags: ["gem", "book", "mini"], year: "2016–2017" },
    { title: "Girlboss", tags: ["book", "mini"], year: "2017" },
    { title: "United States of Tara", tags: ["mini"], year: "2009–2011" },
    { title: "Black Bird", tags: ["mini", "book"], year: "2022" },
    { title: "Breaking Bad", tags: [], year: "2008–2013" },
    { title: "Arrested development", tags: [], year: "2003–2019" },
    { title: "Lie to Me", tags: [], year: "2009–2011" },
    { title: "Dexter", tags: [], year: "2006–2013" },
    { title: "Grey's anatomy", tags: [], year: "2005–present" },
    { title: "Psych", tags: [], year: "2006–2014" },
    { title: "Scrubs", tags: [], year: "2001–2010" },
    { title: "The OC", tags: [], year: "2003–2007" },
    { title: "The Big Bang Theory", tags: [], year: "2007–2019" },
    { title: "Modern Family", tags: [], year: "2009–2020" }

],

"Europe": [
    { title: "The Hook Up Plan", tags: [], year: "2018–2020" },
    { title: "Emily in Paris", tags: [], year: "2020–present" },
    { title: "Elite", tags: [], year: "2018–present" },
    { title: "Valeria", tags: [], year: "2020–present" },
    { title: "The Time it Takes", tags: ["gem"], year: "2021" },
    { title: "Call my Agent", tags: [], year: "2015–2020" },
    { title: "Two Summers", tags: [], year: "2022" },
    { title: "Off the Hook(Detox)", tags: [], year: "2022" },
    { title: "Rita", tags: ["scandi"], year: "2012–2020" },
    { title: "Love Me", tags: ["scandi"], year: "2021–present" },
    { title: "Bonus Family", tags: ["gem", "scandi"], year: "2017–2020" },
    { title: "Tore", tags: ["gem", "scandi"], year: "2023–present" },
    { title: "Love & Anarchy", tags: ["scandi"], year: "2020–present" },
    { title: "Home for Christmas", tags: ["scandi"], year: "2019–2020" },
    { title: "Fallet", tags: ["scandi"], year: "2017" },
    { title: "The Åre Murders", tags: ["scandi"], year: "2025" },
    { title: "A Nearly Normal Family", tags: ["scandi"], year: "2023" },
    { title: "Secrets We Keep", tags: ["scandi"], year: "2025" },
    { title: "Murder mindfully", tags: [], year: "2024" },
    
   
],
  
"Australia/Canada": [
    { title: "Please Like Me", tags: ["gem", "comedian"], year: "2013–2016" },
    { title: "Everything's gonna be okay", tags: ["gem"], year: "2020–2021" },
    { title: "Workin' Moms", tags: ["therapist"], year: "2017–present" },
    { title: "Why are you like this?", tags: [], year: "2021" },
    { title: "The Letdown", tags: [], year: "2016–2019" },
    { title: "Michael: Tuesdays & Thursdays", tags: ["therapist"], year: "2011" },
    { title: "No Tomorrow", tags: ["mini"], year: "2016" },
    { title: "Wellmania", tags: [], year: "2023" },
    { title: "Aftertaste", tags: [], year: "2021" },
    { title: "Fisk", tags: [], year: "2021–present" },
    { title: "Deadloch", tags: [], year: "2023" },
    { title: "Heartbreak High (2022)", tags: ["gem"], year: "2022–present" },
    { title: "Upload", tags: ["supernatural"], year: "2020–present" },
    { title: "Apple Cider Vinegar", tags: [ "mini"], year: "2025"},
    { title: "Orphan Black", tags: ["supernatural"], year: "2013–2017" },

],
    
"India": [
    { title: "Made in Heaven", tags: [], year: "2019–present" },
    { title: "Gram Chikitsalay", tags: [], year:"2025" },
    { title: "Ghar Waapsi", tags: [], year:"2023—present" },
    { title: "Yeh Meri Family", tags: [], year: "2018–present" },
    { title: "The Family Man", tags: ["gem"], year: "2019–present" },
    { title: "Panchayat", tags: [], year: "2020–present" },
    { title: "Mirzapur", tags: [], year: "2018–present" },
    { title: "Sacred Games", tags: [], year: "2018–2019" },
    { title: "Pushpavalli", tags: ["comedian"], year: "2017–2020" },
    { title: "Breathe", tags: [], year: "2018–present" },
    { title: "Leila", tags: [], year: "2019" },
    { title: "Afsos", tags: [], year: "2020" },
    { title: "Paatal Lok", tags: [], year: "2020" },
    { title: "Permanent Roommates ", tags: [], year: "2014" },
    { title: "Bandish Bandits", tags: [], year: "2020" },
    { title: "Masaba Masaba", tags: [], year: "2020–present" },
    { title: "Kota Factory", tags: [], year: "2019–present" },
    { title: "Taj Mahal 1989", tags: [], year: "2020" },
    { title: "Humorously Yours", tags: ["comedian"], year: "2016" },
    { title: "Mismatched", tags: ["pwd"], year: "2020–present" },
    { title: "A Suitable Boy", tags: ["period"], year: "2020" },
    { title: "Pitchers", tags: [], year: "2015–present" },
    { title: "Little Things", tags: [], year: "2016–present" },
    { title: "Bhaag Beanie Bhaag", tags: [], year: "2020–present" },
    { title: "Scam 1992", tags: ["mini"], year: "2020" },
    { title: "Better Life Foundation", tags: [], year: "2016–present" },
    { title: "Bombay Begums", tags: [], year: "2021–present" },
    { title: "Aspirants", tags: [], year: "2021–present" },
    { title: "Aranyak", tags: [], year: "2021" },
    { title: "Yeh Kaali Kaali Ankhein", tags: [], year: "2022–present" },
    { title: "Four More shots please", tags: [], year: "2019–2022" },
    { title: "Tabbar", tags: [], year: "2021" },
    { title: "Mai: A Mother's Rage", tags: [], year: "2022" },
    { title: "Fame Game", tags: [], year: "2022" },
    { title: "Hush hush (हश हश)", tags: [], year: "2022" },
    { title: "FLAMES", tags: [], year: "2019–present" },
    { title: "JL50", tags: ["mini"], year: "2020"  },
    { title: "IC814", tags: ["mini"], year: "2024"  },
    { title: "Life hill Gayi", tags: [], year: "2024–present" },
    { title: "Shekhar Home", tags: [], year: "2024–present" },
    { title: "Gyaarah Gyaarah", tags: ["supernatural"], year: "2024"  },
    { title: "Black warrant", tags: ["book"], year: "2025–present" },
    { title: "Dahaad", tags: [], year: "2023–present" },
    { title: "A Simple Murder", tags: [], year: "2020" },
    { title: "Taaza Khabar", tags: ["supernatural"], year: "2023–present" },
    { title: "Trial by Fire", tags: ["mini"], year: "2023" },
    { title: "Jehanabad", tags: [], year: "2023–present" },
    { title: "Farzi", tags: ["gem"], year: "2023–present"},
    { title: "School of Lies", tags: [], year: "2023–present" },
    { title: "Adhura", tags: [], year: "2023–present" },
    { title: "Jee Karda", tags: [], year: "2023–present" },
    { title: "Human", tags: [], year: "2022" },
    { title: "Criminal Justice", tags: [], year: "2019–present" },
    { title: "Masoom", tags: [], year: "2022–present" },
    { title: "Kohrra", tags: [], year: "2023–present" },
    { title: "The Trial", tags: [], year: "" },
    { title: "Kaalkoot", tags: [], year: "" },
    { title: "Taali (ताली)", tags: [], year: "" },
    { title: "Aakhri Sach", tags: [], year: "" },
    { title: "Charlie Chopra", tags: ["mini"], year: "2023–present" },
    { title: "Killer Soup", tags: ["gem"], year: "2024" },
    { title: "Shehar Lakhot", tags: [], year: "2023" },
    { title: "Guns & Gulaabs", tags: [], year: "2023–present" },
    { title: "Kaala Paani", tags: [], year: "2023–present" },
    { title: "Class (क्लास)", tags: [], year: "2023–present" },
    { title: "Karmma Calling", tags: [], year: "" },
    { title: "Kumari Srimathi", tags: [], year: "2023"  },
    { title: "The Night Manager", tags: [], year: "2023" },
    { title: "Sunflower", tags: [], year: "2021–present" },
    { title: "Guilty Minds", tags: ["gem"], year: "2022–present" },
    { title: "Scoop", tags: ["mini"], year: "2023" },
    { title: "Tooth Pari", tags: ["supernatural"], year: "2023–present" },
    { title: "Loot Kaand", tags: [], year: "2025" },
    { title: "Half Love Half Arranged", tags: [], year: "2023" },
    { title: "Half CA", tags: [], year: "2023" },
    { title: "Heeramandi", tags: ["period", "mini"], year: "2024" },
    { title: "Saas Bahu aur flamingo", tags: [], year: "2023–present"},
    { title: "Broken News", tags: [], year: "2022–present" },
    { title: "Murder in Mahim", tags: ["book"], year: "2024–present" },
    { title: "Jubilee", tags: ["gem", "period"], year: "2023–present" },
    { title: "The Railway Men", tags: ["mini"], year: "2023–present" },
    { title: "Maamla Legal Hai", tags: ["gem"], year: "2024–present" },
    { title: "Maharani", tags: [], year: "2021–present" },
    { title: "Mithya", tags: [], year: "2022–present" },
    { title: "Call me Bae", tags: [],  year: "2024–present" },
    { title: "Raat Jawaan Hai", tags: ["gem"], year: "2024–present" },
    { title: "Tribhuvan Mishra CA Topper", tags: [], year: "2024–present" },
    { title: "Big Girls Don't Cry", tags: [], year: "2024–present" },
    { title: "Dupahiya", tags: [],  year: "2025–present" },
    { title: "Citadel Honey Bunny", tags: ["spy"],  year: "2024" },
    { title: "Waack Girls", tags: ["gem"],  year: "2024" },
    { title: "The Royals", tags: [],  year: "2025" },
    { title: "Dabba Cartel", tags: [],  year: "2025–present" }
    ],
   
  "Elsewhere": [
    { title: "Tyrant", tags: [], year: "2014–2016" },
    { title: "White Lotus", tags: ["classic"], year: "2021–present" },
    { title: "Blue Eye Samurai", tags: ["animated", "gem"], year: "2023" },
    { title: "The Great", tags: ["period"], year: "2020–present" },
    { title: "Ethos", tags: ["gem"], year: "2020" },
    { title: "Expats", tags: ["book"], year: "2024" },
    { title: "Asura (2025)", tags: ["period"], year: "2025" },
    { title: "Zindagi Gulzar Hai", tags: [], year: "" }
]

}
