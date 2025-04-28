import { FolderGit2, ChevronDown, Settings, Users, CircuitBoard, LayoutDashboard, Check, LogOut, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useProjects } from "@/lib/hooks/use-projects.hook"
import { Project } from "@/lib/stores/project-store"
import { useCircuitStore } from "@/lib/stores/circuit-store"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LeftBar() {
    const navigation = [
        { name: 'Vue d\'ensemble', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Projets', href: '/dashboard/projects', icon: FolderGit2 },
        { name: 'Parcours', href: '/dashboard/circuits', icon: CircuitBoard },
        { name: 'Utilisateurs', href: '/dashboard/users', icon: Users },
        { name: 'Paramètres', href: '/dashboard/settings', icon: Settings },
    ]

    const pathname = usePathname()
    const { projects, isLoading } = useProjects()
    const [currentProject, setCurrentProject] = useState<Project | null>(null)
    const { setProjectId } = useCircuitStore()

    useEffect(() => {
        if (!currentProject && projects.length > 0 && !isLoading) {
            setCurrentProject(projects[0])
            setProjectId(projects[0].id)
        }
    }, [projects, isLoading, currentProject, setProjectId])

    const handleProjectChange = (project: Project) => {
        setCurrentProject(project)
        setProjectId(project.id)
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
                                        <span className="text-sm font-medium text-muted-foreground">Aucun projet</span>
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
                        <Button variant="ghost" className="flex-1 justify-start text-muted-foreground hover:text-foreground">
                            <LogOut className="h-5 w-5 mr-3" />
                            Déconnexion
                        </Button>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </div>
    )
}