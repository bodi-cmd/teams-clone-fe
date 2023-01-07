import { FaUsers,FaUserCog } from "react-icons/fa";
import { BsFillChatDotsFill, BsFillBellFill } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import { RiNumbersFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";


export const buttons = [
  {
    icon: BsFillBellFill,
    text:"News",
    url: "/notifications",
    position:"UP",
  },
  {
    icon: FaUsers,
    text:"Groups",
    url: "/groups",
    position:"UP",
  },
  {
    icon: BsFillChatDotsFill,
    text:"Chat",
    url: "/chat",
    position:"UP",
  },
  {
    icon: MdAssignment,
    text:"Tasks",
    url: "/tasks",
    position:"UP",
  },
  {
    icon: RiNumbersFill,
    text:"Grades",
    url: "/grades",
    position:"UP",
  },
  {
    icon: FaUserCog,
    text:"Profile",
    url: "/profile",
    position:"DOWN",
  },
  {
    icon: FiLogOut,
    text:"Logout",
    url: "/login",
    position:"DOWN",
  },
];
