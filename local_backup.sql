--
-- PostgreSQL database dump
--

\restrict kEURZdNuzpazdWaCToliOJf0ye7ViTjEPKgYwb97Zo6U73X1mdr54gPy3f5nzRI

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: AdType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."AdType" AS ENUM (
    'BANNER',
    'ASIDE',
    'POPUP'
);


ALTER TYPE public."AdType" OWNER TO postgres;

--
-- Name: Language; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Language" AS ENUM (
    'en',
    'ne'
);


ALTER TYPE public."Language" OWNER TO postgres;

--
-- Name: PostStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."PostStatus" AS ENUM (
    'DRAFT',
    'PUBLISHED',
    'ARCHIVED',
    'ONBOARDING'
);


ALTER TYPE public."PostStatus" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Advertisement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Advertisement" (
    id text NOT NULL,
    "AdTitle" text NOT NULL,
    "AdDescription" text NOT NULL,
    "AdPoster" text NOT NULL,
    "AdLink" text NOT NULL,
    "AdSponsorName" text NOT NULL,
    "AdType" public."AdType" DEFAULT 'BANNER'::public."AdType" NOT NULL,
    "isAdRunning" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Advertisement" OWNER TO postgres;

--
-- Name: BlogComment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BlogComment" (
    id text NOT NULL,
    "blogPostId" text NOT NULL,
    "userEmail" text NOT NULL,
    "userName" text NOT NULL,
    "commentText" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userImage" text NOT NULL
);


ALTER TABLE public."BlogComment" OWNER TO postgres;

--
-- Name: BlogPost; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BlogPost" (
    id text NOT NULL,
    slug text NOT NULL,
    "authorID" text NOT NULL,
    "categoryID" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "coverImage" text,
    status public."PostStatus" DEFAULT 'DRAFT'::public."PostStatus" NOT NULL,
    "viewCount" integer DEFAULT 0 NOT NULL,
    "isToggled" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."BlogPost" OWNER TO postgres;

--
-- Name: BlogTranslation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BlogTranslation" (
    id text NOT NULL,
    "blogPostId" text NOT NULL,
    language public."Language" NOT NULL,
    title text NOT NULL,
    description text,
    content jsonb NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."BlogTranslation" OWNER TO postgres;

--
-- Name: BlogViews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BlogViews" (
    id text NOT NULL,
    "blogPostId" text NOT NULL,
    "sessionId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."BlogViews" OWNER TO postgres;

--
-- Name: Category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Category" (
    id text NOT NULL,
    slug text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Category" OWNER TO postgres;

--
-- Name: CategoryTranslation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CategoryTranslation" (
    id text NOT NULL,
    "categoryId" text NOT NULL,
    language public."Language" NOT NULL,
    name text NOT NULL,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."CategoryTranslation" OWNER TO postgres;

--
-- Name: NewsletterSubscriber; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."NewsletterSubscriber" (
    id text NOT NULL,
    email text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."NewsletterSubscriber" OWNER TO postgres;

--
-- Name: Tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tag" (
    id text NOT NULL,
    slug text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Tag" OWNER TO postgres;

--
-- Name: TagOnPost; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TagOnPost" (
    "blogPostId" text NOT NULL,
    "tagId" text NOT NULL
);


ALTER TABLE public."TagOnPost" OWNER TO postgres;

--
-- Name: TagTranslation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TagTranslation" (
    id text NOT NULL,
    "tagId" text NOT NULL,
    language public."Language" NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."TagTranslation" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    name text,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Advertisement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Advertisement" (id, "AdTitle", "AdDescription", "AdPoster", "AdLink", "AdSponsorName", "AdType", "isAdRunning", "createdAt", "updatedAt") FROM stdin;
cmrbt0tf90000v7fux9i2kg4t	Ek pratishat	ek pratishat	/uploads/ad-1783498608113.webp	https://ekpratishat.com/	Ekpratishat	ASIDE	t	2026-07-08 08:16:48.117	2026-07-08 08:24:40.838
\.


--
-- Data for Name: BlogComment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."BlogComment" (id, "blogPostId", "userEmail", "userName", "commentText", "createdAt", "userImage") FROM stdin;
\.


--
-- Data for Name: BlogPost; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."BlogPost" (id, slug, "authorID", "categoryID", "createdAt", "updatedAt", "coverImage", status, "viewCount", "isToggled") FROM stdin;
cmrafdxfk0012mkfutldy8lyj	real-estate-investment-tips-in-nepal-a-complete-guide-for-beginners-and-investors-2026-1783415239031	cmr8wtyud0000ncfupizup4h9	cmraf7lfz000zmkfu8y7xyo23	2026-07-07 09:07:19.04	2026-07-08 01:29:21.246	/uploads/blog-1783415239031.jpg	PUBLISHED	1	t
cmrbt9jke000jv7fuv67vpey2	how-storytelling-sells-homes-the-storybrand-marketing-strategy-every-real-estate-agent-should-know-to-attract-more-buyers-and-close-more-deals-1783499015238	cmr8wtyud0000ncfupizup4h9	cmrbt4g1l0001v7fucxtbjody	2026-07-08 08:23:35.246	2026-07-08 08:24:23.952	/uploads/blog-1783499015238.jpeg	PUBLISHED	0	f
cmrbu14ja000wv7fuu29gavet	the-psychology-behind-successful-property-negotiation-7-proven-strategies-every-buyer-and-seller-should-know-1783500302124	cmr8wtyud0000ncfupizup4h9	cmrbtp9ef000nv7fuo52hevjl	2026-07-08 08:45:02.134	2026-07-08 08:54:24.362	/uploads/blog-1783500302123.jpeg	PUBLISHED	1	f
\.


