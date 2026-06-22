import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import SideNavigationItem from "../SideNavigationItem";
import editWhite from "../../images/icons/editWhite.svg";
import downWhite from "../../images/icons/downWhite.svg";
import connectionWhite from "../../images/icons/connectionWhite.svg";
import vlanWhite from "../../images/icons/vlanWhite.svg";
import businessUnitsWhite from "../../images/icons/businessUnitsWhite.svg";
import areaWhite from "../../images/icons/areaWhite.svg";
import buildingsWhite from "../../images/icons/buildingsWhite.svg";
import hardwareManufacturersWhite from "../../images/icons/hardwareManufacturersWhite.svg";
import chipWhite from "../../images/icons/chipWhite.svg";
import productsWhite from "../../images/icons/productsWhite.svg";
import desktopWhite from "../../images/icons/desktopWhite.svg";
import suppliersWhite from "../../images/icons/suppliersWhite.svg";
import operatingSystemsWhite from "../../images/icons/operatingSystemsWhite.svg";
import laptopWhite from "../../images/icons/laptopWhite.svg";
import securityWhite from "../../images/icons/securityWhite.svg";
import virusWhite from "../../images/icons/virusWhite.svg";
import externalLinksWhite from "../../images/icons/externalLinksWhite.svg";
import closeWhite from "../../images/icons/closeWhite.svg";
import closeBlue from "../../images/icons/closeBlue.svg";
import hamburguerMenuWhite from "../../images/icons/hamburguerMenuWhite.svg";
import hamburguerMenuBlue from "../../images/icons/hamburguerMenuBlue.svg";

