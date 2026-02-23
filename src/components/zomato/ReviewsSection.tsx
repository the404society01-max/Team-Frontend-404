import { useState } from "react";
import { Star, ThumbsUp, Camera, X, ChevronLeft, ChevronRight, User } from "lucide-react";
import { reviews } from "@/data/zomatoData";

type SortType = "recent" | "highest" | "helpful";

const ReviewsSection = () => {
  const [sortBy, setSortBy] = useState<SortType>("recent");
  const [writeOpen, setWriteOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [allReviews, setAllReviews] = useState(reviews.map((r, i) => ({ ...r, id: `rv${i}`, helpful: Math.floor(Math.random() * 20) })));

  const sorted = [...allReviews].sort((a, b) => {
    if (sortBy === "highest") return b.rating - a.rating;
    if (sortBy === "helpful") return b.helpful - a.helpful;
    return 0; // recent = default order
  });

  const visibleReviews = sorted.slice(currentSlide, currentSlide + 3);

  const submitReview = () => {
    if (reviewRating === 0 || !reviewText.trim()) return;
    setAllReviews((prev) => [
      { id: `rv${Date.now()}`, user: "You", rating: reviewRating, text: reviewText, date: "Just now", helpful: 0 },
      ...prev,
    ]);
    setWriteOpen(false);
    setReviewRating(0);
    setReviewText("");
  };

  const renderStars = (rating: number, size = "h-4 w-4") => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`${size} ${s <= rating ? "text-zomato-gold fill-current" : s - 0.5 <= rating ? "text-zomato-gold fill-current opacity-50" : "text-muted-foreground/30"}`} />
      ))}
    </div>
  );

  const avgRating = (allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length).toFixed(1);

  return (
    <section className="py-8 bg-zomato-light" aria-label="Customer reviews">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Customer Reviews</h2>
            <div className="flex items-center gap-2 mt-1">
              {renderStars(parseFloat(avgRating))}
              <span className="text-sm font-semibold text-foreground">{avgRating}</span>
              <span className="text-sm text-muted-foreground">({allReviews.length} reviews)</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="px-3 py-2 rounded-lg bg-card border border-border text-sm text-foreground"
            >
              <option value="recent">Most Recent</option>
              <option value="highest">Highest Rated</option>
              <option value="helpful">Most Helpful</option>
            </select>
            <button onClick={() => setWriteOpen(true)} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              Write a Review
            </button>
          </div>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {visibleReviews.map((review) => (
              <div key={review.id} className="bg-card rounded-2xl border border-border p-5 zomato-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{review.user}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                {renderStars(review.rating)}
                <p className="text-sm text-foreground mt-3 leading-relaxed">{review.text}</p>
                <button className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground hover:text-primary transition-colors">
                  <ThumbsUp className="h-3.5 w-3.5" /> Helpful ({review.helpful})
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 mt-4">
            <button onClick={() => setCurrentSlide(Math.max(0, currentSlide - 3))} disabled={currentSlide === 0} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary disabled:opacity-30" aria-label="Previous reviews">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs text-muted-foreground">{currentSlide / 3 + 1} / {Math.ceil(sorted.length / 3)}</span>
            <button onClick={() => setCurrentSlide(Math.min(sorted.length - 3, currentSlide + 3))} disabled={currentSlide + 3 >= sorted.length} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary disabled:opacity-30" aria-label="Next reviews">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Write Review Modal */}
        {writeOpen && (
          <>
            <div className="fixed inset-0 z-50 bg-foreground/40 animate-fade-in" onClick={() => setWriteOpen(false)} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-card rounded-2xl border border-border w-full max-w-md p-6 zomato-shadow-hover animate-scale-in">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-lg text-foreground">Write a Review</h3>
                  <button onClick={() => setWriteOpen(false)} className="p-1 rounded hover:bg-secondary"><X className="h-5 w-5" /></button>
                </div>
                {/* Star selector */}
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      onMouseEnter={() => setHoverRating(s)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setReviewRating(s)}
                      className="p-0.5"
                    >
                      <Star className={`h-8 w-8 transition-colors ${s <= (hoverRating || reviewRating) ? "text-zomato-gold fill-current" : "text-muted-foreground/30"}`} />
                    </button>
                  ))}
                </div>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience..."
                  className="w-full h-28 p-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground resize-none outline-none focus:border-primary/50"
                />
                <div className="flex items-center gap-3 mt-3">
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:bg-secondary">
                    <Camera className="h-4 w-4" /> Add Photo
                  </button>
                </div>
                <button onClick={submitReview} disabled={reviewRating === 0 || !reviewText.trim()} className="w-full mt-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50">
                  Submit Review
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
