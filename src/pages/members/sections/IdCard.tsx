import React from "react";
import decorImage from "../../../assets/PNG 2.png";

const Badge = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`px-2.5 py-1 rounded-[50px] text-[0.75rem] font-bold whitespace-nowrap inline-block ${className}`}
  >
    {children}
  </span>
);

interface IdCardProps {
  currentUser: any;
  isLoadingProfile: boolean;
  isPngRequest: boolean;
  cardRef: React.RefObject<HTMLDivElement>;
}

const IdCard: React.FC<IdCardProps> = ({
  currentUser,
  isLoadingProfile,
  isPngRequest,
  cardRef,
}) => {
  // Derived UI Data
  const avatarUrl =
    currentUser?.avatarUrl ||
    currentUser?.profileImageUrl ||
    `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(currentUser?.discordId || currentUser?.username || "miku")}&backgroundColor=313244&textColor=94e2d5`;

  const roleList = currentUser?.actualRoles?.length
    ? currentUser.actualRoles
    : currentUser?.roles?.length
      ? currentUser.roles
      : [];

  const mikuDesc =
    currentUser?.discordId === "383329758697750528"
      ? "My confusion has expanded from the size of Miyamasuzaka Girls' Academy to the size of Shibuya, Tokyo."
      : currentUser?.mikuDescription ||
        `✨ Exploring the Sekai with ${currentUser?.username || "this member"}!`;

  return (
    <div className="flex flex-col min-w-0">
      <div className="bg-(--ctp-surface0) border border-(--ctp-surface1) rounded-[15px] p-4 sm:p-6 w-full overflow-hidden flex flex-col items-center">
        <div className="w-full mb-6 border-b border-(--ctp-surface1) pb-4">
          <h3 className="text-[1.1rem] sm:text-[1.4rem] font-bold text-(--miku-primary) m-0">
            <i className="fa-solid fa-id-badge mr-2"></i> ID Card
          </h3>
        </div>

        <div className="bg-(--ctp-base) p-4 sm:p-5 rounded-[20px] w-full flex justify-center relative">
          {isPngRequest && currentUser && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 rounded-[20px]">
              <div className="text-center">
                <i className="fa-solid fa-spinner fa-spin text-4xl text-(--miku-primary) mb-4 block"></i>
                <p className="text-(--ctp-subtext0) text-lg">
                  Generating your card image...
                </p>
              </div>
            </div>
          )}

          {isLoadingProfile ? (
            <div className="flex flex-col items-center justify-center py-16 text-(--miku-primary)">
              <i className="fa-solid fa-spinner fa-spin text-[3rem] mb-4"></i>
              <p>Loading profile...</p>
            </div>
          ) : currentUser ? (
            <div
              ref={cardRef}
              className="bg-(--ctp-surface0) border border-(--ctp-surface1) rounded-[15px] w-full max-w-112.5 p-4 sm:p-6 relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.2),0_0_15px_rgba(148,226,213,0.05)] before:content-[''] before:absolute before:top-0 before:right-0 before:w-37.5 before:h-37.5 before:bg-[radial-gradient(circle,rgba(148,226,213,0.1)_0%,transparent_70%)] before:rounded-full before:translate-x-[30%] before:-translate-y-[30%] before:pointer-events-none transition-all duration-300"
            >
              {currentUser.isDeboarded ? (
                // Recruited in Another Sekai View
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-6 text-6xl text-(--miku-secondary)">
                    <i className="fa-solid fa-portal"></i>
                  </div>
                  <h2 className="m-0 mb-3 font-extrabold text-[1.4rem] sm:text-[1.8rem] text-(--ctp-text)">
                    {currentUser.username || "Transferred Member"}
                  </h2>
                  <Badge className="mb-4 bg-[rgba(148,226,213,0.15)] text-(--miku-primary) border-[rgba(148,226,213,0.3)] border animate-pulse">
                    <i className="fa-solid fa-passport mr-2"></i>RECRUITED TO
                    ANOTHER SEKAI
                  </Badge>
                  <div className="bg-(--ctp-mantle) border border-dashed border-(--miku-secondary) rounded-lg p-4 max-w-[90%] text-[0.95rem] text-(--ctp-text) mb-6 italic">
                    <i className="fa-solid fa-quote-left text-(--miku-secondary) mr-2"></i>
                    {currentUser.deboarded_statusMessage ||
                      "✨ ~Scouted in a different SEKAI~ ✨"}
                  </div>
                  <div className="text-[0.85rem] text-(--ctp-subtext0)">
                    {currentUser.deboarded_at && (
                      <p>
                        <i className="fa-solid fa-calendar mr-2"></i>
                        Deboarded on{" "}
                        {new Date(
                          currentUser.deboarded_at,
                        ).toLocaleDateString()}
                      </p>
                    )}
                    <p className="mt-2">
                      <i className="fa-solid fa-user mr-2"></i>
                      Discord ID: {currentUser.discordId}
                    </p>
                  </div>
                </div>
              ) : (
                // Active User View
                <>
                  <div className="flex items-center gap-3 sm:gap-[1.2rem] mb-3 sm:mb-[1.2rem] relative z-2">
                    <img
                      src={avatarUrl}
                      alt="Avatar"
                      crossOrigin="anonymous"
                      className="w-13.75 h-13.75 sm:w-18.75 sm:h-18.75 rounded-xl border border-transparent sm:border-2 sm:border-(--miku-primary) object-cover bg-(--ctp-mantle)"
                    />
                    <div className="flex-1 min-w-0 pr-10 sm:pr-17.5">
                      <h2 className="m-0 mb-1 font-extrabold text-[1.15rem] sm:text-[1.4rem] text-(--ctp-text) whitespace-nowrap overflow-hidden text-ellipsis">
                        {currentUser.username || "Unknown User"}
                      </h2>
                      <p className="font-mono text-(--ctp-subtext0) text-[0.75rem] sm:text-[0.85rem] mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                        @{currentUser.discordId}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {currentUser.discordId === "1213817849693478972" && (
                          <span className="px-2 py-0.5 text-[0.7rem] rounded-md font-extrabold flex items-center gap-1 uppercase tracking-[0.5px] bg-[rgba(203,166,247,0.1)] text-(--ctp-mauve) border border-(--ctp-mauve) shadow-[inset_0_0_5px_rgba(203,166,247,0.2),0_0_8px_rgba(203,166,247,0.3)]">
                            <i className="fa-solid fa-meteor"></i> Architect
                          </span>
                        )}
                        {["657310325925740561", "799240925921542194"].includes(
                          currentUser.discordId,
                        ) && (
                          <span className="px-2 py-0.5 text-[0.7rem] rounded-md font-extrabold flex items-center gap-1 uppercase tracking-[0.5px] bg-[rgba(249,226,175,0.1)] text-(--ctp-yellow) border border-(--ctp-yellow) shadow-[inset_0_0_5px_rgba(249,226,175,0.2),0_0_8px_rgba(249,226,175,0.3)]">
                            <i className="fa-solid fa-gem"></i> Founder
                          </span>
                        )}

                        <Badge
                          className={
                            currentUser.isOnHiatus
                              ? "bg-(--ctp-surface2) text-(--ctp-text) border border-(--ctp-surface1) font-normal text-[0.7rem]"
                              : "bg-(--ctp-green) text-[#111]"
                          }
                        >
                          {currentUser.isOnHiatus
                            ? "💤 On Hiatus"
                            : "✨ Active"}
                        </Badge>
                        <Badge
                          className={
                            currentUser.strikes > 0
                              ? "bg-(--ctp-red) text-[#111]"
                              : "bg-(--ctp-subtext0) text-[#111]"
                          }
                        >
                          {currentUser.strikes > 0
                            ? `${currentUser.strikes} Strikes`
                            : "Clean Record"}
                        </Badge>
                      </div>
                    </div>
                    <img
                      src={decorImage}
                      alt="Decor"
                      className="absolute w-10 sm:w-15 opacity-80 -top-1 sm:-top-2.5 -right-1 sm:right-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
                    />
                  </div>

                  <div className="hidden sm:flex bg-(--ctp-mantle) border border-dashed border-(--miku-secondary) rounded-lg p-[0.8rem] text-[0.9rem] text-(--ctp-text) mb-[1.2rem] items-start gap-[0.8rem]">
                    <i className="fa-solid fa-quote-left text-(--miku-secondary) text-[1.2rem] mt-0.5"></i>
                    <span>{mikuDesc}</span>
                  </div>

                  <div className="flex flex-col gap-[0.6rem] sm:gap-[0.8rem] mb-4 sm:mb-6">
                    <div className="flex flex-col gap-1 sm:gap-[0.4rem]">
                      <span className="text-[0.75rem] text-(--ctp-subtext0) font-bold uppercase tracking-[0.5px]">
                        🎭 Server Roles
                      </span>
                      <div className="flex flex-wrap gap-[0.4rem]">
                        {roleList.length ? (
                          roleList.map((r: string, i: number) => (
                            <Badge
                              key={i}
                              className="bg-(--ctp-surface1) text-(--ctp-text) border border-(--ctp-surface2) font-normal text-[0.75rem]"
                            >
                              {r}
                            </Badge>
                          ))
                        ) : (
                          <Badge className="bg-(--ctp-surface1) text-(--ctp-text) border border-(--ctp-surface2) font-normal text-[0.75rem]">
                            Member
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 sm:gap-[0.4rem]">
                      <span className="text-[0.75rem] text-(--ctp-subtext0) font-bold uppercase tracking-[0.5px]">
                        💼 Work Tags
                      </span>
                      <div className="flex flex-wrap gap-[0.4rem]">
                        {currentUser.topTaskRoles?.length ? (
                          currentUser.topTaskRoles.map(
                            (r: string, i: number) => (
                              <Badge
                                key={i}
                                className="bg-(--ctp-surface1) text-(--ctp-text) border border-(--ctp-surface2) font-normal text-[0.75rem]"
                              >
                                {r}
                              </Badge>
                            ),
                          )
                        ) : (
                          <Badge className="bg-(--ctp-surface1) text-(--ctp-text) border border-(--ctp-surface2) font-normal text-[0.75rem]">
                            -
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-[0.8rem] mb-4 sm:mb-4">
                    <div className="bg-(--ctp-mantle) rounded-lg p-[0.6rem] sm:p-[0.8rem] flex flex-row sm:flex-col justify-between sm:justify-start items-center sm:items-start border border-(--ctp-surface1)">
                      <span className="text-[0.75rem] text-(--ctp-subtext0) uppercase font-bold sm:mb-[0.3rem] m-0">
                        Tasks Done
                      </span>
                      <span className="font-mono text-[1.2rem] font-extrabold text-(--miku-primary)">
                        {currentUser.tasksCompleted || 0}
                      </span>
                    </div>
                    <div className="bg-(--ctp-mantle) rounded-lg p-[0.6rem] sm:p-[0.8rem] flex flex-row sm:flex-col justify-between sm:justify-start items-center sm:items-start border border-(--ctp-surface1)">
                      <span className="text-[0.75rem] text-(--ctp-subtext0) uppercase font-bold sm:mb-[0.3rem] m-0">
                        Joined Date
                      </span>
                      <span className="font-mono text-[1.2rem] font-extrabold text-(--miku-accent)">
                        {currentUser.joinedAt
                          ? new Date(currentUser.joinedAt).toLocaleDateString()
                          : "--"}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t border-(--ctp-surface1) pt-[0.8rem] mt-2 font-mono text-[0.55rem] sm:text-[0.65rem] text-(--ctp-surface2) uppercase font-bold">
                    <span>Sekai Analytics Center</span>
                    <span>Blossoming Sekai's Miku</span>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="text-center p-8 text-(--ctp-subtext0)">
              <i className="fa-solid fa-user-astronaut text-[3rem] mb-4 opacity-50"></i>
              <p>Select a user to view their ID Card.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdCard;
