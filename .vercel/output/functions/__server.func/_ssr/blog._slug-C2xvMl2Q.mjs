import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { R as Route, S as SiteLayout, B as Breadcrumbs, P as PageHero } from "./router-BdWqalL7.mjs";
import { C as Calendar, a as ArrowLeft } from "../_libs/lucide-react.mjs";
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
import "./client-CDTlM2pt.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
function BlogPostPage() {
  const post = Route.useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumbs, { items: [{
      label: "Blog",
      to: "/blog"
    }, {
      label: post.title,
      to: `/blog/${post.slug}`
    }] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: post.category, title: post.title, subtitle: post.excerpt ?? void 0 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-tight max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground inline-flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
        new Date(post.created_at).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric"
        })
      ] }),
      post.cover_image && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: post.cover_image, alt: post.title, loading: "lazy", className: "mt-6 w-full rounded-2xl ring-1 ring-border object-cover aspect-[16/9]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose-block mt-8 text-foreground leading-relaxed whitespace-pre-wrap", children: post.content }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 pt-6 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", className: "inline-flex items-center gap-2 text-sm font-semibold text-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back to all articles"
      ] }) })
    ] }) })
  ] });
}
export {
  BlogPostPage as component
};
