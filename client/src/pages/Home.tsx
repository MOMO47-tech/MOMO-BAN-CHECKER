/* MOMO BAN CHECKER — private access UI with a local-only status demo. */
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Globe2,
  KeyRound,
  LockKeyhole,
  MessageCircle,
  Search,
  ShieldCheck,
  Terminal,
  Users,
  UserRound,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

const SITE_ACCESS_CODE = "MOMO47";

const countries = [
  { name: "Tanzania", flag: "TZ", dialCode: "+255" },
  { name: "Kenya", flag: "KE", dialCode: "+254" },
  { name: "Uganda", flag: "UG", dialCode: "+256" },
  { name: "Rwanda", flag: "RW", dialCode: "+250" },
  { name: "Burundi", flag: "BI", dialCode: "+257" },
  { name: "Malawi", flag: "MW", dialCode: "+265" },
  { name: "Zambia", flag: "ZM", dialCode: "+260" },
  { name: "Mozambique", flag: "MZ", dialCode: "+258" },
  { name: "South Africa", flag: "ZA", dialCode: "+27" },
  { name: "Nigeria", flag: "NG", dialCode: "+234" },
  { name: "Ghana", flag: "GH", dialCode: "+233" },
  { name: "Ethiopia", flag: "ET", dialCode: "+251" },
  { name: "United Kingdom", flag: "GB", dialCode: "+44" },
  { name: "United States", flag: "US", dialCode: "+1" },
];

type Outcome = "online" | "temporary" | "permanent";

type Country = (typeof countries)[number];

const outcomes: Record<
  Outcome,
  { label: string; title: string; body: string; action: string; tone: string }
> = {
  online: {
    label: "ONLINE",
    title: "No restriction signal in this demo.",
    body: "The local format check completed without a restriction signal. If messages still fail, check your connection, app version, and recipient availability.",
    action: "Keep the official app updated and use in-app Help if the issue continues.",
    tone: "green",
  },
  temporary: {
    label: "TEMPORARILY BANNED",
    title: "A temporary restriction may be present.",
    body: "Wait for the official timer or notice to finish. Avoid modified clients, automation, and repeated login attempts while the restriction is active.",
    action: "Read the notice, wait for its stated time, then contact official support if it does not clear.",
    tone: "amber",
  },
  permanent: {
    label: "PERMANENT BAN",
    title: "An official appeal may be required.",
    body: "Only the official service can confirm a permanent restriction. Submit one clear appeal through the official Help route.",
    action: "Never share OTPs, passwords, or recovery codes with anyone promising an unlock.",
    tone: "red",
  },
};

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

function countryNumber(country: Country | null, phone: string) {
  if (!country || !phone) return "—";
  const localDigits = digitsOnly(phone).replace(/^0/, "");
  return `${country.dialCode} ${localDigits}`;
}

