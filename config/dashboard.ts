import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Admin",
      href: "/admin/dashboard",
      disabled: true,
    },
    {
      title: "Supplier",
      href: "/supplier/dashboard",
      disabled: true,
    },
    {
      title: "Deliveryman",
      href: "/delivery/dashboard",
      disabled: true,
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
  sidebarNav: [
    {
      title: "General",
      href: "/dashboard",
      icon: "settings",
    },
    {
      title: "Orders history",
      href: "/dashboard/orders",
      icon: "post",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}

export const adminDashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Admin",
      href: "/admin/dashboard",
    },
    {
      title: "Supplier",
      href: "/supplier/dashboard",
    },
    {
      title: "Delivery",
      href: "/delivery/dashboard",
    },
  ],
  sidebarNav: [
    {
      title: "Clients",
      href: "/admin/dashboard/users",
      icon: "post",
    },
    {
      title: "Employees",
      href: "/admin/dashboard/employees",
      icon: "post",
    },
    {
      title: "Orders",
      href: "/admin/dashboard/orders",
      icon: "post",
    },
  ],
}

export const managerDashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Admin",
      href: "/admin/dashboard",
    },
    {
      title: "Manager",
      href: "/manager/dashboard",
    },
    {
      title: "Manager",
      href: "/manager/dashboard/client",
    },
    {
      title: "Projects",
      href: "/manager/dashboard/projects",
    },
    {
      title: "Task",
      href: "/manager/dashboard/tasks",
    },
  ],
  sidebarNav: [
    {
      title: "Project",
      href: "/admin/dashboard/manager/projects",
      icon: "post",
    },
    {
      title: "Tasks",
      href: "/manager/dashboard/tasks",
      icon: "post",
    },
    {
      title: "Client",
      href: "/manager/dashboard/employees",
      icon: "billing",
    },
    {
      title: "employees",
      href: "/manager/dashboard/employees",
      icon: "post",
    },
    // {
    //   title: "Roles",
    //   href: "/manager/dashboard/roles",
    //   icon: "post",
    // },
    {
      title: "Users",
      href: "/manager/dashboard/users",
      icon: "post",
    },
  ],
}

export const supplierDashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Admin",
      href: "/admin/dashboard",
    },
    {
      title: "Manager",
      href: "/manager/dashboard",
    },
    {
      title: "Projects",
      href: "/manager/dashboard/projects",
    },
  ],
  sidebarNav: [
    {
      title: "Product",
      href: "/supplier/dashboard/products",
      icon: "post",
    },
    {
      title: "Order",
      href: "/supplier/dashboard/orders",
      icon: "post",
    },
  ],
}

export const deliveryDashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Admin",
      href: "/admin/dashboard",
    },
    {
      title: "Manager",
      href: "/manager/dashboard",
    },
    {
      title: "Manager",
      href: "/manager/dashboard/client",
    },
    {
      title: "Projects",
      href: "/manager/dashboard/projects",
    },
    {
      title: "Task",
      href: "/manager/dashboard/tasks",
    },
  ],
  sidebarNav: [
    {
      title: "Order accepted",
      href: "/delivery/dashboard/orders",
      icon: "post",
    },
  ],
}
