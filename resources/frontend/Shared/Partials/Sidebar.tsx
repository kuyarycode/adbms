import { forwardRef } from "react";
import { Link } from "@inertiajs/inertia-react";
import React from "react";
import route from "ziggy-js";
import Logo from "@/Components/Logo";
import { IconType } from "react-icons";
import { TbCloudDataConnection } from "react-icons/tb";
import { AiOutlineDashboard } from "react-icons/ai";

type RefType = HTMLDivElement

type PropsTypes = {
    showNav: boolean,
    handleResize: () => void
}

const Sidebar = forwardRef<RefType, PropsTypes>(({ showNav, handleResize }, ref) => {

    const SidebarLink = ({ label, icon, routeName }: { label: string, icon: IconType | undefined, routeName: string }) => {
        const isActive = (route().current() == routeName || route().current()?.includes(routeName.slice(0, routeName.length - 1)))

        return (
            <Link href={route(routeName)} preserveScroll preserveState onFinish={() => {
                handleResize()
            }}>
                <div
                    className={` border-gray-300 pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${isActive
                        ? "bg-blue-50 text-blue-600 hover:bg-blue-50 hover:text-blue-600"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                        }`}
                >
                    {icon && icon({ className: "h-5 w-5 mr-2" })}
                    <span className="font-centuryGothic">{label}</span>
                </div>
            </Link>
        )
    }

    return (
        <div ref={ref} className="z-50 fixed w-56 h-full bg-white shadow-sm border-r">
            <div className="flex items-center justify-center gap-2 mt-6 mb-16">
                <Logo size={25} color="text-blue-600/80" />
                <span className="uppercase text-gray-800 tracking-wide font-light">
                    ADBMS
                </span>
            </div>

            <div className="flex flex-col">
                <SidebarLink
                    routeName="connections"
                    label="Connections"
                    icon={TbCloudDataConnection}
                />
            </div>
        </div>
    );
});

export default Sidebar;
