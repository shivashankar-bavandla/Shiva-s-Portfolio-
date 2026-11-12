import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

// The portfolio itself is a pure HTML/CSS/JS static site in public/portfolio/.
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bavandla Shivashankar | Python Developer" },
      { name: "description", content: "Portfolio of Bavandla Shivashankar, Python Developer from Hyderabad." },
      { property: "og:title", content: "Bavandla Shivashankar | Python Developer" },
      { property: "og:description", content: "Portfolio of Bavandla Shivashankar, Python Developer from Hyderabad." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/portfolio/index.html");
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <a href="/portfolio/index.html" className="text-foreground underline">Open portfolio</a>
    </div>
  );
}
