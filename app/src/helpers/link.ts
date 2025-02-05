export function link(url: string): string {
  return `${import.meta.env.VITE_UPLOADER}${url}`;
}
