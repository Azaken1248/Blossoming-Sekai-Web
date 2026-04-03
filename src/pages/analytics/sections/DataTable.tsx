import React from "react";
import { StatusBadge, StrikeBadges } from "./Badges";

interface DataTableProps {
  isTasks: boolean;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  tableData: any[];
  filteredTableData: any[];
  isLoading: boolean;
}

export const DataTable: React.FC<DataTableProps> = ({
  isTasks,
  searchTerm,
  onSearchChange,
  filteredTableData,
  isLoading,
}) => {
  return (
    <div className="bg-(--ctp-surface0) border border-(--ctp-surface1) rounded-[15px] p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h3 className="text-[1.2rem] md:text-[1.4rem] font-bold text-(--miku-primary) m-0">
          <i
            className={
              isTasks
                ? "fa-solid fa-database mr-2"
                : "fa-solid fa-users-viewfinder mr-2"
            }
          ></i>
          {isTasks ? "Assignment Data" : "User Roster"}
        </h3>

        <div className="relative w-full md:max-w-87.5">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-(--ctp-subtext0)"></i>
          <input
            type="text"
            placeholder="Super Search anything..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full py-3 pr-4 pl-10 bg-(--ctp-mantle) border border-(--ctp-surface2) rounded-lg text-(--ctp-text) outline-none focus:border-(--miku-primary) transition-colors"
          />
        </div>
      </div>

      <div className="w-full overflow-x-auto [-webkit-overflow-scrolling:touch]">
        <table className="w-full min-w-150 border-collapse font-mono text-left">
          <thead>
            <tr>
              {isTasks ? (
                <>
                  <th className="bg-(--ctp-surface1) text-(--miku-secondary) p-4 text-[0.8rem] uppercase font-bold tracking-wider">
                    Task Type
                  </th>
                  <th className="bg-(--ctp-surface1) text-(--miku-secondary) p-4 text-[0.8rem] uppercase font-bold tracking-wider">
                    Role
                  </th>
                  <th className="bg-(--ctp-surface1) text-(--miku-secondary) p-4 text-[0.8rem] uppercase font-bold tracking-wider">
                    User
                  </th>
                  <th className="bg-(--ctp-surface1) text-(--miku-secondary) p-4 text-[0.8rem] uppercase font-bold tracking-wider">
                    Status
                  </th>
                  <th className="bg-(--ctp-surface1) text-(--miku-secondary) p-4 text-[0.8rem] uppercase font-bold tracking-wider">
                    Deadline
                  </th>
                  <th className="bg-(--ctp-surface1) text-(--miku-secondary) p-4 text-[0.8rem] uppercase font-bold tracking-wider">
                    Ext.
                  </th>
                </>
              ) : (
                <>
                  <th className="bg-(--ctp-surface1) text-(--miku-secondary) p-4 text-[0.8rem] uppercase font-bold tracking-wider">
                    Username
                  </th>
                  <th className="bg-(--ctp-surface1) text-(--miku-secondary) p-4 text-[0.8rem] uppercase font-bold tracking-wider">
                    Discord ID
                  </th>
                  <th className="bg-(--ctp-surface1) text-(--miku-secondary) p-4 text-[0.8rem] uppercase font-bold tracking-wider">
                    Strikes
                  </th>
                  <th className="bg-(--ctp-surface1) text-(--miku-secondary) p-4 text-[0.8rem] uppercase font-bold tracking-wider">
                    Hiatus Status
                  </th>
                  <th className="bg-(--ctp-surface1) text-(--miku-secondary) p-4 text-[0.8rem] uppercase font-bold tracking-wider">
                    Join Date
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-4 text-(--miku-primary)"
                >
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i> Miku is
                  fetching your data...
                </td>
              </tr>
            ) : filteredTableData.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-4 text-(--ctp-subtext0)"
                >
                  No matching records found. Miku is sad.
                </td>
              </tr>
            ) : (
              filteredTableData.map((item, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-(--ctp-mantle) transition-colors border-b border-(--ctp-surface1) last:border-0"
                >
                  {isTasks ? (
                    <>
                      <td className="p-4 text-[0.9rem] text-(--ctp-subtext0)">
                        {item.taskType || "N/A"}
                      </td>
                      <td className="p-4 text-[0.9rem] text-(--ctp-subtext0)">
                        {item.roleName || "N/A"}
                      </td>
                      <td className="p-4 text-[0.9rem] text-(--ctp-text) font-semibold flex items-center">
                        {item.userId?.username ||
                          item.discordUserId ||
                          "Unknown"}
                        {item.userId?.isOnHiatus && (
                          <span className="bg-(--ctp-surface2) text-(--ctp-text) border border-(--ctp-surface1) ml-2 px-1.5 py-0.5 text-[0.7rem] rounded-[50px] whitespace-nowrap">
                            <i className="fa-solid fa-bed"></i> Zzz
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="p-4 text-[0.9rem] text-(--ctp-subtext0)">
                        {new Date(item.deadline).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-[0.9rem] text-(--ctp-subtext0)">
                        {item.extensionCount || 0}
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-4 text-[0.9rem] text-(--ctp-text) font-semibold">
                        {item.username || "Unknown"}
                      </td>
                      <td className="p-4 text-[0.8rem] text-(--ctp-subtext0)">
                        {item.discordId || "N/A"}
                      </td>
                      <td className="p-4">
                        <StrikeBadges count={item.strikes} />
                      </td>
                      <td className="p-4">
                        <StatusBadge
                          status={item.isOnHiatus ? "EXCUSED" : "COMPLETED"}
                        />
                      </td>
                      <td className="p-4 text-[0.9rem] text-(--ctp-subtext0)">
                        {new Date(
                          item.createdAt || Date.now(),
                        ).toLocaleDateString()}
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