--
-- Data for Name: BlogTranslation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."BlogTranslation" (id, "blogPostId", language, title, description, content, "createdAt", "updatedAt") FROM stdin;
cmrbtal5m000lv7futwyblrlg	cmrbt9jke000jv7fuv67vpey2	en	How Storytelling Sells Homes: The StoryBrand Marketing Strategy Every Real Estate Agent Should Know to Attract More Buyers and Close More Deals	Learn how the StoryBrand marketing strategy helps real estate agents attract more buyers, build trust through storytelling, and close more property deals with emotional marketing.	[{"id": "1783498956852-vtd6c9jbwt", "type": "heading", "level": 2, "content": "Introduction"}, {"id": "1783498959704-zk0p3q7uffa", "type": "paragraph", "content": "In today's competitive real estate market, buyers are looking for more than a property with good specifications—they're searching for a place where they can build a life. While square footage, location, and price remain important, emotions often influence the final buying decision. This is why storytelling has become one of the most effective marketing strategies for real estate professionals. Instead of simply advertising features, successful agents tell stories that help buyers imagine themselves living in the home. The StoryBrand marketing strategy embraces this idea by putting the customer at the center of every message, making marketing more engaging, memorable, and persuasive."}, {"id": "1783498968345-wx8hbu5zr8l", "type": "heading", "level": 2, "content": "Make the Buyer the Hero, Not the Property"}, {"id": "1783498973591-fw6cal4315", "type": "paragraph", "content": "Traditional property advertisements often focus on listing features such as the number of bedrooms, parking spaces, or modern amenities. Although these details matter, they rarely create an emotional connection. StoryBrand marketing encourages agents to shift the focus toward the buyer's aspirations. Rather than saying, \\"This house has four bedrooms and a large garden,\\" describe the experience those features create: waking up to peaceful mornings, watching children play safely in the backyard, or hosting family gatherings during festivals. When buyers begin to picture their future in a home, they become emotionally invested, making them far more likely to take the next step."}, {"id": "1783498978198-73whixbl534", "type": "heading", "level": 2, "content": "Build Trust Through Authentic Stories"}, {"id": "1783498982561-gz541yt7c4g", "type": "paragraph", "content": "Real estate is one of the biggest financial decisions most people will ever make, and trust plays a crucial role throughout the buying process. Sharing authentic client experiences, first-time homebuyer success stories, neighborhood highlights, or before-and-after property transformations helps establish credibility. These stories demonstrate that you're not simply selling houses—you are helping people achieve important life milestones. When buyers see genuine experiences from past clients, they feel more confident that you understand their needs and can guide them toward the right property."}, {"id": "1783498988612-b0b898flwvv", "type": "heading", "level": 2, "content": "Turn Stories into More Sales"}, {"id": "1783498994212-zl29dtwnul", "type": "paragraph", "content": "A great story should extend beyond a single property listing. Whether it's your website, social media pages, email campaigns, or video content, maintaining a consistent narrative strengthens your brand and makes your marketing more memorable. Position yourself as the trusted guide who simplifies the buying journey while allowing the customer to remain the hero of the story. People don't just purchase homes—they invest in comfort, security, and their future. By using the StoryBrand approach, real estate agents can create stronger emotional connections, attract more qualified buyers, and ultimately close more deals. In real estate, the best stories don't just sell houses—they inspire people to imagine a new chapter of their lives."}]	2026-07-08 08:24:23.952	2026-07-08 08:24:23.952
cmrbtal5m000mv7fufrnjt8ib	cmrbt9jke000jv7fuv67vpey2	ne	कसरी कथाले घर बिक्री बढाउँछ? धेरै खरिदकर्ता आकर्षित गर्न र बढी बिक्री गर्न प्रत्येक रियल इस्टेट एजेन्टले जान्नुपर्ने StoryBrand Marketing रणनीति	StoryBrand Marketing प्रयोग गरेर कथामार्फत ग्राहकसँग भावनात्मक सम्बन्ध कसरी निर्माण गर्ने, बढी खरिदकर्ता आकर्षित गर्ने र घरजग्गा बिक्री बढाउने भन्ने जान्नुहोस्।	[{"id": "1783498956852-vtd6c9jbwt", "type": "heading", "level": 2, "content": "परिचय"}, {"id": "1783498959704-zk0p3q7uffa", "type": "paragraph", "content": "आजको प्रतिस्पर्धात्मक रियल इस्टेट बजारमा मानिसहरूले केवल घर मात्र खोजिरहेका हुँदैनन्, उनीहरू आफ्नो भविष्य निर्माण गर्ने स्थान खोजिरहेका हुन्छन्। घरको आकार, स्थान र मूल्य महत्त्वपूर्ण भए पनि अन्तिम निर्णय प्रायः भावनाले प्रभाव पार्छ। यही कारणले Storytelling (कथामार्फत प्रस्तुति) रियल इस्टेट मार्केटिङको शक्तिशाली माध्यम बनेको छ। केवल घरका सुविधाहरू सूचीबद्ध गर्नुको सट्टा, सफल एजेन्टहरूले त्यस्तो कथा प्रस्तुत गर्छन् जसले सम्भावित खरिदकर्तालाई आफू त्यही घरमा बसिरहेको कल्पना गर्न प्रेरित गर्छ। StoryBrand Marketing ले पनि यही सिद्धान्त अपनाउँछ—ग्राहकलाई कथाको केन्द्रमा राख्ने र व्यवसायलाई मार्गदर्शकको भूमिकामा प्रस्तुत गर्ने।"}, {"id": "1783498968345-wx8hbu5zr8l", "type": "heading", "level": 2, "content": "घर होइन, खरिदकर्ताको भविष्य देखाउनुहोस्"}, {"id": "1783498973591-fw6cal4315", "type": "paragraph", "content": "धेरैजसो घरजग्गाका विज्ञापनहरूमा शयनकक्षको संख्या, पार्किङ सुविधा वा आधुनिक डिजाइनजस्ता विशेषताहरू मात्र उल्लेख गरिन्छ। यस्ता विवरण आवश्यक भए पनि यसले भावनात्मक सम्बन्ध निर्माण गर्न सक्दैन। StoryBrand Marketing अनुसार घरका विशेषताभन्दा त्यसले दिने अनुभवलाई प्रस्तुत गर्नु अझ प्रभावकारी हुन्छ। उदाहरणका लागि, \\"चार शयनकक्ष भएको घर\\" भन्नुभन्दा \\"परिवारसँग खुसीका पल बिताउने, बिहान शान्त वातावरणमा उठ्ने र आफ्ना बालबालिकालाई सुरक्षित आँगनमा खेलिरहेको हेर्ने घर\\" भनेर वर्णन गर्दा खरिदकर्ताले आफ्नो भविष्यको जीवन त्यही घरमा कल्पना गर्न थाल्छ। यही भावनात्मक सम्बन्धले निर्णयलाई सकारात्मक दिशामा लैजान्छ।"}, {"id": "1783498978198-73whixbl534", "type": "heading", "level": 2, "content": "वास्तविक कथामार्फत विश्वास निर्माण गर्नुहोस्"}, {"id": "1783498982561-gz541yt7c4g", "type": "paragraph", "content": "घर किन्ने निर्णय मानिसको जीवनकै ठूलो आर्थिक निर्णयमध्ये एक हो, त्यसैले विश्वास अत्यन्त आवश्यक हुन्छ। तपाईंका अघिल्ला ग्राहकहरूको अनुभव, पहिलो पटक घर किन्ने व्यक्तिको यात्रा, कुनै सम्पत्तिको सफल परिवर्तन वा स्थानीय समुदायका सकारात्मक पक्षहरू साझा गर्दा सम्भावित ग्राहकमा विश्वास बढ्छ। यस्ता वास्तविक कथाहरूले तपाईं केवल घर बेच्ने व्यक्ति होइन, सही निर्णय लिन सहयोग गर्ने विश्वसनीय मार्गदर्शक हुनुहुन्छ भन्ने सन्देश दिन्छ। जब ग्राहकले आफूलाई बुझ्ने र सहयोग गर्ने एजेन्ट भेट्छन्, उनीहरू निर्णय गर्न धेरै सहज महसुस गर्छन्।"}, {"id": "1783498988612-b0b898flwvv", "type": "heading", "level": 2, "content": "राम्रो कथाले बढी बिक्री गराउँछ"}, {"id": "1783498994212-zl29dtwnul", "type": "paragraph", "content": "एउटा राम्रो कथा केवल सम्पत्ति सूचीकरणमा सीमित हुनु हुँदैन। तपाईंको वेबसाइट, फेसबुक, इन्स्टाग्राम, युट्युब, इमेल अभियान र अन्य सबै डिजिटल माध्यममा एउटै स्पष्ट सन्देश प्रस्तुत गर्दा तपाईंको ब्रान्ड अझ विश्वसनीय र सम्झनलायक बन्छ। आफूलाई ग्राहकको सहयोगी मार्गदर्शकका रूपमा प्रस्तुत गर्नुहोस् र ग्राहकलाई कथाको मुख्य पात्र बन्न दिनुहोस्। आखिर मानिसहरूले केवल घर खरिद गर्दैनन्; उनीहरूले आफ्नो सपना, सुरक्षा र राम्रो भविष्यमा लगानी गरिरहेका हुन्छन्। StoryBrand Marketing अपनाएर रियल इस्टेट व्यवसायीहरूले ग्राहकसँग गहिरो सम्बन्ध निर्माण गर्न, बढी सम्भावित खरिदकर्ता आकर्षित गर्न र अन्ततः बढी बिक्री गर्न सक्छन्। राम्रो कथा भन्न सक्ने एजेन्टले केवल घर बिक्री गर्दैन—उसले नयाँ जीवनको सुरुवात गर्ने प्रेरणा पनि दिन्छ।"}]	2026-07-08 08:24:23.952	2026-07-08 08:24:23.952
cmrbegu3l0000k9fuaub2bb1p	cmrafdxfk0012mkfutldy8lyj	en	Real Estate Investment Tips in Nepal: A Complete Guide for Beginners and Investors (2026)	Real estate has long been considered one of the safest and most rewarding investment options in Nepal. As urbanization continues to grow and infrastructure projects expand across the country, property values are increasing in many regions, creating opportunities for both new and experienced investors.	[{"id": "1783415027954-7gsmnyxc2lb", "type": "heading", "level": 2, "content": "Introduction"}, {"id": "1783415036634-khto86oow5j", "type": "paragraph", "content": "Real estate investment in Nepal has become one of the most preferred ways to build long-term wealth. With growing cities, increasing demand for housing, and expanding infrastructure projects, property investment continues to attract both beginners and experienced investors."}, {"id": "1783415041841-7j8ycyku0vm", "type": "paragraph", "content": "However, buying land or property requires careful planning. A smart investor does not only look at the current price but also considers location, future growth, legal safety, and investment goals."}, {"id": "1783415047139-99bwyondwg", "type": "heading", "level": 2, "content": "Why Invest in Real Estate in Nepal?"}, {"id": "1783415053570-cc91ly4vwk", "type": "paragraph", "content": "Real estate is considered a stable investment option because land and property generally increase in value over time. Areas around major cities like Kathmandu, Lalitpur, and Bhaktapur have seen continuous demand due to urban growth and population expansion."}, {"id": "1783415069851-1xk430c2zel", "type": "paragraph", "content": "Some key benefits of real estate investment in Nepal include:"}, {"id": "1783415090949-lvvzt32rv4", "type": "list", "content": ["Long-term appreciation: Property values often increase over the years.", "Rental income opportunities: Residential and commercial properties can generate regular income.", "Asset security: Land and buildings are physical assets that provide financial stability.", "Protection against inflation: Real estate can help preserve wealth as prices rise."]}, {"id": "1783415107976-uv6nn1rl2u", "type": "heading", "level": 3, "content": "1. Choose the Right Location"}, {"id": "1783415114784-syej0wbu95e", "type": "paragraph", "content": "Location is the most important factor in real estate investment. A good location can significantly increase the value of your property in the future."}, {"id": "1783415118976-s8h2rorb5t", "type": "paragraph", "content": "Before investing, consider:"}, {"id": "1783415123792-ode0ad0sqx", "type": "list", "content": ["Road access and transportation facilities", "Nearby schools, hospitals, and commercial areas", "Future infrastructure development", "Demand for housing in the area"]}, {"id": "1783415127932-mom1t7a7vcb", "type": "paragraph", "content": "Investing in developing areas can provide better returns compared to already expensive locations."}, {"id": "1783415135409-9fwphtnhal", "type": "heading", "level": 3, "content": "2. Research the Market Before Buying"}, {"id": "1783415139802-zipe1ovmfoa", "type": "paragraph", "content": "Understanding the Nepal real estate market is essential before making any investment decision. Study property prices, market trends, and demand in different areas."}, {"id": "1783415144868-pcehwfez8y8", "type": "paragraph", "content": "Avoid making decisions only based on advertisements or rumors. Compare prices from multiple sources and consult experienced real estate professionals when needed."}, {"id": "1783415151419-j2digg04zin", "type": "heading", "level": 3, "content": "3. Verify Property Documents"}, {"id": "1783415155809-8qhgzv39zg4", "type": "paragraph", "content": "Legal verification is one of the most important steps in property investment. Before purchasing land or a house, check:"}, {"id": "1783415161899-tt5m8pekkam", "type": "list", "content": ["Ownership documents", "Land registration details", "Tax clearance records", "Building permits", "Land boundaries and measurements"]}, {"id": "1783415168190-418dl2r4vqm", "type": "paragraph", "content": "A proper document check helps avoid future legal problems."}, {"id": "1783415174128-b95mu1hbm6", "type": "heading", "level": 3, "content": "4. Plan Your Budget Carefully"}, {"id": "1783415177715-o09utcklf6q", "type": "paragraph", "content": "Real estate investment requires significant financial planning. Consider not only the purchase price but also additional expenses such as:"}, {"id": "1783415183176-zx33f2yzxz9", "type": "list", "content": ["Registration fees", "Taxes", "Renovation costs", "Loan interest (if applicable)", "Maintenance expenses"]}, {"id": "1783415188688-nttznkhrem", "type": "paragraph", "content": "If you are taking a home loan or property loan in Nepal, make sure the monthly repayment fits comfortably within your budget."}, {"id": "1783415194560-gj07wipu1bh", "type": "heading", "level": 3, "content": "5. Think Long-Term"}, {"id": "1783415199827-7jjl1285iz9", "type": "paragraph", "content": "Successful investors focus on long-term growth rather than quick profits. Property values may change depending on economic conditions, government policies, and market demand."}, {"id": "1783415201099-iqkjke86a7t", "type": "paragraph", "content": "Choose properties with future potential instead of investing only because prices are currently increasing."}, {"id": "1783415209745-wxtct76it5t", "type": "heading", "level": 4, "content": "Common Mistakes to Avoid"}, {"id": "1783415212422-ebd6xalxne", "type": "paragraph", "content": "Many beginners make mistakes while investing in real estate. Avoid:"}, {"id": "1783415221492-c689cj97hz", "type": "list", "content": ["Buying property without checking documents", "Investing only because others are buying", "Ignoring future development plans", "Paying too much without proper market research", "Choosing a location without growth potential"]}, {"id": "1783415227746-cx1y9uccq4", "type": "heading", "level": 2, "content": "Final Thoughts"}, {"id": "1783415232540-qh07hqsk2qp", "type": "paragraph", "content": "Real estate investment in Nepal can be a rewarding decision when done with proper research and planning. Whether you are a first-time buyer or an experienced investor, understanding the market, choosing the right location, and verifying legal documents are key steps toward successful property investment."}, {"id": "1783415236098-8eb0b6ik6np", "type": "paragraph", "content": "In 2026, smart real estate investors will focus on sustainable growth, emerging locations, and informed decision-making to maximize their returns and secure their financial future."}]	2026-07-08 01:29:21.246	2026-07-08 01:29:21.246
cmrbegu3l0001k9fu3wblh0ki	cmrafdxfk0012mkfutldy8lyj	ne	नेपालमा रियल इस्टेट लगानीका सुझावहरू: शुरुआती र लगानीकर्ताहरूका लागि पूर्ण गाइड (२०२६)	नेपालमा रियल इस्टेटलाई लामो समयदेखि सुरक्षित र लाभदायक लगानी विकल्पका रूपमा लिइँदै आएको छ। देशभर सहरीकरण बढ्दै जानुका साथै विभिन्न पूर्वाधार विकास परियोजनाहरू विस्तार भइरहेका कारण धेरै क्षेत्रहरूमा जग्गा तथा सम्पत्तिको मूल्य वृद्धि भइरहेको छ। यसले नयाँ तथा अनुभवी दुवै प्रकारका लगानीकर्ताहरूका लागि राम्रो लगानीका अवसरहरू सिर्जना गरेको छ।\n	[{"id": "1783415027954-7gsmnyxc2lb", "type": "heading", "level": 2, "content": "परिचय"}, {"id": "1783415036634-khto86oow5j", "type": "paragraph", "content": "नेपालमा रियल इस्टेट लगानी पछिल्लो समय दीर्घकालीन सम्पत्ति निर्माण गर्ने लोकप्रिय माध्यम बनेको छ। बढ्दो सहर विस्तार, पूर्वाधार विकास, र आवासको बढ्दो मागका कारण जग्गा तथा घरमा लगानी गर्ने रुचि धेरै बढेको छ।"}, {"id": "1783415041841-7j8ycyku0vm", "type": "paragraph", "content": "तर रियल इस्टेटमा लगानी गर्दा सही योजना र अनुसन्धान आवश्यक हुन्छ। सफल लगानीकर्ताले केवल हालको मूल्य मात्र हेर्दैनन्, उनीहरूले स्थान, भविष्यको सम्भावना, कानुनी सुरक्षा, र लगानीको उद्देश्यलाई पनि ध्यान दिन्छन्।"}, {"id": "1783415047139-99bwyondwg", "type": "heading", "level": 2, "content": "नेपालमा रियल इस्टेटमा किन लगानी गर्ने?"}, {"id": "1783415053570-cc91ly4vwk", "type": "paragraph", "content": "रियल इस्टेटलाई स्थिर लगानीको विकल्प मानिन्छ, किनकि जग्गा र सम्पत्तिको मूल्य समयसँगै बढ्ने सम्भावना हुन्छ। विशेषगरी काठमाडौं, ललितपुर, भक्तपुर जस्ता क्षेत्रहरूमा सहरीकरण र जनसंख्या वृद्धिका कारण सम्पत्तिको माग निरन्तर बढिरहेको छ।"}, {"id": "1783415069851-1xk430c2zel", "type": "paragraph", "content": "नेपालमा रियल इस्टेट लगानीका मुख्य फाइदाहरू:"}, {"id": "1783415090949-lvvzt32rv4", "type": "list", "content": ["दीर्घकालीन मूल्य वृद्धि: समयसँगै जग्गा र सम्पत्तिको मूल्य बढ्न सक्छ।", "भाडाबाट आम्दानी: घर, फ्ल्याट वा व्यावसायिक भवनबाट नियमित आम्दानी प्राप्त गर्न सकिन्छ।", "सम्पत्तिको सुरक्षा: घरजग्गा भौतिक सम्पत्ति भएकाले आर्थिक सुरक्षामा सहयोग गर्छ।", "मुद्रास्फीतिबाट सुरक्षा: बढ्दो महँगीको समयमा सम्पत्तिले धनको मूल्य सुरक्षित राख्न मद्दत गर्छ।"]}, {"id": "1783415107976-uv6nn1rl2u", "type": "heading", "level": 3, "content": "१. सही स्थान छनोट गर्नुहोस्"}, {"id": "1783415114784-syej0wbu95e", "type": "paragraph", "content": "१. सही स्थान छनोट गर्नुहोस्"}, {"id": "1783415118976-s8h2rorb5t", "type": "paragraph", "content": "रियल इस्टेट लगानीमा स्थान सबैभन्दा महत्वपूर्ण पक्ष हो। राम्रो स्थानमा गरिएको लगानीले भविष्यमा उच्च प्रतिफल दिन सक्छ।"}, {"id": "1783415123792-ode0ad0sqx", "type": "list", "content": ["सडक र यातायातको सुविधा", "विद्यालय, अस्पताल र बजारको नजिकपन", "भविष्यमा हुने पूर्वाधार विकास", "त्यस क्षेत्रमा घरजग्गाको माग"]}, {"id": "1783415127932-mom1t7a7vcb", "type": "paragraph", "content": "विकास हुँदै गरेका क्षेत्रमा लगानी गर्दा भविष्यमा राम्रो मूल्य वृद्धि हुने सम्भावना हुन्छ।"}, {"id": "1783415135409-9fwphtnhal", "type": "heading", "level": 3, "content": "विकास हुँदै गरेका क्षेत्रमा लगानी गर्दा भविष्यमा राम्रो मूल्य वृद्धि हुने सम्भावना हुन्छ।"}, {"id": "1783415139802-zipe1ovmfoa", "type": "paragraph", "content": "२. बजार अनुसन्धान गरेर मात्र लगानी गर्नुहोस्"}, {"id": "1783415144868-pcehwfez8y8", "type": "paragraph", "content": "नेपालको रियल इस्टेट बजार बुझ्नु लगानी गर्नुअघि आवश्यक हुन्छ। विभिन्न क्षेत्रको जग्गा मूल्य, बजारको अवस्था, र भविष्यको मागबारे अध्ययन गर्नुहोस्।"}, {"id": "1783415151419-j2digg04zin", "type": "heading", "level": 3, "content": "केवल विज्ञापन वा अरूको भनाइको आधारमा निर्णय नगर्नुहोस्। विभिन्न स्रोतबाट मूल्य तुलना गर्नुहोस् र आवश्यक परेमा अनुभवी रियल इस्टेट विशेषज्ञसँग सल्लाह लिनुहोस्।"}, {"id": "1783415155809-8qhgzv39zg4", "type": "paragraph", "content": "३. सम्पत्तिका कागजातहरू जाँच गर्नुहोस्"}, {"id": "1783415161899-tt5m8pekkam", "type": "list", "content": ["जग्गाधनी प्रमाणपत्र", "जग्गा दर्ता विवरण", "कर चुक्ता प्रमाणपत्र", "भवन निर्माण अनुमति", "जग्गाको क्षेत्रफल र सिमाना विवरण"]}, {"id": "1783415168190-418dl2r4vqm", "type": "paragraph", "content": "सही कागजात जाँचले भविष्यमा आउने कानुनी समस्याबाट बचाउन सक्छ।"}, {"id": "1783415174128-b95mu1hbm6", "type": "heading", "level": 3, "content": "सही कागजात जाँचले भविष्यमा आउने कानुनी समस्याबाट बचाउन सक्छ।"}, {"id": "1783415177715-o09utcklf6q", "type": "paragraph", "content": "४. आफ्नो बजेट राम्रोसँग योजना बनाउनुहोस्"}, {"id": "1783415183176-zx33f2yzxz9", "type": "list", "content": ["रजिस्ट्रेसन शुल्क", "कर तथा अन्य सरकारी शुल्क", "मर्मत खर्च", "ऋणको ब्याज", "नियमित हेरचाह खर्च"]}, {"id": "1783415188688-nttznkhrem", "type": "paragraph", "content": "यदि तपाईं नेपालमा होम लोन वा प्रोपर्टी लोन प्रयोग गर्दै हुनुहुन्छ भने, मासिक किस्ता आफ्नो आम्दानीअनुसार सहज हुने कुरा सुनिश्चित गर्नुहोस्।"}, {"id": "1783415194560-gj07wipu1bh", "type": "heading", "level": 3, "content": "यदि तपाईं नेपालमा होम लोन वा प्रोपर्टी लोन प्रयोग गर्दै हुनुहुन्छ भने, मासिक किस्ता आफ्नो आम्दानीअनुसार सहज हुने कुरा सुनिश्चित गर्नुहोस्।"}, {"id": "1783415199827-7jjl1285iz9", "type": "paragraph", "content": "५. दीर्घकालीन सोच राख्नुहोस्"}, {"id": "1783415201099-iqkjke86a7t", "type": "paragraph", "content": "सफल रियल इस्टेट लगानीकर्ताहरू छोटो समयको नाफाभन्दा दीर्घकालीन वृद्धिमा ध्यान दिन्छन्। बजार अवस्था, आर्थिक परिवर्तन, सरकारी नीति, र मागअनुसार सम्पत्तिको मूल्य परिवर्तन हुन सक्छ।"}, {"id": "1783415209745-wxtct76it5t", "type": "heading", "level": 4, "content": "हालको मूल्य मात्र हेरेर होइन, भविष्यमा विकास हुने सम्भावना भएका सम्पत्तिमा लगानी गर्नु बुद्धिमानी हुन्छ।"}, {"id": "1783415212422-ebd6xalxne", "type": "paragraph", "content": "रियल इस्टेट लगानी गर्दा बच्नुपर्ने सामान्य गल्तीहरू"}, {"id": "1783415221492-c689cj97hz", "type": "list", "content": ["कागजात नजाँची सम्पत्ति खरिद गर्नु", "अरूले लगानी गरिरहेका छन् भनेर मात्र लगानी गर्नु", "भविष्यको विकास योजनालाई बेवास्ता गर्नु", "बजार अनुसन्धान नगरी धेरै मूल्य तिर्नु", "सम्भावना नभएको स्थान छनोट गर्नु"]}, {"id": "1783415227746-cx1y9uccq4", "type": "heading", "level": 2, "content": "अन्तिम विचार"}, {"id": "1783415232540-qh07hqsk2qp", "type": "paragraph", "content": "नेपालमा रियल इस्टेट लगानी सही योजना र अनुसन्धानका साथ गरियो भने यो निकै लाभदायक निर्णय हुन सक्छ। चाहे तपाईं पहिलो पटक घरजग्गा खरिद गर्दै हुनुहुन्छ वा अनुभवी लगानीकर्ता हुनुहुन्छ, सही स्थान छनोट, बजार अध्ययन, र कानुनी प्रक्रिया पूरा गर्नु सफल लगानीका मुख्य आधार हुन्।"}, {"id": "1783415236098-8eb0b6ik6np", "type": "paragraph", "content": "२०२६ मा सफल रियल इस्टेट लगानीकर्ताहरूले दिगो विकास, सम्भावना भएका क्षेत्रहरू, र सही निर्णय प्रक्रियामा ध्यान दिँदै आफ्नो सम्पत्ति र आर्थिक भविष्यलाई अझ सुरक्षित बनाउन सक्छन्।"}]	2026-07-08 01:29:21.246	2026-07-08 01:29:21.246
cmrbucu74000yv7fuo7jsi6xr	cmrbu14ja000wv7fuu29gavet	en	The Psychology Behind Successful Property Negotiation: 7 Proven Strategies Every Buyer and Seller Should Know	Discover the psychology behind successful property negotiation and learn 7 proven strategies to help buyers and sellers negotiate confidently, build trust, and close better real estate deals.	[{"id": "1783499962839-yla7hkyy5ym", "type": "heading", "level": 2, "content": "Introduction"}, {"id": "1783499966564-nibv8zvxjf", "type": "paragraph", "content": "Negotiating a property deal is about much more than agreeing on a price. Every conversation between a buyer and seller involves emotions, expectations, confidence, and timing. Understanding the psychology behind these interactions can help both parties make smarter decisions, avoid costly mistakes, and reach agreements that feel fair to everyone involved."}, {"id": "1783499969779-o29lns7vsa9", "type": "paragraph", "content": "Whether you're buying your first home, selling an investment property, or working with a real estate agent, these proven negotiation strategies can significantly improve your chances of closing a successful deal."}, {"id": "1783499982037-dzdul2w1jvf", "type": "callout", "content": {"title": "", "description": "The best negotiators don't aim to \\"win\\" the conversation—they aim to create a deal where both parties feel satisfied."}}, {"id": "1783499989587-yp16e8p7lag", "type": "separator", "content": null}, {"id": "1783500013178-scvketfqwi", "type": "heading", "level": 2, "content": "Know Your Goals Before You Negotiate"}, {"id": "1783500020838-74fcstrfoeh", "type": "paragraph", "content": "Walking into a negotiation without clear objectives often leads to emotional decisions. Before discussing price, define your priorities."}, {"id": "1783500026806-24mscm0d6ad", "type": "quote", "content": "Ask yourself:"}, {"id": "1783500034111-b1wtxb4z4n", "type": "list", "content": ["What is my ideal price?", "What is the highest (or lowest) amount I'm willing to accept?", "Which terms are negotiable?", "When do I need the transaction completed?"]}, {"id": "1783500040258-bc7pb8fdw4j", "type": "paragraph", "content": "Having clear limits helps you negotiate confidently and prevents impulsive decisions."}, {"id": "1783500043341-125e6o5rgfsq", "type": "separator", "content": null}, {"id": "1783500052079-e2n37nbq2e", "type": "heading", "level": 2, "content": "Understand the Other Person's Motivation"}, {"id": "1783500057702-y435e73muk", "type": "paragraph", "content": "Successful negotiators spend more time listening than talking."}, {"id": "1783500066598-803bcn9npcr", "type": "paragraph", "content": "A seller may be:"}, {"id": "1783500073027-p5cgglhvqbg", "type": "list", "content": ["Relocating for work", "Facing financial pressure", "Looking for a quick sale"]}, {"id": "1783500082216-hkg2vaf6qxl", "type": "paragraph", "content": "A buyer may be:"}, {"id": "1783500090799-hrnpnzqrcl5", "type": "list", "content": ["Purchasing their first home", "Searching within a fixed budget", "Comparing multiple properties"]}, {"id": "1783500096210-nqr838bgaf", "type": "paragraph", "content": "The more you understand the other party's motivation, the easier it becomes to propose solutions that benefit both sides."}, {"id": "1783500104798-se6f67i1m5e", "type": "callout", "content": {"title": "", "description": "People don't always reject an offer because of the price. Timing, convenience, and certainty often matter just as much."}}, {"id": "1783500118113-h3rrxqd3sak", "type": "heading", "level": 2, "content": "Control Emotions and Build Trust"}, {"id": "1783500123295-7dwez1joytq", "type": "paragraph", "content": "Real estate transactions often involve significant financial and emotional investment. Remaining calm and respectful throughout the process builds credibility."}, {"id": "1783500126859-0slkner9ankj", "type": "paragraph", "content": "Avoid:"}, {"id": "1783500133476-cstshzxyws", "type": "list", "content": ["Making rushed decisions", "Taking counteroffers personally", "Applying unnecessary pressure", "Becoming overly attached to a single outcome"]}, {"id": "1783500144789-lfgc3o6aps", "type": "paragraph", "content": "Buyers and sellers are far more likely to cooperate with someone they trust."}, {"id": "1783500149436-k8lak9cnsn9", "type": "separator", "content": null}, {"id": "1783500160041-n2abjktau9", "type": "heading", "level": 2, "content": "Use Data Instead of Assumptions"}, {"id": "1783500165207-2op3cfv3oxq", "type": "paragraph", "content": "Negotiations become stronger when supported by facts rather than opinions."}, {"id": "1783500168676-2zyhb2n6njo", "type": "paragraph", "content": "Consider using:"}, {"id": "1783500175641-5c4i1e7m4l2", "type": "list", "content": ["Recent market prices", "Comparable property sales", "Neighborhood demand", "Property condition", "Future development plans"]}, {"id": "1783500185980-qa7nfvzejq", "type": "paragraph", "content": "Reliable information creates confidence and helps justify your offer or asking price."}, {"id": "1783500192402-b4pyi1rcqxw", "type": "callout", "content": {"title": "", "description": "Market research gives you leverage. Emotional arguments rarely do."}}, {"id": "1783500194967-u7xu4dlwmx", "type": "separator", "content": null}, {"id": "1783500207150-kfiqc7bmo98", "type": "heading", "level": 2, "content": "Master the Art of Silence"}, {"id": "1783500213978-tta4ob63wh8", "type": "paragraph", "content": "One of the most underrated negotiation skills is knowing when not to speak.\\n\\nAfter presenting an offer, resist the urge to immediately justify it. Silence often encourages the other party to think carefully, reveal additional information, or even improve their position.\\n\\nConfident negotiators understand that every pause doesn't need to be filled with words."}, {"id": "1783500226946-8dkmmw6noqp", "type": "heading", "level": 2, "content": "Look Beyond the Purchase Price"}, {"id": "1783500235371-clnzqqa6x1b", "type": "paragraph", "content": "Price isn't the only negotiable element in a property transaction."}, {"id": "1783500238891-to2f2vzsih", "type": "paragraph", "content": "You can also negotiate:"}, {"id": "1783500245784-6q5mfrpym99", "type": "list", "content": ["Closing dates", "Furniture and appliances", "Repair responsibilities", "Payment schedules", "Deposit terms", "Legal fees"]}, {"id": "1783500253302-uwg3e9f0jhg", "type": "paragraph", "content": "Being flexible in these areas often makes it easier to reach an agreement."}, {"id": "1783500261258-sglcav6wp1", "type": "heading", "level": 2, "content": "Know When to Walk Away"}, {"id": "1783500270575-yoab284z0gc", "type": "paragraph", "content": "Not every deal is the right deal.\\n\\nIf negotiations exceed your budget, involve unreasonable demands, or create unnecessary risk, walking away may be the smartest decision. There will always be other opportunities, and protecting your long-term financial interests should remain the priority."}, {"id": "1783500277552-371gfojbbo2", "type": "callout", "content": {"title": "", "description": "The strongest negotiating position is being willing to walk away from a bad deal."}}, {"id": "1783500283606-sa4mi7yq77f", "type": "heading", "level": 2, "content": "Final Thoughts"}, {"id": "1783500291409-x3a9lrwbisg", "type": "paragraph", "content": "Successful property negotiation isn't about being aggressive or outsmarting the other person. It's about preparation, understanding human psychology, communicating clearly, and finding common ground. Buyers who remain informed and sellers who stay flexible are far more likely to achieve favorable outcomes.\\n\\nWhether you're purchasing your dream home or selling a valuable investment, mastering these psychological strategies can help you negotiate with confidence and close better property deals."}]	2026-07-08 08:54:08.606	2026-07-08 08:54:08.606
cmrbucu74000zv7fut6eap8u8	cmrbu14ja000wv7fuu29gavet	ne	सफल घरजग्गा वार्ताको मनोविज्ञान: प्रत्येक खरिदकर्ता र विक्रेताले जान्नुपर्ने ७ प्रभावकारी रणनीतिहरू	घरजग्गा वार्ताको मनोविज्ञान बुझ्नुहोस् र खरिदकर्ता तथा विक्रेताले आत्मविश्वासका साथ सफल सम्झौता गर्न अपनाउनुपर्ने ७ प्रभावकारी रणनीतिहरू जान्नुहोस्।	[{"id": "1783499962839-yla7hkyy5ym", "type": "heading", "level": 2, "content": "परिचय"}, {"id": "1783499966564-nibv8zvxjf", "type": "paragraph", "content": "घरजग्गा खरिद–बिक्रीमा सफल सम्झौता केवल मूल्यमा सहमति जनाउनु मात्र होइन। प्रत्येक वार्तामा भावना, विश्वास, समय, अपेक्षा र निर्णय गर्ने शैलीले ठूलो भूमिका खेल्छ। यी मनोवैज्ञानिक पक्षहरू बुझ्न सकेमा खरिदकर्ता र विक्रेता दुवैले राम्रो निर्णय लिन, अनावश्यक विवाद टार्न र दुवै पक्षलाई सन्तुष्ट बनाउने सम्झौता गर्न सक्छन्।"}, {"id": "1783499969779-o29lns7vsa9", "type": "paragraph", "content": "यस लेखमा घरजग्गा वार्ताको मनोविज्ञानलाई सरल रूपमा बुझाउँदै खरिदकर्ता र विक्रेताले अपनाउन सक्ने ७ प्रभावकारी रणनीतिहरू प्रस्तुत गरिएको छ। यी सुझावहरूले तपाईंलाई आत्मविश्वासका साथ वार्ता गर्न, अनावश्यक गल्तीहरूबाट बच्न, सही समयमा सही निर्णय लिन र दुवै पक्षका लागि लाभदायक सम्झौता गर्न सहयोग गर्नेछन्। चाहे तपाईं पहिलो पटक घर किन्दै हुनुहोस् वा आफ्नो सम्पत्ति बिक्री गर्दै हुनुहोस्, यी व्यावहारिक उपायहरूले अझ सफल र सहज घरजग्गा कारोबार गर्न मद्दत गर्नेछन्।"}, {"id": "1783499982037-dzdul2w1jvf", "type": "callout", "content": {"title": "", "description": "घरजग्गा खरिद–बिक्रीमा सफल सम्झौता केवल मूल्यमा सहमति जनाउनु मात्र होइन। प्रत्येक वार्तामा भावना, विश्वास, समय, अपेक्षा र निर्णय गर्ने शैलीले ठूलो भूमिका खेल्छ। यी मनोवैज्ञानिक पक्षहरू बुझ्न सकेमा खरिदकर्ता र विक्रेता दुवैले राम्रो निर्णय लिन, अनावश्यक विवाद टार्न र दुवै पक्षलाई सन्तुष्ट बनाउने सम्झौता गर्न सक्छन्।"}}, {"id": "1783499989587-yp16e8p7lag", "type": "separator", "content": null}, {"id": "1783500013178-scvketfqwi", "type": "heading", "level": 2, "content": "वार्ता सुरु गर्नु अघि आफ्नो लक्ष्य स्पष्ट बनाउनुहोस्"}, {"id": "1783500020838-74fcstrfoeh", "type": "paragraph", "content": "वार्तामा प्रवेश गर्नु अघि आफ्नो बजेट, स्वीकार गर्न सकिने न्यूनतम वा अधिकतम मूल्य, समयसीमा र अन्य सर्तहरू स्पष्ट राख्नुहोस्।"}, {"id": "1783500026806-24mscm0d6ad", "type": "quote", "content": "आफैलाई सोध्नुहोस्:"}, {"id": "1783500034111-b1wtxb4z4n", "type": "list", "content": ["मेरो लक्ष्य मूल्य कति हो?", "म अधिकतम वा न्यूनतम कति स्वीकार गर्न सक्छु?", "कुन सर्तहरू परिवर्तन गर्न सकिन्छ?", "सम्झौता कहिलेसम्म सम्पन्न गर्न चाहन्छु?"]}, {"id": "1783500040258-bc7pb8fdw4j", "type": "paragraph", "content": "आफ्नो अधिकतम र न्यूनतम सीमा पहिले नै तय गर्दा वार्ताका क्रममा आत्मविश्वासका साथ निर्णय लिन सजिलो हुन्छ र भावनामा बगेर हतारमा निर्णय गर्ने सम्भावना पनि कम हुन्छ।"}, {"id": "1783500043341-125e6o5rgfsq", "type": "separator", "content": null}, {"id": "1783500052079-e2n37nbq2e", "type": "heading", "level": 2, "content": "अर्को पक्षको आवश्यकता बुझ्ने प्रयास गर्नुहोस्"}, {"id": "1783500057702-y435e73muk", "type": "paragraph", "content": "धेरैजसो सफल वार्ताकारले बोल्नुभन्दा बढी सुन्छन्।"}, {"id": "1783500066598-803bcn9npcr", "type": "paragraph", "content": "विक्रेता:"}, {"id": "1783500073027-p5cgglhvqbg", "type": "list", "content": ["छिटो बिक्री गर्न चाहन सक्छ।", "आर्थिक दबाबमा हुन सक्छ।", "अर्को ठाउँमा सर्नुपर्ने हुन सक्छ।"]}, {"id": "1783500082216-hkg2vaf6qxl", "type": "paragraph", "content": "खरिदकर्ता:"}, {"id": "1783500090799-hrnpnzqrcl5", "type": "list", "content": ["पहिलो पटक घर किन्दै हुन सक्छ।", "सीमित बजेटमा हुन सक्छ।", "अन्य सम्पत्तिहरूसँग तुलना गरिरहेको हुन सक्छ।"]}, {"id": "1783500096210-nqr838bgaf", "type": "paragraph", "content": "अर्को पक्षको उद्देश्य र आवश्यकता जति राम्रोसँग बुझ्न सक्नुहुन्छ, दुवै पक्षका लागि लाभदायक समाधान खोज्न त्यति नै सजिलो हुन्छ।"}, {"id": "1783500104798-se6f67i1m5e", "type": "callout", "content": {"title": "", "description": "धेरै पटक मूल्यभन्दा पनि समय, सुविधा र निश्चितता बढी महत्त्वपूर्ण हुन्छ।"}}, {"id": "1783500118113-h3rrxqd3sak", "type": "heading", "level": 2, "content": "भावनालाई नियन्त्रण गर्नुहोस् र विश्वास निर्माण गर्नुहोस्"}, {"id": "1783500123295-7dwez1joytq", "type": "paragraph", "content": "रियल इस्टेटको वार्तामा धैर्यता, सम्मान र स्पष्ट संवादले विश्वास बढाउँछ। आवेगमा निर्णय नगर्नुहोस् र प्रत्येक प्रस्तावलाई व्यक्तिगत रूपमा नलिनुहोस्।"}, {"id": "1783500126859-0slkner9ankj", "type": "paragraph", "content": "यी कुराहरूबाट टाढा रहनुहोस्:"}, {"id": "1783500133476-cstshzxyws", "type": "list", "content": ["हतारमा निर्णय नगर्नुहोस्।", "प्रतिप्रस्ताव (Counteroffer) लाई व्यक्तिगत रूपमा नलिनुहोस्।", "अनावश्यक दबाब सिर्जना नगर्नुहोस्।", "एउटै नतिजामा अत्यधिक आश्रित नबन्नुहोस्।"]}, {"id": "1783500144789-lfgc3o6aps", "type": "paragraph", "content": "खरिदकर्ता र विक्रेता दुवैले विश्वास गर्न सक्ने व्यक्तिसँग सहकार्य गर्न र सम्झौतामा पुग्न बढी सहज महसुस गर्छन्।"}, {"id": "1783500149436-k8lak9cnsn9", "type": "separator", "content": null}, {"id": "1783500160041-n2abjktau9", "type": "heading", "level": 2, "content": "तथ्यमा आधारित वार्ता गर्नुहोस्, अनुमानमा होइन"}, {"id": "1783500165207-2op3cfv3oxq", "type": "paragraph", "content": "तथ्य र प्रमाणका आधारमा गरिएको वार्ता व्यक्तिगत धारणा वा अनुमानमा आधारित वार्ताभन्दा बढी प्रभावकारी हुन्छ।"}, {"id": "1783500168676-2zyhb2n6njo", "type": "paragraph", "content": "वार्ता गर्दा यी जानकारी उपयोगी हुन सक्छन्:"}, {"id": "1783500175641-5c4i1e7m4l2", "type": "list", "content": ["हालको बजार मूल्य", "समान प्रकारका सम्पत्तिको हालैको बिक्री मूल्य", "उक्त क्षेत्रको माग र बजार अवस्था", "सम्पत्तिको भौतिक अवस्था र उपलब्ध सुविधाहरू", "भविष्यमा हुने पूर्वाधार तथा विकास योजनाहरू"]}, {"id": "1783500185980-qa7nfvzejq", "type": "paragraph", "content": "विश्वसनीय तथ्य तथा जानकारीले तपाईंको निर्णयप्रति विश्वास बढाउँछ र प्रस्ताव गरिएको मूल्य उचित भएको प्रमाणित गर्न सहयोग गर्छ।"}, {"id": "1783500192402-b4pyi1rcqxw", "type": "callout", "content": {"title": "", "description": "तथ्य र प्रमाणका आधारमा गरिएको वार्ता बढी प्रभावकारी हुन्छ, जबकि अनुमानका आधारमा गरिएका तर्कले विश्वास कम गराउँछन्।"}}, {"id": "1783500194967-u7xu4dlwmx", "type": "separator", "content": null}, {"id": "1783500207150-kfiqc7bmo98", "type": "heading", "level": 2, "content": "मौनताको सही प्रयोग गर्न सिक्नुहोस्"}, {"id": "1783500213978-tta4ob63wh8", "type": "paragraph", "content": "वार्तामा सफल हुन आवश्यक पर्ने तर धेरैले बेवास्ता गर्ने सीपमध्ये एक हो—कहिले नबोल्ने भन्ने जान्नु।\\n\\nआफ्नो प्रस्ताव राखिसकेपछि त्यसलाई तुरुन्तै लामो व्याख्या गरेर सही साबित गर्ने प्रयास नगर्नुहोस्। केही समयको मौनताले अर्को पक्षलाई प्रस्तावबारे गम्भीर रूपमा सोच्ने, आफ्नो धारणा खुलाएर बताउने वा अझ राम्रो प्रस्ताव ल्याउने अवसर दिन सक्छ।\\n\\nअनुभवी वार्ताकारहरूलाई थाहा हुन्छ कि हरेक मौनतालाई शब्दले भरिरहनु आवश्यक हुँदैन। कहिलेकाहीँ केही क्षणको धैर्यताले धेरै प्रभावकारी परिणाम दिन सक्छ।"}, {"id": "1783500226946-8dkmmw6noqp", "type": "heading", "level": 2, "content": "केवल मूल्यमा होइन, अन्य सर्तहरूमा पनि ध्यान दिनुहोस्"}, {"id": "1783500235371-clnzqqa6x1b", "type": "paragraph", "content": "घरजग्गा कारोबारमा मूल्य मात्र वार्ताको विषय हुँदैन। धेरै अवस्थामा अन्य सर्तहरूमा लचकता देखाउँदा दुवै पक्षका लागि सहज र सन्तोषजनक सम्झौता गर्न सकिन्छ।"}, {"id": "1783500238891-to2f2vzsih", "type": "paragraph", "content": "वार्ता गर्न सकिने केही अन्य विषयहरू:"}, {"id": "1783500245784-6q5mfrpym99", "type": "list", "content": ["सम्पत्ति हस्तान्तरण गर्ने मिति", "फर्निचर तथा विद्युतीय उपकरणहरू समावेश गर्ने वा नगर्ने", "मर्मतसम्भारको जिम्मेवारी", "भुक्तानी गर्ने समयतालिका", "अग्रिम रकम (Deposit) सम्बन्धी सर्तहरू", "कानुनी प्रक्रिया तथा सम्बन्धित खर्च"]}, {"id": "1783500253302-uwg3e9f0jhg", "type": "paragraph", "content": "यी पक्षहरूमा आवश्यक लचकता अपनाउँदा दुवै पक्षको आवश्यकता पूरा हुने सम्भावना बढ्छ र सफल सम्झौतामा पुग्न सजिलो हुन्छ।"}, {"id": "1783500261258-sglcav6wp1", "type": "heading", "level": 2, "content": "आवश्यक परे सम्झौताबाट पछि हट्न पनि तयार हुनुहोस्"}, {"id": "1783500270575-yoab284z0gc", "type": "paragraph", "content": "हरेक सम्झौता तपाईंका लागि उपयुक्त हुन्छ भन्ने आवश्यक छैन। यदि प्रस्ताव तपाईंको बजेटभन्दा बाहिर छ, अनावश्यक जोखिम समावेश छ वा तपाईंका दीर्घकालीन हितसँग मेल खाँदैन भने त्यस्तो सम्झौता स्वीकार गर्नु बुद्धिमानी हुँदैन।\\n\\nकहिलेकाहीँ गलत सम्झौता स्वीकार गर्नुभन्दा त्यसबाट पछि हट्नु नै राम्रो निर्णय हुन्छ। भविष्यमा अझ उपयुक्त अवसरहरू आउन सक्छन्, त्यसैले क्षणिक दबाबमा परेर निर्णय गर्नु उचित हुँदैन।"}, {"id": "1783500277552-371gfojbbo2", "type": "callout", "content": {"title": "", "description": "यदि कुनै सम्झौता तपाईंको हितमा छैन भने त्यसबाट पछि हट्न सक्नु नै सफल वार्ताकारको वास्तविक शक्ति हो।"}}, {"id": "1783500283606-sa4mi7yq77f", "type": "heading", "level": 2, "content": "निष्कर्ष"}, {"id": "1783500291409-x3a9lrwbisg", "type": "paragraph", "content": "सफल घरजग्गा वार्ता भनेको अर्को पक्षलाई हराउने प्रतिस्पर्धा होइन, दुवै पक्षका लागि लाभदायक समाधान खोज्ने प्रक्रिया हो। राम्रो तयारी, सही जानकारी, स्पष्ट संवाद, धैर्यता र मानव व्यवहारको मनोविज्ञान बुझ्ने क्षमताले वार्तालाई धेरै प्रभावकारी बनाउँछ।\\n\\nचाहे तपाईं पहिलो पटक घर खरिद गर्दै हुनुहोस् वा आफ्नो सम्पत्ति बिक्री गर्दै हुनुहोस्, यी सात रणनीतिहरूले तपाईंलाई आत्मविश्वासका साथ निर्णय लिन, अनावश्यक गल्तीहरूबाट जोगिन र सफल सम्झौतामा पुग्न सहयोग गर्नेछन्। अन्ततः, सफल वार्ताको आधार केवल राम्रो मूल्य प्राप्त गर्नु होइन, दुवै पक्षले विश्वास र सन्तुष्टिका साथ सम्झौता सम्पन्न गर्नु हो।"}]	2026-07-08 08:54:08.606	2026-07-08 08:54:08.606
\.


