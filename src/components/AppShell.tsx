"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Workflow,
  LayoutTemplate,
  Zap,
  Bell,
  Settings,
  ChevronRight,
  Activity,
  Menu,
  X,
  AlertTriangle,
  AlertOctagon,
  Info,
  Clock,
  Sun,
  Moon,
  Key,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/workflows", label: "Workflows", icon: Workflow, badge: "6" },
  { href: "/templates", label: "Templates", icon: LayoutTemplate },
];

const MOCK_ALERTS = [
  {
    id: 1,
    level: "error" as const,
    title: "Workflow Failed",
    desc: '"Slack Notifier" failed after 3 retries at 17:42 UTC.',
    time: "2 min ago",
  },
  {
    id: 2,
    level: "warning" as const,
    title: "High Latency Detected",
    desc: '"CRM Sync" p95 latency is 4.8 s — above 3 s threshold.',
    time: "14 min ago",
  },
  {
    id: 3,
    level: "warning" as const,
    title: "Rate Limit Warning",
    desc: "HubSpot API at 87% of hourly quota (8,700 / 10,000 calls).",
    time: "31 min ago",
  },
  {
    id: 4,
    level: "info" as const,
    title: "Scheduled Maintenance",
    desc: "Execution engine will restart tonight at 02:00 UTC.",
    time: "1 hr ago",
  },
];

const LEVEL_META = {
  error: { color: "#ef4444", bg: "rgba(239,68,68,0.08)", Icon: AlertOctagon },
  warning: { color: "#f59e0b", bg: "rgba(245,158,11,0.08)", Icon: AlertTriangle },
  info: { color: "#60a5fa", bg: "rgba(96,165,250,0.08)", Icon: Info },
};

function AlertsModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl border shadow-2xl"
        style={{ background: "#0d1220", borderColor: "#1e2535" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "#1e2535" }}>
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4" style={{ color: "#818cf8" }} />
            <span className="font-semibold text-sm" style={{ color: "#e2e8f0" }}>Alerts</span>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444" }}>
              2 active
            </span>
          </div>
          <button onClick={onClose} style={{ color: "#64748b" }} className="hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          {MOCK_ALERTS.map((alert, i) => {
            const { color, bg, Icon } = LEVEL_META[alert.level];
            return (
              <div
                key={alert.id}
                className="px-5 py-4 flex gap-3"
                style={{ borderBottom: i < MOCK_ALERTS.length - 1 ? "1px solid #1e2535" : "none" }}
              >
                <div className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-medium" style={{ color: "#e2e8f0" }}>{alert.title}</span>
                    <span className="text-xs flex-shrink-0" style={{ color: "#64748b" }}>{alert.time}</span>
                  </div>
                  <p className="text-xs mt-1" style={{ color: "#94a3b8" }}>{alert.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-5 py-3 border-t" style={{ borderColor: "#1e2535" }}>
          <button
            className="text-xs w-full text-center transition-colors"
            style={{ color: "#64748b" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#818cf8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
          >
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingsModal({ onClose }: { onClose: () => void }) {
  const [notifications, setNotifications] = useState(true);
  const [timezone, setTimezone] = useState("UTC");
  const [theme, setTheme] = useState("dark");
  const [apiKey, setApiKey] = useState("sk-mock-••••••••••••••••");

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl border shadow-2xl"
        style={{ background: "#0d1220", borderColor: "#1e2535" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "#1e2535" }}>
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4" style={{ color: "#818cf8" }} />
            <span className="font-semibold text-sm" style={{ color: "#e2e8f0" }}>Settings</span>
          </div>
          <button onClick={onClose} style={{ color: "#64748b" }} className="hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-5 py-5 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: "#e2e8f0" }}>Notifications</p>
              <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>Receive alerts for workflow events</p>
            </div>
            <button
              onClick={() => setNotifications((v) => !v)}
              className="relative w-10 h-5 rounded-full transition-colors duration-200"
              style={{ background: notifications ? "#6366f1" : "#1e2535" }}
              aria-checked={notifications}
              role="switch"
            >
              <span
                className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200"
                style={{ transform: notifications ? "translateX(20px)" : "translateX(0)" }}
              />
            </button>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1.5" style={{ color: "#e2e8f0" }}>
              <Clock className="w-3.5 h-3.5 inline mr-1.5" style={{ color: "#64748b" }} />
              Default Timezone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full rounded-lg px-3 py-2 text-sm border outline-none"
              style={{ background: "#0a0e1a", borderColor: "#1e2535", color: "#e2e8f0" }}
            >
              {["UTC", "Europe/Madrid", "America/New_York", "America/Los_Angeles", "Asia/Tokyo"].map((tz) => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1.5" style={{ color: "#e2e8f0" }}>
              <Key className="w-3.5 h-3.5 inline mr-1.5" style={{ color: "#64748b" }} />
              API Key
            </label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full rounded-lg px-3 py-2 text-sm border outline-none font-mono"
              style={{ background: "#0a0e1a", borderColor: "#1e2535", color: "#94a3b8" }}
            />
          </div>

          <div>
            <p className="text-sm font-medium mb-2" style={{ color: "#e2e8f0" }}>Theme</p>
            <div className="flex gap-2">
              {[
                { value: "dark", label: "Dark", Icon: Moon },
                { value: "light", label: "Light", Icon: Sun },
              ].map(({ value, label, Icon }) => (
                <button
                  key={value}
                  onClick={() => setTheme(value)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-all flex-1 justify-center"
                  style={{
                    background: theme === value ? "rgba(99,102,241,0.15)" : "transparent",
                    borderColor: theme === value ? "rgba(99,102,241,0.4)" : "#1e2535",
                    color: theme === value ? "#818cf8" : "#64748b",
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 py-4 border-t flex justify-end gap-2" style={{ borderColor: "#1e2535" }}>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm border transition-colors"
            style={{ borderColor: "#1e2535", color: "#64748b" }}
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium"
            style={{ background: "#6366f1", color: "#fff" }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function SidebarContent({
  pathname,
  onClose,
  onOpenAlerts,
  onOpenSettings,
}: {
  pathname: string;
  onClose?: () => void;
  onOpenAlerts: () => void;
  onOpenSettings: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      <div
        className="flex items-center justify-between px-5 h-16 border-b"
        style={{ borderColor: "#1e2535" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #6366f1, #10b981)" }}
          >
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <div
              className="font-bold text-sm tracking-tight"
              style={{ fontFamily: "var(--font-display)", color: "#e2e8f0" }}
            >
              FlowCommand
            </div>
            <div className="text-xs" style={{ color: "#64748b" }}>
              Automation Hub
            </div>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md transition-colors"
            style={{ color: "#64748b" }}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div
        className="px-4 py-3 mx-4 mt-4 rounded-lg flex items-center gap-2"
        style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-medium" style={{ color: "#10b981" }}>Live monitoring</span>
        <Activity className="w-3 h-3 ml-auto" style={{ color: "#10b981" }} />
      </div>

      <nav className="flex-1 px-3 mt-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
                isActive ? "text-white" : "hover:text-white",
              )}
              style={
                isActive
                  ? { background: "rgba(99,102,241,0.15)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }
                  : { color: "#64748b", border: "1px solid transparent" }
              }
            >
              <Icon
                className={cn("w-4 h-4", isActive ? "" : "group-hover:text-indigo-400")}
                style={{ color: isActive ? "#818cf8" : undefined }}
              />
              <span>{item.label}</span>
              {item.badge && (
                <Badge
                  className="ml-auto text-xs px-1.5 py-0 h-5"
                  style={{ background: "rgba(99,102,241,0.2)", color: "#818cf8", border: "none" }}
                >
                  {item.badge}
                </Badge>
              )}
              {isActive && (
                <ChevronRight className="w-3 h-3 ml-auto" style={{ color: "#818cf8" }} />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-4 space-y-1 border-t pt-4" style={{ borderColor: "#1e2535" }}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onOpenAlerts}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm w-full transition-all"
              style={{ color: "#64748b" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e2e8f0")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
            >
              <Bell className="w-4 h-4" />
              <span>Alerts</span>
              <span className="ml-auto w-2 h-2 rounded-full bg-red-500" />
            </button>
          </TooltipTrigger>
          <TooltipContent>1 active error</TooltipContent>
        </Tooltip>
        <button
          onClick={onOpenSettings}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm w-full transition-all"
          style={{ color: "#64748b" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#e2e8f0")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="flex min-h-screen">
      {alertsOpen && <AlertsModal onClose={() => setAlertsOpen(false)} />}
      {settingsOpen && <SettingsModal onClose={() => setSettingsOpen(false)} />}

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(2px)" }}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-60 flex flex-col border-r lg:hidden",
          "transition-transform duration-300 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
        style={{ background: "#0a0e1a", borderColor: "#1e2535" }}
        aria-label="Mobile navigation"
      >
        <SidebarContent
          pathname={pathname}
          onClose={() => setMobileOpen(false)}
          onOpenAlerts={() => { setMobileOpen(false); setAlertsOpen(true); }}
          onOpenSettings={() => { setMobileOpen(false); setSettingsOpen(true); }}
        />
      </aside>

      <aside
        className="fixed inset-y-0 left-0 z-50 hidden lg:flex flex-col w-60 border-r"
        style={{ background: "#0a0e1a", borderColor: "#1e2535" }}
        aria-label="Desktop navigation"
      >
        <SidebarContent
          pathname={pathname}
          onOpenAlerts={() => setAlertsOpen(true)}
          onOpenSettings={() => setSettingsOpen(true)}
        />
      </aside>

      <main className="flex-1 lg:ml-60 min-h-screen">
        <div
          className="sticky top-0 z-30 flex items-center gap-3 px-4 h-14 border-b lg:hidden"
          style={{ background: "#0a0e1a", borderColor: "#1e2535" }}
        >
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg transition-colors"
            style={{ color: "#64748b" }}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #6366f1, #10b981)" }}
            >
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span
              className="font-bold text-sm"
              style={{ fontFamily: "var(--font-display)", color: "#e2e8f0" }}
            >
              FlowCommand
            </span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs" style={{ color: "#10b981" }}>Live</span>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}
