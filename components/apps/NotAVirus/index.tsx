import { memo, useEffect, useMemo, useRef, useState } from "react";
import { type ComponentProcessProps } from "components/system/Apps/RenderComponent";
import { MAX_ZINDEX } from "utils/constants";

type RandomWebsite = {
  id: string;
  url: string;
  site_name?: string;
};

const NotAVirus: React.FC<ComponentProcessProps> = ({ id }) => {
  const [randomSite, setRandomSite] = useState<RandomWebsite | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [messageIndex, setMessageIndex] = useState<number>(0);
  const [visitedPath, setVisitedPath] = useState<string>("");
  const intervalRef = useRef<number | null>(null);

  // No browser fullscreen; render as absolute overlay via hasWindow=false

  const loadingMessages = useMemo(
    () => [
      "Reticulating splines…",
      "Counting to infinity…",
      "Dividing by zero (almost)…",
      "Consulting Clippy for advice…",
      "Installing more RAM…",
      "Rebooting the reboot…",
      "Teaching AI to say ‘uh‑oh’…",
      "Summoning kernel panic…",
      "Encrypting decryption keys…",
      "Calibrating vibes…",
      "Turning it off and on again…",
      "Petting the watchdog timer…",
      "Feeding packets to the router…",
      "Bribing the garbage collector…",
      "Defragmenting your attention span…",
      "Recompiling the universe…",
      "Polishing pixels…",
      "Parsing dad jokes…",
      "Upgrading from Beta to Better…",
      "Tickling the stack trace…",
      "Hashing some browns…",
      "Looping in middle management…",
      "Persuading electrons…",
      "Aligning cosmic rays…",
      "Befriending undefined behavior…",
      "Warming up the cold start…",
      "Negotiating with semicolons…",
      "Hydrating dehydrated components…",
      "Lubricating event loop…",
      "Avoiding merge conflicts with destiny…",
      "Refactoring your horoscope…",
      "Shuffling deck of dependencies…",
      "Counting nulls so you don’t have to…",
      "Debugging Schrödinger’s bug…",
      "Rendering the vibes server‑side…",
      "Caching your hopes…",
      "Rolling back questionable life choices…",
      "Linting your aura…",
      "Minifying expectations…",
      "Bundling loose thoughts…",
      "Compiling witty remark…",
      "Resolving DNS: Definitely Not Sorry…",
      "Queueing the punchline…",
      "Optimizing the optimizer…",
      "Asking the rubber duck for consent…",
      "Yelling at the cloud (provider)…",
      "Aligning bits to look slimmer…",
      "Enabling dark mode for the soul…",
      "Refilling the progress bar ink…",
      "Sweeping the memory palace…",
      "Chasing race conditions with a broom…",
      "Temporarily permanent workaround…",
      "Lingering at 99% to build suspense…",
    ],
    []
  );

  const currentMessage = loadingMessages[
    Math.min(messageIndex, loadingMessages.length - 1)
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { pathname, search } = window.location;
      const usp = new URLSearchParams(search || "");
      const fromParam = usp.get("from");
      setVisitedPath((fromParam || pathname || "/").toString());
    }

    fetch("/random.json")
      .then((r) => r.json())
      .then((items: RandomWebsite[]) => {
        const filtered = (Array.isArray(items) ? items : [])
          .filter((it) => typeof it?.url === "string")
          .filter(
            (it) =>
              !/^(https?:)?\/\/(www\.)?youtube\.com\//i.test(it.url) &&
              !/^(https?:)?\/\/(www\.)?youtu\.be\//i.test(it.url)
          );
        if (filtered.length > 0) {
          const idx = Math.floor(Math.random() * filtered.length);
          setRandomSite(filtered[idx]);
        } else {
          setRandomSite({ id: "0", url: "https://example.com" });
        }
      })
      .catch(() => setRandomSite({ id: "0", url: "https://example.com" }));
  }, []);

  useEffect(() => {
    const total = loadingMessages.length;

    const step = () => {
      if (intervalRef.current) window.clearTimeout(intervalRef.current);

      setMessageIndex((idx) => {
        const next = Math.min(idx + 1, total - 1);
        const pct = Math.min(99, Math.floor(((next + 1) / total) * 99));
        setProgress(pct);

        if (next < total - 1) {
          const delay = 600 + Math.floor(Math.random() * 1400); // 600–2000ms
          intervalRef.current = window.setTimeout(step, delay);
        }

        return next;
      });
    };

    const initialDelay = 600 + Math.floor(Math.random() * 1400);
    intervalRef.current = window.setTimeout(step, initialDelay);

    return () => {
      if (intervalRef.current) window.clearTimeout(intervalRef.current);
    };
  }, [loadingMessages.length]);

  const rescueUrl = useMemo(() => randomSite?.url, [randomSite]);

  const qrSrc = useMemo(() => {
    if (!rescueUrl) return undefined;
    const encoded = encodeURIComponent(rescueUrl);
    return `https://api.qrserver.com/v1/create-qr-code/?data=${encoded}&size=160x160&margin=0`;
  }, [rescueUrl]);

  return (
    <div
      style={{
        backgroundColor: "#0b5cff",
        color: "#ffffff",
        height: "100%",
        width: "100%",
        position: "absolute",
        inset: 0,
        zIndex: MAX_ZINDEX,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: 960, width: "100%", padding: "40px 24px" }}>
        <div style={{ userSelect: "none" }}>
          <div style={{ fontSize: 96, lineHeight: 1 }}>{":("}</div>

          <h1 style={{ marginTop: 24, fontSize: 28, fontWeight: 600 }}>
            This portfolio ran into a problem and needs to restart.
          </h1>
          <p style={{ marginTop: 12, fontSize: 18, opacity: 0.95 }}>
            An unexpected problem has occured. Diagnostic checks are in progress; preparing automatic recovery.
          </p>

          <div
            style={{
              marginTop: 40,
              display: "grid",
              gap: 24,
              gridTemplateColumns: "1fr auto",
              alignItems: "start",
            }}
          >
            <div>
              <p style={{ fontSize: 16 }}>{currentMessage}</p>
              <div
                style={{
                  marginTop: 12,
                  height: 24,
                  width: "100%",
                  maxWidth: 480,
                  overflow: "hidden",
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.25)",
                }}
              >
                <div
                  style={{ height: "100%", width: `${progress}%`, background: "#ffffff" }}
                />
              </div>
              <p style={{ marginTop: 8, fontSize: 14, opacity: 0.9 }}>
                Progress {progress}%
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              {qrSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={qrSrc}
                  alt={randomSite?.site_name ? `Scan to open: ${randomSite.site_name}` : "Scan to open rescue link"}
                  style={{ height: 160, width: 160, borderRadius: 6, background: "#ffffff", padding: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.25)" }}
                />
              ) : (
                <div style={{ height: 160, width: 160, borderRadius: 6, background: "rgba(255,255,255,0.2)" }} />
              )}
              <div style={{ textAlign: "center" }}>
                {rescueUrl ? (
                  <button
                    onClick={() => window.open(rescueUrl, "_blank", "noopener,noreferrer")}
                    style={{
                      background: "#ffffff",
                      color: "#0b5cff",
                      border: "none",
                      borderRadius: 4,
                      padding: "8px 12px",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Don’t click me
                  </button>
                ) : (
                  <span style={{ fontSize: 12, opacity: 0.9 }}>Preparing a random portal…</span>
                )}
              </div>
            </div>
          </div>

          <p style={{ marginTop: 48, fontSize: 14, opacity: 0.9 }}>
            If you call a support person, give them this info: STOP CODE: 404_PAGE_NOT_FOUND
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(NotAVirus);