--
-- Data for Name: BlogViews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."BlogViews" (id, "blogPostId", "sessionId", "createdAt") FROM stdin;
cmrafzm4n001emkfumc8ty8nw	cmrafdxfk0012mkfutldy8lyj	c3f9680b-ce7f-47e1-8279-94e675bc5a56	2026-07-07 09:24:10.823
cmrbud6co0010v7fuwvghwx60	cmrbu14ja000wv7fuu29gavet	c3f9680b-ce7f-47e1-8279-94e675bc5a56	2026-07-08 08:54:24.36
\.


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Category" (id, slug, "createdAt", "updatedAt") FROM stdin;
cmracb1hw0002mkfu7pzekkgg	home-loans-property-financing	2026-07-07 07:41:05.492	2026-07-07 07:41:05.492
cmraf7lfz000zmkfu8y7xyo23	real-estate-investment-tips	2026-07-07 09:02:23.567	2026-07-07 09:02:23.567
cmrbt4g1l0001v7fucxtbjody	real-estate-marketing	2026-07-08 08:19:37.401	2026-07-08 08:19:37.401
cmrbtp9ef000nv7fuo52hevjl	real-estate-tips	2026-07-08 08:35:48.567	2026-07-08 08:35:48.567
\.


--
-- Data for Name: CategoryTranslation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CategoryTranslation" (id, "categoryId", language, name, description, "createdAt", "updatedAt") FROM stdin;
cmracb1hx0003mkfupfhmaki7	cmracb1hw0002mkfu7pzekkgg	en	Home Loans & Property Financing	\N	2026-07-07 07:41:05.492	2026-07-07 07:41:05.492
cmracb1hx0004mkfuk6boc5uw	cmracb1hw0002mkfu7pzekkgg	ne	गृह ऋण तथा घरजग्गा वित्तीय व्यवस्था	\N	2026-07-07 07:41:05.492	2026-07-07 07:41:05.492
cmraf7lfz0010mkful9d9qavl	cmraf7lfz000zmkfu8y7xyo23	en	Real Estate Investment Tips	\N	2026-07-07 09:02:23.567	2026-07-07 09:02:23.567
cmraf7lfz0011mkfuevr2tg86	cmraf7lfz000zmkfu8y7xyo23	ne	नेपालमा रियल इस्टेट लगानीका सुझावहरू	\N	2026-07-07 09:02:23.567	2026-07-07 09:02:23.567
cmrbt4g1m0002v7fuh1ofg2u1	cmrbt4g1l0001v7fucxtbjody	en	Real Estate Marketing	\N	2026-07-08 08:19:37.401	2026-07-08 08:19:37.401
cmrbt4g1m0003v7fupkvugdcc	cmrbt4g1l0001v7fucxtbjody	ne	रियल इस्टेट मार्केटिङ	\N	2026-07-08 08:19:37.401	2026-07-08 08:19:37.401
cmrbtp9eg000ov7fu19hy1eci	cmrbtp9ef000nv7fuo52hevjl	en	Real Estate Tips	\N	2026-07-08 08:35:48.567	2026-07-08 08:35:48.567
cmrbtp9eg000pv7fumagixnls	cmrbtp9ef000nv7fuo52hevjl	ne	रियल इस्टेट सुझाव	\N	2026-07-08 08:35:48.567	2026-07-08 08:35:48.567
\.


