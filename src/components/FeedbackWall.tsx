import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, Mail, MessageCircle, MessageSquareText, Send, Star, UserRound } from "lucide-react";

interface FeedbackItem {
  id: string;
  name: string;
  city: string;
  rating: number;
  message: string;
  createdAt: string;
}

const storageKey = "guru-kripa-feedback-wall-v2";
const feedbackApiUrl = "/api/feedback.php";
const whatsappPhone = "917018972255";
const notificationEmail = "gurukripaholiday79@gmail.com";

const defaultFeedbackItems: FeedbackItem[] = [
  {
    id: "default-review-manali-family",
    name: "Rohit Sharma",
    city: "Chandigarh",
    rating: 5,
    message: "Our Shimla Manali trip was very smooth. Driver was polite, cab was clean, and every sightseeing stop was planned properly.",
    createdAt: "Recent trip",
  },
  {
    id: "default-review-dharamshala-couple",
    name: "Neha and Amit",
    city: "Delhi",
    rating: 5,
    message: "Guru Kripa helped us with Dharamshala and Dalhousie route. Hotel suggestions and cab timing were excellent.",
    createdAt: "Verified guest",
  },
  {
    id: "default-review-kasol-group",
    name: "Simran Kaur",
    city: "Ludhiana",
    rating: 5,
    message: "Booked a Tempo Traveller for Manali and Kasol. The route was comfortable and the team responded quickly on WhatsApp.",
    createdAt: "Traveller review",
  },
];

const realFeedbackOnly = (items: FeedbackItem[]) =>
  items.filter((item) => !item.id.startsWith("seed-") && !item.id.startsWith("default-review-"));

const loadFeedback = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    if (!("localStorage" in window)) {
      return [];
    }

    const stored = window.localStorage.getItem(storageKey);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored) as FeedbackItem[];
    return Array.isArray(parsed) ? realFeedbackOnly(parsed) : [];
  } catch {
    return [];
  }
};

const saveFeedback = (items: FeedbackItem[]) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    if ("localStorage" in window) {
      window.localStorage.setItem(storageKey, JSON.stringify(items));
    }
  } catch {
    // Some browsers block storage in strict privacy modes. The visible state still works.
  }
};

const createFeedbackId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `feedback-${Date.now()}`;
};

const createFeedbackMessage = (item: FeedbackItem) =>
  [
    "New Guru Kripa website feedback",
    `Name: ${item.name}`,
    `City: ${item.city}`,
    `Rating: ${item.rating}/5`,
    `Feedback: ${item.message}`,
  ].join("\n");

const createWhatsappUrl = (item: FeedbackItem) => `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(createFeedbackMessage(item))}`;

