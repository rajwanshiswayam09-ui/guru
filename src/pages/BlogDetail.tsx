import { useParams, Link, Navigate } from "react-router-dom";
import { CalendarDays, User, Tag, ChevronRight, ArrowLeft } from "lucide-react";
import SEO from "../components/SEO";
import { blogPosts } from "../data/blogs";

const BlogDetail = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const recentBlogs = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <>
      <SEO
        title={post.seoTitle}
        description={post.seoDescription}
        image={post.image}
      />
      
      <section className="relative h-[60svh] min-h-[400px] w-full overflow-hidden bg-secondary-dark">
        <img src={post.image} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark via-secondary-dark/40 to-transparent" />
        <div className="section-container relative z-10 flex h-full flex-col justify-end pb-12 text-white">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/blog" className="hover:text-white">Blog</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">{post.category}</span>
          </nav>
          <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">{post.title}</h1>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm font-bold uppercase tracking-wider text-white/90">
            <p className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary-accent" />
              {post.date}
            </p>
            <p className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary-accent" />
              {post.author}
            </p>
            <p className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-primary-accent" />
              {post.category}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="section-container">
          <div className="grid gap-12 lg:grid-cols-[1fr_350px]">
            <article className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-secondary-dark prose-p:text-lg prose-p:leading-relaxed prose-p:text-muted-slate prose-img:rounded-4xl prose-a:text-primary-accent">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
              
              <div className="mt-16 border-t border-slate-100 pt-10">
                <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-secondary-dark hover:text-primary-accent">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Blog
                </Link>
              </div>
            </article>

            <aside className="space-y-10">
              <div className="rounded-4xl border border-slate-100 bg-surface-bg p-8 shadow-xl shadow-slate-950/3">
                <h3 className="text-xl font-black text-secondary-dark">Recent Stories</h3>
                <div className="mt-6 space-y-6">
                  {recentBlogs.map((item) => (
                    <Link key={item.id} to={`/blog/${item.slug}`} className="group block">
                      <div className="flex gap-4">
                        <img src={item.image} alt={item.title} className="h-20 w-20 shrink-0 rounded-2xl object-cover shadow-md" />
                        <div>
                          <h4 className="line-clamp-2 text-sm font-black leading-tight text-secondary-dark group-hover:text-primary-accent">{item.title}</h4>
                          <p className="mt-2 text-xs font-bold text-muted-slate uppercase tracking-widest">{item.date}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-4xl bg-secondary-dark p-8 text-white shadow-2xl shadow-slate-950/10">
                <h3 className="text-2xl font-black">Plan Your Trip</h3>
                <p className="mt-4 text-sm font-medium leading-relaxed text-slate-400">Inspired by these stories? Let us help you create your own Himalayan memory.</p>
                <Link to="/booking" className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-accent px-6 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-primary-accent/20 transition-all hover:scale-105">
                  Get a Free Quote
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetail;