--
-- Data for Name: NewsletterSubscriber; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."NewsletterSubscriber" (id, email, "createdAt") FROM stdin;
\.


--
-- Data for Name: Tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Tag" (id, slug, "createdAt", "updatedAt") FROM stdin;
cmracbpxx0005mkfuejxntzy4	first-time-home-buyer-nepal	2026-07-07 07:41:37.173	2026-07-07 07:41:37.173
cmraccbcu0008mkfuuvhdulja	kathmandu-real-estate	2026-07-07 07:42:04.926	2026-07-07 07:42:04.926
cmraccq2c000bmkfujz85smyt	nepal-property-buyers	2026-07-07 07:42:23.988	2026-07-07 07:42:23.988
cmracczxb000emkfuk7cxmt1i	land-investment-nepal	2026-07-07 07:42:36.767	2026-07-07 07:42:36.767
cmracd989000hmkfuo6mok3za	luxury-homes	2026-07-07 07:42:48.825	2026-07-07 07:42:48.825
cmracdihy000kmkfu2brep5f0	home-loan-nepal	2026-07-07 07:43:00.838	2026-07-07 07:43:00.838
cmracds5e000nmkfuzm71x8t7	bank-loan-nepal	2026-07-07 07:43:13.346	2026-07-07 07:43:13.346
cmrace00z000qmkfuscqjh8c3	property-financing-nepal	2026-07-07 07:43:23.555	2026-07-07 07:43:23.555
cmrbt4u0y0004v7fuuvhc32q7	storybrand-marketing	2026-07-08 08:19:55.522	2026-07-08 08:19:55.522
cmrbt54hv0007v7fubpo3l4rm	real-estate-marketing	2026-07-08 08:20:09.091	2026-07-08 08:20:09.091
cmrbt5b52000av7fuke24stq4	property-marketing	2026-07-08 08:20:17.702	2026-07-08 08:20:17.702
cmrbt5jxn000dv7fupoqgv1nt	home-selling-tips	2026-07-08 08:20:29.099	2026-07-08 08:20:29.099
cmrbt6cjl000gv7furwynyc3j	real-estate-agent	2026-07-08 08:21:06.177	2026-07-08 08:21:06.177
cmrbtpqs2000qv7fucc9gw2yy	property-negotiation	2026-07-08 08:36:11.09	2026-07-08 08:36:11.09
cmrbtq9dd000tv7fuln3u87ht	home-buying-tips	2026-07-08 08:36:35.185	2026-07-08 08:36:35.185
\.


