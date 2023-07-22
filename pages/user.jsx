import { getSession, signOut } from "next-auth/react";
import { useEvmNativeBalance } from "@moralisweb3/next";
import { useState, useEffect } from "react";

function User({ user }) {
  const { data } = useEvmNativeBalance({ address: user });
  const [nativeBalance, setNativeBalance] = useState(null);

  useEffect(() => {
    setNativeBalance(data?.balance?.ether);
  }, [data]);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-teal-600">
        <div className="max-w-m p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-200 ">
              User session:
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700"></p>
          <pre className="text-gray-300">
            Address: {JSON.stringify(user, null, 2)}
          </pre>
          <span className="text-gray-300">
            Native Balance:{" "}
            {nativeBalance ? Number(nativeBalance).toFixed(5) : "0.00000"} ETH
          </span>
          <p />
          <a
            onClick={() => signOut({ redirect: "/signin" })}
            className="inline-flex items-center mt-4 px-3 py-2 text-sm font-medium text-center text-gray-100 bg-red-500 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-200 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700"
          >
            Sign Out
          </a>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // redirect if not authenticated
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user.address },
  };
}

export default User;