const createGmailUrl = (item: FeedbackItem) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(notificationEmail)}&su=${encodeURIComponent(
    "New Guru Kripa website feedback",
  )}&body=${encodeURIComponent(createFeedbackMessage(item))}`;

const cleanFeedbackText = (value: string, limit: number) => value.replace(/\s+/g, " ").trim().slice(0, limit);

const FeedbackWall = () => {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>(loadFeedback);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    rating: "5",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmittedFeedback, setLastSubmittedFeedback] = useState<FeedbackItem | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadLiveFeedback = async () => {
      try {
        const response = await fetch(feedbackApiUrl, {
          headers: { Accept: "application/json" },
        });
        const contentType = response.headers.get("content-type") || "";

        if (!response.ok || !contentType.includes("application/json")) {
          throw new Error("Feedback API is not available");
        }

        const data = (await response.json()) as { items?: FeedbackItem[] };

        if (!cancelled) {
          setFeedbackItems(Array.isArray(data.items) ? realFeedbackOnly(data.items) : []);
        }
      } catch {
        if (!cancelled) {
          setFeedbackItems(loadFeedback());
        }
      }
    };

    loadLiveFeedback();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    saveFeedback(realFeedbackOnly(feedbackItems));
  }, [feedbackItems]);

  const liveFeedbackItems = realFeedbackOnly(feedbackItems);
  const visibleFeedbackItems = [...liveFeedbackItems, ...defaultFeedbackItems].slice(0, 8);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formPayload = new FormData(form);
    const honeypot = String(formPayload.get("website") || "");

    if (honeypot) {
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const cleanedName = cleanFeedbackText(formData.name, 60);
    const cleanedCity = cleanFeedbackText(formData.city, 60);
    const cleanedMessage = cleanFeedbackText(formData.message, 280);

    if (!cleanedName || !cleanedCity || cleanedMessage.length < 10) {
      form.reportValidity();
      return;
    }

    const nextFeedback: FeedbackItem = {
      id: createFeedbackId(),
      name: cleanedName,
      city: cleanedCity,
      rating: Number(formData.rating),
      message: cleanedMessage,
      createdAt: "Just now",
    };

    setFeedbackItems((items) => [nextFeedback, ...realFeedbackOnly(items)].slice(0, 8));
    setLastSubmittedFeedback(nextFeedback);
    setFormData({ name: "", city: "", rating: "5", message: "" });
    setSubmitted(true);
    window.open(createWhatsappUrl(nextFeedback), "_blank", "noopener,noreferrer");

    try {
      const response = await fetch(feedbackApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...nextFeedback, website: honeypot }),
      });
      const contentType = response.headers.get("content-type") || "";

      if (!response.ok || !contentType.includes("application/json")) {
        throw new Error("Feedback API is not available");
      }

      const data = (await response.json()) as { items?: FeedbackItem[] };
      if (Array.isArray(data.items)) {
        setFeedbackItems(realFeedbackOnly(data.items).slice(0, 8));
      }
    } catch {
      saveFeedback([nextFeedback, ...liveFeedbackItems].slice(0, 8));
    }
  };

  return (
    <section id="feedback" className="bg-white py-24">
      <div className="section-container">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary-accent/10 px-5 py-2 text-xs font-black uppercase tracking-widest text-primary-accent">
              <MessageSquareText className="h-4 w-4" />
              Live visitor feedback
            </div>
            <h2 className="text-3xl font-black leading-tight text-secondary-dark md:text-5xl">
              Share your Guru Kripa travel experience.
            </h2>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-muted-slate">
              Tell us about your trip, cab service, route planning, driver support, or holiday experience. Your review
              helps other travellers plan with confidence.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="relative rounded-[2rem] border border-slate-100 bg-surface-bg p-5 shadow-xl shadow-slate-950/[0.03]">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="pointer-events-none absolute -left-[9999px] h-px w-px opacity-0"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-muted-slate">Name</span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(event) => setFormData((data) => ({ ...data, name: event.target.value }))}
                  autoComplete="name"
                  maxLength={60}
                  required
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-secondary-dark"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-muted-slate">City</span>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(event) => setFormData((data) => ({ ...data, city: event.target.value }))}
                  autoComplete="address-level2"
                  maxLength={60}
                  required
                  placeholder="Delhi, Chandigarh..."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-secondary-dark"
                />
              </label>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-[130px_1fr]">
              <label className="block">
                <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-muted-slate">Rating</span>
                <select
                  value={formData.rating}
                  onChange={(event) => setFormData((data) => ({ ...data, rating: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-secondary-dark"
                >
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}/5
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-muted-slate">Feedback</span>
                <input
                  type="text"
                  value={formData.message}
                  onChange={(event) => setFormData((data) => ({ ...data, message: event.target.value }))}
                  required
                  minLength={10}
                  maxLength={280}
                  placeholder="Share your travel experience"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-secondary-dark"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-accent px-6 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-primary-accent/20"
            >
              <Send className="h-4 w-4" />
              Submit Feedback
            </button>

            {submitted && (
              <div className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  Thank you. Your feedback has been added to the website.
                </div>
                {lastSubmittedFeedback && (
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <a
                      href={createWhatsappUrl(lastSubmittedFeedback)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-xs font-black uppercase tracking-widest text-white"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Send on WhatsApp
                    </a>
                    <a
                      href={createGmailUrl(lastSubmittedFeedback)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-black uppercase tracking-widest text-secondary-dark"
                    >
                      <Mail className="h-4 w-4" />
                      Share by Email
                    </a>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {visibleFeedbackItems.map((item) => (
            <article key={item.id} className="rounded-[2rem] border border-slate-100 bg-surface-bg p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary-dark text-white">
                    <UserRound className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-secondary-dark">{item.name}</h3>
                    <p className="text-xs font-bold text-muted-slate">{item.city}</p>
                  </div>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary-accent">
                  {item.createdAt}
                </span>
              </div>

              <div className="mb-4 flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${star <= item.rating ? "fill-primary-accent text-primary-accent" : "text-slate-300"}`}
                  />
                ))}
              </div>
              <p className="text-sm font-medium leading-relaxed text-slate-600">"{item.message}"</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedbackWall;
