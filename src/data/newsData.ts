export interface Article {
  id: string;
  category?: string;
  topic?: string;
  title: string;
  summary: string;
  readTime: string;
  author: string;
  date: string;
  imageUrl?: string;
  imageCaption?: string;
  commentCount?: number;
  freeToRead?: boolean;
  bulletPoints?: { bold: string; text: string }[];
  content: string[];
  audioDuration?: string;
}

export interface Comment {
  id: string;
  author: string;
  location: string;
  timeAgo: string;
  text: string;
  likes: number;
  isNYTPick?: boolean;
  replies?: {
    id: string;
    author: string;
    location: string;
    timeAgo: string;
    text: string;
  }[];
}

export const LEAD_ARTICLE: Article = {
  id: 'lead-women-administration',
  category: 'U.S. Politics',
  title: 'High-Ranking Women Are Leaving the Trump Administration',
  summary: 'In the president’s second term, those heading for the exits are female officials.',
  readTime: '5 MIN READ',
  author: 'By Maggie Haberman, Jonathan Swan and Katie Rogers',
  date: 'Wednesday, Oct. 14, 2026',
  imageUrl: '/src/assets/images/hero_admin_official_1792029120053.jpg',
  imageCaption: 'A high-ranking administration official testifying during a contentious congressional oversight committee hearing in Washington.',
  commentCount: 428,
  freeToRead: true,
  audioDuration: '5:12',
  content: [
    'WASHINGTON — A wave of high-profile departures across executive departments and national security councils has renewed intense debate inside Republican circles about representation, inner-circle power dynamics, and policymaking in the president’s second term.',
    'Over the past six weeks, four cabinet-level and deputy leaders — including key directors at the Environmental Protection Agency, the Department of the Interior, and senior communications liaisons — have submitted their resignations or indicated their departure before the upcoming midterm season.',
    'While turnover is a hallmark of second-term presidencies, several departing advisers privately pointed to an increasingly consolidated decision-making apparatus in the West Wing, where a tight-knit cadre of longtime loyalists has sidelined veteran policy specialists.',
    '“What we are witnessing is not just typical burnout,” said one former deputy secretary who spoke on the condition of anonymity to discuss sensitive personnel shifts. “There is an unmistakable narrowing of the room where the final choices are hammered out.”',
    'Senior aides to the president dismissed the premise that women were leaving at disproportionate rates, emphasizing that new appointments — including recent nominees for diplomatic posts in Europe and Latin America — reflect a broad and diverse bench of conservative leadership.',
    'Still, lawmakers on Capitol Hill have taken notice. During hearings on Tuesday, members of the Senate Oversight Committee questioned whether key diplomatic and domestic programs would suffer from administrative disruptions at a time of mounting international turbulence.'
  ]
};