const SideNavigation = ({ onItemSelect, setSidebarHeight }) => {
  const [expandedSections, setExpandedSections] = useState({
    ITNetwork: true,
    "Org Structure": false,
    "IT Assets": false,
    "Products & Services": false,
    "IT Security": false,
    Resources: false,
  });

  const [activeItem, setActiveItem] = useState("Vlan");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const divRef = useRef(null);

  useEffect(() => {
    const updateHeight = () => {
      if (setSidebarHeight && divRef.current) {
        setSidebarHeight(divRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, [expandedSections, setSidebarHeight]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const isSectionExpanded = (section) => expandedSections[section];

  const handleItemClick = (item) => {
    if (item.isCategory) {
      toggleSection(item.label);
    } else {
      setActiveItem(item.label);
      onItemSelect(item.label);
    }
  };

  const handleCollapseToggle = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div
      className={`divMenuSideBar ${isCollapsed ? "collapsed" : ""}`}
      ref={divRef}
    >
      <div className="menuHeader">
        {isCollapsed ? (
          <img
            src={hamburguerMenuWhite}
            alt="Open Menu"
            onClick={handleCollapseToggle}
            className="toggleIcon"
            onMouseOver={(e) => (e.currentTarget.src = hamburguerMenuBlue)}
            onMouseOut={(e) => (e.currentTarget.src = hamburguerMenuWhite)}
          />
        ) : (
          <>
            <p className="txtMenuSideBarHeader">Configuration</p>
            <img
              src={closeWhite}
              alt="Close Menu"
              onClick={handleCollapseToggle}
              className="toggleIcon"
              onMouseOver={(e) => (e.currentTarget.src = closeBlue)}
              onMouseOut={(e) => (e.currentTarget.src = closeWhite)}
            />
          </>
        )}
      </div>

      {!isCollapsed && (
        <>
          <SideNavigationItem
            icon={downWhite}
            label="IT & Network"
            onClick={() =>
              handleItemClick({ label: "ITNetwork", isCategory: true })
            }
            isCategory={true}
            isActive={isSectionExpanded("ITNetwork")}
            className={isSectionExpanded("ITNetwork") ? "categoryExpanded" : ""}
            categoryIcon={downWhite}
          />
          {isSectionExpanded("ITNetwork") && (
            <div className="categoryContent expanded">
              <SideNavigationItem
                icon={vlanWhite}
                label="Vlan"
                onClick={() =>
                  handleItemClick({ label: "Vlan", isCategory: false })
                }
                isActive={activeItem === "Vlan"}
              />
              <SideNavigationItem
                icon={connectionWhite}
                label="Remote Connections"
                onClick={() =>
                  handleItemClick({
                    label: "Remote Connections",
                    isCategory: false,
                  })
                }
                isActive={activeItem === "Remote Connections"}
              />
            </div>
          )}

          <SideNavigationItem
            icon={editWhite}
            label="Org Structure"
            onClick={() =>
              handleItemClick({ label: "Org Structure", isCategory: true })
            }
            isCategory={true}
            isActive={isSectionExpanded("Org Structure")}
            className={
              isSectionExpanded("Org Structure") ? "categoryExpanded" : ""
            }
            categoryIcon={downWhite}
          />
          {isSectionExpanded("Org Structure") && (
            <div className="categoryContent expanded">
              <SideNavigationItem
                icon={businessUnitsWhite}
                label="Business Units"
                onClick={() =>
                  handleItemClick({
                    label: "Business Units",
                    isCategory: false,
                  })
                }
                isActive={activeItem === "Business Units"}
              />
              <SideNavigationItem
                icon={areaWhite}
                label="Areas"
                onClick={() =>
                  handleItemClick({
                    label: "Areas",
                    isCategory: false,
                  })
                }
                isActive={activeItem === "Areas"}
              />
              <SideNavigationItem
                icon={buildingsWhite}
                label="Buildings"
                onClick={() =>
                  handleItemClick({
                    label: "Buildings",
                    isCategory: false,
                  })
                }
                isActive={activeItem === "Buildings"}
              />
            </div>
          )}

          <SideNavigationItem
            icon={editWhite}
            label="IT Assets"
            onClick={() =>
              handleItemClick({ label: "IT Assets", isCategory: true })
            }
            isCategory={true}
            isActive={isSectionExpanded("IT Assets")}
            className={isSectionExpanded("IT Assets") ? "categoryExpanded" : ""}
            categoryIcon={downWhite}
          />
          {isSectionExpanded("IT Assets") && (
            <div className="categoryContent expanded">
              <SideNavigationItem
                icon={desktopWhite}
                label="CMDB Prefix"
                onClick={() =>
                  handleItemClick({ label: "CMDB Prefix", isCategory: false })
                }
                isActive={activeItem === "CMDB Prefix"}
              />
              <SideNavigationItem
                icon={hardwareManufacturersWhite}
                label="Hardware Manufacturers"
                onClick={() =>
                  handleItemClick({
                    label: "Hardware Manufacturers",
                    isCategory: false,
                  })
                }
                isActive={activeItem === "Hardware Manufacturers"}
              />
              <SideNavigationItem
                icon={chipWhite}
                label="Hardware Models"
                onClick={() =>
                  handleItemClick({
                    label: "Hardware Models",
                    isCategory: false,
                  })
                }
                isActive={activeItem === "Hardware Models"}
              />
              <SideNavigationItem
                icon={operatingSystemsWhite}
                label="Operating Systems"
                onClick={() =>
                  handleItemClick({
                    label: "Operating Systems",
                    isCategory: false,
                  })
                }
                isActive={activeItem === "Operating Systems"}
              />
              <SideNavigationItem
                icon={laptopWhite}
                label="Device Status"
                onClick={() =>
                  handleItemClick({
                    label: "Device Status",
                    isCategory: false,
                  })
                }
                isActive={activeItem === "Device Status"}
              />
            </div>
          )}

          <SideNavigationItem
            icon={editWhite}
            label="Products & Services"
            onClick={() =>
              handleItemClick({
                label: "Products & Services",
                isCategory: true,
              })
            }
            isCategory={true}
            isActive={isSectionExpanded("Products & Services")}
            className={
              isSectionExpanded("Products & Services") ? "categoryExpanded" : ""
            }
            categoryIcon={downWhite}
          />
          {isSectionExpanded("Products & Services") && (
            <div className="categoryContent expanded">
              <SideNavigationItem
                icon={productsWhite}
                label="Products"
                onClick={() =>
                  handleItemClick({ label: "Products", isCategory: false })
                }
                isActive={activeItem === "Products"}
              />
              <SideNavigationItem
                icon={suppliersWhite}
                label="Suppliers"
                onClick={() =>
                  handleItemClick({ label: "Suppliers", isCategory: false })
                }
                isActive={activeItem === "Suppliers"}
              />
            </div>
          )}

          <SideNavigationItem
            icon={editWhite}
            label="IT Security"
            onClick={() =>
              handleItemClick({
                label: "IT Security",
                isCategory: true,
              })
            }
            isCategory={true}
            isActive={isSectionExpanded("IT Security")}
            className={
              isSectionExpanded("IT Security") ? "categoryExpanded" : ""
            }
            categoryIcon={downWhite}
          />
          {isSectionExpanded("IT Security") && (
            <div className="categoryContent expanded">
              <SideNavigationItem
                icon={securityWhite}
                label="Patch types"
                onClick={() =>
                  handleItemClick({ label: "Patch Types", isCategory: false })
                }
                isActive={activeItem === "Patch Types"}
              />
              <SideNavigationItem
                icon={virusWhite}
                label="Virus Types"
                onClick={() =>
                  handleItemClick({ label: "Virus Types", isCategory: false })
                }
                isActive={activeItem === "Virus Types"}
              />
            </div>
          )}

          <SideNavigationItem
            icon={editWhite}
            label="Resources"
            onClick={() =>
              handleItemClick({ label: "Resources", isCategory: true })
            }
            isCategory={true}
            isActive={isSectionExpanded("Resources")}
            className={isSectionExpanded("Resources") ? "categoryExpanded" : ""}
            categoryIcon={downWhite}
          />
          {isSectionExpanded("Resources") && (
            <div className="categoryContent expanded">
              <SideNavigationItem
                icon={externalLinksWhite}
                label="External links"
                onClick={() =>
                  handleItemClick({
                    label: "External links",
                    isCategory: false,
                  })
                }
                isActive={activeItem === "External links"}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SideNavigation;