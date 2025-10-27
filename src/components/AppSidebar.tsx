import { NavLink } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  Clock,
  GraduationCap,
  HelpCircle,
  Library,
  Settings,
  CreditCard,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const menuItems = [
  {
    title: "Novo Simulado",
    url: "/dashboard/novo-simulado",
    icon: GraduationCap,
  },
  {
    title: "Análise de Desempenho",
    url: "/dashboard/desempenho",
    icon: BarChart3,
  },
  {
    title: "Meus Simulados",
    url: "/dashboard/historico",
    icon: Clock,
  },
  {
    title: "Biblioteca",
    url: "/dashboard/biblioteca",
    icon: Library,
  },
  {
    title: "Buscar Questões",
    url: "/dashboard/questoes",
    icon: BookOpen,
  },
];

const settingsItems = [
  {
    title: "Minha Conta",
    url: "/dashboard/configuracoes",
    icon: Settings,
  },
  {
    title: "Assinatura",
    url: "/dashboard/assinatura",
    icon: CreditCard,
  },
  {
    title: "Ajuda",
    url: "/dashboard/ajuda",
    icon: HelpCircle,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { signOut } = useAuth();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        {!collapsed && (
          <div>
            <h2 className="text-lg font-heading font-bold text-sidebar-foreground">EstudaMax</h2>
            <p className="text-xs text-sidebar-foreground/70">Área do Cliente</p>
          </div>
        )}
        {collapsed && (
          <div className="flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-sidebar-primary" />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "hover:bg-sidebar-accent/50"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Configurações</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "hover:bg-sidebar-accent/50"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <Button
          variant="outline"
          onClick={signOut}
          className="w-full justify-start"
          size={collapsed ? "icon" : "default"}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span className="ml-2">Sair</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
