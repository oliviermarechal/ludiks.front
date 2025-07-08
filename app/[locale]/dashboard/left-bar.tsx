import { 
    FolderGit2, 
    ChevronDown, 
    Settings, 
    Users, 
    CircuitBoard, 
    LayoutDashboard, 
    Check, 
    LogOut, 
    Loader2, 
    Building2,
    CreditCard,
    UserCheck,
    Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { Link, usePathname, useRouter } from "@/lib/navigation"
import { useProjectSelection } from "@/lib/hooks/use-project-selection.hook"
import { Project, Organization } from "@/lib/stores/project-store"
import { useAuth } from "@/lib/hooks/use-auth.hook"
import { useTranslations } from "next-intl"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useQueryClient } from "@tanstack/react-query"
import { LeftbarUsageSummary } from '@/components/dashboard/leftbar-usage-summary';

export default function LeftBar() {
    const t = useTranslations('dashboard.common')
    const tCommon = useTranslations('common')
    const router = useRouter()
    const queryClient = useQueryClient()
    const { logout } = useAuth()

    const pathname = usePathname()
    const { selectedProject, selectedOrganization, setSelectedProject, setSelectedOrganization, isLoading, organizations } = useProjectSelection()

    const projectNavigation = [
        { name: t('leftBar.navigation.overview'), href: '/dashboard', icon: LayoutDashboard },
        { name: t('leftBar.navigation.circuits'), href: '/dashboard/circuits', icon: CircuitBoard },
        { name: t('leftBar.navigation.users'), href: '/dashboard/users', icon: Users },
        { name: t('leftBar.navigation.settings'), href: '/dashboard/settings', icon: Settings },
    ]

    const organizationNavigation = [
        { name: t('leftBar.organization.members'), href: '/dashboard/organization/members', icon: UserCheck },
        { name: t('leftBar.organization.invites'), href: '/dashboard/organization/invites', icon: Mail },
        { name: t('leftBar.organization.billing'), href: '/dashboard/organization/billing', icon: CreditCard },
    ]

    const handleProjectChange = (project: Project, organization: Organization) => {
        setSelectedProject(project)
        setSelectedOrganization(organization)
    }

    const handleLogout = async () => {
        queryClient.clear()
        logout()
        
        router.push('/auth/login')
    }

    const isActive = (href: string) => {
        return href === '/dashboard' 
            ? pathname === '/dashboard'
            : pathname.startsWith(href)
    }

    return (
        <div className="w-64 gradient-section border-r border-primary/10">
            <div className="h-full flex flex-col">
                <div className="p-4">
                    <h1 className="text-2xl font-black landing-title">
                        Ludiks
                    </h1>
                </div>

                <div className="px-4 mb-6">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full justify-between border-primary/20 bg-surface-1 backdrop-blur-sm"
                                disabled={isLoading || organizations.length === 0}
                            >
                                <div className="flex items-center">
                                    <Building2 className="w-4 h-4 mr-2 text-secondary" />
                                    {isLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : organizations.length === 0 ? (
                                        <span className="text-sm font-medium text-muted-foreground">{t('projectSelector.noProjects')}</span>
                                    ) : (
                                        <span className="text-sm font-medium">{selectedProject?.name}</span>
                                    )}
                                </div>
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64">
                            {organizations.map((organization: Organization, orgIndex: number) => (
                                <div key={organization.id}>
                                    {orgIndex > 0 && <DropdownMenuSeparator />}
                                    <DropdownMenuLabel className="flex items-center gap-2 text-xs font-medium text-muted-foreground px-2 py-1.5">
                                        <Building2 className="h-3 w-3" />
                                        {organization.name}
                                    </DropdownMenuLabel>
                                    {organization.projects.map((project: Project) => (
                                        <DropdownMenuItem
                                            key={project.id}
                                            onClick={() => handleProjectChange(project, organization)}
                                            className="flex items-center justify-between pl-6"
                                        >
                                            <div className="flex items-center">
                                                <FolderGit2 className="w-4 h-4 mr-2 text-secondary" />
                                                <span className="text-sm">{project.name}</span>
                                            </div>
                                            {selectedProject?.id === project.id && (
                                                <Check className="w-4 h-4 text-secondary" />
                                            )}
                                        </DropdownMenuItem>
                                    ))}
                                </div>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="px-4 mb-6">
                    <LeftbarUsageSummary 
                        eventsUsed={selectedOrganization?.eventsUsed ?? 0} 
                        plan={selectedOrganization?.plan ?? 'free'}
                    />
                </div>

                {/* Block 2: Project Navigation */}
                {selectedProject && (
                    <div className="px-4 mb-8">
                        <div className="mb-3">
                            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                {t('leftBar.sections.project')}: {selectedProject.name}
                            </h3>
                        </div>
                        <nav className="space-y-1">
                            {projectNavigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`
                                        flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                                        ${isActive(item.href)
                                            ? 'bg-secondary/10 text-secondary' 
                                            : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'}
                                    `}
                                >
                                    <item.icon className={`h-4 w-4 mr-3 ${isActive(item.href) ? 'text-secondary' : ''}`} />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}

                {/* Block 3: Organization Administration */}
                {selectedOrganization && (
                    <div className="px-4 mb-6">
                        <div className="mb-3">
                            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                {t('leftBar.sections.organization')}: {selectedOrganization.name}
                            </h3>
                        </div>
                        <nav className="space-y-1">
                            {organizationNavigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`
                                        flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                                        ${isActive(item.href)
                                            ? 'bg-secondary/10 text-secondary' 
                                            : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'}
                                    `}
                                >
                                    <item.icon className={`h-4 w-4 mr-3 ${isActive(item.href) ? 'text-secondary' : ''}`} />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}

                {/* Logout Button */}
                <div className="mt-auto px-4 pb-4">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button 
                                variant="ghost" 
                                className="w-full justify-start text-muted-foreground hover:text-foreground"
                            >
                                <LogOut className="h-4 w-4 mr-3" />
                                {t('leftBar.account.logout')}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>{t('actions.logout')}</AlertDialogTitle>
                                <AlertDialogDescription>
                                    {t('actions.logoutConfirm')}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>{tCommon('buttons.cancel')}</AlertDialogCancel>
                                <AlertDialogAction onClick={handleLogout}>
                                    {t('actions.logout')}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    )
}