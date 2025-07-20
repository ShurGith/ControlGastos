import type { PropsWithChildren } from "react";

function ErrorMessage({children} : PropsWithChildren) {
  return (
    <div>
        <p className="bg-red-600 text-white font-bold text-sm text-center p-4 rounded-lg w-full">
            {children}
            </p>
    </div>
  )
}

export default ErrorMessage