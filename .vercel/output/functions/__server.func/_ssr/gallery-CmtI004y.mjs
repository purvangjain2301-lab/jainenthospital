import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as SiteLayout, P as PageHero } from "./router-BdWqalL7.mjs";
import { s as supabase } from "./client-CDTlM2pt.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/lucide-react.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const PLACEHOLDERS = [{
  label: "Reception",
  hue: "from-[oklch(0.27_0.14_268)] to-[oklch(0.45_0.18_268)]"
}, {
  label: "Consultation room",
  hue: "from-[oklch(0.55_0.22_27)] to-[oklch(0.35_0.18_27)]"
}, {
  label: "Endoscopy suite",
  hue: "from-[oklch(0.27_0.14_268)] to-[oklch(0.55_0.22_27)]"
}, {
  label: "Audiometry booth",
  hue: "from-[oklch(0.78_0.13_78)] to-[oklch(0.55_0.22_27)]"
}, {
  label: "Procedure room",
  hue: "from-[oklch(0.35_0.16_270)] to-[oklch(0.55_0.22_27)]"
}, {
  label: "Pharmacy",
  hue: "from-[oklch(0.55_0.22_27)] to-[oklch(0.27_0.14_268)]"
}, {
  label: "Waiting area",
  hue: "from-[oklch(0.6_0.12_200)] to-[oklch(0.27_0.14_268)]"
}, {
  label: "Front of building",
  hue: "from-[oklch(0.27_0.14_268)] to-[oklch(0.78_0.13_78)]"
}];
function Gallery() {
  const [photos, setPhotos] = reactExports.useState(null);
  reactExports.useEffect(() => {
    supabase.from("gallery").select("*").order("created_at", {
      ascending: false
    }).then(({
      data
    }) => setPhotos(data ?? []));
  }, []);
  const hasPhotos = photos && photos.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { eyebrow: "Gallery", title: "Inside Jain ENT Hospital.", subtitle: hasPhotos ? "Clean, modern, calm — designed so patients feel cared for from the moment they walk in." : "Clean, modern, calm — designed so patients feel cared for from the moment they walk in. (Photographs coming soon.)" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-14", children: [
      photos === null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-tight grid sm:grid-cols-2 lg:grid-cols-4 gap-4", children: Array.from({
        length: 8
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/5] rounded-2xl bg-muted animate-pulse" }, i)) }),
      hasPhotos && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-tight grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: photos.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-border bg-muted", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.url, alt: item.label, className: "w-full h-full object-cover transition group-hover:scale-[1.03]", loading: "lazy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/55 to-transparent text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider opacity-80", children: "Jain ENT" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-semibold", children: item.label })
        ] })
      ] }, item.id)) }),
      photos !== null && !hasPhotos && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-tight grid sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
        PLACEHOLDERS.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `group relative aspect-[4/5] rounded-2xl bg-gradient-to-br ${i.hue} overflow-hidden ring-1 ring-border`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white/15,transparent_60%)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/55 to-transparent text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider opacity-80", children: "Jain ENT" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-semibold", children: i.label })
          ] })
        ] }, i.label)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "sm:col-span-2 lg:col-span-4 mt-2 text-sm text-muted-foreground text-center", children: "Real photographs of our clinic will replace these placeholders shortly." })
      ] })
    ] })
  ] });
}
export {
  Gallery as component
};