export default function Home() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [accessNumber, setAccessNumber] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [accessError, setAccessError] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [countrySearch, setCountrySearch] = useState("");
  const [countryMenuOpen, setCountryMenuOpen] = useState(false);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [checkError, setCheckError] = useState("");
  const [supportText, setSupportText] = useState("");
  const [memberName, setMemberName] = useState("");
  const [members, setMembers] = useState(["Amani K.", "Mussa T.", "Neema J.", "Kassim R."]);
  const [memberMessage, setMemberMessage] = useState("");
  const [membersLoading, setMembersLoading] = useState(Boolean(supabase));

  const filteredCountries = useMemo(() => {
    const query = countrySearch.trim().toLowerCase();
    if (!query) return countries;
    return countries.filter(
      country =>
        country.name.toLowerCase().includes(query) ||
        country.dialCode.includes(query) ||
        country.flag.toLowerCase().includes(query)
    );
  }, [countrySearch]);

  const formattedNumber = countryNumber(selectedCountry, phone);
  const defaultSupportMessage = `Hello MOMO Support, please help me review ${formattedNumber}. My demo result is ${outcome ? outcomes[outcome].label : "not checked yet"}.`;
  const step = !selectedCountry ? 1 : outcome ? 3 : 2;

  useEffect(() => {
    const client = supabase;
    if (!client) return;
    const liveClient = client;
    let cancelled = false;
    async function loadMembers() {
      const { data, error } = await liveClient
        .from("momo_ban_members")
        .select("display_name")
        .order("joined_at", { ascending: false })
        .limit(8);
      if (!cancelled) {
        if (!error && data?.length) setMembers(data.map(row => row.display_name));
        setMembersLoading(false);
      }
    }
    void loadMembers();
    return () => {
      cancelled = true;
    };
  }, []);

  function enterSite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (digitsOnly(accessNumber).length < 7) {
      setAccessError("Enter a valid phone number to continue.");
      return;
    }
    if (accessCode !== SITE_ACCESS_CODE) {
      setAccessError("Incorrect site access code. Try MOMO47.");
      return;
    }
    setPhone(accessNumber);
    setAccessError("");
    setAccessGranted(true);
  }

  function runCheck() {
    const number = digitsOnly(phone);
    if (!selectedCountry) {
      setCheckError("Choose a country before entering the number.");
      return;
    }
    if (number.length < 7) {
      setCheckError("Enter at least 7 digits for the local format demo.");
      return;
    }
    setCheckError("");
    const lastDigit = Number(number[number.length - 1]);
    if ([0, 3, 6, 9].includes(lastDigit)) setOutcome("permanent");
    else if ([1, 4, 7].includes(lastDigit)) setOutcome("temporary");
    else setOutcome("online");
  }

  function chooseCountry(country: Country) {
    setSelectedCountry(country);
    setCountryMenuOpen(false);
    setCountrySearch("");
    setOutcome(null);
    setCheckError("");
  }

  function resetCheck() {
    setPhone("");
    setOutcome(null);
    setCheckError("");
    setSupportText("");
  }

  function logout() {
    setAccessGranted(false);
    setAccessCode("");
    setAccessError("");
    resetCheck();
    setSelectedCountry(null);
  }

  function openWhatsAppSupport() {
    const message = supportText.trim() || defaultSupportMessage;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  async function joinMembers(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = memberName.trim().replace(/\s+/g, " ");
    if (cleanName.length < 2) {
      setMemberMessage("Enter a display name with at least 2 characters.");
      return;
    }
    const client = supabase;
    if (client) {
      setMemberMessage("Joining the live member list…");
      const { data, error } = await client
        .from("momo_ban_members")
        .insert({ display_name: cleanName.slice(0, 32) })
        .select("display_name")
        .single();
      if (error) {
        setMemberMessage(error.code === "23505" ? "That display name is already in use." : "Could not join right now. Please try again.");
        return;
      }
      setMembers(current => [data.display_name, ...current.filter(member => member.toLowerCase() !== data.display_name.toLowerCase())].slice(0, 8));
      setMemberName("");
      setMemberMessage("You joined the live Supabase member list.");
      return;
    }
    setMembers(current => [cleanName.slice(0, 22), ...current.filter(member => member.toLowerCase() !== cleanName.toLowerCase())].slice(0, 8));
    setMemberName("");
    setMemberMessage("You joined this browser-only member list.");
  }

  if (!accessGranted) {
    return (
      <div className="ref-auth-screen">
        <div className="ref-auth-noise" />
        <header className="ref-auth-topbar">
          <div className="ref-brand-mark">
            <img src="/manus-storage/logo-skull_cd8984a8.png" alt="" />
          </div>
          <div className="ref-auth-brand">
            <span>MOMO // BAN CHECKER</span>
            <small>PRIVATE STATUS DISCOVERY</small>
          </div>
          <div className="ref-auth-status"><span /> AUTH://LOCKED</div>
        </header>
        <main className="ref-auth-main">
          <section className="ref-auth-card" aria-labelledby="auth-title">
            <div className="ref-terminal-line"><Terminal size={14} /> PRIVATE ACCESS NODE // 01</div>
            <div className="ref-auth-icon"><LockKeyhole size={24} /></div>
            <h1 id="auth-title">Welcome to <strong>MOMO BAN CHECKER</strong></h1>
            <p className="ref-auth-copy">Enter your phone number and site access code to open the local account-status demo.</p>
            <form onSubmit={enterSite} className="ref-auth-form">
              <label htmlFor="access-number">PHONE NUMBER</label>
              <div className="ref-auth-input"><span>+</span><Input id="access-number" type="tel" inputMode="tel" placeholder="255 712 345 678" value={accessNumber} onChange={event => { setAccessNumber(event.target.value); setAccessError(""); }} /></div>
              <label htmlFor="access-code">SITE ACCESS CODE</label>
              <div className="ref-auth-input"><KeyRound size={16} /><Input id="access-code" type="password" placeholder="Enter access code" value={accessCode} onChange={event => { setAccessCode(event.target.value); setAccessError(""); }} /></div>
              {accessError && <p className="ref-form-error" role="alert">{accessError}</p>}
              <Button type="submit" className="ref-enter-button">ENTER SITE <ArrowRight size={16} /></Button>
            </form>
            <div className="ref-auth-note"><ShieldCheck size={14} /> Local demo gate only. No WhatsApp OTP or account password is collected.</div>
          </section>
          <aside className="ref-auth-aside">
            <div className="ref-aside-symbol">⬡</div>
            <span>momo@checker:~$</span>
            <b>ACCESS GATE</b>
            <small>country routing: ready<br />format signal: local only<br />remote database: disabled</small>
          </aside>
        </main>
        <footer className="ref-auth-footer">PRIVATE CHECKER NODE <span>•</span> SAFE MODE ENABLED</footer>
      </div>
    );
  }

  return (
    <div className="ref-app-shell">
      <header className="ref-app-topbar">
        <div className="ref-brand-cluster">
          <div className="ref-brand-mark"><img src="/manus-storage/logo-skull_cd8984a8.png" alt="" /></div>
          <div><b>MOMO BAN CHECKER</b><small>PRIVATE STATUS DISCOVERY</small></div>
        </div>
        <div className="ref-app-nav"><a href="#checker">CHECK NUMBER</a><a href="#support">WHATSAPP SUPPORT</a><button type="button" onClick={logout}>EXIT <ArrowUpRight size={13} /></button></div>
      </header>
      <main>
        <section className="ref-dashboard-hero">
          <div className="ref-dashboard-copy">
            <div className="ref-terminal-line"><Terminal size={14} /> MOMO@CHECKER:~ ACCOUNT STATUS</div>
            <h1>Check a number.<br /><span>Know the signal.</span></h1>
            <p>Choose the country, enter the phone number, and run a local format demo. Results are illustrative guidance—not an official WhatsApp ban database.</p>
            <div className="ref-checker-card" id="checker">
              <div className="ref-card-head"><span><span className="ref-pulse" /> THREE-STEP CHECKER</span><small>CHK_001 / LOCAL</small></div>
              <div className="ref-steps" aria-label="Checker progress">
                {["CHOOSE COUNTRY", "CHECK NUMBER", "RESULT"].map((label, index) => <div key={label} className={`ref-step ${step === index + 1 ? "current" : ""} ${step > index + 1 ? "done" : ""}`}><b>0{index + 1}</b><span>{label}</span></div>)}
              </div>
              <label className="ref-field-label">STEP 01 / CHOOSE COUNTRY</label>
              <div className="ref-country-wrap">
                <button type="button" className={`ref-country-trigger ${selectedCountry ? "selected" : ""}`} onClick={() => setCountryMenuOpen(!countryMenuOpen)} aria-expanded={countryMenuOpen}>
                  <Globe2 size={16} /><span>{selectedCountry ? `${selectedCountry.flag}  ${selectedCountry.name} ${selectedCountry.dialCode}` : "Select your country"}</span><ChevronDown size={15} />
                </button>
                {countryMenuOpen && <div className="ref-country-menu"><div className="ref-country-search"><Search size={14} /><input autoFocus value={countrySearch} onChange={event => setCountrySearch(event.target.value)} placeholder="Search country or code" /></div><div className="ref-country-list">{filteredCountries.map(country => <button key={country.flag} type="button" onClick={() => chooseCountry(country)}><span className="ref-country-flag">{country.flag}</span><span>{country.name}</span><b>{country.dialCode}</b></button>)}{filteredCountries.length === 0 && <small className="ref-empty">No country found.</small>}</div></div>}
              </div>
              <label className="ref-field-label" htmlFor="checker-phone">STEP 02 / ENTER PHONE NUMBER</label>
              <div className={`ref-phone-row ${checkError ? "error" : ""}`}><span className="ref-dial-code">{selectedCountry?.dialCode || "+—"}</span><Input id="checker-phone" type="tel" inputMode="tel" placeholder="712 345 678" value={phone} onChange={event => { setPhone(event.target.value); setOutcome(null); setCheckError(""); }} /><button type="button" onClick={resetCheck} aria-label="Clear number"><X size={15} /></button></div>
              <p className="ref-field-help">Use the selected country code. This check stays in the browser.</p>
              <Button type="button" onClick={runCheck} className="ref-check-button"><Search size={16} /> CHECK NUMBER</Button>
              {checkError && <p className="ref-form-error" role="alert">{checkError}</p>}
              {outcome && <div className={`ref-result-card ${outcomes[outcome].tone}`}><div className="ref-result-top"><span><CheckCircle2 size={15} /> STEP 03 / RESULT</span><small>DEMO SIGNAL</small></div><div className="ref-result-badge">{outcomes[outcome].label}</div><h2>{outcomes[outcome].title}</h2><p>{outcomes[outcome].body}</p><div className="ref-result-action"><ShieldCheck size={14} /> {outcomes[outcome].action}</div><small className="ref-result-disclaimer">Only the official service can confirm account status.</small></div>}
            </div>
            <div className="ref-safe-line"><ShieldCheck size={14} /> SAFE MODE <span /> no OTP, chats, or WhatsApp credentials collected</div>
          </div>
          <aside className="ref-monitor" aria-label="Status monitor">
            <div className="ref-monitor-bar"><span><i /><i /><i /></span><small>momo://signal-monitor</small><span>— □ ×</span></div>
            <div className="ref-monitor-content"><div className="ref-monitor-code">[01] boot sequence ... <b>OK</b><br />[02] country router ... <b>READY</b><br />[03] remote link ... <em>DISABLED</em><br />[04] local signal ... <b>ACTIVE</b></div><div className="ref-monitor-core"><div><UserRound size={22} /></div><span>{outcome ? outcomes[outcome].label : "WAITING FOR INPUT"}</span></div><div className="ref-monitor-footer"><span>SIGNAL QUALITY</span><b>{outcome ? "● ● ●" : "— — —"}</b><small>{formattedNumber}</small></div></div>
          </aside>
        </section>
        <section className="ref-info-strip"><span><span className="ref-pulse amber" /> PRIVATE CHECKER NODE</span><small>Country routing enabled · official review still required</small></section>
        <section id="members" className="ref-members-section">
          <div className="ref-members-heading"><div className="ref-terminal-line"><Users size={14} /> COMMUNITY NODE / MEMBERS</div><h2>People using<br /><span>MOMO CHECKER.</span></h2><p>{supabase ? "Display names are stored in Supabase with row-level security. No phone numbers, passwords, or private account data are shown." : "A simple community board for this browser demo. Add the VITE_SUPABASE variables to enable live member persistence."}</p><div className="ref-member-count"><strong>{membersLoading ? "—" : members.length.toString().padStart(2, "0")}</strong><span>{supabase ? "LIVE SUPABASE MEMBERS" : "VISIBLE DEMO MEMBERS"}<br /><small>{supabase ? "RLS ENABLED / DISPLAY NAMES ONLY" : "LOCAL LIST / SAFE MODE"}</small></span></div></div>
          <div className="ref-members-card"><div className="ref-card-head"><span><span className="ref-pulse" /> JOINED MEMBERS</span><small>{supabase ? "SUPABASE / RLS" : "LOCAL DEMO"}</small></div><div className="ref-member-list">{members.map((member, index) => <div className="ref-member-row" key={`${member}-${index}`}><span className="ref-member-avatar">{member.slice(0, 1).toUpperCase()}</span><span><b>{member}</b><small>member node #{String(index + 1).padStart(2, "0")}</small></span><i>ACTIVE</i></div>)}</div><form className="ref-join-form" onSubmit={joinMembers}><label htmlFor="member-name">ADD YOUR DISPLAY NAME</label><div className="ref-join-row"><Input id="member-name" value={memberName} onChange={event => { setMemberName(event.target.value); setMemberMessage(""); }} placeholder="e.g. Baraka M." maxLength={32} /><Button type="submit" disabled={membersLoading}><Users size={15} /> {membersLoading ? "SYNC" : "JOIN"}</Button></div>{memberMessage && <small className="ref-member-message">{memberMessage}</small>}</form></div>
        </section>
        <section id="support" className="ref-support-section">
          <div><div className="ref-terminal-line"><MessageCircle size={14} /> SUPPORT ROUTE / WHATSAPP</div><h2>Need help with<br /><span>the next step?</span></h2><p>Write a message and open WhatsApp with the text pre-filled. No support number is configured yet, so WhatsApp will let you choose the recipient.</p><div className="ref-support-points"><div><CheckCircle2 size={15} /><span>Use official support only</span></div><div><CheckCircle2 size={15} /><span>Never share OTPs or passwords</span></div></div></div>
          <div className="ref-support-card"><div className="ref-card-head"><span><MessageCircle size={14} /> WHATSAPP SUPPORT</span><small>COMPOSE MODE</small></div><label htmlFor="support-message">YOUR MESSAGE</label><textarea id="support-message" value={supportText || defaultSupportMessage} onChange={event => setSupportText(event.target.value)} /><Button type="button" onClick={openWhatsAppSupport} className="ref-whatsapp-button"><MessageCircle size={16} /> OPEN WHATSAPP <ArrowUpRight size={14} /></Button></div>
        </section>
      </main>
      <footer className="ref-app-footer"><div className="ref-brand-cluster"><div className="ref-brand-mark"><img src="/manus-storage/logo-skull_cd8984a8.png" alt="" /></div><div><b>MOMO BAN CHECKER</b><small>SAFE MODE / LOCAL DEMO</small></div></div><div>Built for clear, official recovery guidance.</div><div className="ref-footer-meta"><CircleHelp size={13} /> HELP &amp; SAFETY <span>© 2026</span></div></footer>
    </div>
  );
}
