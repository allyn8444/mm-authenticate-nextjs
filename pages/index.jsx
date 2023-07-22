import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/signin");
  }, []); // The empty dependency array ensures this runs only once after component mount

  return <div className="text-center grid-items-center">Redirecting to /signin...</div>;
}

/* in the documentation, idk why they proceed to code in the /signin page. so as a solution I did that above */