--
-- Data for Name: TagOnPost; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TagOnPost" ("blogPostId", "tagId") FROM stdin;
cmrafdxfk0012mkfutldy8lyj	cmracbpxx0005mkfuejxntzy4
cmrafdxfk0012mkfutldy8lyj	cmraccbcu0008mkfuuvhdulja
cmrafdxfk0012mkfutldy8lyj	cmracczxb000emkfuk7cxmt1i
cmrafdxfk0012mkfutldy8lyj	cmracd989000hmkfuo6mok3za
cmrafdxfk0012mkfutldy8lyj	cmrace00z000qmkfuscqjh8c3
cmrbt9jke000jv7fuv67vpey2	cmraccbcu0008mkfuuvhdulja
cmrbt9jke000jv7fuv67vpey2	cmrbt4u0y0004v7fuuvhc32q7
cmrbt9jke000jv7fuv67vpey2	cmrbt54hv0007v7fubpo3l4rm
cmrbt9jke000jv7fuv67vpey2	cmrbt5b52000av7fuke24stq4
cmrbt9jke000jv7fuv67vpey2	cmrbt5jxn000dv7fupoqgv1nt
cmrbt9jke000jv7fuv67vpey2	cmrbt6cjl000gv7furwynyc3j
cmrbu14ja000wv7fuu29gavet	cmracczxb000emkfuk7cxmt1i
cmrbu14ja000wv7fuu29gavet	cmraccbcu0008mkfuuvhdulja
cmrbu14ja000wv7fuu29gavet	cmrbt54hv0007v7fubpo3l4rm
cmrbu14ja000wv7fuu29gavet	cmrbt5b52000av7fuke24stq4
cmrbu14ja000wv7fuu29gavet	cmrbt5jxn000dv7fupoqgv1nt
cmrbu14ja000wv7fuu29gavet	cmrbt6cjl000gv7furwynyc3j
cmrbu14ja000wv7fuu29gavet	cmrbtpqs2000qv7fucc9gw2yy
cmrbu14ja000wv7fuu29gavet	cmrbtq9dd000tv7fuln3u87ht
\.


