import React from "react";
import { ControlPanel } from "../../../components/ControlPanel";

interface ProfileSidebarProps {
  isPngRequest: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
  isLoading: boolean;
  filteredUsers: any[];
  currentUser: any;
  statusMsg: string;
  apiBase: string;
  onUserSelect: (user: any) => void;
  onRefresh: () => void;
  onCopyImage: () => void;
  onDownloadImage: () => void;
  onCopyLink: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  isPngRequest,
  searchTerm,
  setSearchTerm,
  isDropdownOpen,
  setIsDropdownOpen,
  isLoading,
  filteredUsers,
  currentUser,
  statusMsg,
  apiBase,
  onUserSelect,
  onRefresh,
  onCopyImage,
  onDownloadImage,
  onCopyLink,
}) => {
  return (
    <ControlPanel className={isPngRequest ? "hidden" : ""}>
      <ControlPanel.Header
        icon="fa-solid fa-address-card"
        title="Our members"
      />

      <div className="flex flex-col gap-4 mb-8">
        <ControlPanel.FormGroup label="Search & Select Member">
          <div className="relative search-dropdown">
            <ControlPanel.Input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder="Search by name or Discord ID..."
              disabled={isLoading}
            />
            {isDropdownOpen && !isLoading && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-(--ctp-surface0) border border-(--ctp-surface1) rounded z-50 max-h-64 overflow-y-auto shadow-lg">
                {filteredUsers.length === 0 ? (
                  <div className="px-4 py-3 text-(--ctp-subtext0) text-sm text-center">
                    {searchTerm
                      ? "No users found"
                      : "Start typing to search..."}
                  </div>
                ) : (
                  filteredUsers.map((u) => (
                    <button
                      key={u.discordId}
                      onClick={() => onUserSelect(u)}
                      className="w-full text-left px-4 py-2.5 hover:bg-(--ctp-surface1) border-b border-(--ctp-surface2) last:border-b-0 transition"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-(--ctp-text) text-sm">
                          {u.username || "Unknown"}
                        </div>
                        {u.isDeboarded && (
                          <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full bg-[rgba(148,226,213,0.15)] text-(--miku-primary) border border-[rgba(148,226,213,0.3)]">
                            <i className="fa-solid fa-passport mr-1"></i>
                            RECRUITED
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-(--ctp-subtext0) flex flex-col gap-0.5">
                        {u.isDeboarded && u.deboarded_statusMessage && (
                          <span className="text-[0.7rem] italic">
                            "{u.deboarded_statusMessage}"
                          </span>
                        )}
                        <span>{u.discordId}</span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </ControlPanel.FormGroup>

        <div className="flex flex-col gap-3">
          <ControlPanel.Button
            onClick={onRefresh}
            variant="primary"
            icon="fa-solid fa-wand-magic-sparkles"
          >
            Refresh Profile
          </ControlPanel.Button>
          <a
            href={
              currentUser
                ? `${apiBase}/api/users/share/${encodeURIComponent(currentUser.discordId)}`
                : "#"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <ControlPanel.Button
              variant="secondary"
              icon="fa-solid fa-share-nodes"
            >
              View Raw Embed
            </ControlPanel.Button>
          </a>
        </div>
      </div>

      <ControlPanel.Header icon="fa-solid fa-camera" title="Export Card" />

      <div className="flex flex-col gap-3">
        <ControlPanel.Button
          onClick={onCopyImage}
          variant="secondary"
          icon="fa-solid fa-copy"
        >
          Copy to Clipboard
        </ControlPanel.Button>
        <ControlPanel.Button
          onClick={onDownloadImage}
          variant="secondary"
          icon="fa-solid fa-download"
        >
          Save as PNG
        </ControlPanel.Button>
        <ControlPanel.Button
          onClick={onCopyLink}
          variant="secondary"
          icon="fa-solid fa-link"
        >
          Copy Share Link
        </ControlPanel.Button>
      </div>

      {statusMsg && (
        <p className="mt-4 text-[0.85rem] text-(--miku-accent) text-center font-semibold">
          {statusMsg}
        </p>
      )}
    </ControlPanel>
  );
};

export default ProfileSidebar;
