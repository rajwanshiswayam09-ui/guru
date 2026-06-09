import { CalendarDays, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { blogPosts } from "../data/blogs";

const Blog = () => {
  const recentBlogs = blogPosts.slice(0, 3);

  return (
    <>
      <SEO
        title="Blog | Guru Kripa Travels"
        description="Travel stories and destination insights from Himachal Pradesh for better trip planning."
      />
      <section id="blog" className="bg-white py-24">
        <div className="section-container">
          <div className="mb-12">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary-accent/10 px-5 py-2 text-xs font-black uppercase tracking-widest text-primary-accent">
              <FileText className="h-4 w-4" />
              Blog
            </div>
            <h1 className="text-4xl font-black text-secondary-dark md:text-6xl">Himachal Travel Stories and Insights</h1>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="grid gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="group overflow-hidden rounded-4xl border border-slate-100 bg-surface-bg shadow-xl shadow-slate-950/3 transition-all hover:shadow-2xl"
                >
                  <div className="grid md:grid-cols-[0.85fr_1.15fr]">
                    <div className="relative h-64 overflow-hidden md:h-full">
                      <img src={post.image} alt={post.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="p-7">
                      <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary-accent">
                        <CalendarDays className="h-4 w-4" />
                        {post.date}
                      </p>
                      <h2 className="mt-4 text-2xl font-black leading-tight text-secondary-dark group-hover:text-primary-accent transition-colors">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      <p className="mt-4 text-base font-medium leading-relaxed text-muted-slate line-clamp-3">{post.preview}</p>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-secondary-dark px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition-all hover:bg-slate-800"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit space-y-8">
              <div className="rounded-4xl border border-slate-100 bg-surface-bg p-6 shadow-xl shadow-slate-950/3">
                <h3 className="text-xl font-black text-secondary-dark">Recent Blogs</h3>
                <div className="mt-5 grid gap-4">
                  {recentBlogs.map((post) => (
                    <Link key={`${post.id}-recent`} to={`/blog/${post.slug}`} className="group rounded-2xl bg-white p-3 transition-all hover:shadow-md">
                      <div className="flex items-start gap-3">
                        <img src={post.image} alt={post.title} loading="lazy" decoding="async" className="h-16 w-16 rounded-xl object-cover" />
                        <div className="min-w-0">
                          <h4 className="line-clamp-2 text-sm font-black leading-tight text-secondary-dark group-hover:text-primary-accent">{post.title}</h4>
                          <p className="mt-2 text-xs font-bold uppercase tracking-wider text-muted-slate">{post.date}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-4xl bg-secondary-dark p-8 text-white shadow-2xl shadow-slate-950/10">
                <h3 className="text-2xl font-black">Join Our Community</h3>
                <p className="mt-4 text-sm font-medium leading-relaxed text-slate-400">Get the latest travel tips and deals delivered to your inbox.</p>
                <div className="mt-6 flex flex-col gap-3">
                  <input type="email" placeholder="Your email address" className="rounded-xl bg-white/10 px-4 py-3 text-sm font-bold text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-accent" />
                  <button className="rounded-xl bg-primary-accent py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:scale-[1.02]">Subscribe</button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