--
-- Data for Name: TagTranslation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TagTranslation" (id, "tagId", language, name, "createdAt", "updatedAt") FROM stdin;
cmracbpxx0006mkfuvcs08dsv	cmracbpxx0005mkfuejxntzy4	en	First-Time Home Buyer Nepal	2026-07-07 07:41:37.173	2026-07-07 07:41:37.173
cmracbpxx0007mkfu2xbtno04	cmracbpxx0005mkfuejxntzy4	ne	नेपालमा पहिलो पटक घर किन्नेहरू	2026-07-07 07:41:37.173	2026-07-07 07:41:37.173
cmraccbcv0009mkfubjyl15k6	cmraccbcu0008mkfuuvhdulja	en	Kathmandu Real Estate	2026-07-07 07:42:04.926	2026-07-07 07:42:04.926
cmraccbcv000amkfuq8yi6qot	cmraccbcu0008mkfuuvhdulja	ne	काठमाडौंको घरजग्गा बजार	2026-07-07 07:42:04.926	2026-07-07 07:42:04.926
cmraccq2c000cmkfuo6aedl8e	cmraccq2c000bmkfujz85smyt	en	Nepal Property Buyers	2026-07-07 07:42:23.988	2026-07-07 07:42:23.988
cmraccq2c000dmkfupix4h76o	cmraccq2c000bmkfujz85smyt	ne	नेपालका घरजग्गा खरिदकर्ता	2026-07-07 07:42:23.988	2026-07-07 07:42:23.988
cmracczxb000fmkfuivtalr9k	cmracczxb000emkfuk7cxmt1i	en	Land Investment Nepal	2026-07-07 07:42:36.767	2026-07-07 07:42:36.767
cmracczxb000gmkfudrb5sv5b	cmracczxb000emkfuk7cxmt1i	ne	नेपालमा जग्गा लगानी	2026-07-07 07:42:36.767	2026-07-07 07:42:36.767
cmracd98a000imkfu56e6iqq3	cmracd989000hmkfuo6mok3za	en	Luxury Homes	2026-07-07 07:42:48.825	2026-07-07 07:42:48.825
cmracd98a000jmkfuike89079	cmracd989000hmkfuo6mok3za	ne	विलासी आवास	2026-07-07 07:42:48.825	2026-07-07 07:42:48.825
cmracdihz000lmkfuig96vrbg	cmracdihy000kmkfu2brep5f0	en	Home Loan Nepal	2026-07-07 07:43:00.838	2026-07-07 07:43:00.838
cmracdihz000mmkfu8lvi5i1b	cmracdihy000kmkfu2brep5f0	ne	नेपालमा गृह ऋण	2026-07-07 07:43:00.838	2026-07-07 07:43:00.838
cmracds5f000omkfux1e9oj78	cmracds5e000nmkfuzm71x8t7	en	Bank Loan Nepal	2026-07-07 07:43:13.346	2026-07-07 07:43:13.346
cmracds5f000pmkfub287uyrm	cmracds5e000nmkfuzm71x8t7	ne	नेपालमा बैंक ऋण	2026-07-07 07:43:13.346	2026-07-07 07:43:13.346
cmrace00z000rmkfuynbw3vj6	cmrace00z000qmkfuscqjh8c3	en	Property Financing Nepal	2026-07-07 07:43:23.555	2026-07-07 07:43:23.555
cmrace00z000smkfuuhshanvr	cmrace00z000qmkfuscqjh8c3	ne	नेपालमा घरजग्गा वित्तीय व्यवस्था	2026-07-07 07:43:23.555	2026-07-07 07:43:23.555
cmrbt4u0y0005v7fu7nwia5ll	cmrbt4u0y0004v7fuuvhc32q7	en	StoryBrand Marketing	2026-07-08 08:19:55.522	2026-07-08 08:19:55.522
cmrbt4u0y0006v7fudklczhrk	cmrbt4u0y0004v7fuuvhc32q7	ne	कथा आधारित मार्केटिङ	2026-07-08 08:19:55.522	2026-07-08 08:19:55.522
cmrbt54hw0008v7fu17k0wx23	cmrbt54hv0007v7fubpo3l4rm	en	Real Estate Marketing	2026-07-08 08:20:09.091	2026-07-08 08:20:09.091
cmrbt54hw0009v7fu97lypyth	cmrbt54hv0007v7fubpo3l4rm	ne	रियल इस्टेट मार्केटिङ	2026-07-08 08:20:09.091	2026-07-08 08:20:09.091
cmrbt5b52000bv7fub5imscj3	cmrbt5b52000av7fuke24stq4	en	Property Marketing	2026-07-08 08:20:17.702	2026-07-08 08:20:17.702
cmrbt5b52000cv7futrny9ptz	cmrbt5b52000av7fuke24stq4	ne	घरजग्गा व्यवसाय	2026-07-08 08:20:17.702	2026-07-08 08:20:17.702
cmrbt5jxo000ev7fublo5ngst	cmrbt5jxn000dv7fupoqgv1nt	en	Home Selling Tips	2026-07-08 08:20:29.099	2026-07-08 08:20:29.099
cmrbt5jxo000fv7fu0bwpedcr	cmrbt5jxn000dv7fupoqgv1nt	ne	घर बिक्री	2026-07-08 08:20:29.099	2026-07-08 08:20:29.099
cmrbt6cjm000hv7fu3r2nb28x	cmrbt6cjl000gv7furwynyc3j	en	Real Estate Agent	2026-07-08 08:21:06.177	2026-07-08 08:21:06.177
cmrbt6cjm000iv7fum7dviroi	cmrbt6cjl000gv7furwynyc3j	ne	रियल इस्टेट एजेन्ट	2026-07-08 08:21:06.177	2026-07-08 08:21:06.177
cmrbtpqs2000rv7fuwrl6r03s	cmrbtpqs2000qv7fucc9gw2yy	en	Property Negotiation	2026-07-08 08:36:11.09	2026-07-08 08:36:11.09
cmrbtpqs2000sv7fun49olx6l	cmrbtpqs2000qv7fucc9gw2yy	ne	घरजग्गा वार्ता	2026-07-08 08:36:11.09	2026-07-08 08:36:11.09
cmrbtq9de000uv7fudzb3sgfu	cmrbtq9dd000tv7fuln3u87ht	en	Home Buying Tips	2026-07-08 08:36:35.185	2026-07-08 08:36:35.185
cmrbtq9de000vv7fuqx8dong7	cmrbtq9dd000tv7fuln3u87ht	ne	घर खरिद सुझाव	2026-07-08 08:36:35.185	2026-07-08 08:36:35.185
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, name, password, "createdAt", "updatedAt") FROM stdin;
cmr8wtyud0000ncfupizup4h9	ekpratishat.admin@gmail.com	ekpratishat	$2b$10$s5j5d2oe9Nu0QWpEvgoyL.28kQ09OckO.Hjc9wtroQzKaH4p8gtIe	2026-07-06 07:40:08.485	2026-07-06 07:40:08.485
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
b3fc20e7-8af7-4137-8d58-6929c63a986c	74e0fe28946fb96d59dc8c0fef807585f2171d552276e3591b5caba7b13ad6ec	2026-06-29 15:23:16.028123+05:45	20260531065849_init	\N	\N	2026-06-29 15:23:16.025526+05:45	1
5d1dd8cb-370e-465a-a9ca-35cafeb37a4a	3996a3810df9336ce34b86dfa784581223f15644d8df1434cd9ebf28b40335ed	2026-06-29 15:23:16.069888+05:45	20260621113010_asdasd	\N	\N	2026-06-29 15:23:16.068726+05:45	1
2f782a06-dc13-4432-a98d-fe09f5d36894	5dea340a7cae01b28f49107eef99450b0e35f5b0cf0600aa7ae8af1451359674	2026-06-29 15:23:16.036839+05:45	20260531072414_blogposts	\N	\N	2026-06-29 15:23:16.028504+05:45	1
ffc1f368-b43c-4eaa-b8b5-b2f31da604da	6973b3bb0c5051713d64a920238d272a6ed44d072995abe4c68d425e1b2f5e1a	2026-06-29 15:23:16.038919+05:45	20260531102412_userrole	\N	\N	2026-06-29 15:23:16.037181+05:45	1
23c4e5ef-3205-4eb6-a473-d43e00034caf	355c817f4aefb3365f0050bb2ceb1f3fc9b337c6c8bb932f79b0a230f9cbc882	2026-06-29 15:23:16.041046+05:45	20260531103558_category_tag_fields	\N	\N	2026-06-29 15:23:16.039292+05:45	1
97c53018-9380-4831-abc2-bf0784361303	ff1700a6ada1df3ff64efee7cba3be4d027f3c1e7d22f2b19f651ce2584e50ba	2026-06-29 15:23:16.072397+05:45	20260623052506_newsletter	\N	\N	2026-06-29 15:23:16.070245+05:45	1
17b46a2a-3524-4d2f-aaac-c801a407432d	dcefbb395aae5d233bc5e65098c3afa1faa55318b4173ec9c8bca2909ca47be7	2026-06-29 15:23:16.04457+05:45	20260602070436_blog_views	\N	\N	2026-06-29 15:23:16.041446+05:45	1
c62d91f6-6639-4936-90e3-03b2ec8d5eb1	4bc301fb9ca5b976874573c925787b37f8d1df41fe2625994171025632e90290	2026-06-29 15:23:16.050968+05:45	20260603090124_some	\N	\N	2026-06-29 15:23:16.044901+05:45	1
f9a80bcf-0072-4c31-8eab-760cae70c9c3	a2e6c5a687e910fee9372ffd7dab623f5327bd614a593f2a18933fb41f23056c	2026-06-29 15:23:16.052555+05:45	20260606000000_add_description	\N	\N	2026-06-29 15:23:16.051334+05:45	1
49a3e3bc-4071-4c6e-95ea-482c1c163bcf	7c28ff7092499e8d83556be7a4f15f15572b226853b2c6775026a5eec6395fbd	2026-06-29 15:23:26.377265+05:45	20260629093826_comment_section	\N	\N	2026-06-29 15:23:26.373125+05:45	1
daf9ef0e-0373-4e40-8fe8-72ced3cede38	726e182b664cb1584f381439ba8604f40a828376d43cc13e8633d4f44ad0456e	2026-06-29 15:23:16.055204+05:45	20260615080938_mig	\N	\N	2026-06-29 15:23:16.052879+05:45	1
8b1705eb-f380-404f-8444-4a8f0adda43d	401d2494ce99727305334ed0edce63b0023b62996e62479a1521b4a04cf9ff05	2026-06-29 15:23:16.056781+05:45	20260615081416_mig	\N	\N	2026-06-29 15:23:16.055539+05:45	1
a416417a-fd87-46b3-bd0e-00b30cca211e	dcefbb395aae5d233bc5e65098c3afa1faa55318b4173ec9c8bca2909ca47be7	2026-06-29 15:23:16.06098+05:45	20260615082339_mig	\N	\N	2026-06-29 15:23:16.057144+05:45	1
94e1de6d-d265-4c51-96b8-1849767949f7	37c337366b2d0a3cb14ab69485f06d4653fccc28b01b9420437f0990c8b1893f	2026-07-06 12:24:09.03726+05:45	20260630070751_added_image_to_the_comment	\N	\N	2026-07-06 12:24:09.034576+05:45	1
16670fc6-51b3-483b-8301-ef15a14d7f63	fa84da8b937bc966c09c63b5cebe8ef838ddf8583db70052227645eb73edd05e	2026-06-29 15:23:16.062547+05:45	20260616163503_is_toggled	\N	\N	2026-06-29 15:23:16.061345+05:45	1
de959a9e-1837-4c50-bb9c-5b12bcc90eea	9ad559dbbb0fc65b79bbd36f0b8b1a2f2d66641c197665b47ec284a64045acad	2026-06-29 15:23:16.064669+05:45	20260617084253_advertisement	\N	\N	2026-06-29 15:23:16.062923+05:45	1
a75d6939-34f9-497f-93f9-fc70987c256a	376013e7e31a3081bb51b3f4f2fa5ccb930cf20cdd9d18f2ce54053f5f1a9c32	2026-06-29 15:23:16.066626+05:45	20260617092910_advertisement	\N	\N	2026-06-29 15:23:16.065044+05:45	1
0302ec94-8335-4854-881d-78bf63df4d43	cd91c7793c73866bf43831bf8c922e7141e1b491af2e583c8f60ccb639d72aac	2026-07-06 12:24:09.04145+05:45	20260702051525_indexes	\N	\N	2026-07-06 12:24:09.037593+05:45	1
7845ee8c-104b-4687-8582-800927a93462	f32a6f6e1ed989e47d14e4915bc80528efc1fb1eb11b27df2b3ab432a02b913c	2026-06-29 15:23:16.068387+05:45	20260618054551_updated_at	\N	\N	2026-06-29 15:23:16.067039+05:45	1
be53cb96-3fc9-49dc-b5cf-6cef4996c81b	e96a49932ece3f7b0fa1b2c701781f351985498514bad7f48ec2564bf1f4908d	2026-07-06 12:24:09.161249+05:45	20260706063909_bilinguall	\N	\N	2026-07-06 12:24:09.142434+05:45	1
46fbdd91-dbb4-4313-94e6-630f60dbae9f	cd502df65a3914acf678d6f7217a48b92b7701c1e0cf7cb0a7a63f2d3e136fe0	2026-07-06 17:13:20.009+05:45	20260706112820_onboarding	\N	\N	2026-07-06 17:13:20.007274+05:45	1
\.


