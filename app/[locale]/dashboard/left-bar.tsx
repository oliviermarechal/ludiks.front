import { FolderGit2, ChevronDown, Settings, Users, CircuitBoard, LayoutDashboard, Check, LogOut, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useProjects } from "@/lib/hooks/use-projects.hook"
import { Project, useProjectStore } from "@/lib/stores/project-store"
import { useCircuitStore } from "@/lib/stores/circuit-store"
import { useAuthStore } from "@/lib/stores/user-store"
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

export default function LeftBar() {
    const t = useTranslations('dashboard.common')
    const tCommon = useTranslations('common')
    const router = useRouter()
    const queryClient = useQueryClient()
    const { logout } = useAuthStore()

    const navigation = [
        { name: t('sidebar.overview'), href: '/dashboard', icon: LayoutDashboard },
        { name: t('sidebar.projects'), href: '/dashboard/projects', icon: FolderGit2 },
        { name: t('sidebar.circuits'), href: '/dashboard/circuits', icon: CircuitBoard },
        { name: t('sidebar.users'), href: '/dashboard/users', icon: Users },
        { name: t('sidebar.settings'), href: '/dashboard/settings', icon: Settings },
    ]

    const pathname = usePathname()
    const { projects, isLoading } = useProjects()
    const [currentProject, setCurrentProject] = useState<Project | null>(null)
    const { setProjectId } = useCircuitStore()
    const { setSelectedProject } = useProjectStore()

    useEffect(() => {
        if (!currentProject && projects.length > 0 && !isLoading) {
            const firstProject = projects[0]
            setCurrentProject(firstProject)
            setProjectId(firstProject.id)
            setSelectedProject(firstProject)
        }
    }, [projects, isLoading, currentProject, setProjectId, setSelectedProject])

    const handleProjectChange = (project: Project) => {
        setCurrentProject(project)
        setProjectId(project.id)
        setSelectedProject(project)
    }

    const handleLogout = async () => {
        // Clear all caches
        await queryClient.clear()
        
        // Clear auth state
        logout()
        
        // Redirect to login
        router.push('/auth/login')
    }

    return (
        <div className="w-64 gradient-section border-r border-primary/10">
            <div className="h-full flex flex-col">
                <div className="p-4">
                    <h1 className="text-2xl font-black landing-title">
                        Ludiks
                    </h1>
                </div>

                <div className="px-4 mb-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full justify-between border-primary/20 bg-surface-1 backdrop-blur-sm"
                                disabled={isLoading || projects.length === 0}
                            >
                                <div className="flex items-center">
                                    <FolderGit2 className="w-4 h-4 mr-2 text-secondary" />
                                    {isLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : projects.length === 0 ? (
                                        <span className="text-sm font-medium text-muted-foreground">{t('projectSelector.noProjects')}</span>
                                    ) : (
                                        <span className="text-sm font-medium">{currentProject?.name}</span>
                                    )}
                                </div>
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            {projects.map((project: Project) => (
                                <DropdownMenuItem
                                    key={project.id}
                                    onClick={() => handleProjectChange(project)}
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex items-center">
                                        <FolderGit2 className="w-4 h-4 mr-2 text-secondary" />
                                        <span>{project.name}</span>
                                    </div>
                                    {currentProject?.id === project.id && (
                                        <Check className="w-4 h-4 text-secondary" />
                                    )}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <nav className="flex-1 px-2 py-2 space-y-1">
                    {navigation.map((item) => {
                        const isActive = item.href === '/dashboard' 
                            ? pathname === '/dashboard'
                            : pathname.startsWith(item.href)
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                                    flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                                    ${isActive 
                                        ? 'bg-secondary/10 text-secondary' 
                                        : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'}
                                `}
                            >
                                <item.icon className={`h-5 w-5 mr-3 ${isActive ? 'text-secondary' : ''}`} />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-primary/10 bg-surface-1 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" className="flex-1 justify-start text-muted-foreground hover:text-foreground">
                                    <LogOut className="h-5 w-5 mr-3" />
                                    {t('actions.logout')}
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
        </div>
    )
}