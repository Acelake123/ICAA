import { NavLink, useNavigate } from "react-router-dom";
import HubIcon from "@mui/icons-material/Hub";
import {
  Dashboard as DashboardIcon,
  Settings,
  Logout,
  PieChart,
  Wallet,
  TrendingUp,
  Notifications,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { authAction } from "../store/auth";

function Aside() {
  const baseStyles =
    "flex items-center gap-4 text-blue-600 hover:text-white justify-start px-4 py-2";
  const activeStyles = "bg-blue-700 text-white font-bold rounded-md";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(authAction.setSignup(false));
    dispatch(authAction.setLogin(false));
    navigate("/");
  };

  const navLinks = [
    { to: "/dashboard/overview", icon: <DashboardIcon />, label: "Overview" },
    { to: "chart", icon: <PieChart />, label: "Chart" },
    { to: "chain", icon: <HubIcon />, label: "Chain" },
    { to: "transactioninfo", icon: <TrendingUp />, label: "Transactions" },
    { to: "wallet", icon: <Wallet />, label: "Wallet" },
    { to: "news", icon: <Notifications />, label: "News" },
  ];

  return (
    <aside className="bg-gray-900 w-48 flex flex-col justify-between relative">
      <div>
        <div className="p-6 text-start ">
          <div className="text-2xl font-bold">GOV</div>
        </div>

        <nav>
          <ul className="flex flex-col gap-2">
            {navLinks.map(({ to, icon, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `${baseStyles} ${isActive ? activeStyles : ""}`.trim()
                  }
                  end
                >
                  {icon}
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex flex-col gap-4 p-6">
        <ul className="flex flex-col gap-2">
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `${baseStyles} ${isActive ? activeStyles : ""}`.trim()
              }
            >
              <Settings />
              <span>Settings</span>
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className={`${baseStyles} hover:bg-blue-800 rounded-md`}
            >
              <Logout />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Aside;