--
-- Name: Advertisement Advertisement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Advertisement"
    ADD CONSTRAINT "Advertisement_pkey" PRIMARY KEY (id);


--
-- Name: BlogComment BlogComment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BlogComment"
    ADD CONSTRAINT "BlogComment_pkey" PRIMARY KEY (id);


--
-- Name: BlogPost BlogPost_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BlogPost"
    ADD CONSTRAINT "BlogPost_pkey" PRIMARY KEY (id);


--
-- Name: BlogTranslation BlogTranslation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BlogTranslation"
    ADD CONSTRAINT "BlogTranslation_pkey" PRIMARY KEY (id);


--
-- Name: BlogViews BlogViews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BlogViews"
    ADD CONSTRAINT "BlogViews_pkey" PRIMARY KEY (id);


--
-- Name: CategoryTranslation CategoryTranslation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CategoryTranslation"
    ADD CONSTRAINT "CategoryTranslation_pkey" PRIMARY KEY (id);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: NewsletterSubscriber NewsletterSubscriber_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NewsletterSubscriber"
    ADD CONSTRAINT "NewsletterSubscriber_pkey" PRIMARY KEY (id);


--
-- Name: TagOnPost TagOnPost_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TagOnPost"
    ADD CONSTRAINT "TagOnPost_pkey" PRIMARY KEY ("blogPostId", "tagId");


