import { auth } from "../lib/auth";
import ClientLandingPage from "../components/ClientLandingPage";

// Server Component - runs on server
export default async function LandingPage() {
  // Get session server-side during SSR
  const session = await auth();

  // Pass session data to client component
  return <ClientLandingPage initialSession={session} />;
} 