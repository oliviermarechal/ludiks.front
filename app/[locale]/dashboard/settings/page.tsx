'use client';

import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Copy, Key, Trash2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useProjectApiKeys } from "@/lib/hooks/use-project-api-keys.hook";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useOrganizations } from "@/lib/hooks/use-organizations.hook";
import { useProjectOverview } from "@/lib/hooks/use-project-overview.hook";
import { useProjectSelection } from "@/lib/hooks/use-project-selection.hook";

export default function SettingsPage() {
    const t = useTranslations('dashboard.common.settings');
    const { selectedProject } = useProjectSelection();
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [newApiKeyName, setNewApiKeyName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiKeyToDelete, setApiKeyToDelete] = useState<string | null>(null);
    const [apiKeyToDeleteValue, setApiKeyToDeleteValue] = useState<string | null>(null);
    const { updateProject, isUpdating } = useOrganizations();
    const { isLoading: isProjectLoading } = useProjectOverview(selectedProject?.id);
    const [projectName, setProjectName] = useState("");

    const {
        apiKeys,
        isLoading,
        createApiKey,
        isCreatingApiKey,
        deleteApiKey,
        isDeletingApiKey,
    } = useProjectApiKeys(selectedProject?.id || '');

    useEffect(() => {
        if (selectedProject) {
            setProjectName(selectedProject.name);
        }
    }, [selectedProject])

    const handleCreateApiKey = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!newApiKeyName.trim() || !selectedProject?.id) return;

        setIsSubmitting(true);
        try {
            await createApiKey({ name: newApiKeyName.trim() });
            
            setNewApiKeyName('');
            setIsCreateDialogOpen(false);
            toast.success('API key created successfully');
        } catch (error) {
            console.error('Failed to create API key:', error);
            toast.error('Failed to create API key. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAskDeleteApiKey = (apiKeyId: string, apiKeyValue: string) => {
        setApiKeyToDelete(apiKeyId);
        setApiKeyToDeleteValue(apiKeyValue);
    };

    const handleConfirmDeleteApiKey = async () => {
        if (!apiKeyToDelete) return;
        try {
            await deleteApiKey(apiKeyToDelete);
            toast.success('API key deleted successfully');
        } catch (error) {
            console.error('Failed to delete API key:', error);
            toast.error('Failed to delete API key. Please try again.');
        } finally {
            setApiKeyToDelete(null);
            setApiKeyToDeleteValue(null);
        }
    };

    const handleCancelDeleteApiKey = () => {
        setApiKeyToDelete(null);
        setApiKeyToDeleteValue(null);
    };

    const handleCopyApiKey = (apiKey: string) => {
        navigator.clipboard.writeText(apiKey);
        toast.success('API key copied to clipboard');
    };

    const handleCancelCreate = () => {
        setNewApiKeyName('');
        setIsCreateDialogOpen(false);
    };

    const handleSaveProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProject?.id || !projectName.trim()) return;
        try {
            await updateProject({ id: selectedProject.id, name: projectName.trim() });
            toast.success(t('general.updateSuccess') || 'Project updated successfully');
        } catch (error) {
            console.error('Failed to update project:', error);
            toast.error(t('general.updateError') || 'Failed to update project. Please try again.');
        }
    };

    return (
        <div className="container mx-auto py-12">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Header */}
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold text-foreground">{t('title')}</h1>
                    <p className="text-lg text-muted-foreground">{t('description')}</p>
                </div>

                {/* General Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('general.title')}</CardTitle>
                    </CardHeader>
                    <form onSubmit={handleSaveProject}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">{t('general.name')}</Label>
                                <Input
                                    id="name"
                                    value={projectName}
                                    onChange={e => setProjectName(e.target.value)}
                                    disabled={isUpdating || isProjectLoading}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="border-t px-6 py-4">
                            <Button type="submit" disabled={isUpdating || !projectName.trim() || isProjectLoading}>
                                {isUpdating ? (
                                    <span className="flex items-center gap-2">
                                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                                        {t('general.saving')}
                                    </span>
                                ) : t('general.save')}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                {/* API Keys */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>{t('apiKeys.title')}</CardTitle>
                                <CardDescription>{t('apiKeys.description')}</CardDescription>
                            </div>
                            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" />
                                        {t('apiKeys.generate')}
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>{t('apiKeys.createDialog.title')}</DialogTitle>
                                        <DialogDescription>{t('apiKeys.createDialog.description')}</DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleCreateApiKey} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="api-key-name">{t('apiKeys.createDialog.name')}</Label>
                                            <Input 
                                                id="api-key-name" 
                                                placeholder={t('apiKeys.createDialog.namePlaceholder')}
                                                value={newApiKeyName}
                                                onChange={(e) => setNewApiKeyName(e.target.value)}
                                                required
                                                disabled={isSubmitting || isCreatingApiKey}
                                            />
                                        </div>
                                        <div className="flex gap-2 pt-4">
                                            <Button 
                                                type="button" 
                                                variant="outline" 
                                                onClick={handleCancelCreate}
                                                disabled={isSubmitting || isCreatingApiKey}
                                                className="flex-1"
                                            >
                                                {t('apiKeys.createDialog.cancel')}
                                            </Button>
                                            <Button 
                                                type="submit" 
                                                className="flex-1"
                                                disabled={isSubmitting || isCreatingApiKey || !newApiKeyName.trim()}
                                            >
                                                {isSubmitting || isCreatingApiKey ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                                        {t('apiKeys.createDialog.creating')}
                                                    </>
                                                ) : (
                                                    t('apiKeys.createDialog.create')
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="space-y-4">
                                {[...Array(2)].map((_, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <Skeleton className="h-4 w-4" />
                                            <Skeleton className="h-4 w-48" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Skeleton className="h-4 w-20" />
                                            <Skeleton className="h-8 w-8" />
                                            <Skeleton className="h-8 w-8" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : apiKeys.length === 0 ? (
                            <div className="text-center py-8">
                                <Key className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground">{t('apiKeys.empty')}</p>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{t('apiKeys.name')}</TableHead>
                                        <TableHead>{t('apiKeys.key')}</TableHead>
                                        <TableHead>{t('apiKeys.created')}</TableHead>
                                        <TableHead className="text-right">{t('apiKeys.actions')}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {apiKeys.map(apiKey => (
                                        <TableRow key={apiKey.id}>
                                            <TableCell className="font-medium">{apiKey.name}</TableCell>
                                            <TableCell className="font-mono flex items-center gap-2">
                                                <Key className="h-4 w-4 text-muted-foreground" /> 
                                                {apiKey.value}
                                            </TableCell>
                                            <TableCell>{new Date(apiKey.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell className="text-right">
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon"
                                                    onClick={() => handleCopyApiKey(apiKey.value)}
                                                >
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="text-destructive"
                                                    onClick={() => handleAskDeleteApiKey(apiKey.id, apiKey.value)}
                                                    disabled={isDeletingApiKey}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-destructive">
                    <CardHeader>
                        <CardTitle className="text-destructive">{t('dangerZone.title')}</CardTitle>
                        <CardDescription>{t('dangerZone.description')}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">{t('dangerZone.deleteProject')}</p>
                            <p className="text-sm text-muted-foreground">{t('dangerZone.deleteWarning')}</p>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-semibold select-none opacity-70 cursor-not-allowed">
                            {t('emptyState.comingSoon')}
                        </span>
                    </CardContent>
                </Card>

                {/* Delete API Key Confirmation Modal */}
                <AlertDialog open={!!apiKeyToDelete} onOpenChange={open => { if (!open) handleCancelDeleteApiKey(); }}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>{t('apiKeys.confirmDelete.title') || 'Delete API Key?'}</AlertDialogTitle>
                            <AlertDialogDescription>
                                {t('apiKeys.confirmDelete.description') || 'Are you sure you want to delete this API key? This action cannot be undone.'}
                                <div className="mt-2 p-2 bg-muted rounded text-xs font-mono break-all">
                                    {apiKeyToDeleteValue}
                                </div>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={handleCancelDeleteApiKey}>{t('apiKeys.confirmDelete.cancel') || 'Cancel'}</AlertDialogCancel>
                            <AlertDialogAction onClick={handleConfirmDeleteApiKey} disabled={isDeletingApiKey} className="bg-destructive text-white">
                                {t('apiKeys.confirmDelete.delete') || 'Delete'}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}
