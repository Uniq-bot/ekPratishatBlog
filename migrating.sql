--
-- PostgreSQL database dump
--

\restrict KCpmIM10oeR7tw7Wg1YTaVqwJFvGdLwf8unbuVZXzFZNKCn5sCToKpZBJOnvCeU

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
-- Name: AdType; Type: TYPE; Schema: public; Owner: blogowner
--

CREATE TYPE public."AdType" AS ENUM (
    'BANNER',
    'ASIDE',
    'POPUP'
);


ALTER TYPE public."AdType" OWNER TO blogowner;

--
-- Name: PostStatus; Type: TYPE; Schema: public; Owner: blogowner
--

CREATE TYPE public."PostStatus" AS ENUM (
    'DRAFT',
    'PUBLISHED',
    'ARCHIVED'
);


ALTER TYPE public."PostStatus" OWNER TO blogowner;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Advertisement; Type: TABLE; Schema: public; Owner: blogowner
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


ALTER TABLE public."Advertisement" OWNER TO blogowner;

--
-- Name: BlogPost; Type: TABLE; Schema: public; Owner: blogowner
--

CREATE TABLE public."BlogPost" (
    id text NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    "authorID" text NOT NULL,
    "categoryID" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "coverImage" text,
    status public."PostStatus" DEFAULT 'DRAFT'::public."PostStatus" NOT NULL,
    "viewCount" integer DEFAULT 0 NOT NULL,
    content jsonb NOT NULL,
    description text,
    "isToggled" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."BlogPost" OWNER TO blogowner;

--
-- Name: BlogViews; Type: TABLE; Schema: public; Owner: blogowner
--

CREATE TABLE public."BlogViews" (
    id text NOT NULL,
    "blogPostId" text NOT NULL,
    "sessionId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."BlogViews" OWNER TO blogowner;

--
-- Name: Category; Type: TABLE; Schema: public; Owner: blogowner
--

CREATE TABLE public."Category" (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    description text,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Category" OWNER TO blogowner;

--
-- Name: NewsletterSubscriber; Type: TABLE; Schema: public; Owner: blogowner
--

CREATE TABLE public."NewsletterSubscriber" (
    id text NOT NULL,
    email text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."NewsletterSubscriber" OWNER TO blogowner;

--
-- Name: Tag; Type: TABLE; Schema: public; Owner: blogowner
--

CREATE TABLE public."Tag" (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Tag" OWNER TO blogowner;

--
-- Name: User; Type: TABLE; Schema: public; Owner: blogowner
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    name text,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO blogowner;

--
-- Name: _PostTags; Type: TABLE; Schema: public; Owner: blogowner
--

CREATE TABLE public."_PostTags" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_PostTags" OWNER TO blogowner;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: blogowner
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


ALTER TABLE public._prisma_migrations OWNER TO blogowner;

--
-- Data for Name: Advertisement; Type: TABLE DATA; Schema: public; Owner: blogowner
--

COPY public."Advertisement" (id, "AdTitle", "AdDescription", "AdPoster", "AdLink", "AdSponsorName", "AdType", "isAdRunning", "createdAt", "updatedAt") FROM stdin;
cmqj8cksb000fxlfur5ddz2jo	Sun ko bhau aba khalti ma	asdasd	/uploads/ad-1781771427737.webp	https://www.superside.com/blog/advertising-design	Gold	BANNER	f	2026-06-18 08:20:31.931	2026-06-25 03:11:13.012
cmqj757t4000exlfum1volksr	Ek pratishat vaye dherai nai pugxa. Aba tapai ko chahana hamro gantabya.	get to know more	/uploads/ad-1781771531946.webp	https://ekpratishat.com/	ek pratishat	ASIDE	f	2026-06-18 07:46:48.904	2026-06-25 03:11:14.978
cmqj8oqoq000gxlfubgy9vyyp	ekkkkk pratisahttt saab thik thakk	asdasd	/uploads/ad-1781771399447.webp	https://ekpratishat.com/	Ekpratishat	ASIDE	t	2026-06-18 08:29:59.45	2026-06-25 03:11:14.979
cmqqlx5ff0001wlfuwn0fp1a4	Pepsi	asdasd	/uploads/ad-1782216987707.webp	https://www.pepsi.com/	asdads	BANNER	t	2026-06-23 12:14:50.043	2026-06-25 03:11:21.443
\.


--
-- Data for Name: BlogPost; Type: TABLE DATA; Schema: public; Owner: blogowner
--

COPY public."BlogPost" (id, title, slug, "authorID", "categoryID", "createdAt", "updatedAt", "coverImage", status, "viewCount", content, description, "isToggled") FROM stdin;
cmqt5m6le0005fffuij5ad8nw	Buying Property in Kathmandu, Nepal: Complete Guide for First-Time Buyers and Investors (2026)	buying-property-in-kathmandu-nepal-complete-guide-for-first-time-buyers-and-investors-2026-1782370903003	cmqfmayr50000b6fuy4i7hlpv	cmqsb89yz0000gufuxtimjrax	2026-06-25 07:01:43.01	2026-06-25 07:29:46.752	/uploads/ad-1782370903002.png	PUBLISHED	1	"[{\\"id\\":\\"1782370498085-wp29ljtofwo\\",\\"type\\":\\"heading\\",\\"level\\":2,\\"content\\":\\"Buying Property in Kathmandu, Nepal: The Complete Guide for First-Time Buyers and Investors\\"},{\\"id\\":\\"1782370503381-rgptqh3tj8\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Kathmandu has long been the center of Nepal's economic, educational, and administrative activities, making it one of the most sought-after locations for real estate investment. Whether you are planning to build your dream home, secure a property for your family's future, or diversify your investment portfolio, purchasing property in Kathmandu can be a significant milestone. However, the city's competitive property market also means that buyers must approach every transaction with careful planning and thorough research.\\"},{\\"id\\":\\"1782370507179-uol2zy73q4\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Many first-time buyers are attracted by the promise of rising property values and growing infrastructure developments across Kathmandu Valley. While these opportunities are real, purchasing property without understanding the market, legal requirements, and valuation factors can lead to costly mistakes. Understanding how the market works before making a decision can help you avoid unnecessary risks and make a more informed investment.\\"},{\\"id\\":\\"1782370514416-2k972gpmq4y\\",\\"type\\":\\"separator\\",\\"content\\":null},{\\"id\\":\\"1782370517709-ihhimk2ypuf\\",\\"type\\":\\"heading\\",\\"level\\":2,\\"content\\":\\"Understanding What Makes a Good Property Investment in Kathmandu\\"},{\\"id\\":\\"1782370546305-fdz25m6py14\\",\\"type\\":\\"image\\",\\"content\\":\\"/uploads/ad-1782370546303.jpeg\\"},{\\"id\\":\\"1782370561925-09vq905hnkh8\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"The value of a property in Kathmandu extends far beyond the size of the land or the appearance of a house. Location remains one of the strongest determinants of long-term value. Areas with good road access, reliable utilities, quality schools, healthcare facilities, and commercial centers tend to experience stronger demand and better appreciation over time.\\"},{\\"id\\":\\"1782370566020-ovnze4fs4s\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"For example, neighborhoods such as Bhaisepati, Maharajgunj, and Budhanilkantha continue to attract both homeowners and investors because of their accessibility, infrastructure, and residential appeal. At the same time, emerging locations around Tokha, Imadol, and Lubhu have gained attention due to ongoing urban expansion and comparatively affordable pricing.\\"},{\\"id\\":\\"1782370574565-gx27ulqxwli\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Before committing to any purchase, buyers should evaluate not only the property's current condition but also its future potential. Planned road expansions, commercial developments, and government infrastructure projects can significantly influence property values in the years ahead. A property that appears moderately priced today may become substantially more valuable if it is located within a rapidly developing area.\\"},{\\"id\\":\\"1782370607650-7pciwck0858\\",\\"type\\":\\"separator\\",\\"content\\":null},{\\"id\\":\\"1782370583529-uh77eaev97c\\",\\"type\\":\\"heading\\",\\"level\\":2,\\"content\\":\\"Finding a Reliable Real Estate Agent in Kathmandu\\"},{\\"id\\":\\"1782370614742-mhaa51cz7yb\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"One of the most challenging aspects of buying property in Kathmandu is navigating the large number of listings and intermediaries operating in the market. While many agents provide valuable services, others may prioritize closing deals quickly rather than ensuring that buyers receive complete and accurate information.\\"},{\\"id\\":\\"1782370618253-8a406z0cnob\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"A trustworthy real estate agent should be transparent about property ownership, pricing, legal documentation, and potential limitations of a property. Rather than relying solely on advertisements or social media listings, buyers should take time to verify an agency's reputation through client reviews, referrals, and previous transactions.\\"},{\\"id\\":\\"1782370621999-hiikro2zxps\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Experienced agents often provide insights that are difficult for individual buyers to obtain on their own. They can explain local market conditions, identify areas with strong investment potential, and assist in gathering the documents required for due diligence. Nevertheless, even when working with a professional agent, buyers should independently verify all information before proceeding with a purchase.\\"},{\\"id\\":\\"1782370682718-aakty1mgbth\\",\\"type\\":\\"separator\\",\\"content\\":null},{\\"id\\":\\"1782370629218-g5rl5fmhw2q\\",\\"type\\":\\"heading\\",\\"level\\":2,\\"content\\":\\"How Much Does Property Cost in Kathmandu?\\"},{\\"id\\":\\"1782370660679-0ynoo7m7rgon\\",\\"type\\":\\"image\\",\\"content\\":\\"/uploads/ad-1782370660677.jpeg\\"},{\\"id\\":\\"1782370692879-73wnoi1jwp\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Property prices in Kathmandu vary dramatically depending on location, road access, zoning, and surrounding infrastructure. Premium areas such as Baluwatar and Maharajgunj often command some of the highest prices in the valley, while developing regions on the outskirts may offer more affordable options for buyers with limited budgets.\\"},{\\"id\\":\\"1782370696282-59ajqxgmj7d\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"In recent years, residential land prices in established neighborhoods have continued to increase due to limited supply and sustained demand. Buyers frequently discover that two properties with similar land sizes can have vastly different market values simply because one has wider road access, better utility connections, or greater commercial potential.\\"},{\\"id\\":\\"1782370699507-xiurafkyrs\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"As a general observation, prime residential locations may range from tens of lakhs to several crores per anna, while developing areas can still provide relatively affordable entry points for first-time investors. Because market conditions change frequently, consulting local valuation experts and reviewing recent transactions in the area is recommended before finalizing a purchase.\\"},{\\"id\\":\\"1782370704530-jywyvrgcio\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Understanding both government valuation and market valuation is also important. Government valuation is primarily used for taxation and registration purposes, whereas market valuation reflects what buyers are actually willing to pay. In many parts of Kathmandu, market prices are significantly higher than official government valuations.\\"},{\\"id\\":\\"1782370851897-da4t8v0jfma\\",\\"type\\":\\"callout\\",\\"content\\":{\\"title\\":\\"Investor Insight\\",\\"description\\":\\"Land is a finite asset. In high-demand urban centers like Kathmandu, scarcity can be one of the strongest drivers of long-term value growth.\\"}},{\\"id\\":\\"1782370706902-j6608dos8xl\\",\\"type\\":\\"separator\\",\\"content\\":null},{\\"id\\":\\"1782370714625-p5a0wxcnvhr\\",\\"type\\":\\"heading\\",\\"level\\":2,\\"content\\":\\"Understanding the Property Registration Process in Nepal\\"},{\\"id\\":\\"1782370720150-hp0xl84cz5n\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"For many buyers, the legal transfer process can seem intimidating. However, understanding the steps involved can make the experience much smoother and help prevent complications later.\\"},{\\"id\\":\\"1782370725570-6u9bhixflgi\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"The process begins with a detailed verification of ownership documents. Buyers should confirm that the seller is the legitimate owner of the property and that there are no legal disputes, mortgages, or pending claims associated with it. Documents such as the land ownership certificate (Lalpurja), tax clearance certificates, and cadastral maps should be carefully reviewed before any agreement is signed.\\"},{\\"id\\":\\"1782370730295-xq2yeq6bk5f\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Once both parties agree on the purchase terms, a formal sale agreement is typically prepared. This document outlines the agreed price, payment schedule, and conditions of the transaction. Following this stage, the buyer and seller visit the relevant government office responsible for property transfers to complete the registration process.\\"},{\\"id\\":\\"1782370734608-gd5my17m577\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"During registration, applicable taxes, fees, and duties must be paid according to government regulations. Once the required procedures have been completed and approved, ownership records are updated, and the property is legally transferred to the buyer. At this point, the purchaser becomes the recognized legal owner of the property.\\"},{\\"id\\":\\"1782370739112-98kazm3zcxf\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Because legal requirements may vary depending on the type of property and location, many buyers choose to consult legal professionals or property consultants to ensure that every document is correctly prepared and submitted.\\"},{\\"id\\":\\"1782370746128-xtd2mixny99\\",\\"type\\":\\"heading\\",\\"level\\":2,\\"content\\":\\"Common Mistakes Buyers Should Avoid\\"},{\\"id\\":\\"1782370752634-o1dzysm1jjp\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"The excitement of purchasing property often causes buyers to overlook important details. One of the most common mistakes is focusing exclusively on price while neglecting legal verification. A property that appears to be an excellent bargain may ultimately become a costly problem if ownership records are unclear or disputes emerge later.\\"},{\\"id\\":\\"1782370756771-4h8euwu29p3\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Another frequent mistake is failing to inspect the property personally. Online photographs and promotional materials rarely reveal the complete picture. Visiting a property multiple times, including during different times of the day, can help identify issues related to traffic, noise, drainage, or neighborhood conditions.\\"},{\\"id\\":\\"1782370761896-puba7oexjug\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Many buyers also underestimate the importance of road access. In Kathmandu, even a few feet of additional road width can significantly affect future resale value. Similarly, overlooking utility availability, water supply, and future development plans can reduce the long-term attractiveness of an investment.\\"},{\\"id\\":\\"1782370765917-4axbysjscia\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Perhaps the most costly mistake is rushing into a transaction due to fear of missing an opportunity. Real estate purchases involve substantial financial commitments, and taking additional time for research, verification, and professional consultation is almost always worthwhile.\\"},{\\"id\\":\\"1782370815609-zd38qxinja\\",\\"type\\":\\"quote\\",\\"content\\":\\"\\\\\\"The best property investment is not always the cheapest property—it's the one located where people will continue to want to live, work, and invest in the future.\\\\\\"\\"},{\\"id\\":\\"1782370775271-c21i9kuunnt\\",\\"type\\":\\"heading\\",\\"level\\":2,\\"content\\":\\"Final Thoughts\\"},{\\"id\\":\\"1782370781400-lopzhtk5mr\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Buying property in Kathmandu is not simply about finding a piece of land or a house that fits your budget. It is about making a long-term decision that aligns with your financial goals, lifestyle needs, and future plans. The city's growing economy, expanding infrastructure, and strong demand for housing continue to make real estate one of Nepal's most attractive investment sectors.\\"},{\\"id\\":\\"1782370785106-w22woerl58s\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"By carefully evaluating location, verifying legal documents, understanding market values, and following the proper registration process, buyers can significantly reduce risks and make more confident decisions. Whether you are purchasing your first home or expanding your investment portfolio, thorough preparation and professional guidance can help ensure that your property purchase becomes a valuable asset for years to come.\\"}]"	Planning to buy property in Kathmandu? Learn about property prices, legal verification, registration processes, trusted real estate agents, and common mistakes to avoid before investing in Kathmandu Valley.	f
cmqt7oqw600058ufufdr65q63	Renting vs Buying a Home in Nepal: Which Choice Makes More Financial Sense?	renting-vs-buying-a-home-in-nepal-which-choice-makes-more-financial-sense-1782374381846	cmqfmayr50000b6fuy4i7hlpv	cmqt6xn8v00018ufu2wuux1vl	2026-06-25 07:59:41.862	2026-06-25 07:59:53.019	/uploads/ad-1782374381846.jpeg	PUBLISHED	1	"[{\\"id\\":\\"1782373267718-5s21mage8k\\",\\"type\\":\\"heading\\",\\"level\\":2,\\"content\\":\\"Introduction\\"},{\\"id\\":\\"1782373279365-h7a9nggh47r\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"For many Nepalese families, deciding whether to rent a home or buy one is one of the biggest financial decisions they will ever make. With property prices in Kathmandu Valley continuing to rise and rental markets becoming more competitive, the question remains: is it better to rent or buy in Nepal?\\"},{\\"id\\":\\"1782373282882-9d466833mjg\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"The answer depends on your financial situation, long-term goals, lifestyle preferences, and investment strategy. While buying a home provides ownership and potential appreciation, renting offers flexibility and lower upfront costs. Understanding the advantages, disadvantages, and hidden costs of both options can help you make a smarter decision.\\"},{\\"id\\":\\"1782373300987-znh7qkndujf\\",\\"type\\":\\"image\\",\\"content\\":\\"/uploads/ad-1782373300985.jpeg\\"},{\\"id\\":\\"1782373314710-bhv319d5kia\\",\\"type\\":\\"separator\\",\\"content\\":null},{\\"id\\":\\"1782373317681-d87i3fhkowb\\",\\"type\\":\\"heading\\",\\"level\\":2,\\"content\\":\\"Understanding the Nepal Housing Market\\"},{\\"id\\":\\"1782373325634-cg3iacmash\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Nepal's real estate market has traditionally been viewed as one of the safest investment options. Land and property values in major cities such as Kathmandu, Lalitpur, and Bhaktapur have generally appreciated over time, encouraging many people to purchase homes rather than rent.\\"},{\\"id\\":\\"1782373330040-f3learlg31\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"However, rising property prices have made home ownership increasingly difficult for first-time buyers. At the same time, renting remains an attractive option for young professionals, students, and families who value flexibility and lower financial commitments.\\"},{\\"id\\":\\"1782373337193-nhnnlbnppke\\",\\"type\\":\\"quote\\",\\"content\\":\\"\\\\\\"A house is not just a place to live—it is one of the largest financial commitments a person makes during their lifetime.\\\\\\"\\"},{\\"id\\":\\"1782373346989-rh3dahov4lm\\",\\"type\\":\\"heading\\",\\"level\\":2,\\"content\\":\\"Rent vs Buy: A Quick Comparison\\"},{\\"id\\":\\"1782373353264-8eu38kwtefr\\",\\"type\\":\\"image\\",\\"content\\":\\"/uploads/ad-1782373353263.jpeg\\"},{\\"id\\":\\"1782373365840-g1iq64igm7l\\",\\"type\\":\\"heading\\",\\"level\\":2,\\"content\\":\\"What Is Better Financially in the Long Run?\\"},{\\"id\\":\\"1782373371376-p7wq77f5xyr\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"The financial advantage depends largely on how long you plan to stay in a property.\\"},{\\"id\\":\\"1782373377237-ipaxqndtkkj\\",\\"type\\":\\"heading\\",\\"level\\":4,\\"content\\":\\"Renting Can Be Better If:\\"},{\\"id\\":\\"1782373386366-v7jvboj7c59\\",\\"type\\":\\"list\\",\\"content\\":[\\"You frequently change jobs or locations.\\",\\"You are unsure where you want to live permanently.\\",\\"You do not have sufficient savings for a down payment.\\",\\"Property prices in your preferred area are significantly higher than rental costs.\\"]},{\\"id\\":\\"1782373392517-br52dx43niq\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"For example, a family paying NPR 35,000 per month in rent may spend NPR 4.2 million over ten years. While this money does not build ownership, it also avoids massive loans, interest payments, taxes, and maintenance expenses.\\"},{\\"id\\":\\"1782373398064-30i8zddl9xc\\",\\"type\\":\\"heading\\",\\"level\\":4,\\"content\\":\\"Buying Can Be Better If:\\"},{\\"id\\":\\"1782373414818-62aycdnvgp\\",\\"type\\":\\"list\\",\\"content\\":[\\"You plan to stay in the same location for 10–20 years.\\",\\"You have stable income and savings.\\",\\"Property values are expected to increase.\\",\\"You want to build long-term wealth through ownership.\\"]},{\\"id\\":\\"1782373421472-lo8x97ce9v\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"A purchased home can appreciate significantly over time, creating equity that renters never accumulate.\\"},{\\"id\\":\\"1782373445087-t0zkexn5y4\\",\\"type\\":\\"image\\",\\"content\\":\\"/uploads/ad-1782373445085.jpeg\\"},{\\"id\\":\\"1782373452954-pbzmdq1syfp\\",\\"type\\":\\"heading\\",\\"level\\":2,\\"content\\":\\"Hidden Costs of Buying a Home in Kathmandu\\"},{\\"id\\":\\"1782373459797-s9prcoev29\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Many buyers focus only on the purchase price and loan payments. However, home ownership comes with several additional expenses that renters often avoid.\\"},{\\"id\\":\\"1782373465724-8g6u2mz2sni\\",\\"type\\":\\"heading\\",\\"level\\":4,\\"content\\":\\"1. Property Registration Fees\\"},{\\"id\\":\\"1782373476891-aii7e3sjd38\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Property transfer requires registration at the local Land Revenue Office. Registration costs can vary depending on location, property type, and ownership category.\\"},{\\"id\\":\\"1782373490743-msniu9or2s\\",\\"type\\":\\"callout\\",\\"content\\":{\\"title\\":\\"\\",\\"description\\":\\"Budget several hundred thousand rupees for taxes and registration when purchasing property in prime Kathmandu locations.\\"}},{\\"id\\":\\"1782373509307-q6bsb008fx\\",\\"type\\":\\"heading\\",\\"level\\":4,\\"content\\":\\"2. Home Loan Interest\\"},{\\"id\\":\\"1782373516677-h3w0hllazh4\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Most buyers rely on bank financing.\\\\n\\\\nEven if a house costs NPR 20 million, the total repayment after 20 years may be significantly higher due to interest charges.\\"},{\\"id\\":\\"1782373521712-k8hhnrp6co\\",\\"type\\":\\"heading\\",\\"level\\":4,\\"content\\":\\"3. Maintenance and Repairs\\"},{\\"id\\":\\"1782373527641-s031ze1b3vl\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Homeowners are responsible for:\\"},{\\"id\\":\\"1782373536546-m2msf587fo\\",\\"type\\":\\"list\\",\\"content\\":[\\"Plumbing repairs\\",\\"Roof maintenance\\",\\"Electrical work\\",\\"Painting\\",\\"Structural improvements\\"]},{\\"id\\":\\"1782373542232-f6nv7icu69\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Renters typically transfer these responsibilities to landlords.\\"},{\\"id\\":\\"1782373549346-b9fr5818cx4\\",\\"type\\":\\"heading\\",\\"level\\":4,\\"content\\":\\"4. Property Taxes\\"},{\\"id\\":\\"1782373558433-knx9i3xxiss\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Local governments charge annual property taxes based on property value and location.\\\\n\\\\nThese recurring costs continue for as long as you own the property.\\"},{\\"id\\":\\"1782373563061-umvz77sy2ad\\",\\"type\\":\\"heading\\",\\"level\\":4,\\"content\\":\\"5. Insurance Costs\\"},{\\"id\\":\\"1782373568593-b7hdl1queih\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Although not mandatory in all cases, property insurance protects homeowners against fire, earthquakes, and natural disasters.\\\\n\\\\nConsidering Nepal's seismic risk, insurance can be a valuable long-term safeguard.\\"},{\\"id\\":\\"1782373575463-jcm1o1u6a9\\",\\"type\\":\\"heading\\",\\"level\\":4,\\"content\\":\\"6. Opportunity Cost\\"},{\\"id\\":\\"1782373582744-hz39ef259qe\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"The down payment used to buy property could alternatively be invested in:\\"},{\\"id\\":\\"1782373593241-f9quvwgiht\\",\\"type\\":\\"list\\",\\"content\\":[\\"Businesses\\",\\"Stocks\\",\\"Mutual funds\\",\\"Fixed deposits\\"]},{\\"id\\":\\"1782373596274-22ffrrfffor\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"The lost potential return is often overlooked.\\"},{\\"id\\":\\"1782373602136-v6wr1iipm8p\\",\\"type\\":\\"quote\\",\\"content\\":\\"\\\\\\"The true cost of a house is not only what you pay for it, but also what that money could have earned elsewhere.\\\\\\"\\"},{\\"id\\":\\"1782373765179-47h43r1xj7l\\",\\"type\\":\\"heading\\",\\"level\\":2,\\"content\\":\\"How Do I Decide Whether I Can Afford to Buy?\\"},{\\"id\\":\\"1782373776867-9473bx6jktt\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Buying a house should not be based solely on desire. It should be based on financial readiness.\\\\n\\\\nFinancial planners often recommend evaluating three major factors.\\"},{\\"id\\":\\"1782373785425-y6v2xb0evbl\\",\\"type\\":\\"heading\\",\\"level\\":4,\\"content\\":\\"Monthly Income Stability\\"},{\\"id\\":\\"1782373790208-6klsd0me9p\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Ask yourself:\\"},{\\"id\\":\\"1782373800271-g2bczg7bbn\\",\\"type\\":\\"list\\",\\"content\\":[\\"Is my income stable?\\",\\"Can I maintain payments if my income drops temporarily?\\",\\"Do I have emergency savings?\\"]},{\\"id\\":\\"1782373805573-f2kq54yltvv\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Stable employment significantly reduces homeownership risk.\\"},{\\"id\\":\\"1782373820018-eow16sz3vst\\",\\"type\\":\\"separator\\",\\"content\\":null},{\\"id\\":\\"1782373826664-7910zxedk2g\\",\\"type\\":\\"heading\\",\\"level\\":4,\\"content\\":\\"Debt-to-Income Ratio\\"},{\\"id\\":\\"1782373845702-bu5jzsk68b\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Many experts recommend keeping total loan obligations below 35–40% of monthly income.\\"},{\\"id\\":\\"1782373851159-ry13qtlp83\\",\\"type\\":\\"heading\\",\\"level\\":5,\\"content\\":\\"Example\\"},{\\"id\\":\\"1782373860013-cl87m89rp0b\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Monthly Income: NPR 150,000\\"},{\\"id\\":\\"1782373863250-pkrtw5vw0nm\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Maximum Comfortable Housing Payment:\\"},{\\"id\\":\\"1782373871036-gpdz6tpmcgs\\",\\"type\\":\\"quote\\",\\"content\\":\\"35% of income = NPR 52,500\\"},{\\"id\\":\\"1782373876000-vdhzt7drf1h\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"If loan payments exceed this amount, financial stress may increase.\\"},{\\"id\\":\\"1782373930744-xk3x7zrvzq\\",\\"type\\":\\"heading\\",\\"level\\":4,\\"content\\":\\"Emergency Fund Availability\\"},{\\"id\\":\\"1782373935172-buaqeu4fn85\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Before purchasing a home, maintain savings that can cover:\\"},{\\"id\\":\\"1782373942147-buusvg5bunn\\",\\"type\\":\\"list\\",\\"content\\":[\\"6–12 months of expenses\\",\\"Loan repayments\\",\\"Unexpected repairs\\"]},{\\"id\\":\\"1782373947634-mwm37xpyb28\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Many homeowners struggle because they use all their savings for the down payment.\\"},{\\"id\\":\\"1782373970416-iddqbhuyxp\\",\\"type\\":\\"separator\\",\\"content\\":null},{\\"id\\":\\"1782373976493-z99swxlhap\\",\\"type\\":\\"heading\\",\\"level\\":4,\\"content\\":\\"Ask These Questions Before Buying\\"},{\\"id\\":\\"1782373984366-pbtz0nbfnj\\",\\"type\\":\\"heading\\",\\"level\\":5,\\"content\\":\\"✔ Will I live here for at least 7–10 years?\\"},{\\"id\\":\\"1782374011240-2n0xkkp5j0q\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"If not, renting may be more practical.\\"},{\\"id\\":\\"1782374027053-ql55yz7eaxn\\",\\"type\\":\\"heading\\",\\"level\\":5,\\"content\\":\\"✔ Do I have at least 20–30% for a down payment?\\"},{\\"id\\":\\"1782374032850-vvbgm0abk7h\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Lower down payments often result in larger loans and higher interest costs.\\"},{\\"id\\":\\"1782374038110-8s64japtlmy\\",\\"type\\":\\"heading\\",\\"level\\":5,\\"content\\":\\"✔ Can I comfortably pay EMI and maintain my lifestyle?\\"},{\\"id\\":\\"1782374042796-cw683ezuz6u\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"If the answer is no, waiting may be wiser.\\"},{\\"id\\":\\"1782374047219-jcexw3ttkwa\\",\\"type\\":\\"separator\\",\\"content\\":null},{\\"id\\":\\"1782374057800-pzdb65a5v5\\",\\"type\\":\\"heading\\",\\"level\\":2,\\"content\\":\\"Legal Rights of Tenants in Nepal\\"},{\\"id\\":\\"1782374065206-nj83i8b8g6n\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Tenants are protected by rental agreements and applicable laws.\\"},{\\"id\\":\\"1782374069841-puff6vbc29o\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Key rights generally include:\\"},{\\"id\\":\\"1782374076578-nc1d6fqc17s\\",\\"type\\":\\"heading\\",\\"level\\":4,\\"content\\":\\"Right to Peaceful Occupancy\\"},{\\"id\\":\\"1782374084090-saoby33rb1\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Landlords cannot arbitrarily remove tenants without following agreed contractual terms.\\"},{\\"id\\":\\"1782374089515-mcqheokos3\\",\\"type\\":\\"heading\\",\\"level\\":4,\\"content\\":\\"Right to Basic Living Conditions\\"},{\\"id\\":\\"1782374117058-a2vxr8emq2u\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"The rented property should remain safe and habitable.\\"},{\\"id\\":\\"1782374125455-o1jxlpkutvq\\",\\"type\\":\\"heading\\",\\"level\\":4,\\"content\\":\\"Right to Written Agreements\\"},{\\"id\\":\\"1782374133785-s38e8723i3\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Tenants should insist on written contracts that clearly define:\\"},{\\"id\\":\\"1782374139539-l6dqb8pvqy\\",\\"type\\":\\"list\\",\\"content\\":[\\"Rent amount\\",\\"Security deposit\\",\\"Payment schedule\\",\\"Maintenance responsibilities\\",\\"Notice periods\\"]},{\\"id\\":\\"1782374147033-chrkxz53hhd\\",\\"type\\":\\"heading\\",\\"level\\":4,\\"content\\":\\"Right to Deposit Refund\\"},{\\"id\\":\\"1782374152156-ofpup67sqrj\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Security deposits should be returned according to the conditions specified in the rental agreement.\\"},{\\"id\\":\\"1782374167958-wwo4ivt3tcs\\",\\"type\\":\\"callout\\",\\"content\\":{\\"title\\":\\"Tenant Tip\\",\\"description\\":\\"Always document property condition with photos before moving in.\\"}},{\\"id\\":\\"1782374199748-1uo2v35qkr4\\",\\"type\\":\\"heading\\",\\"level\\":2,\\"content\\":\\"Legal Rights of Homeowners in Nepal\\"},{\\"id\\":\\"1782374206453-c6wsx6kk4t8\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Owning a home in Nepal provides individuals with significant legal rights and long-term financial benefits, but it also comes with important responsibilities. Unlike tenants, homeowners have complete control over their property and can make decisions regarding its use, transfer, and development. A registered property owner has the legal authority to sell, lease, gift, or transfer ownership of the property to another individual. Property can also be used as collateral when applying for bank loans or other forms of financing, making real estate one of the most valuable assets for wealth creation in Nepal.\\"},{\\"id\\":\\"1782374283312-lr5wuzz8dha\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"In addition to ownership rights, homeowners are protected by Nepalese property laws against unauthorized occupation, encroachment, or disputes related to land ownership. Properly registered land and property documents serve as legal proof of ownership and can be used to seek protection through the courts if ownership rights are challenged. This legal security is one of the primary reasons why many Nepalese view real estate as a stable long-term investment.\\"},{\\"id\\":\\"1782374286586-zwc3w22n7d\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Homeowners also enjoy the freedom to renovate, expand, or improve their properties according to their needs and preferences. Whether adding new rooms, redesigning interiors, or constructing additional structures, owners have greater flexibility compared to renters. However, all development activities must comply with local building regulations, zoning laws, and municipal requirements to ensure legal compliance and safety standards.\\"},{\\"id\\":\\"1782374290069-wou1ovjlpc9\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Despite these benefits, homeownership carries ongoing responsibilities. Property owners are required to pay applicable property taxes, maintain accurate ownership records, and ensure their property complies with local regulations. They are also responsible for maintenance, repairs, and any costs associated with preserving the property's value. Therefore, while owning a home provides stability, control, and wealth-building opportunities, it also requires long-term financial commitment and responsible property management.\\"},{\\"id\\":\\"1782374299864-2ko1l40l0ci\\",\\"type\\":\\"heading\\",\\"level\\":2,\\"content\\":\\"When Renting Is the Smarter Financial Choice\\"},{\\"id\\":\\"1782374305311-p57h1qdsttm\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Renting is often the more practical option for individuals who prioritize flexibility, mobility, and lower financial obligations. For young professionals, students, or families who are still determining where they want to settle permanently, renting provides the freedom to relocate without being tied to a long-term mortgage or property ownership responsibilities. This flexibility can be particularly valuable in a rapidly changing job market where career opportunities may require moving to different cities or regions.\\"},{\\"id\\":\\"1782374309238-flbzuo3z4c\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"One of the biggest advantages of renting is the significantly lower upfront cost. Purchasing a property in cities such as Kathmandu often requires a substantial down payment, registration fees, taxes, and other transaction costs. Renters can avoid these large initial expenses and use their savings for education, business investments, emergency funds, or other financial goals. This can be especially beneficial for individuals who have not yet accumulated enough capital to comfortably purchase a home.\\"},{\\"id\\":\\"1782374315878-y8zq5kyof2\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Renting may also make financial sense when property prices exceed an individual's affordability level. Rather than stretching finances to secure a large home loan, renters can choose accommodation that fits their current budget while continuing to save and invest. Additionally, renters are generally not responsible for major maintenance costs, structural repairs, or property taxes, reducing the risk of unexpected expenses.\\"},{\\"id\\":\\"1782374320107-o4qa39gadvl\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"For people who value lifestyle flexibility and wish to avoid long-term debt commitments, renting can offer greater peace of mind. It allows individuals to adapt more easily to changes in employment, family circumstances, or financial conditions without the burden of selling a property or managing mortgage payments. While renting does not build ownership equity, it can provide a financially sustainable and strategically sound housing solution depending on a person's stage of life and long-term objectives.\\"},{\\"id\\":\\"1782374326652-n800ovj84j\\",\\"type\\":\\"quote\\",\\"content\\":\\"For people who value lifestyle flexibility and wish to avoid long-term debt commitments, renting can offer greater peace of mind. It allows individuals to adapt more easily to changes in employment, family circumstances, or financial conditions without the burden of selling a property or managing mortgage payments. While renting does not build ownership equity, it can provide a financially sustainable and strategically sound housing solution depending on a person's stage of life and long-term objectives.\\"},{\\"id\\":\\"1782374355244-s6vhie7076\\",\\"type\\":\\"heading\\",\\"level\\":2,\\"content\\":\\"Final Thoughts\\"},{\\"id\\":\\"1782374368642-tj401l8skw\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"There is no universal answer to the rent-versus-buy debate in Nepal. Renting offers flexibility, lower risk, and reduced upfront costs, while buying provides ownership, stability, and long-term wealth-building opportunities.\\\\n\\\\nThe best decision is the one that aligns with your financial capacity, career plans, family needs, and investment objectives. Before committing to either option, carefully analyze all costs, not just monthly payments, and ensure that the choice supports your broader financial goals.\\"},{\\"id\\":\\"1782374376140-7pfgicqr9oy\\",\\"type\\":\\"quote\\",\\"content\\":\\"\\\\\\"A home should strengthen your financial future, not become a burden on it.\\\\\\"\\"}]"	Compare renting vs buying a home in Nepal. Learn about property costs, home loans, tenant rights, homeowner rights, and discover which option makes better financial sense in 2026.	f
cmqsei1xr000bgufuswluip05	Property Valuation Guide for Beginners in Nepal: How to Know the True Value of Your Property	property-valuation-guide-for-beginners-in-nepal-how-to-know-the-true-value-of-your-property-1782325360713	cmqfmayr50000b6fuy4i7hlpv	cmqrt80gc0003twfuc9wwoyal	2026-06-24 18:22:40.719	2026-06-25 08:02:30.538	/uploads/ad-1782325360712.jpg	PUBLISHED	2	[{"id": "1782369347032-08h2g347mue", "type": "heading", "level": 2, "content": "Introduction"}, {"id": "1782369353257-oi2wh94chcg", "type": "paragraph", "content": "Whether you are buying your first plot of land, selling a family home, applying for a bank loan, or making a real estate investment, understanding property valuation is one of the most important steps in the process. Many buyers in Nepal focus only on the asking price, but the actual value of a property can be very different from what is advertised in the market."}, {"id": "1782369357581-ekx369swoxs", "type": "paragraph", "content": "Property valuation is the process of determining the fair economic worth of a property based on various factors such as location, accessibility, land size, infrastructure, market demand, and property condition. A proper valuation helps buyers avoid overpaying, sellers set realistic prices, and investors make informed decisions."}, {"id": "1782369362076-jxf7ujl0mnr", "type": "paragraph", "content": "In Nepal's growing real estate market, knowing how valuation works can save you from costly mistakes and help you make smarter investment decisions."}, {"id": "1782369376986-t0dzhaonwam", "type": "heading", "level": 2, "content": "What Is Property Valuation?"}, {"id": "1782369384766-ankkv8iawhg", "type": "paragraph", "content": "Property valuation is the professional assessment of a property's current monetary value. It is conducted to estimate how much a property would reasonably sell for in the open market under normal conditions."}, {"id": "1782369389139-vtn045pvg2j", "type": "paragraph", "content": "Valuation is commonly required when:"}, {"id": "1782369396481-7pxnzov65rw", "type": "list", "content": ["Buying property", "Selling property", "Applying for home or land loans", "Property inheritance", "Tax calculations", "Investment analysis", "Legal disputes"]}, {"id": "1782369404338-puduaqfwue", "type": "paragraph", "content": "A valuation report provides an objective estimate based on data rather than emotions or assumptions."}, {"id": "1782369420781-akg1frk8z4i", "type": "callout", "content": {"title": "Why Valuation Matters", "description": "A property's asking price is not always its actual value. Proper valuation helps buyers avoid overpaying and sellers avoid underpricing their assets."}}, {"id": "1782369429511-63t0rka2wm6", "type": "heading", "level": 2, "content": "How Is Property Valuation Calculated for Residential Land in Nepal?"}, {"id": "1782369434513-intm9697zum", "type": "paragraph", "content": "The valuation of residential land depends heavily on location and market demand. In urban areas, land often represents the majority of a property's value."}, {"id": "1782369437765-c5h4gmmoik", "type": "paragraph", "content": "Professional valuers typically consider factors such as road access, neighborhood development, utility availability, future infrastructure plans, and recent sales of similar properties nearby."}, {"id": "1782369441975-kk1wlqa5mq", "type": "paragraph", "content": "A simplified calculation generally follows this approach:"}, {"id": "1782369456735-3yxgijcgrqy", "type": "quote", "content": "Land Value = Land Area × Market Rate per Unit Area"}, {"id": "1782369470538-qcjusdanwi", "type": "paragraph", "content": "For example, if a 4 Anna plot is located in an area where land is selling for NPR 35 Lakhs per Anna, the estimated land value would be:"}, {"id": "1782369476087-iyykx67femp", "type": "quote", "content": "4 Anna × NPR 35 Lakhs = NPR 1.4 Crore"}, {"id": "1782369481107-ckfsttyprek", "type": "paragraph", "content": "However, actual valuation may vary depending on road frontage, shape of the plot, corner location advantages, and surrounding development."}, {"id": "1782369493996-3zenvks67y3", "type": "image", "content": "/uploads/ad-1782369493994.jpg"}, {"id": "1782369502910-726xoxwvnmc", "type": "separator", "content": null}, {"id": "1782369509560-eeek11w5kvk", "type": "heading", "level": 2, "content": "How Is Property Valuation Calculated for Houses in Nepal?"}, {"id": "1782369514328-8jw325x61v", "type": "paragraph", "content": "When valuing a house, professionals assess both the land and the building separately."}, {"id": "1782369517888-2gbskc0yetp", "type": "paragraph", "content": "The land value is calculated based on current market rates, while the building value depends on construction quality, age, design, materials used, maintenance condition, and total built-up area."}, {"id": "1782369523610-gatym3gea9", "type": "paragraph", "content": "A property's value is generally determined by combining:"}, {"id": "1782369533095-31plsp45rfo", "type": "list", "content": ["Land Value", "Building Value", "Additional Feature"]}, {"id": "1782369539782-4735jfhcpwn", "type": "paragraph", "content": "Additional features may include:"}, {"id": "1782369554082-y17pp0m57wa", "type": "list", "content": ["Parking facilities", "Garden area", "Boundary walls", "Solar systems", "Water supply systems", "Commercial use potential"]}, {"id": "1782369564020-57qzi0wtdcq", "type": "paragraph", "content": "Older buildings may undergo depreciation adjustments, reducing their assessed value compared to newer constructions."}, {"id": "1782369566374-4h6rz62le0f", "type": "separator", "content": null}, {"id": "1782369587475-0a5cfg1ispyi", "type": "callout", "content": {"title": "Investor Insight", "description": "In many areas of Nepal, especially within Kathmandu Valley, the land often appreciates faster than the building itself. Investors frequently prioritize location over building age."}}, {"id": "1782369598794-rl8cv1dbnp", "type": "heading", "level": 2, "content": "What Factors Affect the Market Value of a Property in Nepal?"}, {"id": "1782369603705-deeab6g31ce", "type": "paragraph", "content": "Property prices vary significantly across Nepal because multiple factors influence market value."}, {"id": "1782369609699-6dx50mn13m7", "type": "heading", "level": 4, "content": "Location"}, {"id": "1782369615198-rz0ntiqblq", "type": "paragraph", "content": "Location remains the most influential factor. Properties located near schools, hospitals, commercial centers, transportation routes, and employment hubs generally command higher prices."}, {"id": "1782369618743-s1v47m6c17", "type": "paragraph", "content": "For example, a house in Baneshwor may have significantly higher market value than a similar house located in a less developed area despite having identical construction quality."}, {"id": "1782369626321-tkq5hlfete", "type": "heading", "level": 4, "content": "Accessibility"}, {"id": "1782369631476-gq54gb07v5a", "type": "paragraph", "content": "Road access plays a crucial role in valuation. Properties connected to wider roads or highways often receive higher valuations because they offer better convenience and commercial potential."}, {"id": "1782369639150-7xrg6g2gyz7", "type": "heading", "level": 4, "content": "Infrastructure Development"}, {"id": "1782369644233-vfjcrzbyb", "type": "paragraph", "content": "Upcoming infrastructure projects can dramatically increase property values. Areas benefiting from road expansion projects, ring roads, public transportation systems, and urban development initiatives often experience rapid appreciation."}, {"id": "1782369649696-8l6fv9gi0hw", "type": "heading", "level": 4, "content": "Neighborhood Quality"}, {"id": "1782369655030-r0whqu28xw", "type": "paragraph", "content": "Safe, clean, and well-developed neighborhoods naturally attract more buyers and investors, increasing demand and property values."}, {"id": "1782369660385-qjxgkbhhf5a", "type": "heading", "level": 4, "content": "Land Shape and Frontage"}, {"id": "1782369665183-07q7pdwgaj4c", "type": "paragraph", "content": "Regularly shaped plots with good road frontage are generally more desirable than irregularly shaped properties, resulting in higher valuations."}, {"id": "1782369670511-pryg4vfngdc", "type": "heading", "level": 4, "content": "Market Demand"}, {"id": "1782369680249-tvrw7u98ymi", "type": "paragraph", "content": "Supply and demand significantly impact prices. Areas experiencing rapid population growth and urban migration often see stronger appreciation than regions with slower development."}, {"id": "1782369701545-yb882utqko", "type": "image", "content": "/uploads/ad-1782369701543.jpg"}, {"id": "1782369691990-3qv6c8ymacr", "type": "separator", "content": null}, {"id": "1782369723395-l7rth2b6m9i", "type": "heading", "level": 2, "content": "Government Valuation vs Market Valuation in Nepal"}, {"id": "1782369728385-0j63irlhu4n5", "type": "paragraph", "content": "One of the most misunderstood aspects of Nepal's real estate sector is the difference between government valuation and market valuation."}, {"id": "1782369740159-hhmgjvb9aw4", "type": "heading", "level": 3, "content": "Government Valuation"}, {"id": "1782369745935-mm73ax83nxc", "type": "paragraph", "content": "Government valuation, often called the minimum valuation rate, is determined by local government authorities for taxation and registration purposes."}, {"id": "1782369749359-xrcpwfea0m9", "type": "paragraph", "content": "This value is typically lower than actual market prices and serves as the basis for calculating:"}, {"id": "1782369756211-fdyrbnidfi", "type": "list", "content": ["Registration fees", "Capital gains tax", "Government charges", "Property transfer costs"]}, {"id": "1782369764094-envfswqy12v", "type": "heading", "level": 3, "content": "Market Valuation"}, {"id": "1782369770702-aqhwnylvsys", "type": "paragraph", "content": "Market valuation reflects the price that buyers are currently willing to pay for a property in the open market."}, {"id": "1782369775949-s76foyjee0r", "type": "paragraph", "content": "This value is influenced by:"}, {"id": "1782369781720-hbsumn8rsc", "type": "list", "content": ["Demand and supply", "Location", "Property condition", "Market trends", "Economic conditions"]}, {"id": "1782369787051-llx3j06x4aq", "type": "paragraph", "content": "In many areas of Nepal, market values can be significantly higher than government valuation rates."}, {"id": "1782369802584-itcrro8oihl", "type": "callout", "content": {"title": "Important Note", "description": "Never rely solely on government valuation when making an investment decision. Market valuation provides a more realistic picture of a property's true worth."}}, {"id": "1782369812729-tbh06sx0dsc", "type": "heading", "level": 3, "content": "Who Performs Property Valuation in Nepal?"}, {"id": "1782369827089-ltz40qank2i", "type": "paragraph", "content": "Property valuation is usually conducted by qualified professionals who have expertise in real estate assessment and market analysis."}, {"id": "1782369832814-u8ony2pg6fb", "type": "paragraph", "content": "Common professionals involved include:"}, {"id": "1782369839651-3euxer00bgr", "type": "heading", "level": 4, "content": "Licensed Property Valuers"}, {"id": "1782369846846-fjs2mvfx9ns", "type": "paragraph", "content": "Professional valuers specialize in assessing real estate and preparing detailed valuation reports."}, {"id": "1782369856098-6ezchoorhb8", "type": "heading", "level": 4, "content": "Banks and Financial Institutions"}, {"id": "1782369862379-3u5fljf73jy", "type": "paragraph", "content": "Banks often appoint approved valuers before approving home loans, mortgage financing, or property-backed lending."}, {"id": "1782369868939-sk0ahxyuiii", "type": "heading", "level": 4, "content": "Civil Engineers"}, {"id": "1782369874181-sh02vd1hsp", "type": "paragraph", "content": "Many valuation reports in Nepal are prepared by experienced civil engineers who evaluate construction quality and structural conditions."}, {"id": "1782369879339-586xuy3bb3m", "type": "heading", "level": 4, "content": "Real Estate Consultants"}, {"id": "1782369884122-dfw1pghjedo", "type": "paragraph", "content": "Experienced real estate consultants may provide market-based valuation estimates based on recent transactions and local market knowledge."}, {"id": "1782369898795-mlqwr1z8nlp", "type": "image", "content": "/uploads/ad-1782369898793.jpg"}, {"id": "1782369911434-9e93mtnu4sp", "type": "heading", "level": 2, "content": "Can I Do Property Valuation Myself?"}, {"id": "1782369919132-r56z5z7ji4g", "type": "paragraph", "content": "While property owners can estimate a property's value through market research, self-valuation has limitations."}, {"id": "1782369922884-spx9r6wu1di", "type": "paragraph", "content": "You can perform a basic assessment by:"}, {"id": "1782369928383-ne6qd4yyqh", "type": "list", "content": ["Reviewing recent property sales nearby", "Comparing similar properties", "Studying current market trends", "Evaluating location advantages"]}, {"id": "1782369934719-a63tnq41g2w", "type": "paragraph", "content": "However, personal estimates may be influenced by emotional attachment or incomplete market data."}, {"id": "1782369938077-i6f43ynzcxc", "type": "paragraph", "content": "Professional valuers have access to industry methodologies, comparable sales information, and technical expertise that produce more accurate and reliable results."}, {"id": "1782369944178-eb59e0p44so", "type": "paragraph", "content": "For legal transactions, bank financing, or major investments, professional valuation is strongly recommended."}, {"id": "1782369955810-qpv3rf51ce", "type": "callout", "content": {"title": "Quick Tip for Buyers", "description": "If a property's selling price appears significantly higher than surrounding properties, request an independent valuation before making any commitment."}}, {"id": "1782369971748-2dqfe0e8hna", "type": "separator", "content": null}, {"id": "1782369967402-l16p8zanrrd", "type": "heading", "level": 2, "content": "Why Investors Should Always Obtain an Official Valuation"}, {"id": "1782369981523-2aeidu5r56v", "type": "paragraph", "content": "For investors, property valuation is more than a pricing exercise—it is a risk management tool."}, {"id": "1782369987046-9431maogikt", "type": "paragraph", "content": "An official valuation helps investors:"}, {"id": "1782369994278-lzr6g8xc6ym", "type": "list", "content": ["Identify overvalued properties", "Estimate future returns", "Negotiate better prices", "Assess loan eligibility", "Reduce investment risks", "Verify market assumptions"]}, {"id": "1782369999836-lrd9802tt6r", "type": "paragraph", "content": "A relatively small valuation fee can potentially save millions of rupees by preventing poor investment decisions."}, {"id": "1782370008931-kdxm4dvjl9", "type": "heading", "level": 2, "content": "Investment Perspective: Using Valuation to Measure ROI"}, {"id": "1782370014669-nvp54uvt0xl", "type": "paragraph", "content": "Before purchasing any property, investors should compare valuation results with expected returns."}, {"id": "1782370018007-chuwtk990em", "type": "paragraph", "content": "Consider factors such as:"}, {"id": "1782370024838-157rpnun89", "type": "list", "content": ["Potential rental income", "Future appreciation prospects", "Infrastructure developments", "Property maintenance costs", "Financing expenses"]}, {"id": "1782370035980-i1ghw5lidy", "type": "paragraph", "content": "A property purchased below its market value often provides stronger long-term investment potential and greater opportunities for profit."}, {"id": "1782370049213-1ng46ii3jwa", "type": "image", "content": "/uploads/ad-1782370049211.jpg"}, {"id": "1782370056716-b5l8g0b5a7q", "type": "heading", "level": 2, "content": "Common Mistakes to Avoid During Property Valuation"}, {"id": "1782370061353-f68c2781szk", "type": "paragraph", "content": "Many buyers and sellers make mistakes that lead to inaccurate pricing decisions. One common mistake is relying solely on verbal estimates from neighbors or local agents without verifying actual market transactions. Another is ignoring future development plans that may significantly impact value over time."}, {"id": "1782370068131-muy88cstre", "type": "paragraph", "content": "Some investors also focus entirely on current prices while overlooking rental potential, infrastructure projects, or legal complications that can affect future returns. Proper research and professional guidance help avoid these costly errors."}, {"id": "1782370080932-dvsvpjt3hjp", "type": "separator", "content": null}, {"id": "1782370074573-bbjr1wjzuh", "type": "heading", "level": 2, "content": "Conclusion"}, {"id": "1782370092568-1txrksmugc4", "type": "paragraph", "content": "Property valuation is one of the most important steps in any real estate transaction. Whether you are buying, selling, investing, or applying for financing, understanding a property's true value helps you make informed decisions and reduce financial risks."}, {"id": "1782370096522-f81xnbn0cxf", "type": "paragraph", "content": "While basic estimates can be performed independently, professional valuation provides greater accuracy, credibility, and peace of mind. In Nepal's evolving real estate market, obtaining an official valuation before making a major property decision is not just a recommendation—it is a smart investment strategy."}, {"id": "1782370100269-kefp9xpriss", "type": "paragraph", "content": "A well-valued property forms the foundation of a successful real estate investment and helps ensure that every rupee you invest is backed by reliable market data."}]	Learn how property valuation works in Nepal, the difference between government and market valuation, factors affecting property prices, and why professional valuation is essential before buying or selling real estate.	f
cmqt6d7p70006fffuw6spcv65	Real Estate Investment in Nepal (2026): A Complete Guide to Building Wealth Through Property	real-estate-investment-in-nepal-2026-a-complete-guide-to-building-wealth-through-property-1782372164148	cmqfmayr50000b6fuy4i7hlpv	cmqrt7py40002twfu2ovgrpl4	2026-06-25 07:22:44.155	2026-06-25 08:02:30.539	/uploads/ad-1782372164148.jpg	PUBLISHED	2	"[{\\"id\\":\\"1782371323060-709n86bbny5\\",\\"type\\":\\"heading\\",\\"level\\":2,\\"content\\":\\"Real Estate Investment in Nepal: Turning Property into Long-Term Wealth\\"},{\\"id\\":\\"1782371328130-blx5s50g2mp\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"For decades, real estate has remained one of Nepal's most trusted investment opportunities. While stocks, cryptocurrencies, and other financial assets may experience dramatic fluctuations, property continues to offer something investors value most: stability, security, and long-term growth.\\"},{\\"id\\":\\"1782371331667-vgnx3dp6s7\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"As cities expand, infrastructure improves, and demand for housing and commercial spaces increases, property ownership is becoming more than just a status symbol—it is a strategic financial asset. Whether you are a first-time investor or someone looking to diversify your portfolio, understanding the fundamentals of Nepal's property market can help you make informed and profitable decisions.\\"},{\\"id\\":\\"1782371346032-q5mwkx14yu\\",\\"type\\":\\"callout\\",\\"content\\":{\\"title\\":\\"Investor Insight\\",\\"description\\":\\"Historically, well-located properties in major urban centers of Nepal have outperformed inflation and provided significant capital appreciation over the long term.\\"}},{\\"id\\":\\"1782371350113-yqnme6nnps\\",\\"type\\":\\"separator\\",\\"content\\":null},{\\"id\\":\\"1782371361367-82ipni5psxy\\",\\"type\\":\\"heading\\",\\"level\\":2,\\"content\\":\\"Why Real Estate Continues to Attract Investors in Nepal\\"},{\\"id\\":\\"1782371366522-xb3fb5ah5fj\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Nepal's real estate market is closely linked with urbanization and economic development. Every year, thousands of families move toward major cities seeking better education, healthcare, employment, and business opportunities. This continuous migration creates sustained demand for land, apartments, houses, and commercial spaces.\\"},{\\"id\\":\\"1782371371208-l566gbp8hnd\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Unlike many investment options, real estate provides two potential income streams: rental earnings and capital appreciation. Investors can earn monthly income while simultaneously benefiting from increasing property values over time.\\"},{\\"id\\":\\"1782371374431-plvh5fsqdnl\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Moreover, property serves as a tangible asset that can be passed down through generations, making it particularly attractive for long-term wealth preservation.\\"},{\\"id\\":\\"1782371391861-2twvk69osn1\\",\\"type\\":\\"callout\\",\\"content\\":{\\"title\\":\\"Quick Fact\\",\\"description\\":\\"A property generating rental income while appreciating in value effectively creates two layers of return, which is why many investors consider real estate a cornerstone of wealth-building.\\"}},{\\"id\\":\\"1782371401423-e0o5oypz9mj\\",\\"type\\":\\"heading\\",\\"level\\":2,\\"content\\":\\"The Most Profitable Areas in Nepal for Real Estate Investment\\"},{\\"id\\":\\"1782371408701-615t0c8drmq\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Location remains the single most important factor in determining investment success. Areas experiencing infrastructure growth, improved connectivity, and rising population density typically offer the strongest appreciation potential.\\"},{\\"id\\":\\"1782371413644-g7oobfkccrv\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Within Kathmandu Valley, locations such as Budhanilkantha, Tokha, Kapan, Jorpati, Lubhu, and parts of Bhaktapur have attracted growing investor interest. Improved road access, new housing developments, and increasing demand from families have contributed to rising property values in these areas.\\"},{\\"id\\":\\"1782371417696-wcak0cs03x\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Outside the valley, Pokhara continues to thrive due to tourism, urban expansion, and growing demand for residential properties. Butwal and Bhairahawa have emerged as commercial hotspots due to industrial growth and trade activities, while Chitwan's expanding business environment continues to attract investors.\\"},{\\"id\\":\\"1782371420861-88l3o77itpa\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"The most successful investors often focus not on where development already exists, but where development is heading.\\"},{\\"id\\":\\"1782371550249-latyjs7nyy\\",\\"type\\":\\"callout\\",\\"content\\":{\\"title\\":\\"Investment Callout\\",\\"description\\":\\"Properties located near highways, ring roads, educational institutions, hospitals, and commercial centers generally experience faster appreciation than isolated areas.\\"}},{\\"id\\":\\"1782371553695-u3rq2j7l1ka\\",\\"type\\":\\"separator\\",\\"content\\":null},{\\"id\\":\\"1782371559372-llrskaymle\\",\\"type\\":\\"heading\\",\\"level\\":2,\\"content\\":\\"Starting Real Estate Investment with Limited Capital\\"},{\\"id\\":\\"1782371564657-pwyzcjh5t1\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Many people postpone investing because they believe they need enormous amounts of money to get started. In reality, successful property investing often begins with strategic planning rather than large capital reserves.\\"},{\\"id\\":\\"1782371568118-2ykhkimp9yl\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"New investors can start by purchasing smaller plots in developing areas where prices remain relatively affordable. These locations may not be fully developed today, but future infrastructure projects can significantly increase property values.\\"},{\\"id\\":\\"1782371572810-sh7m34zs81\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Another practical option is purchasing apartments or entering joint investments with family members or trusted partners. Bank financing also enables investors to acquire valuable assets while spreading payments over several years.\\"},{\\"id\\":\\"1782371577338-hz4bh6peeb9\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"The key is not necessarily buying the most expensive property available but identifying assets with strong future growth potential.\\"},{\\"id\\":\\"1782371612144-31wfdbptjva\\",\\"type\\":\\"image\\",\\"content\\":\\"/uploads/ad-1782371612142.jpg\\"},{\\"id\\":\\"1782371637970-8j7mqfhnjci\\",\\"type\\":\\"callout\\",\\"content\\":{\\"title\\":\\"Beginner's Tip\\",\\"description\\":\\"Instead of asking, \\\\\\"What property can I afford today?\\\\\\" ask, \\\\\\"Which property is most likely to increase in value over the next 5–10 years?\\\\\\"\\"}},{\\"id\\":\\"1782371647167-rd9of2g7oo\\",\\"type\\":\\"heading\\",\\"level\\":2,\\"content\\":\\"Understanding Different Types of Real Estate Investments\\"},{\\"id\\":\\"1782371654761-vxnv4ahai\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Every property category comes with unique advantages and challenges. Choosing the right investment depends on your goals, budget, and risk tolerance.\\\\n\\\\nResidential properties remain the most popular choice for beginners. Houses, apartments, and residential plots generally benefit from consistent demand and lower management complexity. Rental occupancy rates tend to remain stable, particularly in urban areas.\\"},{\\"id\\":\\"1782371662135-z4nsuz9c3lp\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Commercial properties, on the other hand, often provide higher rental yields. Office spaces, retail outlets, and business complexes can generate substantial monthly income, but they usually require larger capital investments and may experience longer vacancy periods.\\\\n\\\\nLand banking offers another approach. Investors purchase undeveloped land and hold it until future development increases its value. Although this strategy may generate significant appreciation, it typically produces no immediate income.\\"},{\\"id\\":\\"1782371699312-p0i8d9ombre\\",\\"type\\":\\"image\\",\\"content\\":\\"/uploads/ad-1782371699310.jpg\\"},{\\"id\\":\\"1782371706962-xxma4d9fg8\\",\\"type\\":\\"heading\\",\\"level\\":2,\\"content\\":\\"Understanding Risks and How Smart Investors Reduce Them\\"},{\\"id\\":\\"1782371711882-7j7p171mni5\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"No investment is completely risk-free, and real estate is no exception. However, understanding risks before purchasing a property can significantly improve investment outcomes.\\"},{\\"id\\":\\"1782371718937-hysca2wrmoo\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"One of the most common concerns in Nepal is legal documentation. Ownership disputes, incomplete paperwork, and unclear boundaries can create expensive problems for buyers. Proper verification through legal experts and government records is essential before completing any transaction.\\\\n\\\\nMarket fluctuations also present challenges. Property prices may not rise every year, and short-term slowdowns can occur. Investors who focus on long-term growth rather than quick profits generally perform better during market cycles.\\"},{\\"id\\":\\"1782371728870-zsn7b23ew9n\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Liquidity risk should also be considered. Unlike stocks, properties cannot be sold instantly when funds are needed. Maintaining emergency savings separate from real estate investments can help address this issue.\\"},{\\"id\\":\\"1782371737589-0515no0hvuix\\",\\"type\\":\\"heading\\",\\"level\\":2,\\"content\\":\\"Risk Management Checklist\\"},{\\"id\\":\\"1782371744265-9hdhy4ybo36\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Before investing, always verify:\\"},{\\"id\\":\\"1782371775817-hcn1iecjlir\\",\\"type\\":\\"list\\",\\"content\\":[\\"Land ownership certificate\\",\\"Tax clearance records\\",\\"Road access and zoning regulations\\",\\"Utility availability\\",\\"Future development plans\\",\\"Market valuation reports\\"]},{\\"id\\":\\"1782371795804-ct9rhauot6k\\",\\"type\\":\\"quote\\",\\"content\\":\\"\\\\\\"The biggest mistakes in real estate are rarely caused by the property itself, they are caused by inadequate research before purchasing.\\\\\\"\\"},{\\"id\\":\\"1782371806959-kgwbby1ucqe\\",\\"type\\":\\"heading\\",\\"level\\":2,\\"content\\":\\"How to Calculate Return on Investment (ROI)\\"},{\\"id\\":\\"1782371813435-i8u221pyxq\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Successful investors evaluate properties using data rather than emotion. One of the most important metrics is Return on Investment (ROI).\\"},{\\"id\\":\\"1782371817034-m5jd1t3whk\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Rental yield measures how much annual rental income a property generates relative to its purchase price.\\"},{\\"id\\":\\"1782371835910-a9ejwj1oue\\",\\"type\\":\\"callout\\",\\"content\\":{\\"title\\":\\"Formula\\",\\"description\\":\\"Rental Yield (%) =\\\\n(Annual Rental Income ÷ Property Cost) × 100\\"}},{\\"id\\":\\"1782371858231-47tktywik7n\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"For example:\\"},{\\"id\\":\\"1782371864754-pgpdjqw225o\\",\\"type\\":\\"list\\",\\"content\\":[\\"Property Price: NPR 15,000,000\\",\\"Annual Rent: NPR 600,000\\"]},{\\"id\\":\\"1782371872993-3nt9kzy3wxh\\",\\"type\\":\\"quote\\",\\"content\\":\\"Rental Yield =\\\\n(600,000 ÷ 15,000,000) × 100\\\\n\\\\n= 4%\\"},{\\"id\\":\\"1782371885729-xc9pifq4r5a\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"However, rental income alone does not tell the full story. Investors should also estimate future appreciation based on infrastructure projects, neighborhood development, and historical market trends.\\"},{\\"id\\":\\"1782371929124-ldmonr2eui\\",\\"type\\":\\"image\\",\\"content\\":\\"/uploads/ad-1782371929122.jpg\\"},{\\"id\\":\\"1782371960239-3p5edru75vo\\",\\"type\\":\\"callout\\",\\"content\\":{\\"title\\":\\"Pro Investor Insight\\",\\"description\\":\\"A property with moderate rental income but strong appreciation potential may outperform a property with high rental yield but limited future growth.\\"}},{\\"id\\":\\"1782371946930-gi84zlmmh0v\\",\\"type\\":\\"separator\\",\\"content\\":null},{\\"id\\":\\"1782371976729-bj3ikkeq0z\\",\\"type\\":\\"heading\\",\\"level\\":2,\\"content\\":\\"Commercial vs Residential Real Estate: Which One Should You Choose?\\"},{\\"id\\":\\"1782371989878-g407npvsw4a\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Residential properties generally require lower investment capital and attract a larger tenant base. They are easier to manage and often provide more predictable occupancy rates.\\"},{\\"id\\":\\"1782371993404-yy2p8ekvb6\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Commercial properties, meanwhile, can produce significantly higher rental returns. Businesses frequently sign longer lease agreements, creating stable income streams. However, vacancies can be more costly and tenant acquisition may take longer.\\"},{\\"id\\":\\"1782371996950-tlwgmak6cfe\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"For beginners, residential investments often provide a safer learning environment. As experience and capital grow, investors may diversify into commercial assets to increase returns.\\"},{\\"id\\":\\"1782372000711-7e2485gv85o\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Many experienced investors eventually maintain a portfolio that includes both property types, balancing stability and growth.\\"},{\\"id\\":\\"1782372095878-0amwbl8k8vba\\",\\"type\\":\\"image\\",\\"content\\":\\"/uploads/ad-1782372095875.png\\"},{\\"id\\":\\"1782372115177-w7hn2twe9ib\\",\\"type\\":\\"heading\\",\\"level\\":2,\\"content\\":\\"The Future of Real Estate Investment in Nepal\\"},{\\"id\\":\\"1782372121162-pubuiaplhwl\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Several trends are expected to shape Nepal's property market in the coming years. Infrastructure expansion, urban migration, tourism development, and industrial growth continue to drive demand across major cities and emerging urban centers.\\\\n\\\\nInvestors who identify future growth corridors before they become mainstream often achieve the highest returns. Areas benefiting from highway projects, transportation hubs, educational institutions, and commercial development are likely to remain attractive investment destinations.\\\\n\\\\nThe key to success is patience. Real estate rewards investors who think in years rather than months.\\"},{\\"id\\":\\"1782372129450-aw3uno9e4kr\\",\\"type\\":\\"heading\\",\\"level\\":2,\\"content\\":\\"Final Thoughts\\"},{\\"id\\":\\"1782372140341-pecvbkcpj4t\\",\\"type\\":\\"paragraph\\",\\"content\\":\\"Real estate remains one of Nepal's most reliable avenues for building long-term wealth. Whether you choose residential properties, commercial spaces, or undeveloped land, success depends on thorough research, careful planning, and a long-term perspective.\\\\n\\\\nThe best investments are rarely the most expensive ones—they are the properties located where future growth is most likely to occur. By understanding market trends, calculating ROI properly, and managing risks effectively, investors can position themselves to benefit from Nepal's evolving real estate landscape for years to come.\\"},{\\"id\\":\\"1782372154788-og0qwo0v9h8\\",\\"type\\":\\"callout\\",\\"content\\":{\\"title\\":\\"Remember\\",\\"description\\":\\"\\\\\\"Buy property based on future potential, not just current popularity. Today's developing neighborhood could become tomorrow's prime investment destination.\\\\\\"\\"}}]"	Learn how to invest in real estate in Nepal, discover the most profitable locations, understand ROI calculations, compare commercial vs residential properties, and explore strategies for long-term success.	t
\.


--
-- Data for Name: BlogViews; Type: TABLE DATA; Schema: public; Owner: blogowner
--

COPY public."BlogViews" (id, "blogPostId", "sessionId", "createdAt") FROM stdin;
cmqsei88s000cgufu5bqg25sa	cmqsei1xr000bgufuswluip05	c3f9680b-ce7f-47e1-8279-94e675bc5a56	2026-06-24 18:22:48.892
cmqt21ua30000ikful6463cr6	cmqsei1xr000bgufuswluip05	1782020704675-0btjqeomh94l	2026-06-25 05:21:55.083
cmqt6dhzl0007fffui7admpws	cmqt6d7p70006fffuw6spcv65	c3f9680b-ce7f-47e1-8279-94e675bc5a56	2026-06-25 07:22:57.489
cmqt6hr7k0000pjfugslskkas	cmqt6d7p70006fffuw6spcv65	1782020704675-0btjqeomh94l	2026-06-25 07:26:16.064
cmqt6m9ru00008ufuns17gvn2	cmqt5m6le0005fffuij5ad8nw	c3f9680b-ce7f-47e1-8279-94e675bc5a56	2026-06-25 07:29:46.746
cmqt7ozhy00068ufu4dh7kzlw	cmqt7oqw600058ufufdr65q63	c3f9680b-ce7f-47e1-8279-94e675bc5a56	2026-06-25 07:59:53.014
\.


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: blogowner
--

COPY public."Category" (id, name, slug, "createdAt", description, "updatedAt") FROM stdin;
cmqrt7jiy0001twfuten6au77	First-Time Home Buyers	first-time-home-buyers	2026-06-24 08:26:38.362	\N	2026-06-24 08:26:38.362
cmqrt7py40002twfu2ovgrpl4	Property Investment	property-investment	2026-06-24 08:26:46.684	\N	2026-06-24 08:26:46.684
cmqrt80gc0003twfuc9wwoyal	Property Valuation	property-valuation	2026-06-24 08:27:00.3	\N	2026-06-24 08:27:00.3
cmqrt87m00004twfu1gn9vg43	Legal Documentation	legal-documentation	2026-06-24 08:27:09.576	\N	2026-06-24 08:27:09.576
cmqrt8ox70005twfut0hte0hw	Kathmandu Real Estate	kathmandu-real-estate	2026-06-24 08:27:32.011	\N	2026-06-24 08:27:32.011
cmqrt91ik0006twfubw97xzeh	Market Insights	market-insights	2026-06-24 08:27:48.332	\N	2026-06-24 08:27:48.332
cmqrt9a440007twfuxn4e0mhy	Real Estate Guides	real-estate-guides	2026-06-24 08:27:59.476	\N	2026-06-24 08:27:59.476
cmqsb89yz0000gufuxtimjrax	Real Estate Investment	real-estate-investment	2026-06-24 16:51:05.723	\N	2026-06-24 16:51:05.723
cmqt6xn8v00018ufu2wuux1vl	Property Buying Guide	property-buying-guide	2026-06-25 07:38:37.423	\N	2026-06-25 07:38:37.423
\.


--
-- Data for Name: NewsletterSubscriber; Type: TABLE DATA; Schema: public; Owner: blogowner
--

COPY public."NewsletterSubscriber" (id, email, "createdAt") FROM stdin;
cmqq7wzy60000w6funya2huwp	unqiueprajapati45@gmail.com	2026-06-23 05:42:48.318
cmqq971tf0001w6fup5r9bc79	Ram	2026-06-23 06:18:36.915
cmqq97crg0002w6fu9n4ofd4y	Ram asdasd	2026-06-23 06:18:51.101
cmqq99hld0003w6fu81i73jez	asd@gmail.com	2026-06-23 06:20:30.673
\.


--
-- Data for Name: Tag; Type: TABLE DATA; Schema: public; Owner: blogowner
--

COPY public."Tag" (id, name, slug, "createdAt", "updatedAt") FROM stdin;
cmqrt9h060008twfuy8h5fsat	real estate nepal	real-estate-nepal	2026-06-24 08:28:08.406	2026-06-24 08:28:08.406
cmqrt9n5k0009twfu9jz7dne3	property in nepal	property-in-nepal	2026-06-24 08:28:16.376	2026-06-24 08:28:16.376
cmqrt9v9y000atwfueoq7zcte	buy property in nepal	buy-property-in-nepal	2026-06-24 08:28:26.902	2026-06-24 08:28:26.902
cmqrt9zu0000btwfuk6ec98ey	sell property in nepal	sell-property-in-nepal	2026-06-24 08:28:32.808	2026-06-24 08:28:32.808
cmqrta8m5000ctwfunc025k8n	property investment nepal	property-investment-nepal	2026-06-24 08:28:44.189	2026-06-24 08:28:44.189
cmqrtaqd9000dtwfu0gyp1hkr	real-estate market in nepal	real-estate-market-in-nepal	2026-06-24 08:29:07.197	2026-06-24 08:29:07.197
cmqrtbcfg000etwfuht6dyd7j	property registration nepal	property-registration-nepal	2026-06-24 08:29:35.788	2026-06-24 08:29:35.788
cmqsb8m4g0001gufujqjpub9s	real estate ROI	real-estate-roi	2026-06-24 16:51:21.472	2026-06-24 16:51:21.472
cmqsb8y520002gufu3sweu03x	Trends in real estate	trends-in-real-estate	2026-06-24 16:51:37.046	2026-06-24 16:51:37.046
cmqsbths90006gufuim4tj0qm	property appraisal nepal	property-appraisal-nepal	2026-06-24 17:07:35.625	2026-06-24 17:07:35.625
cmqsbtm6o0007gufuri2psnoc	land valuation	land-valuation	2026-06-24 17:07:41.328	2026-06-24 17:07:41.328
cmqsbtw3v0008gufu488snf7c	government valuation	government-valuation	2026-06-24 17:07:54.187	2026-06-24 17:07:54.187
cmqsbu19s0009gufurm35526f	market valuation	market-valuation	2026-06-24 17:08:00.88	2026-06-24 17:08:00.88
cmqsbubd9000agufu49xuqliq	property assessment	property-assessment	2026-06-24 17:08:13.965	2026-06-24 17:08:13.965
cmqt5bmv10002fffuvio5k996	first time buyer	first-time-buyer	2026-06-25 06:53:30.877	2026-06-25 06:53:30.877
cmqt5bz6z0003fffugbf2jseq	kathmandu property	kathmandu-property	2026-06-25 06:53:46.859	2026-06-25 06:53:46.859
cmqt5c9tp0004fffuyso6rgcg	residential property	residential-property	2026-06-25 06:54:00.637	2026-06-25 06:54:00.637
cmqt6xqva00028ufuxv611bcz	Renting vs Buying Nepal	renting-vs-buying-nepal	2026-06-25 07:38:42.118	2026-06-25 07:38:42.118
cmqt6xyfb00038ufuvgrfc2l2	Mortgage Nepal	mortgage-nepal	2026-06-25 07:38:51.911	2026-06-25 07:38:51.911
cmqt6y3fw00048ufusqsw521e	Home Ownership Nepal	home-ownership-nepal	2026-06-25 07:38:58.412	2026-06-25 07:38:58.412
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: blogowner
--

COPY public."User" (id, email, name, password, "createdAt", "updatedAt") FROM stdin;
cmqfmayr50000b6fuy4i7hlpv	ekpratishat.admin@gmail.com	ekpratishat	$2b$10$jXTiWclXNRUGyKQiGKc1keLfbIVWqcRWyXmyEFyNrMQqJdcxUvoty	2026-06-15 19:40:06.641	2026-06-15 19:40:06.641
cmqg0rnya000053fuhr3jahqs	ekpratishat@gmail.com	ekpratishat	$2b$10$dTszyh7DKy9y3zlrubFHReDGGrrGXmXX7SvCTvWajxx0Dc9RvqUJO	2026-06-16 02:25:00.419	2026-06-16 02:25:00.419
\.


--
-- Data for Name: _PostTags; Type: TABLE DATA; Schema: public; Owner: blogowner
--

COPY public."_PostTags" ("A", "B") FROM stdin;
cmqsei1xr000bgufuswluip05	cmqsbths90006gufuim4tj0qm
cmqsei1xr000bgufuswluip05	cmqsbtm6o0007gufuri2psnoc
cmqsei1xr000bgufuswluip05	cmqsbtw3v0008gufu488snf7c
cmqsei1xr000bgufuswluip05	cmqsbu19s0009gufurm35526f
cmqsei1xr000bgufuswluip05	cmqsbubd9000agufu49xuqliq
cmqt5m6le0005fffuij5ad8nw	cmqrt9h060008twfuy8h5fsat
cmqt5m6le0005fffuij5ad8nw	cmqrt9n5k0009twfu9jz7dne3
cmqt5m6le0005fffuij5ad8nw	cmqrt9v9y000atwfueoq7zcte
cmqt5m6le0005fffuij5ad8nw	cmqrtaqd9000dtwfu0gyp1hkr
cmqt5m6le0005fffuij5ad8nw	cmqsbubd9000agufu49xuqliq
cmqt5m6le0005fffuij5ad8nw	cmqt5bmv10002fffuvio5k996
cmqt5m6le0005fffuij5ad8nw	cmqt5bz6z0003fffugbf2jseq
cmqt5m6le0005fffuij5ad8nw	cmqt5c9tp0004fffuyso6rgcg
cmqt6d7p70006fffuw6spcv65	cmqrt9h060008twfuy8h5fsat
cmqt6d7p70006fffuw6spcv65	cmqrta8m5000ctwfunc025k8n
cmqt6d7p70006fffuw6spcv65	cmqrtbcfg000etwfuht6dyd7j
cmqt6d7p70006fffuw6spcv65	cmqsb8m4g0001gufujqjpub9s
cmqt6d7p70006fffuw6spcv65	cmqsbths90006gufuim4tj0qm
cmqt6d7p70006fffuw6spcv65	cmqsbubd9000agufu49xuqliq
cmqt6d7p70006fffuw6spcv65	cmqt5c9tp0004fffuyso6rgcg
cmqt7oqw600058ufufdr65q63	cmqrt9h060008twfuy8h5fsat
cmqt7oqw600058ufufdr65q63	cmqrt9v9y000atwfueoq7zcte
cmqt7oqw600058ufufdr65q63	cmqrtaqd9000dtwfu0gyp1hkr
cmqt7oqw600058ufufdr65q63	cmqsb8y520002gufu3sweu03x
cmqt7oqw600058ufufdr65q63	cmqt6xqva00028ufuxv611bcz
cmqt7oqw600058ufufdr65q63	cmqt6xyfb00038ufuvgrfc2l2
cmqt7oqw600058ufufdr65q63	cmqt6y3fw00048ufusqsw521e
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: blogowner
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
fc7284a4-03f5-4f55-9571-8ec74eb43ccd	74e0fe28946fb96d59dc8c0fef807585f2171d552276e3591b5caba7b13ad6ec	2026-06-16 01:21:42.79483+05:45	20260531065849_init	\N	\N	2026-06-16 01:21:42.791588+05:45	1
72e240c3-dd30-4dbf-bc32-2f512a3c311c	5dea340a7cae01b28f49107eef99450b0e35f5b0cf0600aa7ae8af1451359674	2026-06-16 01:21:42.813001+05:45	20260531072414_blogposts	\N	\N	2026-06-16 01:21:42.795323+05:45	1
d82d860f-4467-4183-9a86-1d4017151ab9	3996a3810df9336ce34b86dfa784581223f15644d8df1434cd9ebf28b40335ed	2026-06-21 17:15:10.939381+05:45	20260621113010_asdasd	\N	\N	2026-06-21 17:15:10.936359+05:45	1
bf7af2cb-bcd4-481c-b889-4f4a96373fae	6973b3bb0c5051713d64a920238d272a6ed44d072995abe4c68d425e1b2f5e1a	2026-06-16 01:21:42.816904+05:45	20260531102412_userrole	\N	\N	2026-06-16 01:21:42.813731+05:45	1
36bcf163-4097-428a-81bc-9b55f545f156	355c817f4aefb3365f0050bb2ceb1f3fc9b337c6c8bb932f79b0a230f9cbc882	2026-06-16 01:21:42.821678+05:45	20260531103558_category_tag_fields	\N	\N	2026-06-16 01:21:42.81775+05:45	1
98c20dbb-728c-46e8-8a94-ffed5be41310	dcefbb395aae5d233bc5e65098c3afa1faa55318b4173ec9c8bca2909ca47be7	2026-06-16 01:21:42.829037+05:45	20260602070436_blog_views	\N	\N	2026-06-16 01:21:42.822293+05:45	1
e079ed07-cf76-4eba-a2ec-c1b5af5dd9a6	ff1700a6ada1df3ff64efee7cba3be4d027f3c1e7d22f2b19f651ce2584e50ba	2026-06-23 11:10:06.584532+05:45	20260623052506_newsletter	\N	\N	2026-06-23 11:10:06.575153+05:45	1
2719ff03-5ab0-4a49-b6bd-77d08efa689f	4bc301fb9ca5b976874573c925787b37f8d1df41fe2625994171025632e90290	2026-06-16 01:21:42.843795+05:45	20260603090124_some	\N	\N	2026-06-16 01:21:42.829718+05:45	1
c1fde5eb-f24d-48a0-b7cf-8b8da001e89d	a2e6c5a687e910fee9372ffd7dab623f5327bd614a593f2a18933fb41f23056c	2026-06-16 01:21:42.846441+05:45	20260606000000_add_description	\N	\N	2026-06-16 01:21:42.844299+05:45	1
0e48abd2-9557-4ccd-b710-9e23071f7bde	726e182b664cb1584f381439ba8604f40a828376d43cc13e8633d4f44ad0456e	2026-06-16 01:21:42.851659+05:45	20260615080938_mig	\N	\N	2026-06-16 01:21:42.84699+05:45	1
21c1a663-99bc-444e-9015-35e306c2521b	401d2494ce99727305334ed0edce63b0023b62996e62479a1521b4a04cf9ff05	2026-06-16 01:21:42.855723+05:45	20260615081416_mig	\N	\N	2026-06-16 01:21:42.852531+05:45	1
94923566-4d92-402a-a27c-4bfb6ad4d72d	dcefbb395aae5d233bc5e65098c3afa1faa55318b4173ec9c8bca2909ca47be7	2026-06-16 01:21:42.861633+05:45	20260615082339_mig	\N	\N	2026-06-16 01:21:42.856589+05:45	1
d376b627-9252-4922-a693-a098ed17ae3f	fa84da8b937bc966c09c63b5cebe8ef838ddf8583db70052227645eb73edd05e	2026-06-16 22:20:03.2741+05:45	20260616163503_is_toggled	\N	\N	2026-06-16 22:20:03.26664+05:45	1
8722eac8-98be-4a59-96d1-239bf06e4f36	9ad559dbbb0fc65b79bbd36f0b8b1a2f2d66641c197665b47ec284a64045acad	2026-06-17 14:27:53.135243+05:45	20260617084253_advertisement	\N	\N	2026-06-17 14:27:53.12881+05:45	1
c53b171a-7820-4b3a-9649-4a931baf6218	376013e7e31a3081bb51b3f4f2fa5ccb930cf20cdd9d18f2ce54053f5f1a9c32	2026-06-17 15:14:10.992624+05:45	20260617092910_advertisement	\N	\N	2026-06-17 15:14:10.990324+05:45	1
4dbc1a70-72b9-421d-b37f-1d7696524cd1	f32a6f6e1ed989e47d14e4915bc80528efc1fb1eb11b27df2b3ab432a02b913c	2026-06-18 11:33:02.29844+05:45	20260618054551_updated_at	\N	\N	2026-06-18 11:33:02.295778+05:45	1
\.


--
-- Name: Advertisement Advertisement_pkey; Type: CONSTRAINT; Schema: public; Owner: blogowner
--

ALTER TABLE ONLY public."Advertisement"
    ADD CONSTRAINT "Advertisement_pkey" PRIMARY KEY (id);


--
-- Name: BlogPost BlogPost_pkey; Type: CONSTRAINT; Schema: public; Owner: blogowner
--

ALTER TABLE ONLY public."BlogPost"
    ADD CONSTRAINT "BlogPost_pkey" PRIMARY KEY (id);


--
-- Name: BlogViews BlogViews_pkey; Type: CONSTRAINT; Schema: public; Owner: blogowner
--

ALTER TABLE ONLY public."BlogViews"
    ADD CONSTRAINT "BlogViews_pkey" PRIMARY KEY (id);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: blogowner
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: NewsletterSubscriber NewsletterSubscriber_pkey; Type: CONSTRAINT; Schema: public; Owner: blogowner
--

ALTER TABLE ONLY public."NewsletterSubscriber"
    ADD CONSTRAINT "NewsletterSubscriber_pkey" PRIMARY KEY (id);


--
-- Name: Tag Tag_pkey; Type: CONSTRAINT; Schema: public; Owner: blogowner
--

ALTER TABLE ONLY public."Tag"
    ADD CONSTRAINT "Tag_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: blogowner
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _PostTags _PostTags_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: blogowner
--

ALTER TABLE ONLY public."_PostTags"
    ADD CONSTRAINT "_PostTags_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: blogowner
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: BlogPost_slug_key; Type: INDEX; Schema: public; Owner: blogowner
--

CREATE UNIQUE INDEX "BlogPost_slug_key" ON public."BlogPost" USING btree (slug);


--
-- Name: BlogViews_blogPostId_idx; Type: INDEX; Schema: public; Owner: blogowner
--

CREATE INDEX "BlogViews_blogPostId_idx" ON public."BlogViews" USING btree ("blogPostId");


--
-- Name: BlogViews_blogPostId_sessionId_key; Type: INDEX; Schema: public; Owner: blogowner
--

CREATE UNIQUE INDEX "BlogViews_blogPostId_sessionId_key" ON public."BlogViews" USING btree ("blogPostId", "sessionId");


--
-- Name: Category_name_key; Type: INDEX; Schema: public; Owner: blogowner
--

CREATE UNIQUE INDEX "Category_name_key" ON public."Category" USING btree (name);


--
-- Name: Category_slug_key; Type: INDEX; Schema: public; Owner: blogowner
--

CREATE UNIQUE INDEX "Category_slug_key" ON public."Category" USING btree (slug);


--
-- Name: NewsletterSubscriber_email_key; Type: INDEX; Schema: public; Owner: blogowner
--

CREATE UNIQUE INDEX "NewsletterSubscriber_email_key" ON public."NewsletterSubscriber" USING btree (email);


--
-- Name: Tag_name_key; Type: INDEX; Schema: public; Owner: blogowner
--

CREATE UNIQUE INDEX "Tag_name_key" ON public."Tag" USING btree (name);


--
-- Name: Tag_slug_key; Type: INDEX; Schema: public; Owner: blogowner
--

CREATE UNIQUE INDEX "Tag_slug_key" ON public."Tag" USING btree (slug);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: blogowner
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: _PostTags_B_index; Type: INDEX; Schema: public; Owner: blogowner
--

CREATE INDEX "_PostTags_B_index" ON public."_PostTags" USING btree ("B");


--
-- Name: BlogPost BlogPost_authorID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: blogowner
--

ALTER TABLE ONLY public."BlogPost"
    ADD CONSTRAINT "BlogPost_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: BlogPost BlogPost_categoryID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: blogowner
--

ALTER TABLE ONLY public."BlogPost"
    ADD CONSTRAINT "BlogPost_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: BlogViews BlogViews_blogPostId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: blogowner
--

ALTER TABLE ONLY public."BlogViews"
    ADD CONSTRAINT "BlogViews_blogPostId_fkey" FOREIGN KEY ("blogPostId") REFERENCES public."BlogPost"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: _PostTags _PostTags_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: blogowner
--

ALTER TABLE ONLY public."_PostTags"
    ADD CONSTRAINT "_PostTags_A_fkey" FOREIGN KEY ("A") REFERENCES public."BlogPost"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _PostTags _PostTags_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: blogowner
--

ALTER TABLE ONLY public."_PostTags"
    ADD CONSTRAINT "_PostTags_B_fkey" FOREIGN KEY ("B") REFERENCES public."Tag"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict KCpmIM10oeR7tw7Wg1YTaVqwJFvGdLwf8unbuVZXzFZNKCn5sCToKpZBJOnvCeU

