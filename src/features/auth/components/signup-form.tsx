import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>アカウントの作成</CardTitle>
        <CardDescription>
          アカウントを作成するには、以下の情報を入力してください。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">フルネーム</FieldLabel>
              <Input id="name" type="text" placeholder="山田 太郎" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">メールアドレス</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                required
              />
              <FieldDescription>
                このメールアドレスはご連絡のために使用致します。お客様のメールアドレスを他の方と共有することはありません。
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">パスワード</FieldLabel>
              <Input id="password" type="password" required />
              <FieldDescription>8文字以上の長さが必要です。</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                パスワードの確認
              </FieldLabel>
              <Input id="confirm-password" type="password" required />
              <FieldDescription>
                パスワードを確認してください。
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">アカウントを作成する</Button>
                <Button variant="outline" type="button">
                  Googleアカウントでサインアップ
                </Button>
                <FieldDescription className="px-6 text-center">
                  既にアカウントをお持ちですか？
                  <a href="#">ログインしてください</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