--
-- Name: TagTranslation TagTranslation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TagTranslation"
    ADD CONSTRAINT "TagTranslation_pkey" PRIMARY KEY (id);


--
-- Name: Tag Tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tag"
    ADD CONSTRAINT "Tag_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: BlogComment_blogPostId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "BlogComment_blogPostId_idx" ON public."BlogComment" USING btree ("blogPostId");


--
-- Name: BlogPost_categoryID_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "BlogPost_categoryID_idx" ON public."BlogPost" USING btree ("categoryID");


--
-- Name: BlogPost_isToggled_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "BlogPost_isToggled_status_idx" ON public."BlogPost" USING btree ("isToggled", status);


--
-- Name: BlogPost_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "BlogPost_slug_key" ON public."BlogPost" USING btree (slug);


--
-- Name: BlogPost_status_createdAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "BlogPost_status_createdAt_idx" ON public."BlogPost" USING btree (status, "createdAt");


--
-- Name: BlogPost_status_viewCount_createdAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "BlogPost_status_viewCount_createdAt_idx" ON public."BlogPost" USING btree (status, "viewCount", "createdAt");


--
-- Name: BlogTranslation_blogPostId_language_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "BlogTranslation_blogPostId_language_key" ON public."BlogTranslation" USING btree ("blogPostId", language);


--
-- Name: BlogViews_blogPostId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "BlogViews_blogPostId_idx" ON public."BlogViews" USING btree ("blogPostId");


--
-- Name: BlogViews_blogPostId_sessionId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "BlogViews_blogPostId_sessionId_key" ON public."BlogViews" USING btree ("blogPostId", "sessionId");


--
-- Name: CategoryTranslation_categoryId_language_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "CategoryTranslation_categoryId_language_key" ON public."CategoryTranslation" USING btree ("categoryId", language);


--
-- Name: Category_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Category_slug_key" ON public."Category" USING btree (slug);


--
-- Name: NewsletterSubscriber_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "NewsletterSubscriber_email_key" ON public."NewsletterSubscriber" USING btree (email);


--
-- Name: TagOnPost_tagId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "TagOnPost_tagId_idx" ON public."TagOnPost" USING btree ("tagId");


--
-- Name: TagTranslation_tagId_language_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "TagTranslation_tagId_language_key" ON public."TagTranslation" USING btree ("tagId", language);


--
-- Name: Tag_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Tag_slug_key" ON public."Tag" USING btree (slug);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: BlogComment BlogComment_blogPostId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BlogComment"
    ADD CONSTRAINT "BlogComment_blogPostId_fkey" FOREIGN KEY ("blogPostId") REFERENCES public."BlogPost"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: BlogPost BlogPost_authorID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BlogPost"
    ADD CONSTRAINT "BlogPost_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: BlogPost BlogPost_categoryID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BlogPost"
    ADD CONSTRAINT "BlogPost_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: BlogTranslation BlogTranslation_blogPostId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BlogTranslation"
    ADD CONSTRAINT "BlogTranslation_blogPostId_fkey" FOREIGN KEY ("blogPostId") REFERENCES public."BlogPost"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: BlogViews BlogViews_blogPostId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BlogViews"
    ADD CONSTRAINT "BlogViews_blogPostId_fkey" FOREIGN KEY ("blogPostId") REFERENCES public."BlogPost"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CategoryTranslation CategoryTranslation_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CategoryTranslation"
    ADD CONSTRAINT "CategoryTranslation_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TagOnPost TagOnPost_blogPostId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TagOnPost"
    ADD CONSTRAINT "TagOnPost_blogPostId_fkey" FOREIGN KEY ("blogPostId") REFERENCES public."BlogPost"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TagOnPost TagOnPost_tagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TagOnPost"
    ADD CONSTRAINT "TagOnPost_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES public."Tag"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TagTranslation TagTranslation_tagId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TagTranslation"
    ADD CONSTRAINT "TagTranslation_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES public."Tag"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict kEURZdNuzpazdWaCToliOJf0ye7ViTjEPKgYwb97Zo6U73X1mdr54gPy3f5nzRI

