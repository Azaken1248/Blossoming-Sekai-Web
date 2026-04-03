import { useState, useEffect, useRef, type RefObject } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toBlob } from "html-to-image";
import Navbar from "../../components/Navbar";
import ProfileSidebar from "../members/sections/ProfileSidebar";
import IdCard from "../members/sections/IdCard";

const API_BASE = "https://api.sekai.azaken.com";
const API_USERS = `${API_BASE}/api/users`;

const Profile = () => {
  const { idWithExtension } = useParams<{ idWithExtension?: string }>();
  const navigate = useNavigate();

  const paramDiscordId = idWithExtension?.replace(".png", "") || "";
  const isPngRequest = idWithExtension?.endsWith(".png") ?? false;

  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [statusMsg, setStatusMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const cardRef = useRef<HTMLDivElement>(null);

  // --- Initial Fetch ---
  useEffect(() => {
    const fetchUsersList = async () => {
      setStatusMsg("Loading users...");
      try {
        const res = await fetch(`${API_USERS}?live=true`);
        const body = await res.json();
        const userList = Array.isArray(body) ? body : body.data || [];
        setUsers(userList);

        if (!paramDiscordId && userList.length > 0) {
          navigate(`/profile/${userList[0].discordId}`, { replace: true });
        }
        setStatusMsg("");
      } catch (error) {
        console.error("Error fetching users:", error);
        setStatusMsg("Could not load users from API.");
      }
      setIsLoading(false);
    };
    fetchUsersList();
  }, [paramDiscordId, navigate]);

  // --- Load Profile on URL Change ---
  useEffect(() => {
    if (paramDiscordId && users.length > 0) {
      loadProfileById(paramDiscordId, users);
    }
  }, [paramDiscordId, users]);

  // --- Close Dropdown on Outside Click ---
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".search-dropdown")) setIsDropdownOpen(false);
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isDropdownOpen]);

  // --- Handle Auto-PNG generation via URL ---
  useEffect(() => {
    if (isPngRequest && currentUser && cardRef.current) {
      const timeout = setTimeout(async () => {
        try {
          const blob = await generateCanvas();
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `sekai-card-${currentUser.username}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          setTimeout(
            () => navigate(`/profile/${paramDiscordId}`, { replace: true }),
            1000,
          );
        } catch (e) {
          console.error("Failed to generate PNG:", e);
          navigate(`/profile/${paramDiscordId}`, { replace: true });
        }
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [isPngRequest, currentUser, navigate, paramDiscordId]);

  // --- Logic Helpers ---
  const loadProfileById = async (discordId: string, userList = users) => {
    const baseUser = userList.find((u) => u.discordId === discordId);
    if (!baseUser) return;

    setIsLoadingProfile(true);
    setCurrentUser(null);
    setStatusMsg("Fetching profile...");
    try {
      const sumRes = await fetch(
        `${API_USERS}/${encodeURIComponent(discordId)}/summary`,
      );
      if (sumRes.ok) {
        const sumData = await sumRes.json();
        setCurrentUser({ ...baseUser, ...sumData.data });
      } else {
        setCurrentUser(baseUser);
      }
    } catch (e) {
      setCurrentUser(baseUser);
    } finally {
      setIsLoadingProfile(false);
      setStatusMsg("");
    }
  };

  const handleUserSelect = (u: any) => {
    setSearchTerm("");
    setIsDropdownOpen(false);
    navigate(`/profile/${u.discordId}`);
    setIsLoadingProfile(true);
    setCurrentUser(null);
    setStatusMsg("Fetching profile...");
    fetch(`${API_USERS}/${encodeURIComponent(u.discordId)}/summary`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setCurrentUser({ ...u, ...data.data }))
      .catch(() => setCurrentUser(u))
      .finally(() => {
        setIsLoadingProfile(false);
        setStatusMsg("");
      });
  };

  const handleRefreshProfile = () => {
    if (!paramDiscordId) return;
    setIsLoadingProfile(true);
    setCurrentUser(null);
    setStatusMsg("Refreshing profile...");
    fetch(`${API_USERS}/${encodeURIComponent(paramDiscordId)}/summary`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        const baseUser = users.find((u) => u.discordId === paramDiscordId);
        if (baseUser) setCurrentUser({ ...baseUser, ...data.data });
      })
      .catch(() => {
        const baseUser = users.find((u) => u.discordId === paramDiscordId);
        if (baseUser) setCurrentUser(baseUser);
      })
      .finally(() => {
        setIsLoadingProfile(false);
        setStatusMsg("");
      });
  };

  // --- Export Handlers ---
  const generateCanvas = async () => {
    if (!cardRef.current) throw new Error("Card not found");
    const targetWidth = 450;
    await new Promise((resolve) => setTimeout(resolve, 500));
    await document.fonts.ready;
    try {
      const blob = await toBlob(cardRef.current, {
        backgroundColor: "#1e1e2e",
        pixelRatio: 2,
        width: targetWidth,
        skipAutoScale: true,
        style: {
          width: `${targetWidth}px`,
          minWidth: `${targetWidth}px`,
          maxWidth: `${targetWidth}px`,
          margin: "0",
          transform: "scale(1)",
        },
      });
      if (!blob) throw new Error("Failed to create image blob.");
      return blob;
    } catch (error) {
      console.error("Canvas error:", error);
      throw error;
    }
  };

  const handleCopyImage = async () => {
    if (!currentUser) return;
    setStatusMsg("Generating full-sized image...");
    try {
      const blob = await generateCanvas();
      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        setStatusMsg("Card copied to clipboard!");
      } else {
        setStatusMsg("Clipboard not supported by browser.");
      }
    } catch (error) {
      console.error(error);
      setStatusMsg("Failed to copy image.");
    }
    setTimeout(() => setStatusMsg(""), 3000);
  };

  const handleDownloadImage = async () => {
    if (!currentUser) return;
    setStatusMsg("Preparing download...");
    try {
      const blob = await generateCanvas();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `sekai-card-${currentUser.username}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setStatusMsg("Download started!");
    } catch (error) {
      setStatusMsg("Failed to download image.");
    }
    setTimeout(() => setStatusMsg(""), 3000);
  };

  const handleCopyLink = async () => {
    if (!currentUser) return;
    const url = `${window.location.origin}/profile/${encodeURIComponent(currentUser.discordId)}`;
    try {
      await navigator.clipboard.writeText(url);
      setStatusMsg("Share link copied!");
    } catch (error) {
      setStatusMsg("Failed to copy link.");
    }
    setTimeout(() => setStatusMsg(""), 3000);
  };

  const filteredUsers = users.filter((u) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      u.username.toLowerCase().includes(searchLower) ||
      u.discordId.includes(searchTerm)
    );
  });

  return (
    <>
      <Navbar
        title="Sekai Members"
        mobileTitle="Members"
        items={[
          { label: "Home", href: "/", iconClass: "fa-solid fa-house" },
          {
            label: "Analytics",
            href: "/analytics",
            iconClass: "fa-solid fa-chart-pie",
          },
        ]}
      />

      <main
        className={`grid ${isPngRequest ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)]"} gap-8 max-w-350 w-full mx-auto px-4 md:px-8 py-8 items-start`}
      >
        <ProfileSidebar
          isPngRequest={isPngRequest}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          isLoading={isLoading}
          filteredUsers={filteredUsers}
          currentUser={currentUser}
          statusMsg={statusMsg}
          apiBase={API_BASE}
          onUserSelect={handleUserSelect}
          onRefresh={handleRefreshProfile}
          onCopyImage={handleCopyImage}
          onDownloadImage={handleDownloadImage}
          onCopyLink={handleCopyLink}
        />

        <IdCard
          currentUser={currentUser}
          isLoadingProfile={isLoadingProfile}
          isPngRequest={isPngRequest}
          cardRef={cardRef as RefObject<HTMLDivElement>}
        />
      </main>
    </>
  );
};

export default Profile;
