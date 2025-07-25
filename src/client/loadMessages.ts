import { i18n } from "@lingui/core";

export async function loadMessages(locale: string): Promise<void> {
  const { messages } = await import(`./locales/${locale}/messages.ts`);
  i18n.load(locale, messages);
  i18n.activate(locale);
}
