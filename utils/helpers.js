export function generateEmail(baseEmail) {
  const [name, domain] = baseEmail.split('@');
  return `${name}+${Date.now()}@${domain}`;
}