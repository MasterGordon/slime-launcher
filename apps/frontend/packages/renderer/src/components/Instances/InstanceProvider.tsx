import type { Instance } from "@slime-launcher/piston";
import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";

const InstanceContext = createContext<Instance | undefined>(undefined);

export const useInstance = () => {
  const ctx = useContext(InstanceContext);
  if (!ctx)
    throw new Error("useInstanceContext can only be used inside of a Provider");
  return ctx;
};

export const InstanceProvider: React.FC<
  PropsWithChildren<{ instance: Instance }>
> = ({ instance, children }) => {
  return (
    <InstanceContext.Provider value={instance}>
      {children}
    </InstanceContext.Provider>
  );
};