export const SECONDARY_ARTICLES: Article[] = [
  {
    id: 'kimberly-guilfoyle-rise-fall',
    category: 'Politics',
    title: 'The Steep Rise and Sudden Fall of Kimberly Guilfoyle',
    summary: 'Her quick ascent in Republican circles culminated in an ambassador post, but scrutiny followed quickly.',
    readTime: '7 MIN READ',
    commentCount: 519,
    author: 'By Michael C. Bender and Shane Goldmacher',
    date: 'Wednesday, Oct. 14, 2026',
    imageUrl: '/src/assets/images/article_guilfoyle_1792029120323.jpg',
    imageCaption: 'Political allies and donors attending a private diplomatic reception on Capitol Hill earlier this month.',
    audioDuration: '6:45',
    content: [
      'For years, Kimberly Guilfoyle operated at the vibrant center of the modern conservative movement — a fiery surrogate on the rally stage, a prolific fund-raiser for presidential bids, and a ubiquitous presence at Mar-a-Lago galas.',
      'Her appointment to a prestigious European ambassadorship was intended to cap that trajectory, cementing her transition from cable news legal pundit and campaign rainmaker to accredited diplomat on the international stage.',
      'Instead, what followed was a swift unraveling punctuated by diplomatic protocol friction, staff grievances, and sudden scrutiny from Senate confirmation watchdogs regarding ethics disclosures and private consulting ties.',
      'Within months of taking up the post, reports emerged of high staff turnover in the mission chancery, accompanied by disputes with career State Department officers over protocol norms and public communications.',
      '“She brought the high-voltage arena style of prime-time media into an embassy culture that prized discretion and understated leverage,” said a veteran foreign service officer with direct knowledge of the tenure.',
      'As inquiries deepened and key allies hesitated to expend political capital in her defense, Ms. Guilfoyle announced she would step down to return to the private sector and conservative media ventures.'
    ]
  },
  {
    id: 'press-secretary-credentials',
    category: 'Media & Politics',
    title: 'Trump’s New Press Secretary: Not-Quite Attorney at Law',
    summary: 'Questions linger over credentials and legal background in a fiercely combative briefing room.',
    readTime: '4 MIN READ',
    commentCount: 284,
    author: 'By Charlie Savage',
    date: 'Wednesday, Oct. 14, 2026',
    imageUrl: '/src/assets/images/article_press_briefing_1792029120879.jpg',
    imageCaption: 'The White House press briefing room, where combative exchanges over legal authorities and administration policies have intensified.',
    audioDuration: '4:18',
    content: [
      'In his introductory appearances behind the White House briefing podium, the new press secretary repeatedly framed his combative defenses of executive orders by invoking his purported training as a constitutional attorney.',
      'Yet a review of state bar records and court admissions reveals a more nuanced reality: while he graduated from an accredited law school a decade ago, he never completed his formal bar admissions in New York or the District of Columbia, and has not practiced before federal courts.',
      'The discrepancy came into sharp focus this week during a tense clash over the administration’s use of emergency statutory authorities to redirect appropriated domestic funds.',
      'When pressed by reporters on the legal precedent being cited, the press secretary deflected, asserting that “any first-year legal scholar understands the plenary nature of Article II.”',
      'Legal ethics specialists said the distinction matters because spokespersons frequently act as the administration’s primary public interpreter of controversial regulatory and constitutional matters.',
      '“Words spoken from that lectern carry immense weight before international allies and financial markets,” noted a former White House counsel. “Precision about credentials and legal doctrine is not a trivial detail.”'
    ]
  },
  {
    id: 'ukraine-satellite-russia',
    category: 'World News',
    topic: 'Russia-Ukraine War',
    title: 'Ukraine’s Exposure Grows as Satellite Use Is Restricted and Russia Escalates',
    summary: 'New commercial satellite bandwidth curbs combine with renewed frontline barrages to test defensive grids.',
    readTime: '6 MIN READ',
    commentCount: 377,
    author: 'By Matthew Mpoke Bigg and Marc Santora',
    date: 'Wednesday, Oct. 14, 2026',
    imageUrl: '/src/assets/images/article_ukraine_satellite_1792029121933.jpg',
    imageCaption: 'Orbital reconnaissance imagery tracking tactical logistics and troop redeployments along the eastern border regions.',
    audioDuration: '5:50',
    bulletPoints: [
      {
        bold: 'Wins for Putin:',
        text: 'Moscow secures new diplomatic backchannels across central Asia.'
      },
      {
        bold: 'Escalating Assaults:',
        text: 'Drone strikes target power grids along the eastern frontlines.'
      },
      {
        bold: 'Russian Oil Deal:',
        text: 'Price caps face renewed pushback under shadow maritime fleets.'
      }
    ],
    content: [
      'KYIV, Ukraine — Ukrainian defensive commanders along the eastern front are contending with sudden disruptions to commercial satellite communication networks that have long formed the operational backbone of their artillery coordination and drone guidance systems.',
      'The limitations, imposed in part by private satellite providers seeking to prevent misuse in contested border corridors, have collided with an escalating wave of Russian combined-arms assaults targeting energy infrastructure before the winter freeze.',
      'Ukrainian officials have urgently petitioned Western allies to grant direct access to dedicated military-grade satellite uplinks, warning that reliance on ad-hoc commercial constellations creates systemic vulnerabilities.',
      '“Every second of telemetry delay translates to artillery coordinates that arrive too late,” said a brigade commander operating outside Pokrovsk. “The battle space has become transparent to whoever commands the clearest orbital eyes.”',
      'At the diplomatic level, Moscow has simultaneously leveraged energy supply pacts to build alternative payment clearing houses across Central Asia and the Gulf, blunting the enforcement of G7 price caps on maritime crude transport.',
      'With European capitals debating fresh emergency funding packages, analysts warn that the coming months will test the sustainability of Kyiv’s air defense shield as drone swarms grow increasingly sophisticated.'
    ]
  }
];

export const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'c1',
    author: 'David L.',
    location: 'Arlington, VA',
    timeAgo: '2h ago',
    likes: 142,
    isNYTPick: true,
    text: 'The trajectory described here reflects a broader structural reality: modern political staffing has increasingly prioritized television presence and ideological combativeness over institutional competence. When you place someone in an ambassadorship, you are asking them to run complex diplomatic bureaus with hundreds of career civil servants. The skills rarely transfer seamlessly.',
    replies: [
      {
        id: 'c1-r1',
        author: 'Rebecca Thorne',
        location: 'Geneva, Switzerland',
        timeAgo: '1h ago',
        text: 'Completely agree. Having worked alongside diplomatic missions for twenty years, the chancery requires quiet negotiation, deep knowledge of treaties, and cultural finesse—not Sunday morning talk show soundbites.'
      }
    ]
  },
  {
    id: 'c2',
    author: 'Elena Rostova',
    location: 'Chicago, IL',
    timeAgo: '3h ago',
    likes: 98,
    isNYTPick: true,
    text: 'What strikes me most is how fast the exit came once Senate confirmation committees demanded complete financial and consulting disclosures. The vetting process, however delayed, still serves an essential oversight function.',
    replies: []
  },
  {
    id: 'c3',
    author: 'Marcus K.',
    location: 'Austin, TX',
    timeAgo: '4h ago',
    likes: 64,
    text: 'Let us not overlook the internal factionalism. In any second administration, different camps vie for the president’s ear, and when the polls fluctuate, those without deep policy credentials are the first to be discarded.',
    replies: []
  },
  {
    id: 'c4',
    author: 'Sarah Jenkins',
    location: 'Boston, MA',
    timeAgo: '5h ago',
    likes: 41,
    text: 'The reporting is thorough. It will be interesting to see whether she returns to the media circuit or seeks another advisory role in state-level politics where she still commands a formidable donor base.',
    replies: []
  }
];

export const SECTIONS_LIST = [
  { name: 'Today’s Paper', count: '18 articles' },
  { name: 'World', count: '42 articles' },
  { name: 'U.S. Politics', count: '35 articles' },
  { name: 'Business', count: '29 articles' },
  { name: 'Technology', count: '21 articles' },
  { name: 'Science & Climate', count: '16 articles' },
  { name: 'Opinion', count: '14 essays' },
  { name: 'Arts & Books', count: '24 reviews' },
  { name: 'Lifestyle & Well', count: '19 stories' },
  { name: 'Games', count: 'Wordle, Connections, Crossword' },
  { name: 'Cooking', count: 'Recipes & Guides' },
  { name: 'Wirecutter', count: 'Product Reviews' },
  { name: 'The Athletic', count: 'Live Scores & Analysis' }
];
