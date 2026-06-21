import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SiteLayout, B as Breadcrumbs, P as PageHero } from "./router-BdWqalL7.mjs";
import { s as supabase } from "./client-CDTlM2pt.mjs";
import { C as Calendar, b as ArrowRight } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const SEED_POSTS = [{
  id: "seed-1",
  slug: "ear-pain-when-to-worry",
  title: "Ear pain: when is it something to worry about?",
  created_at: "2026-05-12",
  category: "Ear",
  excerpt: "Most ear pain is harmless and short-lived. But certain warning signs mean you should see an ENT specialist the same day.",
  content: "",
  published: true
}, {
  id: "seed-2",
  slug: "sinusitis-myths",
  title: "5 sinusitis myths Indian patients still believe",
  created_at: "2026-04-28",
  category: "Nose",
  excerpt: "Chronic sinus problems are surrounded by misinformation. Let's separate the science from the WhatsApp forwards.",
  content: "",
  published: true
}, {
  id: "seed-3",
  slug: "snoring-and-sleep-apnoea",
  title: "Snoring versus obstructive sleep apnoea — what's the difference?",
  created_at: "2026-04-10",
  category: "Sleep",
  excerpt: "All sleep apnoea involves snoring, but not all snoring is sleep apnoea. Here's how to tell.",
  content: "",
  published: true
}, {
  id: "seed-4",
  slug: "oral-cancer-early-signs",
  title: "Early signs of oral cancer no one should ignore",
  created_at: "2026-03-22",
  category: "Oncology",
  excerpt: "Tobacco-related oral cancers are common in our region. Catching them early changes everything.",
  content: "",
  published: true
}, {
  id: "seed-5",
  slug: "kids-tonsils-when-surgery",
  title: "Tonsils in children — when is surgery actually needed?",
  created_at: "2026-03-04",
  category: "Paediatrics",
  excerpt: "A practical guide for parents asking 'do my child's tonsils really need to come out?'.",
  content: "",
  published: true
}, {
  id: "seed-6",
  slug: "hearing-loss-prevention",
  title: "Protecting your hearing in a louder world",
  created_at: "2026-02-18",
  category: "Ear",
  excerpt: "Earphones, machinery, festivals — modern noise exposure adds up. Here's how to protect your hearing for life.",
  content: "",
  published: true
}];
function Blog() {
  const [posts, setPosts] = reactExports.useState(null);
  reactExports.useEffect(() => {
    supabase.from("blog_posts").select("*").eq("published", true).order("created_at", {
      ascending: false
    }).then(({
      data
    }) => setPosts(data ?? []));
  }, []);
  const display = posts === null ? SEED_POSTS : posts.length > 0 ? posts : SEED_POSTS;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumbs, { items: [{
      label: "Blog",
      to: "/blog"
    }] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: "Blog", title: "ENT awareness, written by your doctor.", subtitle: "Plain-language articles to help you make better decisions about your ear, nose, throat and head-neck health." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-tight grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: display.map((p) => {
        const isSeed = p.id.startsWith("seed-");
        const Card = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-crimson/10 text-crimson px-2 py-0.5 font-semibold uppercase tracking-wider", children: p.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
              new Date(p.created_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric"
              })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-xl font-bold text-primary group-hover:text-crimson transition", children: p.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground flex-1", children: p.excerpt }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary", children: [
            "Read more ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] });
        return isSeed ? /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "rounded-2xl ring-1 ring-border bg-white p-6 flex flex-col opacity-70", children: Card }, p.id) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog/$slug", params: {
          slug: p.slug
        }, className: "group rounded-2xl ring-1 ring-border bg-white p-6 hover:ring-primary transition flex flex-col", children: Card }, p.id);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "container-tight mt-10 text-sm text-muted-foreground text-center", children: "New articles published monthly. Topic suggestions welcome — message us on WhatsApp." })
    ] })
  ] });
}
export {
  Blog as component
};
