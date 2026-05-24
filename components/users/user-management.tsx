"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Loader2, RefreshCw, Trash2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  createUser,
  deleteUser,
  listUsers,
  updateUser,
  type UserDto,
} from "@/components/users/user-api";
import { UserForm, type UserFormValues } from "@/components/users/user-form";
import { useUserUiStore, type Notice } from "@/components/users/user-store";

const usersQueryKey = ["users"] as const;

type UserManagementViewProps = {
  users: UserDto[];
  editingUserId: number | null;
  notice: Notice | null;
  isLoading?: boolean;
  isRefreshing?: boolean;
  errorMessage?: string | null;
  creating?: boolean;
  updatingId?: number | null;
  deletingId?: number | null;
  onRefresh: () => void;
  onCreate: (values: UserFormValues) => Promise<void> | void;
  onUpdate: (id: number, values: UserFormValues) => Promise<void> | void;
  onDelete: (id: number) => Promise<void> | void;
  onEdit: (id: number) => void;
  onCancelEdit: () => void;
  onDismissNotice: () => void;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function UserManagementView({
  users,
  editingUserId,
  notice,
  isLoading = false,
  isRefreshing = false,
  errorMessage,
  creating = false,
  updatingId = null,
  deletingId = null,
  onRefresh,
  onCreate,
  onUpdate,
  onDelete,
  onEdit,
  onCancelEdit,
  onDismissNotice,
}: UserManagementViewProps) {
  return (
    <div className="grid gap-6">
      {notice ? (
        <Alert variant={notice.variant === "success" ? "success" : "destructive"}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <AlertTitle>
                {notice.variant === "success" ? "完了" : "エラー"}
              </AlertTitle>
              <AlertDescription>{notice.message}</AlertDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onDismissNotice}>
              閉じる
            </Button>
          </div>
        </Alert>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>新規登録</CardTitle>
        </CardHeader>
        <CardContent>
          <UserForm mode="create" pending={creating} onSubmit={onCreate} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="gap-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="grid gap-1.5">
            <CardTitle>ユーザー一覧</CardTitle>
            <CardDescription>
              <Badge variant="secondary">{users.length} 件</Badge>
            </CardDescription>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={onRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw aria-hidden="true" className="h-4 w-4" />
            )}
            再読込
          </Button>
        </CardHeader>
        <CardContent>
          {errorMessage ? (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>読み込みに失敗しました</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          ) : null}

          {isLoading ? (
            <div className="flex min-h-40 items-center justify-center text-sm text-muted-foreground">
              <Loader2 aria-hidden="true" className="mr-2 h-4 w-4 animate-spin" />
              読み込み中
            </div>
          ) : users.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
              まだユーザーがありません。
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">ID</TableHead>
                  <TableHead>名前</TableHead>
                  <TableHead>メールアドレス</TableHead>
                  <TableHead>作成日時</TableHead>
                  <TableHead className="w-44 text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-mono text-xs">{user.id}</TableCell>
                    <TableCell colSpan={editingUserId === user.id ? 4 : 1}>
                      {editingUserId === user.id ? (
                        <UserForm
                          mode="update"
                          defaultValues={{
                            name: user.name,
                            email: user.email,
                          }}
                          pending={updatingId === user.id}
                          onSubmit={(values) => onUpdate(user.id, values)}
                          onCancel={onCancelEdit}
                        />
                      ) : (
                        user.name
                      )}
                    </TableCell>
                    {editingUserId === user.id ? null : (
                      <>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{formatDate(user.createdAt)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => onEdit(user.id)}
                            >
                              <Edit aria-hidden="true" className="h-4 w-4" />
                              編集
                            </Button>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              disabled={deletingId === user.id}
                              onClick={() => onDelete(user.id)}
                            >
                              {deletingId === user.id ? (
                                <Loader2
                                  aria-hidden="true"
                                  className="h-4 w-4 animate-spin"
                                />
                              ) : (
                                <Trash2 aria-hidden="true" className="h-4 w-4" />
                              )}
                              削除
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function UserManagement() {
  const queryClient = useQueryClient();
  const {
    editingUserId,
    notice,
    setEditingUserId,
    setNotice,
  } = useUserUiStore();
  const usersQuery = useQuery({
    queryKey: usersQueryKey,
    queryFn: listUsers,
  });
  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: usersQueryKey });
      setNotice({ variant: "success", message: "ユーザーを登録しました。" });
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: number; values: UserFormValues }) =>
      updateUser(id, values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: usersQueryKey });
      setEditingUserId(null);
      setNotice({ variant: "success", message: "ユーザーを更新しました。" });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: usersQueryKey });
      setNotice({ variant: "success", message: "ユーザーを削除しました。" });
    },
    onError: () => {
      setNotice({ variant: "error", message: "ユーザーの削除に失敗しました。" });
    },
  });

  return (
    <UserManagementView
      users={usersQuery.data ?? []}
      editingUserId={editingUserId}
      notice={notice}
      isLoading={usersQuery.isLoading}
      isRefreshing={usersQuery.isFetching}
      errorMessage={usersQuery.error ? "PostgreSQLの起動とmigrationを確認してください。" : null}
      creating={createMutation.isPending}
      updatingId={
        updateMutation.isPending ? updateMutation.variables?.id ?? null : null
      }
      deletingId={
        deleteMutation.isPending ? deleteMutation.variables ?? null : null
      }
      onRefresh={() => {
        void usersQuery.refetch();
      }}
      onCreate={async (values) => {
        await createMutation.mutateAsync(values);
      }}
      onUpdate={async (id, values) => {
        await updateMutation.mutateAsync({ id, values });
      }}
      onDelete={async (id) => {
        await deleteMutation.mutateAsync(id);
      }}
      onEdit={(id) => setEditingUserId(id)}
      onCancelEdit={() => setEditingUserId(null)}
      onDismissNotice={() => setNotice(null)}
    />
  );
}
